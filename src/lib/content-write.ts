import "server-only";
import { updateTag } from "next/cache";
import { db } from "@/lib/db";
import { requireSession } from "@/lib/auth/server";
import { CONTENT_TAG, type ContentKey, type ContentMap } from "@/lib/content";

/*
 * The only way content is written.
 *
 * requireSession() first, always: there is no row-level security behind this,
 * so this call is the authorization boundary. updateTag last, which is what
 * makes a save show up on the statically rendered public pages instead of
 * waiting for the next deploy.
 *
 * updateTag rather than revalidateTag because it gives read-your-own-writes:
 * the save returns with the new value already visible, not eventually. It is
 * only valid inside a Server Action, so the editor must save through one
 * rather than through a route handler.
 *
 * Still missing: schema validation. Today a typo in src/content fails the
 * build; once the editor writes here, a bad shape lands in the database and
 * renders. Before any editor UI calls this, it needs a Zod schema per key,
 * checked here, plus the referential rules the content already relies on:
 * a research entry's project slug must resolve, and a stack entry's icon
 * slug must exist in simple-icons.
 */
export async function setContent<K extends ContentKey>(
    key: K,
    data: ContentMap[K],
): Promise<void> {
    await requireSession();

    await db()`
        insert into content (key, data)
        values (${key}, ${JSON.stringify(data)}::jsonb)
        on conflict (key) do update set data = excluded.data
    `;

    updateTag(CONTENT_TAG);
}
