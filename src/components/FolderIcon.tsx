"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface FolderIconProps {
    label: string;
    slug: string;
    top: string;
    left: string;
    onClick: (slug: string, rect: DOMRect) => void;
}

export default function FolderIcon({ label, slug, top, left, onClick }: FolderIconProps) {
    const [hovered, setHovered] = useState(false);

    return (
        <button
            onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                onClick(slug, rect);
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: "absolute",
                top, left,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                zIndex: 6,
            }}
        >
            <motion.div
                animate={{ scale: hovered ? 1.06 : 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            >
                <svg width="96" height="78" viewBox="0 0 96 78" fill="none">
                    <path
                        d="M6,78 Q2,78 2,74 L2,8 Q2,2 8,2 L34,2 Q40,2 42,6 L44,12 Q46,16 50,16 L90,16 Q94,16 94,20 L94,74 Q94,78 90,78 Z"
                        fill={hovered ? "#C966A0" : "#D47BAD"}
                        style={{ transition: "fill 0.2s ease" }}
                    />
                    <rect
                        x="2" y="18" width="92" height="58" rx="6"
                        fill={hovered ? "#F5BADB" : "#F0A8CF"}
                        style={{ transition: "fill 0.2s ease" }}
                    />
                </svg>
            </motion.div>
            <span style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                fontSize: "11px",
                color: hovered ? "#1C1917" : "#6B6560",
                transition: "color 0.2s ease",
                whiteSpace: "nowrap",
                letterSpacing: "0.01em",
            }}>{label}</span>
        </button>
    );
}