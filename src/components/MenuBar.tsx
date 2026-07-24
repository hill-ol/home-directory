"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
    { href: "/work", label: "work" },
    { href: "/readme", label: "readme" },
    { href: "/research", label: "research" },
];

const mobileLinks = [
    {
        href: "/",
        label: "home",
        icon: "M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z M9 21V12h6v9",
    },
    {
        href: "/work",
        label: "work",
        icon: "M3 7h18M3 12h18M3 17h18",
    },
    {
        href: "/readme",
        label: "readme",
        icon: "M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z",
    },
    {
        href: "/research",
        label: "research",
        icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18",
    },
    {
        href: "/coursework",
        label: "courses",
        icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    },
];

/**
 * Treat project-detail routes as part of the Work section.
 *
 * This keeps the Work navigation item highlighted when a user visits a
 * shareable project URL such as /projects/styleboard.
 */
function isPathActive(pathname: string, href: string): boolean {
    if (href === "/") {
        return pathname === "/";
    }

    if (href === "/work") {
        return (
            pathname === "/work" ||
            pathname.startsWith("/projects/")
        );
    }

    return pathname === href || pathname.startsWith(`${href}/`);
}

function MenuClock() {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();

            setTime(
                now.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                }),
            );
        };

        updateTime();

        // The displayed value only contains minutes, so updating every
        // 30 seconds is sufficient and avoids unnecessary renders.
        const intervalId = window.setInterval(updateTime, 30_000);

        return () => {
            window.clearInterval(intervalId);
        };
    }, []);

    return (
        <span
            style={{
                color: "#A89E99",
                fontFamily:
                    "-apple-system, BlinkMacSystemFont, system-ui",
                fontSize: "11px",
                letterSpacing: "0.01em",
            }}
        >
            {time}
        </span>
    );
}

export default function MenuBar() {
    const pathname = usePathname();
    const [hoveredLink, setHoveredLink] = useState<string | null>(
        null,
    );

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50"
            style={{
                backgroundColor: "rgba(242, 237, 228, 0.92)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderBottom:
                    "0.5px solid rgba(28, 25, 23, 0.08)",
            }}
        >
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto 1fr",
                    alignItems: "center",
                    padding: "8px 16px",
                }}
            >
                {/* Home navigation */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                    }}
                >
                    <Link
                        href="/"
                        aria-label="Home"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            color: "#A89E99",
                            textDecoration: "none",
                            transition: "color 0.2s ease",
                        }}
                        onMouseEnter={(event) => {
                            event.currentTarget.style.color =
                                "#F0A8CF";
                        }}
                        onMouseLeave={(event) => {
                            event.currentTarget.style.color =
                                "#A89E99";
                        }}
                    >
                        <svg
                            aria-hidden="true"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
                            <path d="M9 21V12h6v9" />
                        </svg>
                    </Link>

                    <Link
                        href="/"
                        aria-current={
                            pathname === "/" ? "page" : undefined
                        }
                        style={{
                            color: "#1C1917",
                            fontFamily: "var(--font-dm-sans)",
                            fontSize: "13px",
                            letterSpacing: "0.02em",
                            textDecoration: "none",
                        }}
                    >
                        Olivia Hill
                    </Link>
                </div>

                {/* Primary desktop navigation */}
                <nav
                    aria-label="Primary navigation"
                    className="hidden md:flex"
                    style={{
                        alignItems: "center",
                        gap: "40px",
                    }}
                >
                    {navLinks.map((link) => {
                        const isActive = isPathActive(
                            pathname,
                            link.href,
                        );

                        const isHovered =
                            hoveredLink === link.href;

                        const isHighlighted =
                            isActive || isHovered;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                aria-current={
                                    isActive ? "page" : undefined
                                }
                                onMouseEnter={() => {
                                    setHoveredLink(link.href);
                                }}
                                onMouseLeave={() => {
                                    setHoveredLink(null);
                                }}
                                style={{
                                    position: "relative",
                                    display: "inline-block",
                                    paddingBottom: "3px",
                                    textDecoration: "none",
                                }}
                            >
                                {/*
                                 * Both labels remain in the accessibility
                                 * tree if they are only visually hidden with
                                 * opacity. Mark the decorative italic version
                                 * as hidden so the link name is not repeated.
                                 */}
                                <span
                                    aria-hidden="true"
                                    style={{
                                        display: "block",
                                        color: "#F0A8CF",
                                        fontFamily:
                                            "var(--font-playfair)",
                                        fontSize: "13px",
                                        fontStyle: "italic",
                                        opacity: isHighlighted ? 1 : 0,
                                        transition:
                                            "opacity 0.35s ease",
                                    }}
                                >
                                    {link.label}
                                </span>

                                <span
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                        left: 0,
                                        color: "#6B6560",
                                        fontFamily:
                                            "var(--font-dm-sans)",
                                        fontSize: "13px",
                                        opacity: isHighlighted ? 0 : 1,
                                        whiteSpace: "nowrap",
                                        transition:
                                            "opacity 0.35s ease",
                                    }}
                                >
                                    {link.label}
                                </span>

                                <span
                                    aria-hidden="true"
                                    style={{
                                        position: "absolute",
                                        right: isHighlighted
                                            ? link.label === "readme"
                                                ? "-6px"
                                                : "0"
                                            : "50%",
                                        bottom: 0,
                                        left: isHighlighted
                                            ? link.label === "readme"
                                                ? "-6px"
                                                : "0"
                                            : "50%",
                                        height: "1.5px",
                                        backgroundColor: "#F0A8CF",
                                        borderRadius: "1px",
                                        transition:
                                            "left 0.35s ease, right 0.35s ease",
                                    }}
                                />
                            </Link>
                        );
                    })}
                </nav>

                {/* Desktop status */}
                <div
                    className="hidden md:flex"
                    style={{
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: "16px",
                    }}
                >
                    <span
                        style={{
                            color: "#A89E99",
                            fontFamily:
                                "-apple-system, BlinkMacSystemFont, system-ui",
                            fontSize: "11px",
                            letterSpacing: "0.01em",
                        }}
                    >
                        Boston, MA · available S&apos;28
                    </span>

                    <MenuClock />
                </div>
            </div>
        </header>
    );
}

