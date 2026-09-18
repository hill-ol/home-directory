"use client";

import { useState } from "react";

import PdfGlyph from "@/components/glyphs/PdfGlyph";
import { contact } from "@/content/contact";
import { color, font } from "@/lib/theme";

export default function ResumeIcon() {
    const [hovered, setHovered] = useState(false);

    return (
        <a
            href={contact.resume.href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: "absolute",
                top: "15%",
                left: "47%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
                textDecoration: "none",
                cursor: "pointer",
                transform: hovered ? "scale(1.06)" : "scale(1)",
                transition: "transform 0.2s ease",
                zIndex: 6,
            }}
        >
            {/*
             * The wordmark keeps its readable accent rather than swapping on
             * hover: both brand pinks fall below AA on white. Hover is already
             * signalled by the 1.06 scale and the filename darkening.
             */}
            <PdfGlyph />

            <span
                style={{
                    fontFamily: font.system,
                    fontSize: "11px",
                    color: hovered ? color.ink : color.inkSecondary,
                    transition: "color 0.2s ease",
                    whiteSpace: "nowrap",
                }}
            >
        {contact.resume.display}
      </span>
        </a>
    );
}