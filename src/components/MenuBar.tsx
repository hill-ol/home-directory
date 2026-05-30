"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navLinks = [
    { href: "/work",       label: "work"     },
    { href: "/readme",     label: "readme"   },
    { href: "/research",   label: "research" },
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


function MenuClock() {
    const [time, setTime] = useState("");
    useEffect(() => {
        const update = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString("en-US", {
                hour: "numeric", minute: "2-digit", hour12: true,
            }));
        };
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, []);
    return (
        <span style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
            fontSize: "11px", color: "#A89E99", letterSpacing: "0.01em",
        }}>{time}</span>
    );
}

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
            <div style={{
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                alignItems: "center",
                padding: "8px 40px",
            }}>
                {/* Left — home icon + name */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Link
                        href="/"
                        style={{ color: "#A89E99", textDecoration: "none", display: "flex", alignItems: "center", transition: "color 0.2s ease" }}
                        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#F0A8CF")}
                        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "#A89E99")}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
                            <path d="M9 21V12h6v9"/>
                        </svg>
                    </Link>
                    <Link href="/" style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: "#1C1917", textDecoration: "none", letterSpacing: "0.02em" }}>
                        Olivia Hill
                    </Link>
                </div>

                {/* Center — nav links, desktop only */}
                <nav className="hidden md:flex" style={{ alignItems: "center", gap: "40px" }}>
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        const isHovered = hoveredLink === link.href;
                        const highlighted = isActive || isHovered;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onMouseEnter={() => setHoveredLink(link.href)}
                                onMouseLeave={() => setHoveredLink(null)}
                                style={{ position: "relative", paddingBottom: "3px", textDecoration: "none", display: "inline-block" }}
                            >
                                <span style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", fontSize: "13px", color: "#F0A8CF", opacity: highlighted ? 1 : 0, transition: "opacity 0.35s ease", display: "block" }}>{link.label}</span>
                                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: "#6B6560", opacity: highlighted ? 0 : 1, transition: "opacity 0.35s ease", position: "absolute", top: 0, left: 0, right: 0, whiteSpace: "nowrap" }}>{link.label}</span>
                                <span style={{ position: "absolute", bottom: 0, left: highlighted ? (link.label === "readme" ? "-6px" : "0px") : "50%", right: highlighted ? (link.label === "readme" ? "-6px" : "0px") : "50%", height: "1.5px", backgroundColor: "#F0A8CF", transition: "left 0.35s ease, right 0.35s ease", borderRadius: "1px" }}/>
                            </Link>
                        );
                    })}
                </nav>

                {/* Right — availability + clock, desktop only */}
                <div className="hidden md:flex" style={{ justifyContent: "flex-end", alignItems: "center", gap: "16px" }}>
          <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, system-ui", fontSize: "11px", color: "#A89E99", letterSpacing: "0.01em" }}>
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
            className="fixed bottom-0 left-0 right-0 md:hidden z-50"
            style={{
                backgroundColor: "rgba(242,237,228,0.95)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderTop: "0.5px solid rgba(28,25,23,0.08)",
                paddingBottom: "env(safe-area-inset-bottom)",
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-around", padding: "8px 0" }}>
                {mobileLinks.map(link => {
                    const isActive = pathname === link.href;
                    return (
                        <Link key={link.href} href={link.href} style={{ textDecoration: "none" }}>
                            <motion.div
                                whileTap={{ scale: 0.88 }}
                                transition={{ duration: 0.15, ease: "easeOut" }}
                                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px", padding: "4px 12px" }}
                            >
                                <motion.div
                                    animate={{ scale: isActive ? 1.1 : 1 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <svg
                                        width="20" height="20" viewBox="0 0 24 24"
                                        fill="none"
                                        stroke={isActive ? "#F0A8CF" : "#A89E99"}
                                        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                        style={{ transition: "stroke 0.2s ease", display: "block" }}
                                    >
                                        <path d={link.icon}/>
                                    </svg>
                                </motion.div>
                                <motion.span
                                    animate={{
                                        color: isActive ? "#F0A8CF" : "#A89E99",
                                        fontStyle: isActive ? "italic" : "normal",
                                    }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        fontFamily: isActive ? "var(--font-playfair)" : "-apple-system,BlinkMacSystemFont,system-ui",
                                        fontSize: "9px",
                                        letterSpacing: "0.03em",
                                    }}
                                >{link.label}</motion.span>
                            </motion.div>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}