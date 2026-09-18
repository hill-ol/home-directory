"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import FolderGlyph from "@/components/glyphs/FolderGlyph";
import { accentPill } from "@/lib/hover";
import { color, font, hairline, line, onAccent } from "@/lib/theme";

export default function NotFound() {
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{
                minHeight: "100vh",
                backgroundColor: color.cream,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
                textAlign: "center",
            }}
        >
            {/* Folder — slightly open / tilted */}
            <motion.div
                initial={{ rotate: -4, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                style={{ marginBottom: "32px" }}
            >
                <FolderGlyph width={96} height={78}>
                    {/* Question mark inside folder */}
                    <text
                        x="48"
                        y="56"
                        textAnchor="middle"
                        fontFamily="Georgia, serif"
                        fontSize="28"
                        fontStyle="italic"
                        fill={onAccent.muted}
                    >?</text>
                </FolderGlyph>
            </motion.div>

            {/* Error code */}
            <div style={{
                fontFamily: font.system,
                fontSize: "11px", color: color.pinkText,
                letterSpacing: "0.08em", textTransform: "uppercase",
                marginBottom: "12px",
            }}>error 404</div>

            {/* Heading */}
            <h1 style={{
                fontFamily: font.display,
                fontSize: "clamp(28px, 5vw, 42px)",
                fontWeight: 400, color: color.ink,
                lineHeight: 1.1, letterSpacing: "-0.02em",
                margin: "0 0 16px 0",
            }}>this file doesn&apos;t exist</h1>

            {/* Subtext */}
            <p style={{
                fontFamily: font.body,
                fontSize: "14px", fontWeight: 300,
                color: color.inkSecondary, lineHeight: 1.7,
                margin: "0 0 40px 0", maxWidth: "340px",
            }}>
                looks like this folder was moved, renamed,
                or never existed in the first place.
            </p>

            {/* Back link */}
            <Link href="/" style={{
                fontFamily: font.system,
                fontSize: "13px", color: color.ink,
                textDecoration: "none",
                border: hairline(line.pill),
                borderRadius: "20px", padding: "8px 24px",
                transition: "border-color 0.2s, color 0.2s",
            }}
                  {...accentPill}
            >← back to desktop</Link>
        </motion.main>
    );
}
