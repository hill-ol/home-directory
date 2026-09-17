"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import ProjectHeader from "@/components/project/ProjectHeader";
import ProjectLinks from "@/components/project/ProjectLinks";
import ProjectMetaRow from "@/components/project/ProjectMetaRow";
import {
    projectDescriptionStyle,
    projectTaglineStyle,
} from "@/components/project/variants";
import type { Project } from "@/content/projects";
import { accentText } from "@/lib/hover";
import { color, font } from "@/lib/theme";

const fadeUp = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
};

export default function ProjectContent({
    project,
}: {
    project: Project;
}) {
    const router = useRouter();

    return (
        <main
            style={{
                minHeight: "100vh",
                backgroundColor: color.cream,
                paddingTop: "80px",
                paddingBottom: "96px",
            }}
        >
            <div
                style={{
                    maxWidth: "680px",
                    margin: "0 auto",
                    padding: "0 24px",
                }}
            >
                <button
                    type="button"
                    onClick={() => router.push("/")}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        marginBottom: "48px",
                        padding: 0,
                        cursor: "pointer",
                        color: color.inkSecondary,
                        background: "none",
                        border: "none",
                        fontFamily:
                            font.system,
                        fontSize: "12px",
                        transition: "color 0.2s ease",
                    }}
                    {...accentText}
                >
                    ← back to desktop
                </button>

                <div
                    style={{
                        marginBottom: "32px",
                        overflow: "hidden",
                        borderRadius: "8px",
                    }}
                >
                    <ProjectHeader
                        filename={project.filename}
                        title={project.title}
                        variant="page"
                    />
                </div>

                <motion.p
                    {...fadeUp}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    style={projectTaglineStyle("page")}
                >
                    {project.tagline}
                </motion.p>

                <motion.div
                    {...fadeUp}
                    transition={{ delay: 0.38, duration: 0.4 }}
                >
                    <ProjectMetaRow project={project} variant="page" />
                </motion.div>

                <motion.p
                    {...fadeUp}
                    transition={{ delay: 0.45, duration: 0.4 }}
                    style={projectDescriptionStyle("page")}
                >
                    {project.description}
                </motion.p>

                <motion.div
                    {...fadeUp}
                    transition={{ delay: 0.52, duration: 0.4 }}
                >
                    <ProjectLinks project={project} />
                </motion.div>
            </div>
        </main>
    );
}
