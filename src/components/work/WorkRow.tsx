"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Pill from "@/components/Pill";
import type { Project } from "@/content/projects";
import { color, font, hairline, line } from "@/lib/theme";

/**
 * One project row, shared by the public `/work` list and the editor at
 * `/studio/work`, switched by `variant`.
 *
 * The read variant is a link target, so it leans into hover: the row shifts
 * right, the filename darkens, the title takes the accent. The edit variant
 * is not navigable, so all of that is off, and anything editable arrives as
 * `children` beneath the tagline. That is the same shape `ProjectHeader`
 * uses for its close button.
 */
export default function WorkRow({
    project,
    variant = "read",
    children,
}: {
    project: Project;
    variant?: "read" | "edit";
    children?: React.ReactNode;
}) {
    const [hovered, setHovered] = useState(false);
    const isEdit = variant === "edit";
    const active = hovered && !isEdit;

    return (
        <motion.div
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            animate={{ paddingLeft: active ? "10px" : "0px" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
                padding: "24px 0",
                borderBottom: hairline(line.tile),
                cursor: isEdit ? "default" : "pointer",
            }}
        >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>

                    {/* Filename + period */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                        <motion.span
                            animate={{ color: active ? color.ink : color.pinkText }}
                            transition={{ duration: 0.2 }}
                            style={{
                                fontFamily: font.system,
                                fontSize: "10px", letterSpacing: "0.04em",
                            }}
                        >{project.filename}</motion.span>
                        <span style={{
                            fontFamily: font.system,
                            fontSize: "10px", color: color.inkSecondary,
                        }}>{project.period}</span>
                    </div>

                    {/* Title */}
                    <motion.div
                        animate={{ color: active ? color.pink : color.ink }}
                        transition={{ duration: 0.2 }}
                        style={{
                            fontFamily: font.display,
                            fontSize: "clamp(18px, 3vw, 22px)",
                            fontWeight: 400, lineHeight: 1.2,
                        }}
                    >{project.title}</motion.div>

                    {/* Tagline */}
                    <div style={{
                        fontFamily: font.body, fontSize: "13px",
                        fontWeight: 300, color: color.inkSecondary, lineHeight: 1.5,
                    }}>{project.tagline}</div>

                    {children}

                    {/* Stack pills mobile */}
                    <div className="flex md:hidden" style={{ flexWrap: "wrap", gap: "4px", marginTop: "4px" }}>
                        {project.stack.slice(0, 3).map(s => (
                            <Pill key={s}>{s}</Pill>
                        ))}
                    </div>
                </div>

                {/* Stack pills desktop */}
                <div className="hidden md:flex" style={{ flexWrap: "wrap", gap: "4px", justifyContent: "flex-end", maxWidth: "200px", flexShrink: 0 }}>
                    {project.stack.slice(0, 3).map(s => (
                        <Pill key={s}>{s}</Pill>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
