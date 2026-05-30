"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{
                minHeight: "100vh",
                backgroundColor: "#F2EDE4",
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
                <svg width="96" height="78" viewBox="0 0 96 78" fill="none">
                    <path
                        d="M6,78 Q2,78 2,74 L2,8 Q2,2 8,2 L34,2 Q40,2 42,6 L44,12 Q46,16 50,16 L90,16 Q94,16 94,20 L94,74 Q94,78 90,78 Z"
                        fill="#D47BAD"
                    />
                    <rect x="2" y="18" width="92" height="58" rx="6" fill="#F0A8CF"/>
                    {/* Question mark inside folder */}
                    <text
                        x="48"
                        y="56"
                        textAnchor="middle"
                        fontFamily="Georgia, serif"
                        fontSize="28"
                        fontStyle="italic"
                        fill="rgba(255,255,255,0.7)"
                    >?</text>
                </svg>
            </motion.div>

            {/* Error code */}
            <div style={{
                fontFamily: "-apple-system,BlinkMacSystemFont,system-ui",
                fontSize: "11px", color: "#F0A8CF",
                letterSpacing: "0.08em", textTransform: "uppercase",
                marginBottom: "12px",
            }}>error 404</div>

            {/* Heading */}
            <h1 style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(28px, 5vw, 42px)",
                fontWeight: 400, color: "#1C1917",
                lineHeight: 1.1, letterSpacing: "-0.02em",
                margin: "0 0 16px 0",
            }}>this file doesn't exist</h1>

            {/* Subtext */}
            <p style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "14px", fontWeight: 300,
                color: "#6B6560", lineHeight: 1.7,
                margin: "0 0 40px 0", maxWidth: "340px",
            }}>
                looks like this folder was moved, renamed,
                or never existed in the first place.
            </p>

            {/* Back link */}
            <Link href="/" style={{
                fontFamily: "-apple-system,BlinkMacSystemFont,system-ui",
                fontSize: "13px", color: "#1C1917",
                textDecoration: "none",
                border: "0.5px solid rgba(28,25,23,0.20)",
                borderRadius: "20px", padding: "8px 24px",
                transition: "border-color 0.2s, color 0.2s",
            }}
                  onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "#F0A8CF";
                      (e.currentTarget as HTMLElement).style.color = "#F0A8CF";
                  }}
                  onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(28,25,23,0.20)";
                      (e.currentTarget as HTMLElement).style.color = "#1C1917";
                  }}
            >← back to desktop</Link>
        </motion.main>
    );
}