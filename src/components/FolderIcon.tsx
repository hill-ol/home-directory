"use client";

import Link from "next/link";
import { useState } from "react";

interface FolderIconProps {
    label: string;
    href: string;
    top: string;
    left: string;
}

export default function FolderIcon({ label, href, top, left }: FolderIconProps) {
    const [hovered, setHovered] = useState(false);

    return (
        <Link
            href={href}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: "absolute",
                top,
                left,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
                textDecoration: "none",
                zIndex: 6,
                transform: hovered ? "scale(1.06)" : "scale(1)",
                transition: "transform 0.2s ease",
            }}
        >
            {/* Folder SVG */}
            <svg
                width="96"
                height="78"
                viewBox="0 0 96 78"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Back layer — tab + full body, darker pink */}
                <path
                    d="M6,78 Q2,78 2,74 L2,8 Q2,2 8,2 L34,2 Q40,2 42,6 L44,12 Q46,16 50,16 L90,16 Q94,16 94,20 L94,74 Q94,78 90,78 Z"
                    fill={hovered ? "#C966A0" : "#D47BAD"}
                    style={{ transition: "fill 0.2s ease" }}
                />
                {/* Front face — lighter pink */}
                <rect
                    x="2"
                    y="18"
                    width="92"
                    height="58"
                    rx="6"
                    fill={hovered ? "#F5BADB" : "#F0A8CF"}
                    style={{ transition: "fill 0.2s ease" }}
                />
            </svg>

            {/* Filename label */}
            <span
                style={{
                    fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                    fontSize: "11px",
                    color: hovered ? "#1C1917" : "#6B6560",
                    transition: "color 0.2s ease",
                    whiteSpace: "nowrap",
                    letterSpacing: "0.01em",
                }}
            >
        {label}
      </span>
        </Link>
    );
}