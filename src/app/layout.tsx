import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import MenuBar, { MobileNav } from "@/components/MenuBar";
import TakeWhatYouNeed from "@/components/TakeWhatYouNeed";
import "./globals.css";

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: "swap",
});

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400"],
    variable: "--font-dm-sans",
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "Olivia Hill",
        template: "%s · Olivia Hill",
    },
    description:
        "CS + Math student at Northeastern University, Class of 2028. Software engineer co-op at Chewy. CS + Math @ Northeastern. Building full-stack products and software that makes a meaningful impact. Global Scholar: London, Oakland, Budapest.",
    keywords: [
        "Olivia Hill",
        "software engineer",
        "Northeastern University",
        "CS Math",
        "full-stack",
        "Next.js",
        "TypeScript",
        "quantum computing",
        "co-op",
    ],
    authors: [{ name: "Olivia Hill", url: "https://home-directory.vercel.app" }],
    creator: "Olivia Hill",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://home-directory.vercel.app",
        siteName: "Olivia Hill",
        title: "Olivia Hill",
        description:
            "CS + Math @ Northeastern. Software engineer co-op at Chewy. CS + Math @ Northeastern. Building full-stack products and software that makes a meaningful impact.",
        images: [
            {
                url: "/og",
                width: 1200,
                height: 630,
                alt: "Olivia Hill — CS + Math @ Northeastern",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Olivia Hill",
        description:
            "CS + Math @ Northeastern. Software engineer co-op at Chewy. CS + Math @ Northeastern. Building full-stack products and software that makes a meaningful impact.",
        images: ["/og"],
    },
    icons: {
        icon: "/favicon.svg",
    },
    metadataBase: new URL("https://home-directory.vercel.app"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
        <body>
        <MenuBar />
        <MobileNav />
        <TakeWhatYouNeed />
        {children}
        </body>
        </html>
    );
}