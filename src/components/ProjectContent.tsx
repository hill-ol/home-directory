"use client";

import Link from "next/link";
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

                {/* Folder filename */}
                <div
                    style={{
                        fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                        fontSize: "11px",
                        color: "#F0A8CF",
                        letterSpacing: "0.04em",
                        marginBottom: "12px",
                    }}
                >
                    {project.filename}
                </div>

                {/* Title */}
                <h1
                    style={{
                        fontFamily: "var(--font-playfair)",
                        fontSize: "clamp(36px, 6vw, 56px)",
                        fontWeight: 400,
                        color: "#1C1917",
                        lineHeight: 1.1,
                        letterSpacing: "-0.02em",
                        margin: "0 0 16px 0",
                    }}
                >
                    {project.title}
                </h1>

                {/* Tagline */}
                <p
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
                </p>

                {/* Meta row */}
                <div
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
                        <div
                            style={{
                                fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                                fontSize: "10px",
                                color: "#A89E99",
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                                marginBottom: "4px",
                            }}
                        >
                            Role
                        </div>
                        <div
                            style={{
                                fontFamily: "var(--font-dm-sans)",
                                fontSize: "13px",
                                color: "#1C1917",
                            }}
                        >
                            {project.role}
                        </div>
                    </div>
                    <div>
                        <div
                            style={{
                                fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                                fontSize: "10px",
                                color: "#A89E99",
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                                marginBottom: "4px",
                            }}
                        >
                            Period
                        </div>
                        <div
                            style={{
                                fontFamily: "var(--font-dm-sans)",
                                fontSize: "13px",
                                color: "#1C1917",
                            }}
                        >
                            {project.period}
                        </div>
                    </div>
                    <div>
                        <div
                            style={{
                                fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                                fontSize: "10px",
                                color: "#A89E99",
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                                marginBottom: "4px",
                            }}
                        >
                            Stack
                        </div>
                        <div
                            style={{
                                fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                                fontSize: "12px",
                                color: "#6B6560",
                                lineHeight: 1.6,
                            }}
                        >
                            {project.stack.join(" · ")}
                        </div>
                    </div>
                </div>

                {/* Description */}
                <p
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
                </p>

                {/* Links */}
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
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
                </div>
            </div>
        </main>
    );
}