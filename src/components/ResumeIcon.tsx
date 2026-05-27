"use client";

import { useState } from "react";

export default function ResumeIcon() {
    const [hovered, setHovered] = useState(false);

    return (
        <a
            href="/resume_2026.pdf"
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
            <svg width="44" height="52" viewBox="0 0 44 52" fill="none">
                <rect
                    x="2" y="2" width="40" height="48" rx="4"
                    fill="white"
                    stroke="rgba(28,25,23,0.10)"
                    strokeWidth="0.5"
                />
                <path
                    d="M30,2 L42,14 L30,14 Z"
                    fill="#F2EDE4"
                    stroke="rgba(28,25,23,0.10)"
                    strokeWidth="0.5"
                />
                <rect x="8" y="20" width="20" height="1.5" rx="1" fill="rgba(28,25,23,0.08)"/>
                <rect x="8" y="24" width="16" height="1.5" rx="1" fill="rgba(28,25,23,0.08)"/>
                <text
                    x="22"
                    y="34"
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="600"
                    fontFamily="Arial, sans-serif"
                    fill={hovered ? "#F0A8CF" : "#D47BAD"}
                >
                    PDF
                </text>
            </svg>

            <span
                style={{
                    fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                    fontSize: "11px",
                    color: hovered ? "#1C1917" : "#6B6560",
                    transition: "color 0.2s ease",
                    whiteSpace: "nowrap",
                }}
            >
        resume_2026.pdf
      </span>
        </a>
    );
}