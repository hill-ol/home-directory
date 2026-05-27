"use client";

import {
    siTypescript,
    siPython,
    siReact,
    siNextdotjs,
    siNodedotjs,
    siPostgresql,
    siSupabase,
    siGit,
} from "simple-icons";
import { useState } from "react";

const icons = [
    { icon: siTypescript, label: "TypeScript", top: "30%", left: "24%" },
    { icon: siPython,     label: "Python",     top: "25%", left: "72%" },
    { icon: siReact,      label: "React",      top: "58%", left: "22%" },
    { icon: siNextdotjs,  label: "Next.js",    top: "60%", left: "76%" },
    { icon: siNodedotjs,  label: "Node.js",    top: "20%", left: "36%" },
    { icon: siPostgresql, label: "SQL",        top: "70%", left: "34%" },
    { icon: siSupabase,   label: "Supabase",   top: "68%", left: "64%" },
    { icon: siGit,        label: "Git",        top: "22%", left: "62%" },
];

export default function StackOrbit() {
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <>
            {icons.map(({ icon, label, top, left }) => {
                const isHovered = hovered === label;

                return (
                    <div
                        key={label}
                        onMouseEnter={() => setHovered(label)}
                        onMouseLeave={() => setHovered(null)}
                        style={{
                            position: "absolute",
                            top,
                            left,
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
                                role="img"
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
                                color: isHovered ? "#1C1917" : "#A89E99",
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