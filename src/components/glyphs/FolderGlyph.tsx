import type { ReactNode } from "react";
import { color } from "@/lib/theme";

/*
 * The manila folder that the whole desktop metaphor is built on. Drawn once
 * here and reused at every size: the canvas icons, the mobile grid, the
 * loading and 404 screens, and the OG image.
 *
 * Deliberately free of "use client" and of hooks, because src/app/og/route.tsx
 * runs on the edge runtime and renders through satori. A client directive here
 * would break that route.
 */
const FOLDER_PATH =
    "M6,78 Q2,78 2,74 L2,8 Q2,2 8,2 L34,2 Q40,2 42,6 L44,12 Q46,16 50,16 L90,16 Q94,16 94,20 L94,74 Q94,78 90,78 Z";

const TAB_FILL = color.pinkDark;
const TAB_FILL_HOVER = color.pinkDeep;
const BODY_FILL = color.pink;
const BODY_FILL_HOVER = color.pinkLight;

interface FolderGlyphProps {
    width: number;
    height: number;
    /*
     * Omit for a static folder. Passing a boolean opts into the hover fills
     * and the transition between them, which is why the transition is not
     * applied unconditionally: satori has no use for a CSS transition.
     */
    hovered?: boolean;
    opacity?: number;
    /** Satori does not infer the default, so the OG image passes it through. */
    preserveAspectRatio?: string;
    /** Extra marks drawn inside the folder, such as the 404 question mark. */
    children?: ReactNode;
}

export default function FolderGlyph({
    width,
    height,
    hovered,
    opacity,
    preserveAspectRatio,
    children,
}: FolderGlyphProps) {
    const fillTransition =
        hovered === undefined
            ? undefined
            : { transition: "fill 0.2s ease" };

    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 96 78"
            fill="none"
            preserveAspectRatio={preserveAspectRatio}
        >
            <path
                d={FOLDER_PATH}
                fill={hovered ? TAB_FILL_HOVER : TAB_FILL}
                opacity={opacity}
                style={fillTransition}
            />

            <rect
                x="2"
                y="18"
                width="92"
                height="58"
                rx="6"
                fill={hovered ? BODY_FILL_HOVER : BODY_FILL}
                opacity={opacity}
                style={fillTransition}
            />

            {children}
        </svg>
    );
}
