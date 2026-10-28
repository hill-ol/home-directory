import SectionLabel from "@/components/SectionLabel";
import type { Project } from "@/content/projects";

import { projectVariants, type ProjectVariant } from "./variants";
import { color, font, hairline, line } from "@/lib/theme";

interface ProjectMetaRowProps {
    project: Project;
    variant: ProjectVariant;
}

export default function ProjectMetaRow({
    project,
    variant,
}: ProjectMetaRowProps) {
    const { rhythm } = projectVariants[variant];

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "32px",
                marginBottom: rhythm,
                paddingBottom: rhythm,
                borderBottom: hairline(line.card),
            }}
        >
            {[
                { label: "Role", value: project.role },
                { label: "Period", value: project.period },
            ].map(({ label, value }) => (
                <div key={label}>
                    <SectionLabel style={{ marginBottom: "4px" }}>
                        {label}
                    </SectionLabel>

                    <div
                        style={{
                            color: color.ink,
                            fontFamily: font.body,
                            fontSize: "13px",
                        }}
                    >
                        {value}
                    </div>
                </div>
            ))}

            <div>
                <SectionLabel style={{ marginBottom: "4px" }}>
                    Stack
                </SectionLabel>

                <div
                    style={{
                        color: color.inkSecondary,
                        fontFamily:
                            font.system,
                        fontSize: "12px",
                        lineHeight: 1.7,
                    }}
                >
                    {project.stack.join(" · ")}
                </div>
            </div>
        </div>
    );
}