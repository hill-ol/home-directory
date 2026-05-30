"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import type { Project } from "@/content/projects";

interface Props {
    project: Project | null;
    folderRect: DOMRect | null;
    onClose: () => void;
}

export default function ProjectOverlay({ project, folderRect, onClose }: Props) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    useEffect(() => {
        document.body.style.overflow = project ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [project]);

    // Compute the offset from the overlay's natural center to the folder's center.
    // The overlay sits at: top=5vh, horizontally centered.
    // We don't know overlay height ahead of time so we use a rough midpoint estimate.
    // The x/y translation shifts the overlay so its center starts at the folder center.
    const getDelta = () => {
        if (!folderRect || typeof window === "undefined") return { dx: 0, dy: 0 };
        const overlayCenterX = window.innerWidth / 2;
        const overlayCenterY = window.innerHeight * 0.05 + 240; // 5vh top + ~240px half-height estimate
        const folderCenterX = folderRect.left + folderRect.width / 2;
        const folderCenterY = folderRect.top + folderRect.height / 2;
        return {
            dx: folderCenterX - overlayCenterX,
            dy: folderCenterY - overlayCenterY,
        };
    };

    const { dx, dy } = getDelta();

    return (
        <AnimatePresence>
            {project && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={onClose}
                        style={{
                            position: "fixed", inset: 0,
                            backgroundColor: "rgba(28,25,23,0.45)",
                            backdropFilter: "blur(4px)",
                            WebkitBackdropFilter: "blur(4px)",
                            zIndex: 100,
                        }}
                    />

                    {/* Centering wrapper — CSS only, no transforms */}
                    <div style={{
                        position: "fixed",
                        top: "5vh",
                        left: "50%",
                        width: "min(680px, 92vw)",
                        zIndex: 101,
                        transform: "translateX(-50%)",
                    }}>
                        {/* Animated panel — x/y shift it to start at folder position */}
                        <motion.div
                            key="panel"
                            initial={{ opacity: 0, scale: 0.2, x: dx, y: dy }}
                            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                            exit={{ opacity: 0, scale: 0.2, x: dx, y: dy }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 28,
                                mass: 0.6,
                            }}
                            style={{
                                width: "100%",
                                maxHeight: "90vh",
                                backgroundColor: "#FAF7F2",
                                borderRadius: "12px",
                                overflow: "hidden",
                                boxShadow: "0 24px 80px rgba(28,25,23,0.22), 0 4px 16px rgba(28,25,23,0.08)",
                            }}
                        >
                            {/* Pink header */}
                            <div style={{ backgroundColor: "#F0A8CF", padding: "28px 32px 24px", position: "relative" }}>
                                <button
                                    onClick={onClose}
                                    style={{
                                        position: "absolute", top: "14px", right: "14px",
                                        width: "28px", height: "28px", borderRadius: "50%",
                                        backgroundColor: "rgba(255,255,255,0.25)",
                                        border: "none", cursor: "pointer",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        transition: "background-color 0.2s ease",
                                    }}
                                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.4)")}
                                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.25)")}
                                    aria-label="Close"
                                >
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                        <line x1="1" y1="1" x2="9" y2="9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                                        <line x1="9" y1="1" x2="1" y2="9" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                                    </svg>
                                </button>

                                <div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,system-ui", fontSize: "11px", color: "rgba(255,255,255,0.7)", letterSpacing: "0.06em", marginBottom: "8px" }}>
                                    {project.filename}
                                </div>
                                <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 400, color: "white", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>
                                    {project.title}
                                </h1>
                            </div>

                            {/* Scrollable content */}
                            <div style={{ overflowY: "auto", maxHeight: "calc(90vh - 140px)", padding: "32px" }}>
                                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "15px", fontWeight: 300, color: "#6B6560", lineHeight: 1.6, margin: "0 0 28px 0", fontStyle: "italic" }}>
                                    {project.tagline}
                                </p>

                                <div style={{ display: "flex", gap: "32px", flexWrap: "wrap", marginBottom: "28px", paddingBottom: "28px", borderBottom: "0.5px solid rgba(28,25,23,0.10)" }}>
                                    {[{ label: "Role", value: project.role }, { label: "Period", value: project.period }].map(({ label, value }) => (
                                        <div key={label}>
                                            <div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,system-ui", fontSize: "10px", color: "#A89E99", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "4px" }}>{label}</div>
                                            <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: "#1C1917" }}>{value}</div>
                                        </div>
                                    ))}
                                    <div>
                                        <div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,system-ui", fontSize: "10px", color: "#A89E99", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "4px" }}>Stack</div>
                                        <div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,system-ui", fontSize: "12px", color: "#6B6560", lineHeight: 1.7 }}>{project.stack.join(" · ")}</div>
                                    </div>
                                </div>

                                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", fontWeight: 300, color: "#1C1917", lineHeight: 1.8, margin: "0 0 28px 0" }}>
                                    {project.description}
                                </p>

                                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                                           style={{ fontFamily: "-apple-system,BlinkMacSystemFont,system-ui", fontSize: "12px", color: "#1C1917", textDecoration: "none", border: "0.5px solid rgba(28,25,23,0.20)", borderRadius: "20px", padding: "6px 16px", transition: "border-color 0.2s, color 0.2s" }}
                                           onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#F0A8CF"; (e.currentTarget as HTMLElement).style.color = "#F0A8CF"; }}
                                           onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(28,25,23,0.20)"; (e.currentTarget as HTMLElement).style.color = "#1C1917"; }}
                                        >GitHub →</a>
                                    )}
                                    {project.live && (
                                        <a href={project.live} target="_blank" rel="noopener noreferrer"
                                           style={{ fontFamily: "-apple-system,BlinkMacSystemFont,system-ui", fontSize: "12px", color: "#1C1917", textDecoration: "none", border: "0.5px solid rgba(28,25,23,0.20)", borderRadius: "20px", padding: "6px 16px", transition: "border-color 0.2s, color 0.2s" }}
                                           onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#F0A8CF"; (e.currentTarget as HTMLElement).style.color = "#F0A8CF"; }}
                                           onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(28,25,23,0.20)"; (e.currentTarget as HTMLElement).style.color = "#1C1917"; }}
                                        >Live →</a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}