import type { SimpleIcon } from "simple-icons";

import { color } from "@/lib/theme";

interface StackGlyphProps {
    icon: SimpleIcon;
    /** Takes the technology's own brand colour while hovered or tapped. */
    active?: boolean;
}

/**
 * A single technology mark, drawn the same on the desktop orbit and in the
 * mobile grid. Only the surrounding animation differs between the two, which
 * is why that stays with each parent.
 */
export default function StackGlyph({
    icon,
    active = false,
}: StackGlyphProps) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill={active ? `#${icon.hex}` : color.inkMuted}
            style={{ transition: "fill 0.2s ease" }}
        >
            <path d={icon.path} />
        </svg>
    );
}
