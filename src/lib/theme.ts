export const color = {
    cream: "#F2EDE4",
    card: "#FAF7F2",

    ink: "#1C1917",
    inkSecondary: "#6B6560",
    inkMuted: "#A89E99",

    pink: "#F0A8CF",
    pinkDark: "#D47BAD",
    pinkLight: "#F5BADB",
    pinkDeep: "#C966A0",

    imagePlaceholder: "#E8E4DC",
    rule: "#D3CEC9",
} as const;


export const line = {
    divider: "rgba(28,25,23,0.06)",
    tile: "rgba(28,25,23,0.08)",
    card: "rgba(28,25,23,0.10)",
    pill: "rgba(28,25,23,0.20)",
    wash: "rgba(28,25,23,0.04)",
} as const;

export const surface = {
    panel: "rgba(242,237,228,0.92)",
    bar: "rgba(242,237,228,0.95)",
    scrim: "rgba(242,237,228,0.45)",
    scrimClear: "rgba(242,237,228,0)",
} as const;

export const onAccent = {
    muted: "rgba(255,255,255,0.7)",
    scrim: "rgba(255,255,255,0.25)",
    scrimHover: "rgba(255,255,255,0.4)",
} as const;

export function hairline(lineColor: string): string {
    return `0.5px solid ${lineColor}`;
}

export const font = {
    system: "-apple-system, BlinkMacSystemFont, system-ui",
    display: "var(--font-playfair)",
    body: "var(--font-dm-sans)",
} as const;