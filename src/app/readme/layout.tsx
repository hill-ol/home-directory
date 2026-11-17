import type { Metadata } from "next";

import { getSiteContent } from "@/lib/site-content";

/*
 * generateMetadata rather than a static object: bio.name now comes from
 * the database. The descriptions stay as prose on purpose, since they are
 * bespoke SEO copy rather than composed facts.
 */
export async function generateMetadata(): Promise<Metadata> {
    const { bio } = await getSiteContent();

    return {
        title: "Readme",
        description: "About Olivia Hill: CS + Math student at Northeastern, software engineer co-op at Chewy, Generate product studio, and Northeastern Global Scholar who studied in London, Oakland, and Budapest.",
        openGraph: {
            title: `Readme · ${bio.name}`,
            description: "About Olivia Hill: CS + Math at Northeastern, co-op at Chewy, Global Scholar, builder.",
            images: [{ url: "/og", width: 1200, height: 630 }],
        },
    };
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
