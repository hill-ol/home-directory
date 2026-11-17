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

export type NewProject = {
    slug: string;
    filename: string;
    title: string;
    tagline: string;
    description: string;
    period: string;
    role: string;
    stack: string[];
    github: string;
    live: string;
};

/*
 * Adds a project to the front of the array.
 *
 * Order is not decoration: it drives /work, the mobile home grid, and
 * sitemap.ts, and it is reverse chronological. A project being added is
 * almost always the newest one, so it goes first rather than last.
 *
 * `home` is deliberately not set, so a new project appears on /work, on the
 * mobile grid, and at its own page, but not on the hand-composed desktop
 * canvas. Those coordinates are chosen by eye against the other folders and
 * do not have a sensible default.
 *
 * The payload is shaped for the form's convenience, not trusted: setContent
 * runs it through the schema, which is what actually decides.
 */
export async function addProject(input: NewProject): Promise<SaveResult> {
    try {
        const projects = await getContent("projects");

        if (projects.some((project) => project.slug === input.slug)) {
            return {
                ok: false,
                error: `A project with the slug "${input.slug}" already exists.`,
            };
        }

        await setContent("projects", [input, ...projects]);

        return { ok: true };
    } catch (error) {
        return { ok: false, error: describe(error) };
    }
}
