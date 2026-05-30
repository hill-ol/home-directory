"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { projects } from "@/content/projects";

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
                borderBottom: "0.5px solid rgba(28,25,23,0.08)",
                cursor: "pointer",
            }}
        >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>

                    {/* Filename + period */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                        <motion.span
                            animate={{ color: hovered ? "#D47BAD" : "#F0A8CF" }}
                            transition={{ duration: 0.2 }}
                            style={{
                                fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                                fontSize: "10px", letterSpacing: "0.04em",
                            }}
                        >{project.filename}</motion.span>
                        <span style={{
                            fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                            fontSize: "10px", color: "#A89E99",
                        }}>{project.period}</span>
                    </div>

                    {/* Title */}
                    <motion.div
                        animate={{ color: hovered ? "#F0A8CF" : "#1C1917" }}
                        transition={{ duration: 0.2 }}
                        style={{
                            fontFamily: "var(--font-playfair)",
                            fontSize: "clamp(18px, 3vw, 22px)",
                            fontWeight: 400, lineHeight: 1.2,
                        }}
                    >{project.title}</motion.div>

                    {/* Tagline */}
                    <div style={{
                        fontFamily: "var(--font-dm-sans)", fontSize: "13px",
                        fontWeight: 300, color: "#6B6560", lineHeight: 1.5,
                    }}>{project.tagline}</div>

                    {/* Stack pills mobile */}
                    <div className="flex md:hidden" style={{ flexWrap: "wrap", gap: "4px", marginTop: "4px" }}>
                        {project.stack.slice(0, 3).map(s => (
                            <span key={s} style={{
                                fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                                fontSize: "10px", color: "#6B6560",
                                backgroundColor: "rgba(28,25,23,0.04)",
                                border: "0.5px solid rgba(28,25,23,0.08)",
                                borderRadius: "20px", padding: "3px 10px",
                                whiteSpace: "nowrap",
                            }}>{s}</span>
                        ))}
                    </div>
                </div>

                {/* Stack pills desktop */}
                <div className="hidden md:flex" style={{ flexWrap: "wrap", gap: "4px", justifyContent: "flex-end", maxWidth: "200px", flexShrink: 0 }}>
                    {project.stack.slice(0, 3).map(s => (
                        <span key={s} style={{
                            fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                            fontSize: "10px", color: "#6B6560",
                            backgroundColor: "rgba(28,25,23,0.04)",
                            border: "0.5px solid rgba(28,25,23,0.08)",
                            borderRadius: "20px", padding: "3px 10px",
                            whiteSpace: "nowrap",
                        }}>{s}</span>
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
            <main style={{ minHeight: "100vh", backgroundColor: "#F2EDE4", paddingTop: "80px", paddingBottom: "96px" }}>
                <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>

                    {/* Header */}
                    <div style={{ marginBottom: "56px" }}>
                        <div style={{
                            fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                            fontSize: "11px", color: "#F0A8CF",
                            letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "12px",
                        }}>work/</div>
                        <h1 style={{
                            fontFamily: "var(--font-playfair)",
                            fontSize: "clamp(32px, 5vw, 52px)",
                            fontWeight: 400, color: "#1C1917",
                            lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 16px 0",
                        }}>Projects</h1>
                        <p style={{
                            fontFamily: "var(--font-dm-sans)", fontSize: "14px",
                            fontWeight: 300, color: "#6B6560",
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