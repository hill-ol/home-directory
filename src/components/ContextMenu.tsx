"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MenuItem {
    label: string;
    value: string;
    dividerAfter?: boolean;
    disabled?: boolean;
    action?: () => void;
}

const uptime = () => {
    const start = new Date("2024-09-01").getTime();
    const now = Date.now();
    const diff = now - start;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    return `${months}mo ${days % 30}d`;
};

export default function ContextMenu() {
    const [visible, setVisible] = useState(false);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const menuRef = useRef<HTMLDivElement>(null);

    const items: MenuItem[] = [
        { label: "Olivia Hill", value: "", disabled: true, dividerAfter: true },
        { label: "CS + Math @ Northeastern", value: "", disabled: true },
        { label: "Co-op at Chewy", value: "", disabled: true },
        { label: "Class of 2028", value: "", disabled: true, dividerAfter: true },
        {
            label: "View Resume",
            value: "",
            action: () => window.open("/resume_2026.pdf", "_blank"),
        },
        {
            label: "GitHub",
            value: "",
            action: () => window.open("https://github.com/hill-ol", "_blank"),
        },
        {
            label: "LinkedIn",
            value: "",
            action: () => window.open("https://linkedin.com/in/oliviahill0", "_blank"),
            dividerAfter: true,
        },
        { label: `Uptime: ${uptime()}`, value: "", disabled: true },
        { label: "Build: Next.js 15 · Vercel", value: "", disabled: true },
    ];

    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            // Only trigger on the desktop canvas, not on links/buttons
            const target = e.target as HTMLElement;
            if (target.closest("a") || target.closest("button")) return;

            e.preventDefault();

            // Clamp position so menu doesn't overflow viewport
            const menuW = 240;
            const menuH = 280;
            const x = Math.min(e.clientX, window.innerWidth - menuW - 16);
            const y = Math.min(e.clientY, window.innerHeight - menuH - 16);

            setPos({ x, y });
            setVisible(true);
        };

        const handleClick = () => setVisible(false);
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setVisible(false);
        };

        // Only on desktop
        if (window.innerWidth >= 768) {
            window.addEventListener("contextmenu", handleContextMenu);
        }
        window.addEventListener("click", handleClick);
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("contextmenu", handleContextMenu);
            window.removeEventListener("click", handleClick);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    ref={menuRef}
                    key="context-menu"
                    initial={{ opacity: 0, scale: 0.95, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -4 }}
                    transition={{ duration: 0.12, ease: "easeOut" }}
                    style={{
                        position: "fixed",
                        top: pos.y,
                        left: pos.x,
                        zIndex: 999,
                        width: "240px",
                        backgroundColor: "rgba(242,237,228,0.92)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border: "0.5px solid rgba(28,25,23,0.12)",
                        borderRadius: "10px",
                        boxShadow: "0 8px 32px rgba(28,25,23,0.18), 0 2px 8px rgba(28,25,23,0.08)",
                        padding: "4px",
                        overflow: "hidden",
                    }}
                    // Prevent the click handler from closing immediately
                    onClick={e => e.stopPropagation()}
                >
                    {items.map((item, i) => (
                        <div key={i}>
                            <div
                                onClick={() => {
                                    if (item.action) {
                                        item.action();
                                        setVisible(false);
                                    }
                                }}
                                style={{
                                    padding: "6px 12px",
                                    borderRadius: "6px",
                                    cursor: item.disabled ? "default" : "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    transition: "background-color 0.1s ease",
                                    userSelect: "none",
                                }}
                                onMouseEnter={e => {
                                    if (!item.disabled) {
                                        (e.currentTarget as HTMLElement).style.backgroundColor = "#F0A8CF";
                                    }
                                }}
                                onMouseLeave={e => {
                                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                                }}
                            >
                <span style={{
                    fontFamily: item.disabled && i === 0
                        ? "var(--font-playfair)"
                        : "-apple-system,BlinkMacSystemFont,system-ui",
                    fontStyle: item.disabled && i === 0 ? "italic" : "normal",
                    fontSize: i === 0 ? "13px" : "12px",
                    color: item.disabled ? "#A89E99" : "#1C1917",
                    fontWeight: i === 0 ? 400 : 300,
                }}>
                  {item.label}
                </span>
                                {!item.disabled && (
                                    <span style={{
                                        fontFamily: "-apple-system,BlinkMacSystemFont,system-ui",
                                        fontSize: "10px", color: "#A89E99",
                                    }}>↗</span>
                                )}
                            </div>
                            {item.dividerAfter && (
                                <div style={{
                                    height: "0.5px",
                                    backgroundColor: "rgba(28,25,23,0.10)",
                                    margin: "4px 0",
                                }} />
                            )}
                        </div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
}