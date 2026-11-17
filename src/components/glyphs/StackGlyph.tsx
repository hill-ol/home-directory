import { color } from "@/lib/theme";

interface StackGlyphProps {
    /** The simple-icons path, resolved on the server. */
    path: string;
    /** The brand colour, without the leading hash. */
    hex: string;
    /** Takes the technology's own brand colour while hovered or tapped. */
    active?: boolean;
}

/**
 * A single technology mark, drawn the same on the desktop orbit and in the
 * mobile grid. Only the surrounding animation differs between the two, which
 * is why that stays with each parent.
 *
 * Takes the path and colour rather than a SimpleIcon, because the icon set is
 * resolved on the server now: a client component cannot index into the
 * simple-icons namespace without bundling the whole of it.
 */
export default function StackGlyph({
    path,
    hex,
    active = false,
}: StackGlyphProps) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill={active ? `#${hex}` : color.inkMuted}
            style={{ transition: "fill 0.2s ease" }}
        >
            <path d={path} />
        </svg>
    );
}
