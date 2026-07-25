"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";

import type { Project } from "@/content/projects";
import { useDialogA11y } from "@/hooks/useDialogA11y";

interface ProjectOverlayProps {
    project: Project | null;
    folderRect: DOMRect | null;
    onClose: () => void;
}

export default function ProjectOverlay({
    project,
    folderRect,
    onClose,
}: ProjectOverlayProps) {
    const dialogRef = useRef<HTMLDivElement>(null);

    useDialogA11y({
        open: project !== null,
        onClose,
        dialogRef,
    });

    /*
     * Calculate the distance between the clicked folder and the dialog.
     * Framer Motion uses this offset to make the dialog appear to expand
     * outward from the folder that opened it.
     */
    const getAnimationOffset = () => {
        if (!folderRect || typeof window === "undefined") {
            return { x: 0, y: 0 };
        }

        const overlayCenterX = window.innerWidth / 2;

        // The dialog begins 5vh from the top. Its exact height is unknown
        // before rendering, so 240px provides a reasonable center estimate.
        const overlayCenterY = window.innerHeight * 0.05 + 240;

        const folderCenterX =
            folderRect.left + folderRect.width / 2;

        const folderCenterY =
            folderRect.top + folderRect.height / 2;

        return {
            x: folderCenterX - overlayCenterX,
            y: folderCenterY - overlayCenterY,
        };
    };

    const animationOffset = getAnimationOffset();

    return (
        <AnimatePresence>
            {project && (
                <>
                    {/* Decorative backdrop; the dialog contains its own close button. */}
                    <motion.div
                        key="project-backdrop"
                        aria-hidden={true}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={onClose}
                        style={{
                            position: "fixed",
                            inset: 0,
                            zIndex: 100,
                            backgroundColor: "rgba(28, 25, 23, 0.45)",
                        }}
                    />

                    {/*
                     * This wrapper is responsible only for positioning.
                     * Keeping the centering transform separate prevents it
                     * from conflicting with Framer Motion's transforms.
                     */}
                    <div
                        style={{
                            position: "fixed",
                            top: "5vh",
                            left: "50%",
                            zIndex: 101,
                            width: "min(680px, 92vw)",
                            transform: "translateX(-50%)",
                        }}
                    >
                        <motion.div
                            ref={dialogRef}
                            key={`project-dialog-${project.slug}`}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby={`project-title-${project.slug}`}
                            tabIndex={-1}
                            initial={{
                                opacity: 0,
                                scale: 0.2,
                                x: animationOffset.x,
                                y: animationOffset.y,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                x: 0,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.2,
                                x: animationOffset.x,
                                y: animationOffset.y,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 28,
                                mass: 0.6,
                            }}
                            style={{
                                width: "100%",
                                maxHeight: "90vh",
                                overflow: "hidden",
                                backgroundColor: "#FAF7F2",
                                borderRadius: "12px",
                                boxShadow:
                                    "0 24px 80px rgba(28,25,23,0.22), " +
                                    "0 4px 16px rgba(28,25,23,0.08)",
                            }}
                        >
                            {/* Dialog header */}
                            <div
                                style={{
                                    position: "relative",
                                    padding: "28px 32px 24px",
                                    backgroundColor: "#F0A8CF",
                                }}
                            >
                                <button
                                    type="button"
                                    onClick={onClose}
                                    aria-label={`Close ${project.title}`}
                                    style={{
                                        position: "absolute",
                                        top: "14px",
                                        right: "14px",
                                        width: "28px",
                                        height: "28px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: 0,
                                        cursor: "pointer",
                                        color: "white",
                                        backgroundColor:
                                            "rgba(255,255,255,0.25)",
                                        border: "none",
                                        borderRadius: "50%",
                                        transition:
                                            "background-color 0.2s ease",
                                    }}
                                    onMouseEnter={(event) => {
                                        event.currentTarget.style.backgroundColor =
                                            "rgba(255,255,255,0.4)";
                                    }}
                                    onMouseLeave={(event) => {
                                        event.currentTarget.style.backgroundColor =
                                            "rgba(255,255,255,0.25)";
                                    }}
                                >
                                    <svg
                                        aria-hidden="true"
                                        width="10"
                                        height="10"
                                        viewBox="0 0 10 10"
                                        fill="none"
                                    >
                                        <line
                                            x1="1"
                                            y1="1"
                                            x2="9"
                                            y2="9"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                        />
                                        <line
                                            x1="9"
                                            y1="1"
                                            x2="1"
                                            y2="9"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </button>

                                <div
                                    style={{
                                        marginBottom: "8px",
                                        color: "rgba(255,255,255,0.7)",
                                        fontFamily:
                                            "-apple-system, BlinkMacSystemFont, system-ui",
                                        fontSize: "11px",
                                        letterSpacing: "0.06em",
                                    }}
                                >
                                    {project.filename}
                                </div>

                                <h1
                                    id={`project-title-${project.slug}`}
                                    style={{
                                        margin: 0,
                                        color: "white",
                                        fontFamily: "var(--font-playfair)",
                                        fontSize:
                                            "clamp(24px, 4vw, 40px)",
                                        fontWeight: 400,
                                        lineHeight: 1.1,
                                        letterSpacing: "-0.02em",
                                    }}
                                >
                                    {project.title}
                                </h1>
                            </div>

                            {/* Scrollable dialog content */}
                            <div
                                style={{
                                    maxHeight: "calc(90vh - 140px)",
                                    padding: "32px",
                                    overflowY: "auto",
                                }}
                            >
                                <p
                                    style={{
                                        margin: "0 0 28px",
                                        color: "#6B6560",
                                        fontFamily: "var(--font-dm-sans)",
                                        fontSize: "15px",
                                        fontStyle: "italic",
                                        fontWeight: 300,
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {project.tagline}
                                </p>

                                <div
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: "32px",
                                        marginBottom: "28px",
                                        paddingBottom: "28px",
                                        borderBottom:
                                            "0.5px solid rgba(28,25,23,0.10)",
                                    }}
                                >
                                    {[
                                        {
                                            label: "Role",
                                            value: project.role,
                                        },
                                        {
                                            label: "Period",
                                            value: project.period,
                                        },
                                    ].map(({ label, value }) => (
                                        <div key={label}>
                                            <MetadataLabel>
                                                {label}
                                            </MetadataLabel>

                                            <div
                                                style={{
                                                    color: "#1C1917",
                                                    fontFamily:
                                                        "var(--font-dm-sans)",
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {value}
                                            </div>
                                        </div>
                                    ))}

                                    <div>
                                        <MetadataLabel>
                                            Stack
                                        </MetadataLabel>

                                        <div
                                            style={{
                                                color: "#6B6560",
                                                fontFamily:
                                                    "-apple-system, BlinkMacSystemFont, system-ui",
                                                fontSize: "12px",
                                                lineHeight: 1.7,
                                            }}
                                        >
                                            {project.stack.join(" · ")}
                                        </div>
                                    </div>
                                </div>

                                <p
                                    style={{
                                        margin: "0 0 28px",
                                        color: "#1C1917",
                                        fontFamily: "var(--font-dm-sans)",
                                        fontSize: "14px",
                                        fontWeight: 300,
                                        lineHeight: 1.8,
                                    }}
                                >
                                    {project.description}
                                </p>

                                <div
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: "12px",
                                    }}
                                >
                                    {project.github && (
                                        <ProjectLink
                                            href={project.github}
                                            label="GitHub"
                                        />
                                    )}

                                    {project.live && (
                                        <ProjectLink
                                            href={project.live}
                                            label="Live"
                                        />
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

function MetadataLabel({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            style={{
                marginBottom: "4px",
                color: "#6B6560",
                fontFamily:
                    "-apple-system, BlinkMacSystemFont, system-ui",
                fontSize: "10px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
            }}
        >
            {children}
        </div>
    );
}

interface ProjectLinkProps {
    href: string;
    label: string;
}

function ProjectLink({ href, label }: ProjectLinkProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                padding: "6px 16px",
                color: "#1C1917",
                fontFamily:
                    "-apple-system, BlinkMacSystemFont, system-ui",
                fontSize: "12px",
                textDecoration: "none",
                border: "0.5px solid rgba(28,25,23,0.20)",
                borderRadius: "20px",
                transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(event) => {
                event.currentTarget.style.borderColor = "#F0A8CF";
                event.currentTarget.style.color = "#F0A8CF";
            }}
            onMouseLeave={(event) => {
                event.currentTarget.style.borderColor =
                    "rgba(28,25,23,0.20)";
                event.currentTarget.style.color = "#1C1917";
            }}
        >
            {label} →
        </a>
    );
}
