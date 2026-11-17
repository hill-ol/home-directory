"use client";

import type { ComponentPropsWithoutRef } from "react";
import { color, font, hairline, line } from "@/lib/theme";

type Variant = "primary" | "quiet";
type Size = "sm" | "md";

/*
 * The two button shapes this site actually uses. `primary` is the ink-filled
 * submit; `quiet` is the outlined companion beside it (Cancel, Revert).
 *
 * Before this existed the pair was hand-rolled in four files and had already
 * drifted on font size and padding, which is the same failure CLAUDE.md
 * warns about for ProjectOverlay and ProjectContent.
 */
const SIZES: Record<Size, { fontSize: string; padding: string }> = {
    sm: { fontSize: "10px", padding: "9px 14px" },
    md: { fontSize: "11px", padding: "11px 16px" },
};

export default function Button({
    variant = "primary",
    size = "sm",
    disabled,
    style,
    ...rest
}: ComponentPropsWithoutRef<"button"> & {
    variant?: Variant;
    size?: Size;
}) {
    const { fontSize, padding } = SIZES[size];

    const palette =
        variant === "primary"
            ? {
                color: color.cream,
                backgroundColor: color.ink,
                border: "none",
            }
            : {
                color: color.inkSecondary,
                backgroundColor: "transparent",
                border: hairline(line.pill),
            };

    return (
        <button
            disabled={disabled}
            style={{
                fontFamily: font.system,
                fontSize,
                letterSpacing: "0.04em",
                borderRadius: "2px",
                padding,
                /*
                 * A disabled button keeps the default cursor rather than the
                 * pointer, so the state reads before the click rather than
                 * after it.
                 */
                cursor: disabled ? "default" : "pointer",
                opacity: disabled ? 0.4 : 1,
                ...palette,
                ...style,
            }}
            {...rest}
        />
    );
}
