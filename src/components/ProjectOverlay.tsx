"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";

import ProjectHeader from "@/components/project/ProjectHeader";
import ProjectLinks from "@/components/project/ProjectLinks";
import ProjectMetaRow from "@/components/project/ProjectMetaRow";
import {
    projectDescriptionStyle,
    projectTaglineStyle,
} from "@/components/project/variants";
import type { Project } from "@/content/projects";
import { useDialogA11y } from "@/hooks/useDialogA11y";
import { hoverSwap } from "@/lib/hover";
import { color } from "@/lib/theme";

/*
 * The close button sits on the pink header, so it brightens its own white
 * scrim rather than taking the accent like the rest of the site's links.
 */
const closeButtonHover = hoverSwap<HTMLButtonElement>(
    { backgroundColor: "rgba(255,255,255,0.4)" },
    { backgroundColor: "rgba(255,255,255,0.25)" },
);

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
                                backgroundColor: color.card,
                                borderRadius: "12px",
                                boxShadow:
                                    "0 24px 80px rgba(28,25,23,0.22), " +
                                    "0 4px 16px rgba(28,25,23,0.08)",
                            }}
                        >
                            <ProjectHeader
                                filename={project.filename}
                                title={project.title}
                                variant="overlay"
                                titleId={`project-title-${project.slug}`}
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
                                    {...closeButtonHover}
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
                            </ProjectHeader>

                            {/* Scrollable dialog content */}
                            <div
                                style={{
                                    maxHeight: "calc(90vh - 140px)",
                                    padding: "32px",
                                    overflowY: "auto",
                                }}
                            >
                                <p style={projectTaglineStyle("overlay")}>
                                    {project.tagline}
                                </p>

                                <ProjectMetaRow
                                    project={project}
                                    variant="overlay"
                                />

                                <p
                                    style={projectDescriptionStyle(
                                        "overlay",
                                    )}
                                >
                                    {project.description}
                                </p>

                                <ProjectLinks project={project} />
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
