import type { CSSProperties } from "react";

export type ProjectVariant = "overlay" | "page";

type VariantTokens = {
    /** Padding on the pink header block. */
    headerPadding: string;
    headerRadius?: string;
    titleSize: string;
    taglineSize: string;
    descriptionSize: string;
    /** Vertical gap below the tagline, the metadata row, and the description. */
    rhythm: string;
};

export const projectVariants: Record<ProjectVariant, VariantTokens> = {
    overlay: {
        headerPadding: "28px 32px 24px",
        titleSize: "clamp(24px, 4vw, 40px)",
        taglineSize: "15px",
        descriptionSize: "14px",
        rhythm: "28px",
    },
    page: {
        headerPadding: "28px 24px",
        headerRadius: "8px",
        titleSize: "clamp(28px, 5vw, 48px)",
        taglineSize: "clamp(14px, 2vw, 16px)",
        descriptionSize: "15px",
        rhythm: "40px",
    },
};

export function projectTaglineStyle(
    variant: ProjectVariant,
): CSSProperties {
    const { taglineSize, rhythm } = projectVariants[variant];

    return {
        margin: `0 0 ${rhythm}`,
        color: "#6B6560",
        fontFamily: "var(--font-dm-sans)",
        fontSize: taglineSize,
        fontStyle: "italic",
        fontWeight: 300,
        lineHeight: 1.6,
    };
}

export function projectDescriptionStyle(
    variant: ProjectVariant,
): CSSProperties {
    const { descriptionSize, rhythm } = projectVariants[variant];

    return {
        margin: `0 0 ${rhythm}`,
        color: "#1C1917",
        fontFamily: "var(--font-dm-sans)",
        fontSize: descriptionSize,
        fontWeight: 300,
        lineHeight: 1.8,
    };
}