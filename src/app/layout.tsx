import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import MenuBar, { MobileNav } from "@/components/MenuBar";
import TakeWhatYouNeed from "@/components/TakeWhatYouNeed";
import MotionProvider from "@/components/MotionProvider";
import {
    bio,
    introWithClass,
    metaDescription,
} from "@/content/bio";
import { siteUrl } from "@/lib/site";
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
        default: bio.name,
        template: `%s · ${bio.name}`,
    },
    description: metaDescription,
    keywords: [
        bio.name,
        "software engineer",
        bio.school,
        "CS Math",
        "full-stack",
        "Next.js",
        "TypeScript",
        "quantum computing",
        "co-op",
    ],
    authors: [{ name: bio.name, url: siteUrl }],
    creator: bio.name,
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteUrl,
        siteName: bio.name,
        title: bio.name,
        description: introWithClass,
        images: [
            {
                url: "/og",
                width: 1200,
                height: 630,
                alt: `${bio.name}: ${bio.study}`,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: bio.name,
        description: introWithClass,
        images: ["/og"],
    },
    icons: {
        icon: "/favicon.svg",
    },
    metadataBase: new URL(siteUrl),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
        <body>
            <a className="skip-link" href="#main-content">
                Skip to main content
            </a>

            <MotionProvider>
                <MenuBar />
                <MobileNav />
                <aside aria-label="Quick contact links">
                    <TakeWhatYouNeed />
                </aside>

                <div id="main-content" tabIndex={-1}>
                    {children}
                </div>
            </MotionProvider>
        </body>
        </html>
    );
}
