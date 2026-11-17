import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import MenuBar, { MobileNav } from "@/components/MenuBar";
import TakeWhatYouNeed from "@/components/TakeWhatYouNeed";
import MotionProvider from "@/components/MotionProvider";
import { siteUrl } from "@/lib/site";
import { getSiteContent } from "@/lib/site-content";
import { ContentProvider } from "@/components/ContentProvider";
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

/*
 * generateMetadata rather than a static object, because the title,
 * description and OG alt all read bio atoms that now live in the database.
 * getSiteContent is request-cached, so this does not cost a second query.
 */
export async function generateMetadata(): Promise<Metadata> {
    const { bio, introWithClass, metaDescription } = await getSiteContent();

    return {
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
}

/*
 * Fetched once per render and handed to every client component through
 * ContentProvider. The alternative, each component importing src/content
 * directly, cannot work now that the content lives in Postgres: a client
 * component cannot await a query.
 */
export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const content = await getSiteContent();

    return (
        <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
        <body>
            <a className="skip-link" href="#main-content">
                Skip to main content
            </a>

            <ContentProvider value={content}>
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
            </ContentProvider>
        </body>
        </html>
    );
}
