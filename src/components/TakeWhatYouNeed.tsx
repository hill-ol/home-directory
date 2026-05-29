"use client";

import { useState } from "react";
import Image from "next/image";

const contacts = [
    { label: "Email",    href: "mailto:hill.ol@northeastern.edu",      icon: "/contact/outlook.png",  hasBg: false },
    { label: "LinkedIn", href: "https://linkedin.com/in/olivia-hill0", icon: "/contact/linkedin.png", hasBg: false },
    { label: "GitHub",   href: "https://github.com/hill-ol",           icon: "/contact/github.png",   hasBg: false },
    { label: "Resume",   href: "/resume_2026.pdf",                     icon: null,                    hasBg: true  },
];

const rotations = [-14, -5, 5, 15];

export default function TakeWhatYouNeed() {
    const [open, setOpen] = useState(false);
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <>
            {/* Blur backdrop */}
            <div
                onClick={() => setOpen(false)}
                style={{
                    position: "fixed",
                    inset: 0,
                    backdropFilter: open ? "blur(10px)" : "blur(0px)",
                    WebkitBackdropFilter: open ? "blur(10px)" : "blur(0px)",
                    backgroundColor: open ? "rgba(242,237,228,0.45)" : "rgba(242,237,228,0)",
                    zIndex: 40,
                    pointerEvents: open ? "auto" : "none",
                    transition: "backdrop-filter 0.5s ease, background-color 0.5s ease",
                }}
            />

            {/* Folder popup */}
            <div
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: open
                        ? "translate(-50%, -50%) scale(1)"
                        : "translate(-50%, -48%) scale(0.96)",
                    zIndex: 50,
                    width: "340px",
                    height: "300px",
                    opacity: open ? 1 : 0,
                    pointerEvents: open ? "auto" : "none",
                    transition: "opacity 0.45s ease, transform 0.45s ease",
                }}
            >
                {/* LAYER 1 — folder back */}
                <svg
                    width="340" height="300" viewBox="0 0 340 300" fill="none"
                    style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
                >
                    <path
                        d="M16,300 Q4,300 4,288 L4,48 Q4,36 16,36 L108,36 Q116,36 120,44 L130,60 Q134,68 142,68 L324,68 Q336,68 336,80 L336,288 Q336,300 324,300 Z"
                        fill="#D47BAD"
                    />
                </svg>

                {/* LAYER 2 — icons */}
                <div
                    style={{
                        position: "absolute",
                        top: "4px",
                        left: 0,
                        right: 0,
                        zIndex: 2,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-end",
                        gap: "18px",
                        paddingLeft: "16px",
                    }}
                >
                    {contacts.map((c, i) => {
                        const isHov = hovered === c.label;
                        return (
                            <a
                                key={c.label}
                                href={c.href}
                                target={c.label !== "Email" ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                onMouseEnter={() => setHovered(c.label)}
                                onMouseLeave={() => setHovered(null)}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "4px",
                                    textDecoration: "none",
                                    transform: isHov
                                        ? `rotate(${rotations[i]}deg) translateY(-22px)`
                                        : `rotate(${rotations[i]}deg) translateY(0px)`,
                                    transition: "transform 0.25s ease",
                                    transformOrigin: "bottom center",
                                }}
                            >
                                {/* Label above icon */}
                                <span
                                    style={{
                                        fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                                        fontSize: "10px",
                                        color: "#6B6560",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                  {c.label}
                </span>

                                {/* Icon — 80px */}
                                {c.icon ? (
                                    <Image
                                        src={c.icon}
                                        alt={c.label}
                                        width={80}
                                        height={80}
                                        style={{ objectFit: "contain", borderRadius: "18px" }}
                                    />
                                ) : (
                                    <div
                                        style={{
                                            width: "80px",
                                            height: "80px",
                                            borderRadius: "18px",
                                            backgroundColor: "#FAF7F2",
                                            border: "0.5px solid rgba(28,25,23,0.10)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            overflow: "hidden",
                                            flexShrink: 0,
                                        }}
                                    >
                                        <svg
                                            width="44" height="52"
                                            viewBox="0 0 44 52"
                                            fill="none"
                                            style={{ display: "block" }}
                                        >
                                            <rect x="2" y="2" width="40" height="48" rx="4"
                                                  fill="white" stroke="rgba(28,25,23,0.15)" strokeWidth="0.5"/>
                                            <path d="M30,2 L42,14 L30,14 Z"
                                                  fill="#F2EDE4" stroke="rgba(28,25,23,0.15)" strokeWidth="0.5"/>
                                            <rect x="8" y="20" width="20" height="1.5" rx="1" fill="rgba(28,25,23,0.12)"/>
                                            <rect x="8" y="24" width="14" height="1.5" rx="1" fill="rgba(28,25,23,0.12)"/>
                                            <text x="22" y="36" textAnchor="middle"
                                                  fontSize="9" fontWeight="600"
                                                  fontFamily="Arial, sans-serif" fill="#D47BAD">
                                                PDF
                                            </text>
                                        </svg>
                                    </div>
                                )}
                            </a>
                        );
                    })}
                </div>

                {/* LAYER 3 — folder front face */}
                <svg
                    width="340" height="300" viewBox="0 0 340 300" fill="none"
                    style={{ position: "absolute", top: 0, left: 0, zIndex: 3, pointerEvents: "none" }}
                >
                    <rect x="4" y="72" width="332" height="228" rx="10" fill="#F0A8CF"/>
                    <text
                        x="170" y="192"
                        textAnchor="middle"
                        fontSize="24"
                        fontFamily="Georgia, serif"
                        fontStyle="italic"
                        fill="white"
                        opacity="0.9"
                    >
                        Reach Out!
                    </text>
                </svg>
            </div>

            {/* Floating pill */}
            <button
                onClick={() => setOpen((o) => !o)}
                className="fixed bottom-20 md:bottom-8"
                style={{
                    right: "40px",
                    zIndex: 50,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    backgroundColor: "#1C1917",
                    color: "#F2EDE4",
                    border: "none",
                    borderRadius: "20px",
                    padding: "8px 16px",
                    cursor: "pointer",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "12px",
                    fontWeight: 300,
                    letterSpacing: "0.01em",
                    transition: "transform 0.2s ease",
                    transform: open ? "scale(0.97)" : "scale(1)",
                }}
            >
        <span
            style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#F0A8CF",
                flexShrink: 0,
            }}
        />
                reach out
            </button>
        </>
    );
}