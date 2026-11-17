import { z } from "zod";
import type { ContentKey, ContentMap } from "@/lib/content";

/*
 * What stops a bad shape reaching the database.
 *
 * Before the editor existed, a typo in src/content failed `npm run build`.
 * Once something writes through setContent() that safety net is gone: a bad
 * value lands in a jsonb column and renders. These schemas are the
 * replacement, checked on the server at the write boundary.
 */

const nonEmpty = z.string().trim().min(1, "cannot be empty");

/* Desktop canvas coordinates are CSS percentages, as in "47%". */
const percent = z
    .string()
    .regex(/^-?\d+(\.\d+)?%$/, 'must be a percentage such as "47%"');

/*
 * Several projects carry "" for a link they do not have, which is the shape
 * already in the data, so an empty string is valid and anything else must be
 * a real URL.
 */
const optionalUrl = z.union([z.literal(""), z.url("must be a valid URL")]);

export const projectSchema = z.object({
    slug: z
        .string()
        .regex(
            /^[a-z0-9]+(-[a-z0-9]+)*$/,
            "must be lowercase letters, digits and single hyphens",
        ),
    filename: nonEmpty,
    title: nonEmpty,
    tagline: nonEmpty,
    description: nonEmpty,
    stack: z.array(nonEmpty),
    github: optionalUrl.optional(),
    live: optionalUrl.optional(),
    period: nonEmpty,
    role: nonEmpty,
    home: z.object({ top: percent, left: percent }).optional(),
});

/*
 * The slug is the key the rest of the site joins on: research entries name
 * it, and /projects/<slug> is built from it. A duplicate would make
 * findProject return whichever came first, silently.
 */
export const projectsSchema = z
    .array(projectSchema)
    .min(1, "the site needs at least one project")
    .superRefine((list, ctx) => {
        const seen = new Set<string>();

        list.forEach((project, index) => {
            if (seen.has(project.slug)) {
                ctx.addIssue({
                    code: "custom",
                    path: [index, "slug"],
                    message: `duplicate slug "${project.slug}"`,
                });
            }
            seen.add(project.slug);
        });
    });

/*
 * Fails closed. A key with no schema cannot be written at all, rather than
 * being waved through unchecked: an editor for a key arrives together with
 * its schema, never before it.
 */
const schemas: Partial<Record<ContentKey, z.ZodType>> = {
    projects: projectsSchema,
};

export function validateContent<K extends ContentKey>(
    key: K,
    data: unknown,
): ContentMap[K] {
    const schema = schemas[key];

    if (!schema) {
        throw new Error(
            `No schema for content key "${key}". Add one to ` +
            `src/lib/schemas.ts before writing it.`,
        );
    }

    return schema.parse(data) as ContentMap[K];
}

export function hasSchema(key: ContentKey): boolean {
    return key in schemas;
}
