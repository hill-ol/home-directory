"use client";

import type { Project } from "@/content/projects";

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

export default function ProjectLinks({ project }: { project: Project }) {
    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
            }}
        >
            {project.github && (
                <ProjectLink href={project.github} label="GitHub" />
            )}

            {project.live && (
                <ProjectLink href={project.live} label="Live" />
            )}
        </div>
    );
}
