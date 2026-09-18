"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
    type KeyboardEvent as ReactKeyboardEvent,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";

import { bio } from "@/content/bio";
import { contact } from "@/content/contact";
import { useRestoreFocus } from "@/hooks/useRestoreFocus";
import { applyStyle } from "@/lib/hover";
import { color, font, line, surface } from "@/lib/theme";

interface MenuItem {
    label: string;
    dividerAfter?: boolean;
    action?: () => void;
}

const MENU_WIDTH = 240;
const VIEWPORT_PADDING = 16;

/** Matches every actionable row, and nothing that is only there to read. */
const MENU_ITEM = '[role="menuitem"]';

/*
 * Rows highlight on hover and on keyboard focus, so both share one pair of
 * style setters.
 */
const highlight = applyStyle<HTMLButtonElement>({
    backgroundColor: color.pink,
});

const clearHighlight = applyStyle<HTMLButtonElement>({
    backgroundColor: "transparent",
});

function calculateUptime(): string {
    const start = new Date(bio.uptimeStart).getTime();
    const elapsed = Date.now() - start;
    const totalDays = Math.floor(
        elapsed / (1000 * 60 * 60 * 24),
    );
    const months = Math.floor(totalDays / 30);

    return `${months}mo ${totalDays % 30}d`;
}

/**
 * Opens a new tab without allowing the destination page to retain a
 * reference to this portfolio through window.opener.
 */
function openInNewTab(url: string): void {
    window.open(url, "_blank", "noopener,noreferrer");
}

function buildItems(): MenuItem[] {
    return [
        { label: bio.name, dividerAfter: true },
        { label: bio.study },
        { label: `Co-op at ${bio.coop}` },
        { label: bio.gradClass, dividerAfter: true },
        {
            label: "View Resume",
            action: () => openInNewTab(contact.resume.href),
        },
        {
            label: "GitHub",
            action: () => openInNewTab(contact.github.href),
        },
        {
            label: "LinkedIn",
            action: () => openInNewTab(contact.linkedin.href),
            dividerAfter: true,
        },
        { label: `Uptime: ${calculateUptime()}` },
        { label: "Build: Next.js 16 · Vercel" },
    ];
}

function ActionRow({
    label,
    onRun,
}: {
    label: string;
    onRun: () => void;
}) {
    return (
        <button
            type="button"
            role="menuitem"
            onClick={onRun}
            onMouseEnter={(event) => {
                event.currentTarget.focus();
                highlight(event);
            }}
            onMouseLeave={clearHighlight}
            onFocus={highlight}
            onBlur={clearHighlight}
            style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "6px 12px",
                cursor: "pointer",
                color: color.ink,
                backgroundColor: "transparent",
                border: "none",
                borderRadius: "6px",
                fontFamily: font.system,
                fontSize: "12px",
                fontWeight: 300,
                textAlign: "left",
                transition: "background-color 0.1s ease",
                userSelect: "none",
            }}
        >
            <span>{label}</span>

            <span
                aria-hidden="true"
                style={{
                    color: color.inkSecondary,
                    fontSize: "10px",
                }}
            >
                ↗
            </span>
        </button>
    );
}

function InfoRow({
    label,
    heading = false,
}: {
    label: string;
    heading?: boolean;
}) {
    return (
        <div
            role="presentation"
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "6px 12px",
                color: color.inkSecondary,
                borderRadius: "6px",
                fontFamily: heading ? font.display : font.system,
                fontSize: heading ? "13px" : "12px",
                fontStyle: heading ? "italic" : "normal",
                fontWeight: heading ? 400 : 300,
                userSelect: "none",
            }}
        >
            {label}
        </div>
    );
}

