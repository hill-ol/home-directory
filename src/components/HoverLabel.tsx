import type { CSSProperties, ReactNode } from "react";
import { color, font } from "@/lib/theme";

/*
 * The small caption under a folder, tile, or icon. Darkens from secondary to
 * primary ink when its parent is hovered.
 */
interface HoverLabelProps {
    active?: boolean;
    /** 10px on the desktop canvas, 9px in the denser mobile grids. */
    size?: string;
    /** Org names are the only captions allowed to wrap onto two lines. */
    wrap?: boolean;
    style?: CSSProperties;
    children: ReactNode;
}

export default function HoverLabel({
    active = false,
    size = "10px",
    wrap = false,
    style,
    children,
}: HoverLabelProps) {
    return (
        <span
            style={{
                color: active ? color.ink : color.inkSecondary,
                fontFamily:
                    font.system,
                fontSize: size,
                lineHeight: wrap ? 1.3 : undefined,
                textAlign: wrap ? "center" : undefined,
                whiteSpace: wrap ? undefined : "nowrap",
                transition: "color 0.2s ease",
                ...style,
            }}
        >
            {children}
        </span>
    );
}
