"use client";

import type { Project } from "@/content/projects";
import { accentPill } from "@/lib/hover";
import { color, font, hairline, line } from "@/lib/theme";

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
                color: color.ink,
                fontFamily:
                    font.system,
                fontSize: "12px",
                textDecoration: "none",
                border: hairline(line.pill),
                borderRadius: "20px",
                transition: "border-color 0.2s, color 0.2s",
            }}
            {...accentPill}
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
