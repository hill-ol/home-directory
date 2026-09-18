"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

import CourseworkCover from "@/components/coursework/CourseworkCover";
import SemesterPage, {
    LINE_HEIGHT,
} from "@/components/coursework/SemesterPage";
import { bio } from "@/content/bio";
import { semesters } from "@/content/coursework";
import { accentText, hoverSwap } from "@/lib/hover";
import { color, font, hairline, line } from "@/lib/theme";

/** Desktop tab width, height, and the overlap between stacked tabs. */
const TW = 32;
const TH = 100;
const TO = 20;

const pageVariants = {
    enter:  (d: number) => ({ x: d > 0 ?  48 : -48, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d: number) => ({ x: d > 0 ? -48 :  48, opacity: 0 }),
};

export default function CourseworkPage() {
    const [activeIdx, setActiveIdx] = useState<number | null>(null);
    const [direction, setDirection] = useState(1);

    const go = (idx: number) => {
        setDirection(activeIdx === null ? 1 : idx > activeIdx ? 1 : -1);
        setActiveIdx(idx);
    };

    const active = activeIdx !== null ? semesters[activeIdx] : null;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <main style={{ minHeight: "100vh", backgroundColor: color.cream, paddingTop: "80px", paddingBottom: "96px" }}>
                <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 24px" }}>

                    <Link href="/readme" style={{
                        fontFamily: font.system,
                        fontSize: "12px", color: color.inkSecondary, textDecoration: "none",
                        display: "inline-flex", alignItems: "center", gap: "6px",
                        marginBottom: "48px", transition: "color .2s",
                    }}
                          {...accentText}
                    >← back to readme</Link>

                    <div style={{ marginBottom: "48px" }}>
                        <div style={{ fontFamily: font.system, fontSize: "10px", color: color.pinkText, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "12px" }}>coursework/</div>
                        <h1 style={{ fontFamily: font.display, fontSize: "clamp(32px,5vw,48px)", fontWeight: 400, color: color.ink, lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 12px 0" }}>Coursework</h1>
                        <p style={{ fontFamily: font.body, fontSize: "13px", fontWeight: 300, color: color.inkSecondary, lineHeight: 1.7, margin: 0 }}>{`${bio.majors.join(" and ")} combined major · ${bio.school} · ${bio.gradClass}`}</p>
                    </div>

                    {/* ── MOBILE ── */}
                    <div className="block md:hidden">
                        {/* Scrolling pill tabs */}
                        <div style={{ marginBottom: "20px" }}>
                            <div style={{
                                display: "flex", gap: "8px",
                                overflowX: "auto", paddingBottom: "8px",
                                scrollbarWidth: "thin",
                                scrollbarColor: `${color.pinkText} ${color.surfaceSunken}`,
                            }} className="pill-scroll">
                                <style>{`
                  .pill-scroll::-webkit-scrollbar { height: 3px; }
                  .pill-scroll::-webkit-scrollbar-track { background: ${color.surfaceSunken}; border-radius: 2px; }
                  .pill-scroll::-webkit-scrollbar-thumb { background: ${color.pink}; border-radius: 2px; }
                `}</style>
                                {semesters.map((sem, idx) => {
                                    const isActive = activeIdx === idx;
                                    return (
                                        <button
                                            key={sem.id}
                                            onClick={() => go(idx)}
                                            style={{
                                                flexShrink: 0,
                                                padding: "6px 14px",
                                                borderRadius: "20px",
                                                border: `0.5px solid ${isActive ? sem.darkColor : line.card}`,
                                                backgroundColor: isActive ? sem.color : "transparent",
                                                fontFamily: isActive ? font.display : font.system,
                                                fontStyle: isActive ? "italic" : "normal",
                                                fontSize: "12px",
                                                color: isActive ? sem.darkColor : color.inkSecondary,
                                                cursor: "pointer",
                                                transition: "all 0.2s ease",
                                                whiteSpace: "nowrap",
                                            }}
                                        >{sem.label}</button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Mobile content */}
                        <AnimatePresence mode="wait" custom={direction}>
                            {active === null ? (
                                <motion.div
                                    key="cover-mobile"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    style={{
                                        backgroundColor: color.card,
                                        border: hairline(line.card),
                                        borderRadius: "8px",
                                        padding: "40px 24px",
                                        textAlign: "center",
                                        display: "flex", flexDirection: "column",
                                        alignItems: "center", gap: "16px",
                                    }}
                                >
                                    <CourseworkCover variant="mobile" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key={active.id + "-mobile"}
                                    custom={direction}
                                    variants={pageVariants}
                                    initial="enter" animate="center" exit="exit"
                                    transition={{ duration: 0.28, ease: "easeOut" }}
                                    style={{
                                        backgroundColor: color.card,
                                        border: hairline(line.card),
                                        borderRadius: "8px",
                                        overflow: "hidden",
                                        position: "relative",
                                    }}
                                >
                                    <SemesterPage semester={active} variant="mobile" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* ── DESKTOP: binder ── */}
                    <div className="hidden md:block">
                        <div style={{ position: "relative" }}>
                            <div style={{ display: "flex", alignItems: "stretch", filter: "drop-shadow(0 8px 32px rgba(28,25,23,0.13)) drop-shadow(0 2px 8px rgba(28,25,23,0.07))" }}>

                                {/* Spine */}
                                <div style={{ width: "28px", background: `linear-gradient(90deg,${color.pinkDark},${color.pink})`, borderRadius: "8px 0 0 8px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "32px", flexShrink: 0 }}>
                                    {[0,1,2].map(i => <div key={i} style={{ width: "15px", height: "15px", borderRadius: "50%", border: "2px solid rgba(255,255,255,.7)", backgroundColor: "rgba(255,255,255,.15)" }}/>)}
                                </div>

                                {/* Depth layers — a two step ramp, each one further back and darker */}
                                <div style={{ position: "absolute", top: "6px", left: "28px", right: "-5px", bottom: "-6px", backgroundColor: color.surfaceSunken, borderRadius: "0 8px 8px 0", zIndex: 0 }}/>
                                <div style={{ position: "absolute", top: "3px", left: "28px", right: "-2px", bottom: "-3px", backgroundColor: color.surfaceSunken, borderRadius: "0 8px 8px 0", zIndex: 0 }}/>

                                {/* Body */}
                                <div style={{ flex: 1, backgroundColor: color.card, border: hairline(line.card), borderLeft: "none", borderRadius: "0 8px 8px 0", position: "relative", minHeight: "640px", zIndex: 1 }}>

                                    {/* Clipped content */}
                                    <div style={{ overflow: "hidden", borderRadius: "0 8px 8px 0", minHeight: "640px", position: "relative" }}>
                                        <AnimatePresence mode="wait" custom={direction}>
                                            {active === null ? (
                                                <motion.div key="cover"
                                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                            transition={{ duration: 0.25 }}
                                                            style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "24px", padding: "48px", textAlign: "center" }}
                                                >
                                                    <CourseworkCover variant="desktop" />
                                                </motion.div>
                                            ) : (
                                                <motion.div key={active.id}
                                                            custom={direction}
                                                            variants={pageVariants}
                                                            initial="enter" animate="center" exit="exit"
                                                            transition={{ duration: 0.28, ease: "easeOut" }}
                                                            style={{ position: "absolute", inset: 0, overflowY: "auto", paddingLeft: "52px", paddingRight: "32px", paddingTop: 0, paddingBottom: `${LINE_HEIGHT * 2}px` }}
                                                >
                                                    <SemesterPage semester={active} variant="desktop" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Desktop tabs */}
                                    <div style={{ position: "absolute", top: "24px", right: `-${TW + 1}px`, display: "flex", flexDirection: "column", zIndex: 10 }}>
                                        {semesters.map((sem, idx) => {
                                            const isActive = activeIdx === idx;
                                            return (
                                                <div key={sem.id} style={{ marginTop: idx === 0 ? 0 : `-${TO}px`, zIndex: isActive ? 20 : semesters.length - idx, position: "relative" }}>
                                                    <button
                                                        onClick={() => go(idx)}
                                                        style={{
                                                            width: `${TW}px`, height: `${TH}px`,
                                                            backgroundColor: isActive ? sem.color : `${sem.color}70`,
                                                            border: "none",
                                                            borderTop: `0.5px solid ${isActive ? sem.darkColor : line.tile}`,
                                                            borderRight: `0.5px solid ${isActive ? sem.darkColor : line.tile}`,
                                                            borderBottom: `0.5px solid ${isActive ? sem.darkColor : line.tile}`,
                                                            borderLeft: "none",
                                                            borderRadius: "0 6px 6px 0",
                                                            cursor: "pointer",
                                                            display: "flex", alignItems: "center", justifyContent: "center",
                                                            transition: "all .2s ease",
                                                            boxShadow: isActive ? `2px 0 10px ${sem.color}50` : "1px 0 4px rgba(28,25,23,.06)",
                                                        }}
                                                        {...(isActive
                                                            ? {}
                                                            : hoverSwap(
                                                                { backgroundColor: `${sem.color}95` },
                                                                { backgroundColor: `${sem.color}70` },
                                                            ))}
                                                    >
                            <span style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <span style={{ fontFamily: font.system, fontSize: "10px", fontWeight: 300, color: sem.darkColor, writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)", letterSpacing: "0.04em", whiteSpace: "nowrap", position: "absolute", opacity: isActive ? 0 : 1, transition: "opacity 0.4s ease" }}>
                                {sem.label}
                              </span>
                              <span style={{ fontFamily: font.display, fontStyle: "italic", fontSize: "10px", fontWeight: 400, color: sem.darkColor, writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)", letterSpacing: "0.04em", whiteSpace: "nowrap", opacity: isActive ? 1 : 0, transition: "opacity 0.4s ease" }}>
                                {sem.label}
                              </span>
                            </span>
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </motion.div>
    );
}
