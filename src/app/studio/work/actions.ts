"use server";

import { ZodError } from "zod";
import { getContent } from "@/lib/content";
import { setContent } from "@/lib/content-write";

export type SaveResult = { ok: true } | { ok: false; error: string };

/*
 * Errors are returned, not thrown.
 *
 * setContent rejects in three different registers: requireSession throws a
 * Response, the schema throws a ZodError, and the cross-row check throws a
 * plain Error. Letting any of those escape a Server Action gives the browser
 * a digest and a blank screen, so each is turned into something a person can
 * read and act on.
 */
function describe(error: unknown): string {
    if (error instanceof Response) {
        return error.status === 401
            ? "Your session has expired. Sign in again."
            : `Request refused (${error.status}).`;
    }

    if (error instanceof ZodError) {
        const issue = error.issues[0];
        const where = issue.path.length > 0 ? `${issue.path.join(".")}: ` : "";
        return `${where}${issue.message}`;
    }

    return error instanceof Error ? error.message : "Something went wrong.";
}

/*
 * A save rewrites the whole projects array, since the row holds the array as
 * one jsonb document. With a single author that is fine; two tabs editing at
 * once would mean the later save silently wins.
 */
export async function saveProjectDescription(
    slug: string,
    description: string,
): Promise<SaveResult> {
    try {
        const projects = await getContent("projects");

        if (!projects.some((project) => project.slug === slug)) {
            return { ok: false, error: `No project with slug "${slug}".` };
        }

        await setContent(
            "projects",
            projects.map((project) =>
                project.slug === slug ? { ...project, description } : project,
            ),
        );

        return { ok: true };
    } catch (error) {
        return { ok: false, error: describe(error) };
    }
}
