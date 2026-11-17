"use client";

import { createContext, useContext } from "react";
import type { SiteContent } from "@/lib/site-content";

/*
 * The type is imported type-only, so the server module it comes from is
 * erased by TypeScript and never reaches this bundle.
 */
export type { SiteContent };

const ContentContext = createContext<SiteContent | null>(null);

/*
 * The root layout fetches once per render and hands the whole set down,
 * derived values included. The payload is around 12 KB, which is cheaper
 * than threading nine separate props through two layout trees, and it keeps
 * client components reading content the same way they read it as static
 * imports: `const { projects } = useContent()` in place of an import.
 */
export function ContentProvider({
    value,
    children,
}: {
    value: SiteContent;
    children: React.ReactNode;
}) {
    return (
        <ContentContext.Provider value={value}>
            {children}
        </ContentContext.Provider>
    );
}

export function useContent(): SiteContent {
    const content = useContext(ContentContext);

    if (!content) {
        throw new Error("useContent must be used inside ContentProvider.");
    }

    return content;
}