export function MobileNav() {
    const pathname = usePathname();

    return (
        <nav
            aria-label="Mobile navigation"
            className="fixed bottom-0 left-0 right-0 md:hidden z-50"
            style={{
                paddingBottom: "env(safe-area-inset-bottom)",
                backgroundColor: "rgba(242,237,228,0.95)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderTop: "0.5px solid rgba(28,25,23,0.08)",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    padding: "8px 0",
                }}
            >
                {mobileLinks.map((link) => {
                    const isActive = isPathActive(
                        pathname,
                        link.href,
                    );

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            aria-current={
                                isActive ? "page" : undefined
                            }
                            style={{
                                textDecoration: "none",
                            }}
                        >
                            <motion.div
                                whileTap={{ scale: 0.88 }}
                                transition={{
                                    duration: 0.15,
                                    ease: "easeOut",
                                }}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "3px",
                                    padding: "4px 12px",
                                }}
                            >
                                <motion.div
                                    aria-hidden="true"
                                    animate={{
                                        scale: isActive ? 1.1 : 1,
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke={
                                            isActive
                                                ? "#F0A8CF"
                                                : "#A89E99"
                                        }
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{
                                            display: "block",
                                            transition:
                                                "stroke 0.2s ease",
                                        }}
                                    >
                                        <path d={link.icon} />
                                    </svg>
                                </motion.div>

                                <motion.span
                                    animate={{
                                        color: isActive
                                            ? "#F0A8CF"
                                            : "#A89E99",
                                        fontStyle: isActive
                                            ? "italic"
                                            : "normal",
                                    }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        fontFamily: isActive
                                            ? "var(--font-playfair)"
                                            : "-apple-system, BlinkMacSystemFont, system-ui",
                                        fontSize: "9px",
                                        letterSpacing: "0.03em",
                                    }}
                                >
                                    {link.label}
                                </motion.span>
                            </motion.div>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
