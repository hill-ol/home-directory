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
    title: "Olivia Hill",
    description: "CS + Math @ Northeastern. Building full-stack products and software that makes a meaningful impact.",
    icons: {
        icon: "/favicon.svg",
    },
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