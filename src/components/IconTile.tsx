import type { ReactNode } from "react";
import { hairline, line } from "@/lib/theme";

/*
 * The 44px rounded white square behind every tech and org icon, on both the
 * desktop canvas and the mobile grid.
 *
 * Deliberately chrome only. The four call sites animate it differently on
 * purpose: the desktop tiles scale with a CSS transform, the mobile stack
 * uses Framer so it can also carry tap feedback, and the mobile org grid is
 * static. Unifying that would mean forcing one of them into the wrong
 * mechanism, so the scale stays with each parent.
 */
interface IconTileProps {
    /** Whether the tile is hovered or pressed. */
    active?: boolean;
    /*
     * Brand color for the border tint and glow. Only the mobile stack passes
     * one; without it the border stays the default hairline.
     */
    accent?: string;
    children: ReactNode;
}

export default function IconTile({
    active = false,
    accent,
    children,
}: IconTileProps) {
    const tinted = active && accent !== undefined;

    return (
        <div
            style={{
                position: "relative",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                backgroundColor: "white",
                border: hairline(tinted ? `${accent}40` : line.tile),
                borderRadius: "10px",
                boxShadow: tinted ? `0 2px 12px ${accent}30` : "none",
                transition: "border-color 0.2s ease",
            }}
        >
            {children}
        </div>
    );
}
