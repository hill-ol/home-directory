
import { color, line } from "@/lib/theme";
/*
 * The resume document icon: a page with a folded corner, two ruled lines, and
 * a PDF wordmark. Previously drawn three separate ways, which had already
 * drifted apart on stroke opacity, rule width, and baseline. These are the
 * desktop canvas values, now used everywhere.
 */
const EDGE_STROKE = line.card;
const RULE_FILL = line.tile;

interface PdfGlyphProps {
    /** ResumeIcon swaps this to the accent pink on hover. */
    labelColor?: string;
}

export default function PdfGlyph({
    labelColor = color.pinkDark,
}: PdfGlyphProps) {
    return (
        <svg
            width="44"
            height="52"
            viewBox="0 0 44 52"
            fill="none"
            style={{ display: "block" }}
        >
            <rect
                x="2"
                y="2"
                width="40"
                height="48"
                rx="4"
                fill="white"
                stroke={EDGE_STROKE}
                strokeWidth="0.5"
            />

            {/* Folded corner */}
            <path
                d="M30,2 L42,14 L30,14 Z"
                fill={color.cream}
                stroke={EDGE_STROKE}
                strokeWidth="0.5"
            />

            <rect
                x="8"
                y="20"
                width="20"
                height="1.5"
                rx="1"
                fill={RULE_FILL}
            />
            <rect
                x="8"
                y="24"
                width="16"
                height="1.5"
                rx="1"
                fill={RULE_FILL}
            />

            <text
                x="22"
                y="34"
                textAnchor="middle"
                fontSize="9"
                fontWeight="600"
                fontFamily="Arial, sans-serif"
                fill={labelColor}
            >
                PDF
            </text>
        </svg>
    );
}
