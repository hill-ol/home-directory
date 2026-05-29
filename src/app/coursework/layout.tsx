import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Coursework",
    description: "CS and Mathematics coursework at Northeastern University by Olivia Hill: from Discrete Structures and Algorithms (CS 5800) to Group Theory, Linear Algebra, and Quantum Computing, across five semesters in Boston, Oakland, and Budapest.",
    openGraph: {
        title: "Coursework · Olivia Hill",
        description: "CS + Math coursework at Northeastern University, Class of 2028.",
        images: [{ url: "/og", width: 1200, height: 630 }],
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}