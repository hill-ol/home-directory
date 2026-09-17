"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
    type MouseEvent as ReactMouseEvent,
    useCallback,
    useRef,
    useState,
} from "react";

import type { ResearchEntry } from "@/content/research";
import { useDialogA11y } from "@/hooks/useDialogA11y";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { color, hairline, line, surface } from "@/lib/theme";

function ClosePosterButton({
    onClose,
}: {
    onClose: () => void;
}) {
    return (
        <button
            type="button"
            aria-label="Close poster viewer"
            onClick={(event) => {
                event.stopPropagation();
                onClose();
            }}
            style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                zIndex: 4,
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
                cursor: "pointer",
                color: color.ink,
                backgroundColor: surface.panel,
                border: "none",
                borderRadius: "50%",
            }}
        >
            <svg
                aria-hidden="true"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
            >
                <path
                    d="M1 1l10 10M11 1L1 11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
            </svg>
        </button>
    );
}

export default function PosterImage({
    entry,
}: {
    entry: ResearchEntry;
}) {
    const [hovered, setHovered] = useState(false);
    const [zoomed, setZoomed] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({
        x: 50,
        y: 50,
    });

    const dialogRef = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery("(max-width: 767px)");

    const closeZoom = useCallback(() => {
        setZoomed(false);
    }, []);

    useDialogA11y({
        open: zoomed,
        onClose: closeZoom,
        dialogRef,
    });

    const handleMouseMove = (
        event: ReactMouseEvent<HTMLDivElement>,
    ) => {
        const bounds =
            event.currentTarget.getBoundingClientRect();

        const x =
            ((event.clientX - bounds.left) / bounds.width) *
            100;

        const y =
            ((event.clientY - bounds.top) / bounds.height) *
            100;

        setZoomPosition({ x, y });
    };

    const posterAlt = `${entry.title} research poster`;

    return (
        <>
            {/*
             * A semantic button provides Enter and Space keyboard support
             * automatically. Reset its native styles so it still looks like
             * the original poster card.
             */}
            <button
                type="button"
                aria-haspopup="dialog"
                aria-label={`Open ${entry.title} poster`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onFocus={() => setHovered(true)}
                onBlur={() => setHovered(false)}
                onClick={() => setZoomed(true)}
                style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16 / 9",
                    display: "block",
                    marginBottom: "10px",
                    padding: 0,
                    cursor: "zoom-in",
                    background: "none",
                    border: "none",
                    borderRadius: "6px",
                    transform: hovered
                        ? "scale(1.02)"
                        : "scale(1)",
                    transition: "transform 0.3s ease",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        overflow: "hidden",
                        backgroundColor: color.imagePlaceholder,
                        border: hairline(line.card),
                        borderRadius: "6px",
                    }}
                >
                    <Image
                        src={entry.poster}
                        alt={posterAlt}
                        fill
                        sizes="(max-width: 900px) 100vw, 900px"
                        style={{
                            objectFit: "contain",
                            pointerEvents: "none",
                        }}
                    />
                </div>

                {/* Desktop zoom prompt */}
                <div
                    aria-hidden="true"
                    className="hidden md:flex"
                    style={{
                        position: "absolute",
                        right: "12px",
                        bottom: "12px",
                        zIndex: 3,
                        alignItems: "center",
                        gap: "5px",
                        padding: "5px 10px",
                        pointerEvents: "none",
                        backgroundColor:
                            surface.bar,
                        backdropFilter: "blur(8px)",
                        border: hairline(line.card),
                        borderRadius: "20px",
                        opacity: hovered ? 1 : 0,
                        transform: hovered
                            ? "translateY(0)"
                            : "translateY(4px)",
                        transition:
                            "opacity 0.15s ease, transform 0.15s ease",
                    }}
                >
                    <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={color.inkMuted}
                        strokeWidth="2"
                        strokeLinecap="round"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                        <path d="M11 8v6M8 11h6" />
                    </svg>

                    <span
                        style={{
                            color: color.inkSecondary,
                            fontFamily: "monospace",
                            fontSize: "9px",
                            whiteSpace: "nowrap",
                        }}
                    >
                        click to zoom
                    </span>
                </div>

                <div
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        zIndex: 2,
                        padding: "3px 8px",
                        color: "#7A2D5A",
                        backgroundColor: color.pink,
                        borderRadius: "3px",
                        fontFamily: "monospace",
                        fontSize: "9px",
                    }}
                >
                    {entry.posterLabel}
                </div>

                {entry.award && (
                    <div
                        aria-hidden="true"
                        style={{
                            position: "absolute",
                            bottom: "12px",
                            left: "12px",
                            zIndex: 2,
                            padding: "3px 10px",
                            color: "#633806",
                            backgroundColor: "#FAC775",
                            borderRadius: "3px",
                            fontFamily: "monospace",
                            fontSize: "9px",
                        }}
                    >
                        {entry.award}
                    </div>
                )}
            </button>

            <AnimatePresence>
                {zoomed && (
                    <>
                        <motion.div
                            key="poster-backdrop"
                            aria-hidden="true"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={closeZoom}
                            style={{
                                position: "fixed",
                                inset: 0,
                                zIndex: 200,
                                backgroundColor:
                                    "rgba(28,25,23,0.88)",
                                backdropFilter: "blur(10px)",
                                WebkitBackdropFilter:
                                    "blur(10px)",
                            }}
                        />

                        {isMobile ? (
                            <motion.div
                                ref={dialogRef}
                                key="poster-mobile-dialog"
                                role="dialog"
                                aria-modal="true"
                                aria-label={`${entry.title} poster viewer`}
                                tabIndex={-1}
                                initial={{
                                    opacity: 0,
                                    scale: 0.96,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.96,
                                }}
                                transition={{
                                    duration: 0.25,
                                    ease: [0.32, 0.72, 0, 1],
                                }}
                                onClick={closeZoom}
                                style={{
                                    position: "fixed",
                                    inset: 0,
                                    zIndex: 201,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "24px",
                                }}
                            >
                                <ClosePosterButton
                                    onClose={closeZoom}
                                />

                                <div
                                    style={{
                                        width: "100%",
                                        overflow: "hidden",
                                        backgroundColor:
                                            color.imagePlaceholder,
                                        borderRadius: "8px",
                                        boxShadow:
                                            "0 16px 48px rgba(28,25,23,0.5)",
                                    }}
                                >
                                    <Image
                                        src={entry.poster}
                                        alt={posterAlt}
                                        width={entry.posterWidth}
                                        height={entry.posterHeight}
                                        sizes="calc(100vw - 48px)"
                                        style={{
                                            display: "block",
                                            width: "100%",
                                            height: "auto",
                                            pointerEvents: "none",
                                            userSelect: "none",
                                        }}
                                    />
                                </div>

                                <div
                                    aria-hidden="true"
                                    style={{
                                        position: "absolute",
                                        bottom: "40px",
                                        left: "50%",
                                        padding: "6px 16px",
                                        color: color.inkSecondary,
                                        backgroundColor:
                                            surface.panel,
                                        borderRadius: "20px",
                                        fontFamily: "monospace",
                                        fontSize: "10px",
                                        transform:
                                            "translateX(-50%)",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    tap to close
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                ref={dialogRef}
                                key="poster-desktop-dialog"
                                role="dialog"
                                aria-modal="true"
                                aria-label={`${entry.title} poster viewer`}
                                tabIndex={-1}
                                initial={{
                                    opacity: 0,
                                    scale: 0.94,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.94,
                                }}
                                transition={{
                                    duration: 0.25,
                                    ease: [0.32, 0.72, 0, 1],
                                }}
                                onMouseMove={handleMouseMove}
                                onClick={closeZoom}
                                style={{
                                    position: "fixed",
                                    top: "50vh",
                                    left: "50vw",
                                    zIndex: 201,
                                    width: "min(92vw, 1100px)",
                                    aspectRatio: "16 / 9",
                                    marginTop:
                                        "calc(min(92vw, 1100px) * -9 / 32)",
                                    marginLeft:
                                        "calc(min(92vw, 1100px) * -1 / 2)",
                                    overflow: "hidden",
                                    cursor: "zoom-out",
                                    backgroundColor:
                                        color.imagePlaceholder,
                                    borderRadius: "8px",
                                    boxShadow:
                                        "0 32px 80px rgba(28,25,23,0.6)",
                                }}
                            >
                                <ClosePosterButton
                                    onClose={closeZoom}
                                />

                                <Image
                                    src={entry.poster}
                                    alt={posterAlt}
                                    width={entry.posterWidth}
                                    height={entry.posterHeight}
                                    sizes="230vw"
                                    style={{
                                        position: "absolute",
                                        top: `${-zoomPosition.y * 1.5}%`,
                                        left: `${-zoomPosition.x * 1.5}%`,
                                        width: "250%",
                                        maxWidth: "none",
                                        height: "250%",
                                        objectFit: "contain",
                                        pointerEvents: "none",
                                        userSelect: "none",
                                    }}
                                />

                                <div
                                    aria-hidden="true"
                                    style={{
                                        position: "absolute",
                                        top: "14px",
                                        right: "54px",
                                        zIndex: 3,
                                        padding: "4px 12px",
                                        color: color.inkSecondary,
                                        backgroundColor:
                                            surface.panel,
                                        borderRadius: "20px",
                                        fontFamily: "monospace",
                                        fontSize: "9px",
                                        pointerEvents: "none",
                                    }}
                                >
                                    move to pan · click to close
                                </div>
                            </motion.div>
                        )}
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
