import type { CSSProperties, ReactNode } from "react";
import { color, font } from "@/lib/theme";

interface SectionLabelProps {
    /** `accent` is the route eyebrow, `muted` is an in-page section heading. */
    tone?: "muted" | "accent";
    size?: string;
    /** Research uses monospace for these, matching its number and status pill. */
    mono?: boolean;
    style?: CSSProperties;
    children: ReactNode;
}

/**
 * The small uppercase label above a section or route heading.
 *
 * Thirteen of these were written by hand across seven files, all carrying the
 * same tracking and transform and differing only in size, colour, and margin.
 */
export default function SectionLabel({
    tone = "muted",
    size = "10px",
    mono = false,
    style,
    children,
}: SectionLabelProps) {
    return (
        <div
            style={{
                color: tone === "accent" ? color.pinkText : color.inkSecondary,
                fontFamily: mono ? "monospace" : font.system,
                fontSize: size,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                ...style,
            }}
        >
            {children}
        </div>
    );
}
