import SectionLabel from "@/components/SectionLabel";
import { color, font } from "@/lib/theme";

/**
 * The eyebrow, display heading and lead paragraph that open a column page.
 *
 * The heading was hand-rolled on four pages with the same
 * `clamp(32px, 5vw, 52px)` and the same letter spacing, which is exactly the
 * kind of repetition that drifts one page at a time.
 */
export default function PageHeader({
    eyebrow,
    title,
    children,
}: {
    /** The lowercase path label, such as `work/`. */
    eyebrow?: string;
    title: string;
    /** The lead paragraph under the heading. */
    children?: React.ReactNode;
}) {
    return (
        <div style={{ marginBottom: "56px" }}>
            {eyebrow && (
                <SectionLabel tone="accent" size="11px" style={{ marginBottom: "12px" }}>
                    {eyebrow}
                </SectionLabel>
            )}

            <h1 style={{
                fontFamily: font.display,
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 400,
                color: color.ink,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                margin: children ? "0 0 16px 0" : 0,
            }}>{title}</h1>

            {children && (
                <p style={{
                    fontFamily: font.body,
                    fontSize: "14px",
                    fontWeight: 300,
                    color: color.inkSecondary,
                    margin: 0,
                    lineHeight: 1.7,
                    maxWidth: "480px",
                }}>{children}</p>
            )}
        </div>
    );
}
