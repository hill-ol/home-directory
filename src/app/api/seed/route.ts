import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bio, tagline } from "@/content/bio";
import { contact } from "@/content/contact";
import { semesters } from "@/content/coursework";
import { orgs } from "@/content/orgs";
import { projects } from "@/content/projects";
import { bioParagraphs, currently, lastModified, neofetch } from "@/content/readme";
import { sources } from "@/content/research";
import { stack } from "@/content/stack";
import { stamps } from "@/content/stamps";

/*
 * A one-off: it lifts the current src/content modules into the content
 * table so the database starts out holding exactly what the site renders
 * today. Delete this route once it has run.
 *
 * POST rather than GET so a stray browser visit cannot fire it, and
 * `on conflict do nothing` so running it twice cannot clobber an edit made
 * through the editor later.
 */
export async function POST() {
    if (process.env.NODE_ENV === "production") {
        return new NextResponse(null, { status: 404 });
    }

    const rows: Record<string, unknown> = {
        /*
         * tagline is a separate export today but belongs with the atoms it
         * is composed alongside.
         */
        bio: { ...bio, tagline },

        projects,

        /*
         * The icon field holds a SimpleIcon object, which is a snapshot of
         * the npm package's data: path, hex, svg, the lot. Writing that to
         * the database would freeze a copy of the package that goes stale
         * on the next bump, and it would bloat the row for no gain. Store
         * the slug and resolve it against the package at render time, which
         * is also what keeps icon.hex available for the hover colour.
         */
        stack: stack.map(({ icon, ...rest }) => ({ ...rest, iconSlug: icon.slug })),

        orgs,
        contact,
        coursework: semesters,
        stamps,
        readme: { bioParagraphs, currently, neofetch, lastModified },

        /*
         * The unresolved sources, not the resolved research array. Entries
         * that name a project keep naming it.
         */
        research: sources,
    };

    const sql = db();
    const seeded: string[] = [];

    for (const [key, data] of Object.entries(rows)) {
        const result = await sql`
            insert into content (key, data)
            values (${key}, ${JSON.stringify(data)}::jsonb)
            on conflict (key) do nothing
            returning key
        `;

        if (result.length > 0) seeded.push(key);
    }

    return NextResponse.json({
        seeded,
        skipped: Object.keys(rows).filter((key) => !seeded.includes(key)),
    });
}
