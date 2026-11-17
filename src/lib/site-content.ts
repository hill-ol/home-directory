import "server-only";
import { cache } from "react";
import { getAllContent, type ContentMap } from "@/lib/content";
import {
    intro,
    introInline,
    introWithClass,
    metaDescription,
    readmeHeading,
} from "@/lib/bio-text";
import { resolveStackIcons, type ResolvedStackItem } from "@/lib/stack-icons";
import { placedProjects, type PlacedProject } from "@/content/projects";
import { resolveResearch, type ResearchEntry } from "@/content/research";
import type { ContactLink } from "@/content/contact";

/*
 * The content, plus everything that used to be derived at module scope in
 * src/content.
 *
 * Those derivations stay in code rather than moving into the database: the
 * database holds the atoms, and `intro`, `introInline` and `introWithClass`
 * are three phrasings of the same two facts. Storing the sentences instead
 * would be the duplication bio.ts was written to avoid.
 *
 * They are computed here, once, on the server, so a client component reads
 * `intro` off the context exactly as it used to read it off the module.
 */
export type SiteContent = Omit<ContentMap, "stack" | "research"> & {
    stack: ResolvedStackItem[];
    intro: string;
    introInline: string;
    introWithClass: string;
    metaDescription: string;
    readmeHeading: string;
    contactLinks: ContactLink[];
    desktopProjects: PlacedProject[];
    research: ResearchEntry[];
};

/*
 * React's cache, not unstable_cache. getAllContent is already cached across
 * requests; this one deduplicates the resolution work within a single
 * render, so a layout and its page do not both resolve the icon set and the
 * research entries.
 */
export const getSiteContent = cache(async (): Promise<SiteContent> => {
    const content = await getAllContent();
    const { bio, projects, research, stack, contact } = content;

    return {
        ...content,
        stack: resolveStackIcons(stack),
        intro: intro(bio),
        introInline: introInline(bio),
        introWithClass: introWithClass(bio),
        metaDescription: metaDescription(bio),
        readmeHeading: readmeHeading(bio),
        contactLinks: Object.values(contact),
        desktopProjects: placedProjects(projects),
        research: resolveResearch(research, projects),
    };
});
