"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { bio } from "@/content/bio";
import { desktopNavLinks, homeLink, navLinks } from "@/content/nav";
import { accentText } from "@/lib/hover";
import { color, font, hairline, line, surface } from "@/lib/theme";

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

        const intervalId = window.setInterval(updateTime, 30_000);

        return () => {
            window.clearInterval(intervalId);
        };
    }, []);

    return (
        <span
            style={{
                color: color.inkSecondary,
                fontFamily:
                    font.system,
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
                backgroundColor: surface.panel,
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderBottom:
                    hairline(line.tile),
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
                            color: color.inkSecondary,
                            textDecoration: "none",
                            transition: "color 0.2s ease",
                        }}
                        {...accentText}
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
                            <path d={homeLink.icon} />
                        </svg>
                    </Link>

                    <Link
                        href="/"
                        aria-current={
                            pathname === "/" ? "page" : undefined
                        }
                        style={{
                            color: color.ink,
                            fontFamily: font.body,
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
                    {desktopNavLinks.map((link) => {
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
                                        color: color.pinkText,
                                        fontFamily:
                                            font.display,
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
                                        color: color.inkSecondary,
                                        fontFamily:
                                            font.body,
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
                                        backgroundColor: color.pink,
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
                            color: color.inkSecondary,
                            fontFamily:
                                font.system,
                            fontSize: "11px",
                            letterSpacing: "0.01em",
                        }}
                    >
                        {`${bio.location} · available ${bio.availableFrom}`}
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
                backgroundColor: surface.bar,
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderTop: hairline(line.tile),
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    padding: "8px 0",
                }}
            >
                {navLinks.map((link) => {
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
                                        /*
                                         * The active icon marks state, so it
                                         * needs the 3:1 non-text contrast the
                                         * brand pink cannot reach on cream.
                                         */
                                        stroke={
                                            isActive
                                                ? color.pinkText
                                                : color.inkMuted
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
                                            ? color.pinkText
                                            : color.inkSecondary,
                                        fontStyle: isActive
                                            ? "italic"
                                            : "normal",
                                    }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        fontFamily: isActive
                                            ? font.display
                                            : font.system,
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
