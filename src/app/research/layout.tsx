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
        title: "Research",
        description: "Undergraduate research by Olivia Hill: exploratory analysis of quantum computing frameworks for medical classification at The Mills Institute, and a Khoury Excellence Award-winning child therapist training database at Northeastern Oakland.",
        openGraph: {
            title: `Research · ${bio.name}`,
            description: "Quantum computing research at The Mills Institute and Khoury Award-winning database research at Northeastern Oakland.",
            images: [{ url: "/og", width: 1200, height: 630 }],
        },
    };
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
