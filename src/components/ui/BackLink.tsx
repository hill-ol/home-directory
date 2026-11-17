"use client";

import Link from "next/link";
import { accentText } from "@/lib/hover";
import { color, font } from "@/lib/theme";

/**
 * The small return link above a page header: "← back to desktop" on
 * `/research`, "← back to readme" on `/coursework`.
 *
 * The arrow is part of the component rather than the caller's text, because
 * it was typed by hand in both places and only one of them is a real arrow
 * if you are not careful.
 *
 * `ProjectContent` keeps its own, which is a button calling `router.push`
 * rather than a link, so it is not the same element at all.
 */
export default function BackLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "48px",
                color: color.inkSecondary,
                fontFamily: font.system,
                fontSize: "12px",
                textDecoration: "none",
                transition: "color 0.2s",
            }}
            {...accentText}
        >
            ← {children}
        </Link>
    );
}
