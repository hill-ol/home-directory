"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/content/projects";

export default function ProjectContent({ project }: { project: Project }) {
    return (
        <main
            style={{
                minHeight: "100vh",
                backgroundColor: "#F2EDE4",
                paddingTop: "80px",
                paddingBottom: "80px",
            }}
        >
            <div
                style={{
                    maxWidth: "680px",
                    margin: "0 auto",
                    padding: "0 32px",
                }}
            >
                {/* Back link */}
                <Link
                    href="/"
                    style={{
                        fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                        fontSize: "12px",
                        color: "#A89E99",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        marginBottom: "48px",
                    }}
                >
                    ← back to desktop
                </Link>

                {/* Animated folder header */}
                <motion.div
                    layoutId={`folder-${project.slug}`}
                    style={{
                        borderRadius: "8px",
                        marginBottom: "32px",
                        overflow: "hidden",
                    }}
                    initial={{ scale: 0.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.3, opacity: 0 }}
                    transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                >
                    <div
                        style={{
                            backgroundColor: "#F0A8CF",
                            padding: "28px 32px",
                            borderRadius: "8px",
                        }}
                    >
                        <div
                            style={{
                                fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                                fontSize: "11px",
                                color: "rgba(255,255,255,0.7)",
                                letterSpacing: "0.06em",
                                marginBottom: "8px",
                            }}
                        >
                            {project.filename}
                        </div>
                        <h1
                            style={{
                                fontFamily: "var(--font-playfair)",
                                fontSize: "clamp(32px, 5vw, 48px)",
                                fontWeight: 400,
                                color: "white",
                                lineHeight: 1.1,
                                letterSpacing: "-0.02em",
                                margin: 0,
                            }}
                        >
                            {project.title}
                        </h1>
                    </div>
                </motion.div>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "16px",
                        fontWeight: 300,
                        color: "#6B6560",
                        lineHeight: 1.6,
                        margin: "0 0 40px 0",
                    }}
                >
                    {project.tagline}
                </motion.p>

                {/* Meta row */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ delay: 0.38, duration: 0.4 }}
                    style={{
                        display: "flex",
                        gap: "40px",
                        marginBottom: "40px",
                        paddingBottom: "40px",
                        borderBottom: "0.5px solid rgba(28,25,23,0.10)",
                        flexWrap: "wrap",
                    }}
                >
                    <div>
                        <div style={{
                            fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                            fontSize: "10px", color: "#A89E99",
                            letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "4px",
                        }}>Role</div>
                        <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: "#1C1917" }}>
                            {project.role}
                        </div>
                    </div>
                    <div>
                        <div style={{
                            fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                            fontSize: "10px", color: "#A89E99",
                            letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "4px",
                        }}>Period</div>
                        <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: "#1C1917" }}>
                            {project.period}
                        </div>
                    </div>
                    <div>
                        <div style={{
                            fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                            fontSize: "10px", color: "#A89E99",
                            letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "4px",
                        }}>Stack</div>
                        <div style={{
                            fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                            fontSize: "12px", color: "#6B6560", lineHeight: 1.6,
                        }}>
                            {project.stack.join(" · ")}
                        </div>
                    </div>
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ delay: 0.45, duration: 0.4 }}
                    style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "15px",
                        fontWeight: 300,
                        color: "#1C1917",
                        lineHeight: 1.8,
                        margin: "0 0 40px 0",
                    }}
                >
                    {project.description}
                </motion.p>

                {/* Links */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ delay: 0.52, duration: 0.4 }}
                    style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}
                >
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                                fontSize: "12px",
                                color: "#1C1917",
                                textDecoration: "none",
                                border: "0.5px solid rgba(28,25,23,0.20)",
                                borderRadius: "20px",
                                padding: "6px 16px",
                            }}
                        >
                            GitHub →
                        </a>
                    )}
                    {project.live && (
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                                fontSize: "12px",
                                color: "#1C1917",
                                textDecoration: "none",
                                border: "0.5px solid rgba(28,25,23,0.20)",
                                borderRadius: "20px",
                                padding: "6px 16px",
                            }}
                        >
                            Live →
                        </a>
                    )}
                </motion.div>
            </div>
        </main>
    );
}