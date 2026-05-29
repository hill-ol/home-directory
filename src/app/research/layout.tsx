import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Research",
    description: "Undergraduate research by Olivia Hill: exploratory analysis of quantum computing frameworks for medical classification at The Mills Institute, and a Khoury Excellence Award-winning child therapist training database at Northeastern Oakland.",
    openGraph: {
        title: "Research · Olivia Hill",
        description: "Quantum computing research at The Mills Institute and Khoury Award-winning database research at Northeastern Oakland.",
        images: [{ url: "/og", width: 1200, height: 630 }],
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}