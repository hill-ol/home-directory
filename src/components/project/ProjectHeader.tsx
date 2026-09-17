import type { ReactNode } from "react";

import { projectVariants, type ProjectVariant } from "./variants";
import { color, font } from "@/lib/theme";

interface ProjectHeaderProps {
    filename: string;
    title: string;
    variant: ProjectVariant;
    /** Supplied by the overlay so its dialog can point aria-labelledby here. */
    titleId?: string;
    /** Slot for the overlay's close button, positioned against the header. */
    children?: ReactNode;
}

export default function ProjectHeader({
    filename,
    title,
    variant,
    titleId,
    children,
}: ProjectHeaderProps) {
    const { headerPadding, headerRadius, titleSize } =
        projectVariants[variant];

    return (
        <div
            style={{
                position: "relative",
                padding: headerPadding,
                backgroundColor: color.pink,
                borderRadius: headerRadius,
            }}
        >
            {children}

            <div
                style={{
                    marginBottom: "8px",
                    color: "rgba(255,255,255,0.7)",
                    fontFamily:
                        font.system,
                    fontSize: "11px",
                    letterSpacing: "0.06em",
                }}
            >
                {filename}
            </div>

            <h1
                id={titleId}
                style={{
                    margin: 0,
                    color: "white",
                    fontFamily: font.display,
                    fontSize: titleSize,
                    fontWeight: 400,
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                }}
            >
                {title}
            </h1>
        </div>
    );
}