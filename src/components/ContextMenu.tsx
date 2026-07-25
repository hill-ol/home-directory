"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
    type KeyboardEvent as ReactKeyboardEvent,
    useEffect,
    useRef,
    useState,
} from "react";

interface MenuItem {
    label: string;
    dividerAfter?: boolean;
    action?: () => void;
}

const MENU_WIDTH = 240;
const MENU_HEIGHT = 280;
const VIEWPORT_PADDING = 16;

function calculateUptime(): string {
    const start = new Date("2024-09-01").getTime();
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

export default function ContextMenu() {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
    });

    const menuRef = useRef<HTMLDivElement>(null);
    const previouslyFocusedRef = useRef<HTMLElement | null>(
        null,
    );

    const items: MenuItem[] = [
        {
            label: "Olivia Hill",
            dividerAfter: true,
        },
        {
            label: "CS + Math @ Northeastern",
        },
        {
            label: "Co-op at Chewy",
        },
        {
            label: "Class of 2028",
            dividerAfter: true,
        },
        {
            label: "View Resume",
            action: () => {
                openInNewTab("/resume_2026.pdf");
            },
        },
        {
            label: "GitHub",
            action: () => {
                openInNewTab("https://github.com/hill-ol");
            },
        },
        {
            label: "LinkedIn",
            action: () => {
                openInNewTab(
                    "https://linkedin.com/in/oliviahill0",
                );
            },
            dividerAfter: true,
        },
        {
            label: `Uptime: ${calculateUptime()}`,
        },
        {
            label: "Build: Next.js 16 · Vercel",
        },
    ];

    useEffect(() => {
        const handleContextMenu = (event: MouseEvent) => {
            /*
             * Check the media query when the event occurs instead of only
             * when the component mounts. This remains correct if the user
             * resizes the browser after loading the page.
             */
            if (
                !window.matchMedia("(min-width: 768px)")
                    .matches
            ) {
                return;
            }

            const target = event.target;

            if (!(target instanceof HTMLElement)) {
                return;
            }

            /*
             * Preserve the browser's normal context menu on interactive
             * controls and editable fields.
             */
            if (
                target.closest(
                    "a, button, input, textarea, select, [contenteditable='true']",
                )
            ) {
                return;
            }

            event.preventDefault();

            const maxX =
                window.innerWidth -
                MENU_WIDTH -
                VIEWPORT_PADDING;

            const maxY =
                window.innerHeight -
                MENU_HEIGHT -
                VIEWPORT_PADDING;

            setPosition({
                x: Math.max(
                    VIEWPORT_PADDING,
                    Math.min(event.clientX, maxX),
                ),
                y: Math.max(
                    VIEWPORT_PADDING,
                    Math.min(event.clientY, maxY),
                ),
            });

            setVisible(true);
        };

        const handleWindowClick = () => {
            setVisible(false);
        };

        const handleWindowKeyDown = (
            event: KeyboardEvent,
        ) => {
            if (event.key === "Escape") {
                setVisible(false);
            }
        };

        window.addEventListener(
            "contextmenu",
            handleContextMenu,
        );
        window.addEventListener("click", handleWindowClick);
        window.addEventListener(
            "keydown",
            handleWindowKeyDown,
        );

        return () => {
            window.removeEventListener(
                "contextmenu",
                handleContextMenu,
            );
            window.removeEventListener(
                "click",
                handleWindowClick,
            );
            window.removeEventListener(
                "keydown",
                handleWindowKeyDown,
            );
        };
    }, []);

    /*
     * Move focus into the context menu when it opens and return focus to
     * the previously focused element when it closes.
     */
    useEffect(() => {
        if (!visible) return;

        previouslyFocusedRef.current =
            document.activeElement instanceof HTMLElement
                ? document.activeElement
                : null;

        const animationFrame =
            window.requestAnimationFrame(() => {
                const firstAction =
                    menuRef.current?.querySelector<HTMLButtonElement>(
                        '[role="menuitem"]',
                    );

                firstAction?.focus();
            });

        return () => {
            window.cancelAnimationFrame(animationFrame);
            previouslyFocusedRef.current?.focus();
        };
    }, [visible]);

    const getActionButtons = (): HTMLButtonElement[] => {
        if (!menuRef.current) return [];

        return Array.from(
            menuRef.current.querySelectorAll<HTMLButtonElement>(
                '[role="menuitem"]',
            ),
        );
    };

    const handleMenuKeyDown = (
        event: ReactKeyboardEvent<HTMLDivElement>,
    ) => {
        const actionButtons = getActionButtons();

        if (actionButtons.length === 0) return;

        const currentIndex = actionButtons.indexOf(
            document.activeElement as HTMLButtonElement,
        );

        if (event.key === "ArrowDown") {
            event.preventDefault();

            const nextIndex =
                currentIndex < 0
                    ? 0
                    : (currentIndex + 1) %
                      actionButtons.length;

            actionButtons[nextIndex].focus();
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();

            const previousIndex =
                currentIndex <= 0
                    ? actionButtons.length - 1
                    : currentIndex - 1;

            actionButtons[previousIndex].focus();
        }

        if (event.key === "Home") {
            event.preventDefault();
            actionButtons[0].focus();
        }

        if (event.key === "End") {
            event.preventDefault();
            actionButtons[actionButtons.length - 1].focus();
        }

        if (event.key === "Tab") {
            // A context menu is a temporary interaction surface. Allow Tab
            // to continue normally, but close the menu as focus leaves it.
            setVisible(false);
        }
    };

    const runAction = (action: () => void) => {
        /*
         * Run the action synchronously from the user gesture. Browsers may
         * block window.open if it is deferred until after a state update.
         */
        action();
        setVisible(false);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    ref={menuRef}
                    key="context-menu"
                    role="menu"
                    aria-label="Desktop actions"
                    initial={{
                        opacity: 0,
                        scale: 0.95,
                        y: -4,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                    }}
                    exit={{
                        opacity: 0,
                        scale: 0.95,
                        y: -4,
                    }}
                    transition={{
                        duration: 0.12,
                        ease: "easeOut",
                    }}
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
                        padding: "4px",
                        overflow: "hidden",
                        backgroundColor:
                            "rgba(242,237,228,0.92)",
                        backdropFilter: "blur(20px)",
                        WebkitBackdropFilter: "blur(20px)",
                        border:
                            "0.5px solid rgba(28,25,23,0.12)",
                        borderRadius: "10px",
                        boxShadow:
                            "0 8px 32px rgba(28,25,23,0.18), " +
                            "0 2px 8px rgba(28,25,23,0.08)",
                    }}
                >
                    {items.map((item, index) => {
                        const isHeading = index === 0;
                        const isAction =
                            typeof item.action === "function";

                        return (
                            <div key={item.label}>
                                {isAction ? (
                                    <button
                                        type="button"
                                        role="menuitem"
                                        onClick={() => {
                                            runAction(item.action!);
                                        }}
                                        onMouseEnter={(event) => {
                                            event.currentTarget.focus();
                                            event.currentTarget.style.backgroundColor =
                                                "#F0A8CF";
                                        }}
                                        onMouseLeave={(event) => {
                                            event.currentTarget.style.backgroundColor =
                                                "transparent";
                                        }}
                                        onFocus={(event) => {
                                            event.currentTarget.style.backgroundColor =
                                                "#F0A8CF";
                                        }}
                                        onBlur={(event) => {
                                            event.currentTarget.style.backgroundColor =
                                                "transparent";
                                        }}
                                        style={{
                                            width: "100%",
                                            display: "flex",
                                            alignItems:
                                                "center",
                                            justifyContent:
                                                "space-between",
                                            padding: "6px 12px",
                                            cursor: "pointer",
                                            color: "#1C1917",
                                            backgroundColor:
                                                "transparent",
                                            border: "none",
                                            borderRadius: "6px",
                                            fontFamily:
                                                "-apple-system, BlinkMacSystemFont, system-ui",
                                            fontSize: "12px",
                                            fontWeight: 300,
                                            textAlign: "left",
                                            transition:
                                                "background-color 0.1s ease",
                                            userSelect: "none",
                                        }}
                                    >
                                        <span>{item.label}</span>

                                        <span
                                            aria-hidden="true"
                                            style={{
                                                color:
                                                    "#6B6560",
                                                fontSize:
                                                    "10px",
                                            }}
                                        >
                                            ↗
                                        </span>
                                    </button>
                                ) : (
                                    <div
                                        role="presentation"
                                        style={{
                                            display: "flex",
                                            alignItems:
                                                "center",
                                            justifyContent:
                                                "space-between",
                                            padding: "6px 12px",
                                            color: "#6B6560",
                                            borderRadius: "6px",
                                            fontFamily: isHeading
                                                ? "var(--font-playfair)"
                                                : "-apple-system, BlinkMacSystemFont, system-ui",
                                            fontSize: isHeading
                                                ? "13px"
                                                : "12px",
                                            fontStyle: isHeading
                                                ? "italic"
                                                : "normal",
                                            fontWeight: isHeading
                                                ? 400
                                                : 300,
                                            userSelect: "none",
                                        }}
                                    >
                                        {item.label}
                                    </div>
                                )}

                                {item.dividerAfter && (
                                    <div
                                        role="separator"
                                        style={{
                                            height: "0.5px",
                                            margin: "4px 0",
                                            backgroundColor:
                                                "rgba(28,25,23,0.10)",
                                        }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
