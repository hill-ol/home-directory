"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import FolderGlyph from "@/components/glyphs/FolderGlyph";
import { color, font } from "@/lib/theme";

export type FolderVariant = "desktop" | "mobile";

/*
 * The desktop canvas places folders by hand and draws them large; the mobile
 * grid lays them out in flow at a smaller size and adds tap feedback, since
 * there is no hover on touch.
 */
const variants: Record<
    FolderVariant,
    {
        width: number;
        height: number;
        labelSize: string;
        letterSpacing?: string;
        tapScale?: number;
        zIndex?: number;
    }
> = {
    desktop: {
        width: 96,
        height: 78,
        labelSize: "11px",
        letterSpacing: "0.01em",
        zIndex: 6,
    },
    mobile: {
        width: 64,
        height: 52,
        labelSize: "10px",
        tapScale: 0.95,
    },
};

interface FolderIconProps {
    label: string;
    slug: string;
    onClick: (slug: string, rect: DOMRect) => void;
    variant: FolderVariant;
    /*
     * Absolute placement on the desktop canvas. The mobile grid omits this
     * and lets the folder sit in normal flow.
     */
    position?: { top: string; left: string };
}

export default function FolderIcon({
    label,
    slug,
    onClick,
    variant,
    position,
}: FolderIconProps) {
    const [hovered, setHovered] = useState(false);

    const { width, height, labelSize, letterSpacing, tapScale, zIndex } =
        variants[variant];

    return (
        <button
            onClick={(event) => {
                const rect =
                    event.currentTarget.getBoundingClientRect();

                onClick(slug, rect);
            }}
            /*
             * Pointer events rather than mouse events so a stylus or touch
             * drag reports the same hover state as a mouse.
             */
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            style={{
                position: position ? "absolute" : undefined,
                top: position?.top,
                left: position?.left,
                zIndex,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
                padding: 0,
                cursor: "pointer",
                background: "none",
                border: "none",
            }}
        >
            <motion.div
                animate={{ scale: hovered ? 1.06 : 1 }}
                whileTap={tapScale ? { scale: tapScale } : undefined}
                transition={{ duration: 0.2, ease: "easeOut" }}
            >
                <FolderGlyph
                    width={width}
                    height={height}
                    hovered={hovered}
                />
            </motion.div>

            <span
                style={{
                    color: hovered ? color.ink : color.inkSecondary,
                    fontFamily:
                        font.system,
                    fontSize: labelSize,
                    letterSpacing,
                    whiteSpace: "nowrap",
                    transition: "color 0.2s ease",
                }}
            >
                {label}
            </span>
        </button>
    );
}
