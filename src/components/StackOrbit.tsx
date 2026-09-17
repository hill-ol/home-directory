"use client";

import { useState } from "react";

import HoverLabel from "@/components/HoverLabel";
import IconTile from "@/components/IconTile";
import { stack } from "@/content/stack";
import { color } from "@/lib/theme";

export default function StackOrbit() {
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <>
            {stack.map(({ icon, label, desktop }) => {
                const isHovered = hovered === label;

                return (
                    <div
                        key={label}
                        onPointerEnter={() => setHovered(label)}
                        onPointerLeave={() => setHovered(null)}
                        style={{
                            position: "absolute",
                            top: desktop.top,
                            left: desktop.left,
                            zIndex: 5,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "5px",
                            padding: "10px",
                            margin: "-10px",
                            cursor: "default",
                        }}
                    >
                        {/*
                         * Only the tile scales, not the label. The org tiles
                         * on this same canvas scale the whole group instead.
                         */}
                        <div
                            style={{
                                transform: isHovered
                                    ? "scale(1.1)"
                                    : "scale(1)",
                                transition: "transform 0.25s ease",
                            }}
                        >
                            <IconTile active={isHovered}>
                                <svg
                                    aria-hidden="true"
                                    viewBox="0 0 24 24"
                                    width="22"
                                    height="22"
                                    fill={
                                        isHovered
                                            ? `#${icon.hex}`
                                            : color.inkMuted
                                    }
                                    style={{
                                        transition: "fill 0.25s ease",
                                    }}
                                >
                                    <path d={icon.path} />
                                </svg>
                            </IconTile>
                        </div>

                        <HoverLabel active={isHovered}>
                            {label}
                        </HoverLabel>
                    </div>
                );
            })}
        </>
    );
}
