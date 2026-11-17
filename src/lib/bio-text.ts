import type { Bio } from "@/lib/content";

/*
 * The three phrasings of the same two facts, plus the search description.
 *
 * These stay in code rather than moving into the database, because the
 * database holds atoms and these are sentences composed from them. Storing
 * the sentences would reintroduce exactly the duplication bio.ts was written
 * to remove.
 *
 * Kept in their own module, free of "server-only", so the edge OG route can
 * use them without pulling in the database layer.
 */
export function intro(bio: Bio): string {
    return `${bio.study}. ${bio.tagline}`;
}

export function introInline(bio: Bio): string {
    return `${bio.study} · ${bio.tagline}`;
}

export function introWithClass(bio: Bio): string {
    return `${bio.study}, ${bio.gradClass}. ${bio.tagline}`;
}

export function metaDescription(bio: Bio): string {
    return [
        introWithClass(bio),
        `Software engineer co-op at ${bio.coop}.`,
        `Global Scholar: ${bio.scholarCities.join(", ")}.`,
    ].join(" ");
}

export function readmeHeading(bio: Bio): string {
    return `Hi, I'm ${bio.name.split(" ")[0]}.`;
}
