"use client";

import { useState } from "react";

import { stack } from "@/content/stack";

export default function StackOrbit() {
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <>
            {stack.map(({ icon, label, desktop }) => {
                const isHovered = hovered === label;

                return (
                    <div
                        key={label}
                        onMouseEnter={() => setHovered(label)}
                        onMouseLeave={() => setHovered(null)}
                        style={{
                            position: "absolute",
                            top: desktop.top,
                            left: desktop.left,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "5px",
                            cursor: "default",
                            padding: "10px",
                            margin: "-10px",
                            zIndex: 5,
                        }}
                    >
                        <div
                            style={{
                                width: "44px",
                                height: "44px",
                                borderRadius: "10px",
                                backgroundColor: "white",
                                border: "0.5px solid rgba(28, 25, 23, 0.08)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transform: isHovered ? "scale(1.1)" : "scale(1)",
                                transition: "transform 0.25s ease",
                            }}
                        >
                            <svg
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                width="22"
                                height="22"
                                fill={isHovered ? `#${icon.hex}` : "#A89E99"}
                                style={{ transition: "fill 0.25s ease" }}
                            >
                                <path d={icon.path} />
                            </svg>
                        </div>

                        <span
                            style={{
                                fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                                fontSize: "10px",
                                color: isHovered ? "#1C1917" : "#6B6560",
                                transition: "color 0.25s ease",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {label}
                        </span>
                    </div>
                );
            })}
        </>
    );
}