export default function ContextMenu() {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const menuRef = useRef<HTMLDivElement>(null);

    useRestoreFocus({
        open: visible,
        containerRef: menuRef,
        selector: MENU_ITEM,
    });

    useEffect(() => {
        const handleContextMenu = (event: MouseEvent) => {
            if (
                !window.matchMedia("(min-width: 768px)").matches
            ) {
                return;
            }

            const target = event.target;

            if (!(target instanceof HTMLElement)) {
                return;
            }

            if (
                target.closest(
                    "a, button, input, textarea, select, [contenteditable='true']",
                )
            ) {
                return;
            }

            event.preventDefault();
            setPosition({ x: event.clientX, y: event.clientY });
            setVisible(true);
        };

        const handleWindowClick = () => {
            setVisible(false);
        };

        const handleWindowKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setVisible(false);
            }
        };

        window.addEventListener("contextmenu", handleContextMenu);
        window.addEventListener("click", handleWindowClick);
        window.addEventListener("keydown", handleWindowKeyDown);

        return () => {
            window.removeEventListener(
                "contextmenu",
                handleContextMenu,
            );
            window.removeEventListener("click", handleWindowClick);
            window.removeEventListener(
                "keydown",
                handleWindowKeyDown,
            );
        };
    }, []);

    useLayoutEffect(() => {
        if (!visible) return;

        const menu = menuRef.current;
        if (!menu) return;

        const maxX =
            window.innerWidth - menu.offsetWidth - VIEWPORT_PADDING;

        const maxY =
            window.innerHeight - menu.offsetHeight - VIEWPORT_PADDING;

        setPosition((current) => {
            const x = Math.max(
                VIEWPORT_PADDING,
                Math.min(current.x, maxX),
            );

            const y = Math.max(
                VIEWPORT_PADDING,
                Math.min(current.y, maxY),
            );

            // Bail out when already in bounds, or this would loop.
            return x === current.x && y === current.y
                ? current
                : { x, y };
        });
    }, [visible]);

    const handleMenuKeyDown = (
        event: ReactKeyboardEvent<HTMLDivElement>,
    ) => {
        const rows = Array.from(
            menuRef.current?.querySelectorAll<HTMLButtonElement>(
                MENU_ITEM,
            ) ?? [],
        );

        if (rows.length === 0) return;

        const current = rows.indexOf(
            document.activeElement as HTMLButtonElement,
        );

        const focus = (index: number) => {
            event.preventDefault();
            rows[index].focus();
        };

        if (event.key === "ArrowDown") {
            focus(current < 0 ? 0 : (current + 1) % rows.length);
        }

        if (event.key === "ArrowUp") {
            focus(current <= 0 ? rows.length - 1 : current - 1);
        }

        if (event.key === "Home") focus(0);
        if (event.key === "End") focus(rows.length - 1);

        if (event.key === "Tab") {
            // A context menu is a temporary interaction surface. Allow Tab
            // to continue normally, but close the menu as focus leaves it.
            setVisible(false);
        }
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    ref={menuRef}
                    key="context-menu"
                    role="menu"
                    aria-label="Desktop actions"
                    initial={{ opacity: 0, scale: 0.95, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -4 }}
                    transition={{ duration: 0.12, ease: "easeOut" }}
                    onClick={(event) => {
                        /*
                         * Prevent the global click listener from closing the
                         * menu before an action button handles its click.
                         */
                        event.stopPropagation();
                    }}
                    onKeyDown={handleMenuKeyDown}
                    style={{
                        position: "fixed",
                        top: position.y,
                        left: position.x,
                        zIndex: 999,
                        width: `${MENU_WIDTH}px`,
                        maxHeight: `calc(100vh - ${VIEWPORT_PADDING * 2}px)`,
                        padding: "4px",
                        overflowY: "auto",
                        backgroundColor: surface.panel,
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border: "0.5px solid rgba(28,25,23,0.12)",
                        borderRadius: "10px",
                        boxShadow:
                            "0 8px 32px rgba(28,25,23,0.18), " +
                            "0 2px 8px rgba(28,25,23,0.08)",
                    }}
                >
                    {buildItems().map((item, index) => (
                        <div key={item.label}>
                            {item.action ? (
                                <ActionRow
                                    label={item.label}
                                    onRun={() => {
                                        /*
                                         * Run synchronously from the user
                                         * gesture. Browsers block
                                         * window.open if it is deferred
                                         * until after a state update.
                                         */
                                        item.action!();
                                        setVisible(false);
                                    }}
                                />
                            ) : (
                                <InfoRow
                                    label={item.label}
                                    heading={index === 0}
                                />
                            )}

                            {item.dividerAfter && (
                                <div
                                    role="separator"
                                    style={{
                                        height: "0.5px",
                                        margin: "4px 0",
                                        backgroundColor: line.card,
                                    }}
                                />
                            )}
                        </div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
