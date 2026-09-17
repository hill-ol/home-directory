import type { Metadata } from "next";

import { bio } from "@/content/bio";

export const metadata: Metadata = {
    title: "Readme",
    description: "About Olivia Hill: CS + Math student at Northeastern, software engineer co-op at Chewy, Generate product studio, and Northeastern Global Scholar who studied in London, Oakland, and Budapest.",
    openGraph: {
        title: `Readme · ${bio.name}`,
        description: "About Olivia Hill: CS + Math at Northeastern, co-op at Chewy, Global Scholar, builder.",
        images: [{ url: "/og", width: 1200, height: 630 }],
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}