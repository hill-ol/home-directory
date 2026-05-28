"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const semesters = [
    {
        id: "fall2024",
        label: "Fall 2024",
        vibe: "the beginning",
        location: "Boston",
        color: "#F0A8CF",
        darkColor: "#D47BAD",
        courses: [
            { name: "CS 1802 Fundamentals of Computer Science I",           note: "where it all started"              },
            { name: "PHIL 1145 Technology and Human Values",     note: "asking why before asking how"      },
            { name: "INSH 1600 Cultures of London",           note: "studied this one from London"      },
            { name: "CS 1800 Discrete Structures",         note: "first taste of mathematical proof" },
        ],
    },
    {
        id: "spring2025",
        label: "Spring 2025",
        vibe: "finding my footing",
        location: "Oakland",
        color: "#A8D4C8",
        darkColor: "#6AAFA0",
        courses: [
            { name: "CS 2510 Fundamentals of Computer Science II",                       note: "data structures clicked here"       },
            { name: "CY 2550 Foundations of Cybersecurity",            note: "threat models and defense thinking" },
            { name: "MATH 2341 Differential Equations & Linear Algebra",  note: "the semester that humbled me"      },
            { name: "CS 3200 Introduction to Databases",               note: "first real project with SQL"        },
        ],
    },
    {
        id: "summer2025",
        label: "Summer 2025",
        vibe: "full send",
        location: "Budapest",
        color: "#F5C8A0",
        darkColor: "#D4926A",
        courses: [
            { name: "PHYS 1151 Physics for Engineering I",                         note: "quantum context made this hit different" },
            { name: "MATH 3527 Number Theory I",                     note: "beautiful and useless in the best way"   },
            { name: "MATH 3081 Probability & Statistics",          note: "now I actually understand p-values"      },
            { name: "MATH 3090 Exploration of Modern Mathematics", note: "math can be playful"                     },
            { name: "MATH 2321 Calculus III for Science and Engineering",                        note: "gradients, surfaces, and suffering"      },
        ],
    },
    {
        id: "fall2025",
        label: "Fall 2025",
        vibe: "leveling up",
        location: "Boston",
        color: "#C8B8E8",
        darkColor: "#9B84C8",
        courses: [
            { name: "CS 5800 Algorithms",         note: "made me think like an engineer"          },
            { name: "CS 3950 Introduction to CS Research",         note: "made me think like an engineer"          },
            { name: "MATH 2331 Linear Algebra",               note: "SVD, eigenvalues, the whole thing"       },
            { name: "CS 3100 Program Design & Implementation II",  note: "Java, design patterns, SOLID principles" },
        ],
    },
    {
        id: "spring2026",
        label: "Spring 2026",
        vibe: "in it now",
        location: "Boston",
        color: "#D47BAD",
        darkColor: "#A8547E",
        courses: [
            { name: "CS 4550 Web Development",                     note: "built StyleBoard in this one"           },
            { name: "MATH 3175 Group Theory",                        note: "abstract algebra is genuinely beautiful" },
            { name: "CS 4535 Professional Practicum Capstone",                note: "agile, testing, the real stuff"         },
            { name: "MISM 2301 Introduction to Information Systems and Digital Technology", note: "MISM crossover"                        },
        ],
    },
];

