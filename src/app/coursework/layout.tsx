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
        title: "Coursework",
        description: "CS and Mathematics coursework at Northeastern University by Olivia Hill: from Discrete Structures and Algorithms (CS 5800) to Group Theory, Linear Algebra, and Quantum Computing, across semesters in Boston, Oakland, and Budapest.",
        openGraph: {
            title: `Coursework · ${bio.name}`,
            description: "CS + Math coursework at Northeastern University, Class of 2028.",
            images: [{ url: "/og", width: 1200, height: 630 }],
        },
    };
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
