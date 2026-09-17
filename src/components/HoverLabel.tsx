import type { CSSProperties, ReactNode } from "react";
import { color, font } from "@/lib/theme";

interface HoverLabelProps {
    active?: boolean;
    size?: string;
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
