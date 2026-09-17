import type { CSSProperties } from "react";
import { color, font } from "@/lib/theme";

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
        color: color.inkSecondary,
        fontFamily: font.body,
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
        color: color.ink,
        fontFamily: font.body,
        fontSize: descriptionSize,
        fontWeight: 300,
        lineHeight: 1.8,
    };
}