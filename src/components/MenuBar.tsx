"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
    { href: "/work", label: "work" },
    { href: "/readme", label: "readme" },
    { href: "/research", label: "research" },
];

export default function MenuBar() {
    const pathname = usePathname();
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50"
            style={{
                backgroundColor: "rgba(242, 237, 228, 0.92)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderBottom: "0.5px solid rgba(28, 25, 23, 0.08)",
            }}
        >
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto 1fr",
                    alignItems: "center",
                    padding: "8px 40px",
                }}
            >
                {/* Left — name */}
                <Link
                    href="/"
                    style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "13px",
                        color: "#1C1917",
                        textDecoration: "none",
                        letterSpacing: "0.02em",
                    }}
                >
                    Olivia Hill
                </Link>

                {/* Center — nav links, always truly centered via grid */}
                <nav style={{ display: "flex", alignItems: "center", gap: "40px" }}>
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        const isHovered = hoveredLink === link.href;
                        const highlighted = isActive || isHovered;
                        const isReadme = link.label === "readme";

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onMouseEnter={() => setHoveredLink(link.href)}
                                onMouseLeave={() => setHoveredLink(null)}
                                style={{
                                    position: "relative",
                                    paddingBottom: "3px",
                                    textDecoration: "none",
                                    display: "inline-block",
                                }}
                            >
                                {/* Playfair italic — always in flow, sets the width */}
                                <span
                                    style={{
                                        fontFamily: "var(--font-playfair)",
                                        fontStyle: "italic",
                                        fontSize: "13px",
                                        color: "#F0A8CF",
                                        opacity: highlighted ? 1 : 0,
                                        transition: "opacity 0.35s ease",
                                        display: "block",
                                    }}
                                >
                  {link.label}
                </span>

                                {/* DM Sans — absolutely positioned, fades out on hover */}
                                <span
                                    style={{
                                        fontFamily: "var(--font-dm-sans)",
                                        fontSize: "13px",
                                        color: "#6B6560",
                                        opacity: highlighted ? 0 : 1,
                                        transition: "opacity 0.35s ease",
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        whiteSpace: "nowrap",
                                    }}
                                >
                  {link.label}
                </span>

                                {/* Underline — expands from center, wider on readme */}
                                <span
                                    style={{
                                        position: "absolute",
                                        bottom: 0,
                                        left: highlighted ? (isReadme ? "-6px" : "0px") : "50%",
                                        right: highlighted ? (isReadme ? "-6px" : "0px") : "50%",
                                        height: "1.5px",
                                        backgroundColor: "#F0A8CF",
                                        transition: "left 0.35s ease, right 0.35s ease",
                                        borderRadius: "1px",
                                    }}
                                />
                            </Link>
                        );
                    })}
                </nav>

                {/* Right — availability, pushed to the right edge */}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <span
              style={{
                  fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                  fontSize: "11px",
                  color: "#A89E99",
                  letterSpacing: "0.01em",
              }}
          >
            Boston, MA · available S&apos;27
          </span>
                </div>
            </div>
        </header>
    );
}