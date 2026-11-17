import "server-only";
import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";

import { bio as seedBio, tagline as seedTagline } from "@/content/bio";
import { contact as seedContact } from "@/content/contact";
import { semesters as seedSemesters } from "@/content/coursework";
import { orgs as seedOrgs } from "@/content/orgs";
import { projects as seedProjects } from "@/content/projects";
import {
    bioParagraphs as seedBioParagraphs,
    currently as seedCurrently,
    lastModified as seedLastModified,
    neofetch as seedNeofetch,
} from "@/content/readme";
import { sources as seedResearch } from "@/content/research";
import { stack as seedStack } from "@/content/stack";
import { stamps as seedStamps } from "@/content/stamps";

/*
 * Every write to the content table calls revalidateTag(CONTENT_TAG), which is
 * what lets the public pages stay statically rendered and still show an edit
 * immediately. Without it a save would not appear until the next deploy.
 */
export const CONTENT_TAG = "content";

/*
 * The stored stack shape. The database holds the simple-icons slug rather
 * than the icon object, so the row does not freeze a copy of the package
 * that goes stale on the next bump. Resolution happens in stack-icons.ts,
 * on the server, so the browser never loads the icon set.
 */
export type StoredStackItem = {
    label: string;
    iconSlug: string;
    desktop: { top: string; left: string };
};

/*
 * A structural type rather than `typeof seedBio`. The seed is declared `as
 * const`, so reusing its type would promise literal values ("Chewy", a
 * readonly two-tuple of majors) that a jsonb row cannot honour.
 */
export type Bio = {
    name: string;
    study: string;
    school: string;
    majors: readonly string[];
    gradClass: string;
    coop: string;
    location: string;
    availableFrom: string;
    scholarCities: readonly string[];
    uptimeStart: string;
    tagline: string;
};

export type ContentMap = {
    bio: Bio;
    projects: typeof seedProjects;
    stack: StoredStackItem[];
    orgs: typeof seedOrgs;
    contact: typeof seedContact;
    coursework: typeof seedSemesters;
    stamps: typeof seedStamps;
    readme: {
        bioParagraphs: typeof seedBioParagraphs;
        currently: typeof seedCurrently;
        neofetch: typeof seedNeofetch;
        lastModified: string;
    };
    research: typeof seedResearch;
};

export type ContentKey = keyof ContentMap;

/*
 * The committed src/content modules stay in the repo as the seed and as the
 * fallback below. They are not dead code: they are what the site renders if
 * the database is unreachable, which on the Free plan includes a compute
 * suspended over quota.
 */
const seed: ContentMap = {
    bio: { ...seedBio, tagline: seedTagline },
    projects: seedProjects,
    stack: seedStack.map(({ icon, ...rest }) => ({ ...rest, iconSlug: icon.slug })),
    orgs: seedOrgs,
    contact: seedContact,
    coursework: seedSemesters,
    stamps: seedStamps,
    readme: {
        bioParagraphs: seedBioParagraphs,
        currently: seedCurrently,
        neofetch: seedNeofetch,
        lastModified: seedLastModified,
    },
    research: seedResearch,
};

async function fetchAll(): Promise<ContentMap> {
    try {
        const rows = await db()`select key, data from content`;
        const stored = Object.fromEntries(
            rows.map((row) => [row.key as string, row.data]),
        );

        /*
         * Merged key by key rather than returned wholesale, so a key that has
         * not been seeded yet falls back on its own instead of taking the
         * whole site back to the committed copy.
         */
        return Object.fromEntries(
            Object.keys(seed).map((key) => [
                key,
                stored[key] ?? seed[key as ContentKey],
            ]),
        ) as ContentMap;
    } catch (error) {
        console.error("Falling back to seeded content:", error);
        return seed;
    }
}

const cached = unstable_cache(fetchAll, ["site-content"], {
    tags: [CONTENT_TAG],
});

export async function getAllContent(): Promise<ContentMap> {
    return cached();
}

export async function getContent<K extends ContentKey>(
    key: K,
): Promise<ContentMap[K]> {
    return (await cached())[key];
}
