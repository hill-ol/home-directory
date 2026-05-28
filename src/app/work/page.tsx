"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { projects } from "@/content/projects";

export default function WorkPage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
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
                        maxWidth: "900px",
                        margin: "0 auto",
                        padding: "0 40px",
                    }}
                >
                    {/* Header */}
                    <div style={{ marginBottom: "56px" }}>
                        <div
                            style={{
                                fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                                fontSize: "11px",
                                color: "#F0A8CF",
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                                marginBottom: "12px",
                            }}
                        >
                            work/
                        </div>
                        <h1
                            style={{
                                fontFamily: "var(--font-playfair)",
                                fontSize: "clamp(36px, 5vw, 52px)",
                                fontWeight: 400,
                                color: "#1C1917",
                                lineHeight: 1.1,
                                letterSpacing: "-0.02em",
                                margin: "0 0 16px 0",
                            }}
                        >
                            Projects
                        </h1>
                        <p
                            style={{
                                fontFamily: "var(--font-dm-sans)",
                                fontSize: "14px",
                                fontWeight: 300,
                                color: "#6B6560",
                                margin: 0,
                                lineHeight: 1.7,
                                maxWidth: "480px",
                            }}
                        >
                            A selection of things I&apros;ve built. Full-stack products,
                            research tools, and everything in between.
                        </p>
                    </div>

                    {/* Project list */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        {projects.map((project, i) => (
                            <motion.div
                                key={project.slug}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.07, duration: 0.4 }}
                            >
                                <Link
                                    href={`/projects/${project.slug}`}
                                    style={{ textDecoration: "none" }}
                                >
                                    <div
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns: "1fr auto",
                                            alignItems: "center",
                                            gap: "24px",
                                            padding: "24px 0",
                                            borderBottom: "0.5px solid rgba(28,25,23,0.08)",
                                            cursor: "pointer",
                                        }}
                                        onMouseEnter={(e) => {
                                            (e.currentTarget as HTMLElement).style.paddingLeft = "8px";
                                            (e.currentTarget as HTMLElement).style.transition = "padding 0.2s ease";
                                        }}
                                        onMouseLeave={(e) => {
                                            (e.currentTarget as HTMLElement).style.paddingLeft = "0px";
                                        }}
                                    >
                                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                            {/* Filename + period row */}
                                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <span
                            style={{
                                fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                                fontSize: "10px",
                                color: "#F0A8CF",
                                letterSpacing: "0.04em",
                            }}
                        >
                          {project.filename}
                        </span>
                                                <span
                                                    style={{
                                                        fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                                                        fontSize: "10px",
                                                        color: "#A89E99",
                                                    }}
                                                >
                          {project.period}
                        </span>
                                            </div>

                                            {/* Title */}
                                            <div
                                                style={{
                                                    fontFamily: "var(--font-playfair)",
                                                    fontSize: "22px",
                                                    fontWeight: 400,
                                                    color: "#1C1917",
                                                    lineHeight: 1.2,
                                                }}
                                            >
                                                {project.title}
                                            </div>

                                            {/* Tagline */}
                                            <div
                                                style={{
                                                    fontFamily: "var(--font-dm-sans)",
                                                    fontSize: "13px",
                                                    fontWeight: 300,
                                                    color: "#6B6560",
                                                    lineHeight: 1.5,
                                                }}
                                            >
                                                {project.tagline}
                                            </div>
                                        </div>

                                        {/* Stack pills */}
                                        <div
                                            style={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                gap: "4px",
                                                justifyContent: "flex-end",
                                                maxWidth: "200px",
                                            }}
                                        >
                                            {project.stack.slice(0, 3).map((s) => (
                                                <span
                                                    key={s}
                                                    style={{
                                                        fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                                                        fontSize: "10px",
                                                        color: "#6B6560",
                                                        backgroundColor: "rgba(28,25,23,0.04)",
                                                        border: "0.5px solid rgba(28,25,23,0.08)",
                                                        borderRadius: "20px",
                                                        padding: "3px 10px",
                                                        whiteSpace: "nowrap",
                                                    }}
                                                >
                          {s}
                        </span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
        </motion.div>
    );
}