const L  = 28;
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
            <main style={{ minHeight: "100vh", backgroundColor: "#F2EDE4", paddingTop: "80px", paddingBottom: "80px" }}>
                <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 40px" }}>

                    <Link href="/readme" style={{
                        fontFamily: "-apple-system,BlinkMacSystemFont,system-ui",
                        fontSize: "12px", color: "#A89E99", textDecoration: "none",
                        display: "inline-flex", alignItems: "center", gap: "6px",
                        marginBottom: "48px", transition: "color .2s",
                    }}
                          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#F0A8CF")}
                          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "#A89E99")}
                    >← back to readme</Link>

                    <div style={{ marginBottom: "48px" }}>
                        <div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,system-ui", fontSize: "10px", color: "#F0A8CF", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "12px" }}>coursework/</div>
                        <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(32px,5vw,48px)", fontWeight: 400, color: "#1C1917", lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 12px 0" }}>Coursework</h1>
                        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", fontWeight: 300, color: "#6B6560", lineHeight: 1.7, margin: 0 }}>Computer Science and Mathematics combined major · Northeastern University · Class of 2028</p>
                    </div>

                    <div style={{ position: "relative" }}>
                        <div style={{ display: "flex", alignItems: "stretch", filter: "drop-shadow(0 8px 32px rgba(28,25,23,0.13)) drop-shadow(0 2px 8px rgba(28,25,23,0.07))" }}>

                            {/* Spine */}
                            <div style={{ width: "28px", background: "linear-gradient(90deg,#D47BAD,#F0A8CF)", borderRadius: "8px 0 0 8px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "32px", flexShrink: 0 }}>
                                {[0,1,2].map(i => <div key={i} style={{ width: "15px", height: "15px", borderRadius: "50%", border: "2px solid rgba(255,255,255,.7)", backgroundColor: "rgba(255,255,255,.15)" }}/>)}
                            </div>

                            {/* Depth layers */}
                            <div style={{ position: "absolute", top: "6px", left: "28px", right: "-5px", bottom: "-6px", backgroundColor: "#E8E3D8", borderRadius: "0 8px 8px 0", zIndex: 0 }}/>
                            <div style={{ position: "absolute", top: "3px", left: "28px", right: "-2px", bottom: "-3px", backgroundColor: "#EDE8DF", borderRadius: "0 8px 8px 0", zIndex: 0 }}/>

                            {/* Body */}
                            <div style={{ flex: 1, backgroundColor: "#FAF7F2", border: "0.5px solid rgba(28,25,23,.10)", borderLeft: "none", borderRadius: "0 8px 8px 0", position: "relative", minHeight: "640px", zIndex: 1 }}>

                                {/* Clipped content */}
                                <div style={{ overflow: "hidden", borderRadius: "0 8px 8px 0", minHeight: "640px", position: "relative" }}>
                                    <AnimatePresence mode="wait" custom={direction}>

                                        {activeIdx === null ? (
                                            <motion.div key="cover"
                                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                        transition={{ duration: 0.25 }}
                                                        style={{
                                                            position: "absolute", inset: 0,
                                                            display: "flex", flexDirection: "column",
                                                            alignItems: "center", justifyContent: "center",
                                                            gap: "24px", padding: "48px",
                                                            textAlign: "center",
                                                        }}
                                            >
                                                <svg width="200" height="100" viewBox="0 0 200 100" fill="none">
                                                    <line x1="100" y1="8" x2="100" y2="92" stroke="#D3CEC9" strokeWidth="0.5" strokeDasharray="4 3"/>
                                                    <circle cx="28" cy="50" r="6" fill="none" stroke="#F0A8CF" strokeWidth="1.5"/>
                                                    <circle cx="52" cy="30" r="6" fill="none" stroke="#F0A8CF" strokeWidth="1.5"/>
                                                    <circle cx="52" cy="70" r="6" fill="none" stroke="#F0A8CF" strokeWidth="1.5"/>
                                                    <circle cx="76" cy="50" r="6" fill="none" stroke="#F0A8CF" strokeWidth="1.5"/>
                                                    <line x1="34" y1="46" x2="46" y2="34" stroke="#F0A8CF" strokeWidth="1"/>
                                                    <line x1="34" y1="54" x2="46" y2="66" stroke="#F0A8CF" strokeWidth="1"/>
                                                    <line x1="58" y1="30" x2="70" y2="46" stroke="#F0A8CF" strokeWidth="1"/>
                                                    <line x1="58" y1="70" x2="70" y2="54" stroke="#F0A8CF" strokeWidth="1"/>
                                                    <circle cx="28" cy="50" r="2" fill="#F0A8CF"/>
                                                    <circle cx="52" cy="30" r="2" fill="#F0A8CF"/>
                                                    <circle cx="52" cy="70" r="2" fill="#F0A8CF"/>
                                                    <circle cx="76" cy="50" r="2" fill="#F0A8CF"/>
                                                    <text x="14" y="22" fontFamily="monospace" fontSize="8" fill="#D3CEC9">01</text>
                                                    <text x="72" y="22" fontFamily="monospace" fontSize="8" fill="#D3CEC9">10</text>
                                                    <text x="14" y="82" fontFamily="monospace" fontSize="8" fill="#D3CEC9">11</text>
                                                    <text x="72" y="82" fontFamily="monospace" fontSize="8" fill="#D3CEC9">00</text>
                                                    <path d="M112,50 Q120,28 128,50 Q136,72 144,50 Q152,28 160,50 Q168,72 176,50 Q184,28 192,50" stroke="#D47BAD" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                                                    <line x1="110" y1="50" x2="194" y2="50" stroke="#D3CEC9" strokeWidth="0.5"/>
                                                    <text x="114" y="22" fontFamily="Georgia,serif" fontStyle="italic" fontSize="12" fill="#D3CEC9">∫</text>
                                                    <text x="128" y="22" fontFamily="Georgia,serif" fontStyle="italic" fontSize="12" fill="#D3CEC9">∂</text>
                                                    <text x="143" y="22" fontFamily="Georgia,serif" fontStyle="italic" fontSize="12" fill="#D3CEC9">∑</text>
                                                    <text x="158" y="22" fontFamily="Georgia,serif" fontStyle="italic" fontSize="12" fill="#D3CEC9">π</text>
                                                    <text x="135" y="88" fontFamily="Georgia,serif" fontStyle="italic" fontSize="10" fill="#A89E99">f(x) = sin(x)</text>
                                                </svg>

                                                <div>
                                                    <div style={{ fontFamily: "var(--font-playfair)", fontSize: "28px", fontWeight: 400, color: "#1C1917", marginBottom: "10px" }}>Olivia Hill</div>
                                                    <div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,system-ui", fontSize: "12px", color: "#6B6560", letterSpacing: "0.04em", lineHeight: 2 }}>
                                                        Computer Science<br/>Mathematics<br/>Northeastern University
                                                    </div>
                                                </div>

                                                <div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,system-ui", fontSize: "10px", color: "#A89E99", letterSpacing: "0.05em" }}>
                                                    select a semester →
                                                </div>
                                            </motion.div>

                                        ) : (
                                            <motion.div key={active!.id}
                                                        custom={direction}
                                                        variants={pageVariants}
                                                        initial="enter" animate="center" exit="exit"
                                                        transition={{ duration: 0.28, ease: "easeOut" }}
                                                        style={{
                                                            position: "absolute", inset: 0,
                                                            overflowY: "auto",
                                                            paddingLeft: "52px",
                                                            paddingRight: "32px",
                                                            paddingTop: `0`,
                                                            paddingBottom: `${L * 2}px`,
                                                        }}
                                            >
                                                {/* Lined paper */}
                                                <div style={{
                                                    position: "absolute", inset: 0,
                                                    backgroundImage: `repeating-linear-gradient(transparent,transparent ${L-1}px,rgba(28,25,23,0.06) ${L-1}px,rgba(28,25,23,0.06) ${L}px)`,
                                                    backgroundSize: `100% ${L}px`,
                                                    pointerEvents: "none",
                                                }}/>
                                                {/* Margin line */}
                                                <div style={{ position: "absolute", top: 0, bottom: 0, left: "40px", width: "1px", backgroundColor: `${active!.color}50`, pointerEvents: "none" }}/>

                                                {/* Header — 2 lines, text aligned to bottom of second line */}
                                                <div style={{ height: `${L * 2}px`, display: "flex", alignItems: "flex-end", paddingBottom: "5px" }}>
                                                    <span style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", fontSize: "20px", color: active!.darkColor, marginRight: "10px" }}>{active!.label}</span>
                                                    <span style={{ fontFamily: "-apple-system,BlinkMacSystemFont,system-ui", fontSize: "10px", color: "#A89E99", letterSpacing: "0.04em" }}>{active!.vibe} · {active!.location}</span>
                                                </div>

                                                {/* Spacer */}
                                                <div style={{ height: `${L}px` }}/>

                                                {/* Courses */}
                                                {active!.courses.map((course, i) => (
                                                    <motion.div key={course.name}
                                                                initial={{ opacity: 0, x: -6 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: i * 0.07, duration: 0.22 }}
                                                    >
                                                        <div style={{ height: `${L}px`, display: "flex", alignItems: "center", fontFamily: "var(--font-dm-sans)", fontSize: "13px", fontWeight: 400, color: "#1C1917" }}>
                                                            {course.name}
                                                        </div>
                                                        <div style={{ height: `${L}px`, display: "flex", alignItems: "center", fontFamily: "var(--font-playfair)", fontStyle: "italic", fontSize: "11px", color: "#A89E99" }}>
                                                            {course.note}
                                                        </div>
                                                        <div style={{ height: `${L}px` }}/>
                                                    </motion.div>
                                                ))}

                                                {/* Footer */}
                                                <div style={{ height: `${L}px`, display: "flex", alignItems: "center", borderTop: "0.5px dashed rgba(28,25,23,.10)" }}>
                                                    <span style={{ fontFamily: "-apple-system,BlinkMacSystemFont,system-ui", fontSize: "10px", color: "#A89E99", letterSpacing: "0.04em" }}>{active!.courses.length} courses</span>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Tabs */}
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
                                                        borderTop: `0.5px solid ${isActive ? sem.darkColor : "rgba(28,25,23,.08)"}`,
                                                        borderRight: `0.5px solid ${isActive ? sem.darkColor : "rgba(28,25,23,.08)"}`,
                                                        borderBottom: `0.5px solid ${isActive ? sem.darkColor : "rgba(28,25,23,.08)"}`,
                                                        borderLeft: "none",
                                                        borderRadius: "0 6px 6px 0",
                                                        cursor: "pointer",
                                                        display: "flex", alignItems: "center", justifyContent: "center",
                                                        transition: "all .2s ease",
                                                        boxShadow: isActive ? `2px 0 10px ${sem.color}50` : "1px 0 4px rgba(28,25,23,.06)",
                                                    }}
                                                    onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = `${sem.color}95`; }}
                                                    onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = `${sem.color}70`; }}
                                                >
                          <span style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {/* DM Sans — fades out when active */}
                              <span style={{
                                  fontFamily: "-apple-system,BlinkMacSystemFont,system-ui",
                                  fontSize: "10px", fontWeight: 300,
                                  color: sem.darkColor,
                                  writingMode: "vertical-rl",
                                  textOrientation: "mixed",
                                  transform: "rotate(180deg)",
                                  letterSpacing: "0.04em",
                                  whiteSpace: "nowrap",
                                  position: "absolute",
                                  opacity: isActive ? 0 : 1,
                                  transition: "opacity 0.4s ease",
                              }}>
                              {sem.label}
                            </span>
                              {/* Playfair italic — fades in when active */}
                              <span style={{
                                  fontFamily: "var(--font-playfair)",
                                  fontStyle: "italic",
                                  fontSize: "10px", fontWeight: 400,
                                  color: sem.darkColor,
                                  writingMode: "vertical-rl",
                                  textOrientation: "mixed",
                                  transform: "rotate(180deg)",
                                  letterSpacing: "0.04em",
                                  whiteSpace: "nowrap",
                                  opacity: isActive ? 1 : 0,
                                  transition: "opacity 0.4s ease",
                              }}>
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
            </main>
        </motion.div>
    );
}