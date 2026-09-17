/*
 * Design tokens for everything styled in TypeScript.
 *
 * Values are literal hex rather than var(--color-*) on purpose: satori, which
 * renders src/app/og/route.tsx, does not resolve CSS custom properties, and
 * FolderGlyph feeds that route. A var() here would render as nothing in the
 * OG image.
 *
 * The @theme block in globals.css declares the same brand colors for the CSS
 * side, which is all the focus ring and skip link need. Those seven values
 * live in two places by necessity: change both together.
 */

export const color = {
    cream: "#F2EDE4",
    card: "#FAF7F2",

    ink: "#1C1917",
    inkSecondary: "#6B6560",
    inkMuted: "#A89E99",

    pink: "#F0A8CF",
    pinkDark: "#D47BAD",
    /** Folder hover fills, previously only inside FolderGlyph. */
    pinkLight: "#F5BADB",
    pinkDeep: "#C966A0",

    /** Sits behind photos before they load. */
    imagePlaceholder: "#E8E4DC",
    /** Diagram rules and faint labels on the coursework page. */
    rule: "#D3CEC9",
} as const;

/*
 * Every divider and border on the site is the ink color at low alpha. Named
 * by role, because "0.08" does not tell you whether you want a tile edge or
 * a section separator.
 *
 * Deeper alphas of the same ink are used for drop shadows. Those stay inline:
 * they are per-component depth choices, not a shared scale.
 */
export const line = {
    /** Section separators and footer rules. */
    divider: "rgba(28,25,23,0.06)",
    /** Icon tiles, ruled lines, hairline cell borders. */
    tile: "rgba(28,25,23,0.08)",
    /** Card and document edges. */
    card: "rgba(28,25,23,0.10)",
    /** Link pill borders. */
    pill: "rgba(28,25,23,0.20)",
} as const;

/** The 0.5px hairline used for nearly every border in the design. */
export function hairline(lineColor: string): string {
    return `0.5px solid ${lineColor}`;
}

export const font = {
    /*
     * Filenames, labels, and metadata. Was written 56 times across the
     * codebase in two different spellings before this existed.
     */
    system: "-apple-system, BlinkMacSystemFont, system-ui",
    /** Playfair Display, for headings and italic accents. */
    display: "var(--font-playfair)",
    /** DM Sans, for body copy. */
    body: "var(--font-dm-sans)",
} as const;
