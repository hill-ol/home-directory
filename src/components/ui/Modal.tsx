"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useRef } from "react";
import { useDialogA11y } from "@/hooks/useDialogA11y";
import { color, font, hairline, line, surface } from "@/lib/theme";

/*
 * The plain dialog shell: scrim, centred panel, close button, title.
 *
 * `useDialogA11y` supplies the scroll lock, the Tab trap, Escape, and focus
 * returning to whatever opened it.
 *
 * PosterImage and ProjectOverlay keep their own shells on purpose. Their
 * animation is the point (one scales out of a measured DOMRect), so folding
 * them in here would mean a prop for every difference.
 */
export default function Modal({
    open,
    onClose,
    title,
    closeLabel,
    closeOnBackdrop = false,
    width = "760px",
    children,
}: {
    open: boolean;
    onClose: () => void;
    title: string;
    /** What a screen reader announces for the close button. */
    closeLabel: string;
    /**
     * Off by default. The poster viewer closes on a backdrop click because it
     * has nothing to lose; a stray click beside a long form does.
     */
    closeOnBackdrop?: boolean;
    width?: string;
    children: React.ReactNode;
}) {
    const dialogRef = useRef<HTMLDivElement>(null);
    const titleId = useId();

    useDialogA11y({ open, onClose, dialogRef });

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        key="modal-backdrop"
                        aria-hidden="true"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={closeOnBackdrop ? onClose : undefined}
                        style={{
                            position: "fixed",
                            inset: 0,
                            zIndex: 200,
                            backgroundColor: "rgba(28,25,23,0.88)",
                            backdropFilter: "blur(10px)",
                            WebkitBackdropFilter: "blur(10px)",
                        }}
                    />

                    {/*
                      * Centred by this flex layer rather than by
                      * translate(-50%, -50%). Framer Motion writes the
                      * panel's transform itself to animate `scale`, so a
                      * translate in `style` is silently overwritten and the
                      * panel lands off-centre.
                      */}
                    <div
                        key="modal-layer"
                        style={{
                            position: "fixed",
                            inset: 0,
                            zIndex: 201,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "16px",
                            pointerEvents: "none",
                        }}
                    >
                        <motion.div
                            ref={dialogRef}
                            key="modal-panel"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby={titleId}
                            tabIndex={-1}
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            style={{
                                position: "relative",
                                pointerEvents: "auto",
                                width: `min(${width}, 100%)`,
                                maxHeight: "86vh",
                                display: "flex",
                                flexDirection: "column",
                                overflow: "hidden",
                                backgroundColor: color.card,
                                border: hairline(line.card),
                                borderRadius: "4px",
                                boxShadow: "0 24px 80px rgba(28,25,23,0.22)",
                            }}
                        >
                            {/*
                              * Pinned to the panel, not to the scrolling
                              * body, so it stays reachable in a long form.
                              */}
                            <button
                                type="button"
                                aria-label={closeLabel}
                                onClick={onClose}
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
                                    fontFamily: font.system,
                                    fontSize: "14px",
                                    lineHeight: 1,
                                }}
                            >×</button>

                            <div style={{
                                padding: "28px",
                                overflowY: "auto",
                                display: "flex",
                                flexDirection: "column",
                                gap: "16px",
                            }}>
                                <h2 id={titleId} style={{
                                    fontFamily: font.display,
                                    fontSize: "24px",
                                    fontWeight: 400,
                                    color: color.ink,
                                    margin: 0,
                                    lineHeight: 1.2,
                                }}>{title}</h2>

                                {children}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
