import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Work",
    description: "Projects by Olivia Hill: StyleBoard (AI fashion curation), CoopScout (co-op job aggregator), Toggo (trip planning app at Generate), Child Therapist Training Database (Khoury Excellence Award), and quantum computing research at The Mills Institute.",
    openGraph: {
        title: "Work · Olivia Hill",
        description: "Full-stack products and research tools by Olivia Hill, CS + Math student at Northeastern.",
        images: [{ url: "/og", width: 1200, height: 630 }],
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}