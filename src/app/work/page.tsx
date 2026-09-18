"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Pill from "@/components/Pill";
import { projects } from "@/content/projects";
import { color, font, hairline, line } from "@/lib/theme";

function WorkRow({ project }: { project: (typeof projects)[0] }) {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            animate={{ paddingLeft: hovered ? "10px" : "0px" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
                padding: "24px 0",
                borderBottom: hairline(line.tile),
                cursor: "pointer",
            }}
        >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>

                    {/* Filename + period */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                        <motion.span
                            animate={{ color: hovered ? color.ink : color.pinkText }}
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
                        animate={{ color: hovered ? color.pink : color.ink }}
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

export default function WorkPage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <main style={{ minHeight: "100vh", backgroundColor: color.cream, paddingTop: "80px", paddingBottom: "96px" }}>
                <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>

                    {/* Header */}
                    <div style={{ marginBottom: "56px" }}>
                        <div style={{
                            fontFamily: font.system,
                            fontSize: "11px", color: color.pinkText,
                            letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "12px",
                        }}>work/</div>
                        <h1 style={{
                            fontFamily: font.display,
                            fontSize: "clamp(32px, 5vw, 52px)",
                            fontWeight: 400, color: color.ink,
                            lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 16px 0",
                        }}>Projects</h1>
                        <p style={{
                            fontFamily: font.body, fontSize: "14px",
                            fontWeight: 300, color: color.inkSecondary,
                            margin: 0, lineHeight: 1.7, maxWidth: "480px",
                        }}>
                            A selection of things I&apos;ve built: full-stack products,
                            research tools, and everything in between.
                        </p>
                    </div>

                    {/* Project list */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        {projects.map((project, i) => (
                            <motion.div
                                key={project.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ delay: i * 0.05, duration: 0.45, ease: "easeOut" }}
                            >
                                <Link href={`/projects/${project.slug}`} style={{ textDecoration: "none" }}>
                                    <WorkRow project={project} />
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </main>
        </motion.div>
    );
}
