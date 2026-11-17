import "server-only";
import { updateTag } from "next/cache";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth/server";
import {
    CONTENT_TAG,
    getContent,
    type ContentKey,
    type ContentMap,
} from "@/lib/content";
import { validateContent } from "@/lib/schemas";

/*
 * Rules that span two rows, so a schema cannot express them.
 *
 * research.ts resolves its entries against projects and throws at module
 * load on a slug that matches nothing, which used to fail the build. Nothing
 * fails a build any more, so the same rule has to be enforced here: deleting
 * or renaming a project that a research entry names would otherwise take
 * /research down at request time.
 */
export async function assertReferencesHold<K extends ContentKey>(
    key: K,
    data: ContentMap[K],
): Promise<void> {
    if (key !== "projects") return;

    const projects = data as ContentMap["projects"];
    const research = await getContent("research");
    const slugs = new Set(projects.map((project) => project.slug));

    const orphaned = research
        .filter((source) => "project" in source && !slugs.has(source.project))
        .map((source) => ("project" in source ? source.project : ""));

    if (orphaned.length > 0) {
        throw new Error(
            `Refusing the write: research ${
                orphaned.length === 1 ? "entry still references" : "entries still reference"
            } ${orphaned.map((s) => `"${s}"`).join(", ")}. ` +
            `Update src/content/research.ts, or keep the slug.`,
        );
    }
}

/*
 * The only way content is written.
 *
 * requireSession() first, always: there is no row-level security behind this,
 * so this call is the authorization boundary. Then the shape, then the rules
 * that span rows, then the write, then updateTag.
 *
 * `data` is deliberately `unknown`. It arrives from a form, so the type it
 * claims to have is not evidence of anything; validateContent is what turns
 * it into ContentMap[K].
 *
 * updateTag rather than revalidateTag because it gives read-your-own-writes:
 * the save returns with the new value already visible, not eventually. It is
 * only valid inside a Server Action, so the editor must save through one
 * rather than through a route handler.
 */
export async function setContent<K extends ContentKey>(
    key: K,
    data: unknown,
): Promise<void> {
    await requireSession();

    const validated = validateContent(key, data);
    await assertReferencesHold(key, validated);

    await db()`
        insert into content (key, data)
        values (${key}, ${JSON.stringify(validated)}::jsonb)
        on conflict (key) do update set data = excluded.data
    `;

    updateTag(CONTENT_TAG);
}
