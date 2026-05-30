"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import PassportStamps from "@/components/PassportStamps";

const currently = [
    { field: "building",  value: "this portfolio"           },
    { field: "reading",   value: "Frankenstein & Cleopatra" },
    { field: "listening", value: "Lorde"                    },
    { field: "wearing",   value: "new work bag"              },
    { field: "eating",    value: "peanut butter pretzels"   },
    { field: "watching",  value: "Claude YouTube videos"    },
];

const contact = [
    { label: "Email",    href: "mailto:hill.ol@northeastern.edu",      display: "hill.ol@northeastern.edu"     },
    { label: "LinkedIn", href: "https://linkedin.com/in/olivia-hill0", display: "linkedin.com/in/olivia-hill0" },
    { label: "GitHub",   href: "https://github.com/hill-ol",           display: "github.com/hill-ol"           },
    { label: "Resume",   href: "/resume_2026.pdf",                     display: "resume_2026.pdf"              },
];

const neofetch = [
    { key: "OS",        value: "Northeastern University",         isUptime: false, isTypewriter: false },
    { key: "Host",      value: "CS + Math, Class of 2028",        isUptime: false, isTypewriter: false },
    { key: "Uptime",    value: "",                                isUptime: true,  isTypewriter: false },
    { key: "Shell",     value: "TypeScript · Python",             isUptime: false, isTypewriter: false },
    { key: "Editor",    value: "VS Code",                         isUptime: false, isTypewriter: false },
    { key: "Location",  value: "Boston, MA",                      isUptime: false, isTypewriter: false },
    { key: "Status",    value: "on co-op @ Chewy",                isUptime: false, isTypewriter: false },
    { key: "Interests", value: "fashion · traveling · running",   isUptime: false, isTypewriter: true  },
];

function UptimeCounter() {
    const [uptime, setUptime] = useState("");
    useEffect(() => {
        const start = new Date("2024-09-01");
        const update = () => {
            const now = new Date();
            const diff = now.getTime() - start.getTime();
            const years  = Math.floor(diff / (365.25 * 24 * 3600 * 1000));
            const months = Math.floor((diff % (365.25 * 24 * 3600 * 1000)) / (30.44 * 24 * 3600 * 1000));
            const days   = Math.floor((diff % (30.44 * 24 * 3600 * 1000)) / (24 * 3600 * 1000));
            setUptime(`${years} years, ${months} months, ${days} days`);
        };
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, []);
    return <span style={{ color: "#F0A8CF" }}>{uptime}</span>;
}

function TypewriterText({ text, delay = 800 }: { text: string; delay?: number }) {
    const [displayed, setDisplayed] = useState("");
    const [done, setDone] = useState(false);
    const indexRef = useRef(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                if (indexRef.current < text.length) {
                    setDisplayed(text.slice(0, indexRef.current + 1));
                    indexRef.current++;
                } else {
                    setDone(true);
                    clearInterval(interval);
                }
            }, 55);
            return () => clearInterval(interval);
        }, delay);
        return () => clearTimeout(timeout);
    }, [text, delay]);

    return (
        <span>
            {displayed}
            {!done && (
                <span style={{
                    display: "inline-block",
                    width: "1px",
                    height: "12px",
                    backgroundColor: "rgba(255,255,255,0.8)",
                    marginLeft: "2px",
                    verticalAlign: "middle",
                    animation: "blink 1s step-end infinite",
                }}/>
            )}
        </span>
    );
}

export default function ReadmePage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <style>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                @keyframes cursor-blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            `}</style>

            <main style={{ minHeight: "100vh", backgroundColor: "#F2EDE4" }}>

                {/* HERO */}
                <div className="grid md:grid-cols-[2fr_3fr]" style={{ minHeight: "100vh" }}>

                    {/* Left — full bleed photo, desktop only */}
                    <div className="hidden md:block" style={{ position: "relative", minHeight: "100vh" }}>
                        <Image
                            src="/readme/Headshot.jpg"
                            alt="Olivia Hill"
                            fill
                            style={{ objectFit: "cover", objectPosition: "center top" }}
                            priority
                        />
                    </div>

                    {/* Right — bio + stamps */}
                    <div
                        className="flex flex-col justify-center"
                        style={{ padding: "120px 56px 80px 56px", gap: "20px" }}
                    >
                        {/* Mobile photo */}
                        <div className="flex md:hidden justify-center" style={{ marginBottom: "8px" }}>
                            <div style={{
                                width: "100px", height: "100px",
                                borderRadius: "50%", overflow: "hidden",
                                backgroundColor: "#E8E4DC",
                                border: "3px solid white",
                                boxShadow: "0 2px 12px rgba(28,25,23,0.10)",
                                position: "relative", flexShrink: 0,
                            }}>
                                <Image src="/readme/Headshot.jpg" alt="Olivia Hill" fill style={{ objectFit: "cover", objectPosition: "center top" }}/>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2" style={{ gap: "48px", alignItems: "start" }}>
                            {/* Bio */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, system-ui", fontSize: "10px", color: "#F0A8CF", letterSpacing: "0.06em", textTransform: "uppercase" }}>readme.md</div>
                                <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, color: "#1C1917", lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>Hi, I&apos;m Olivia.</h1>
                                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", fontWeight: 300, color: "#6B6560", lineHeight: 1.8, margin: 0 }}>
                                    I&apos;m a CS and Math student at Northeastern, currently on co-op at Chewy as a
                                    software engineer. Studying math alongside CS has changed how I approach building.
                                    It gives me stronger context for the tools I reach for and pushes me toward problems
                                    that sit at technical intersections. Outside of class, I build at Generate Product
                                    Development Studio, where I&apos;ve wrapped up my first semester shipping a trip
                                    planning app with an incredible team.
                                </p>
                                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", fontWeight: 300, color: "#6B6560", lineHeight: 1.8, margin: 0 }}>
                                    Before that I was working on full-stack projects ranging from a geographically-tagged
                                    art commission platform to a job aggregator I built to solve a problem I had myself.
                                    My math background helps here too. It&apos;s less about the coursework and more
                                    about having a framework for thinking carefully before reaching for a solution.
                                </p>
                                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", fontWeight: 300, color: "#6B6560", lineHeight: 1.8, margin: 0 }}>
                                    When I&apos;m not at my desk I&apos;m usually running, exploring Boston, reading, or
                                    planning my next trip. Open to SWE co-ops where I can work on real problems and keep
                                    learning.
                                </p>
                                <Link href="/coursework" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, system-ui", fontSize: "11px", color: "#A89E99", textDecoration: "none", marginTop: "4px", transition: "color 0.2s ease" }}
                                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#F0A8CF")}
                                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "#A89E99")}
                                >view coursework →</Link>
                            </div>

                            {/* Passport stamps — desktop only */}
                            <div className="hidden md:block" style={{ paddingTop: "40px" }}>
                                <PassportStamps />
                            </div>
                        </div>

                        {/* Passport stamps — mobile */}
                        <div className="block md:hidden">
                            <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, system-ui", fontSize: "10px", color: "#A89E99", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "16px", marginTop: "8px" }}>global scholar</div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                                {[
                                    { city: "London",   season: "Fall 2024",   color: "#C8B8E8" },
                                    { city: "Oakland",  season: "Spring 2025", color: "#F0A8CF" },
                                    { city: "Budapest", season: "Summer 2025", color: "#A8D4C8" },
                                    { city: "Boston",   season: "Fall 2025",   color: "#F5C8A0" },
                                ].map(stamp => (
                                    <div key={stamp.city} style={{ backgroundColor: stamp.color, borderRadius: "6px", padding: "12px", display: "flex", flexDirection: "column", gap: "2px" }}>
                                        <div style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", fontSize: "14px", color: "#1C1917" }}>{stamp.city}</div>
                                        <div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,system-ui", fontSize: "10px", color: "#6B6560" }}>{stamp.season}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* NEOFETCH */}
                <div style={{ padding: "64px 0", borderTop: "0.5px solid rgba(28,25,23,0.06)" }}>
                    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 24px" }}>
                        <div style={{ backgroundColor: "#D47BAD", borderRadius: "10px", overflow: "hidden" }}>
                            <div style={{ padding: "8px 14px", backgroundColor: "rgba(0,0,0,0.15)", display: "flex", alignItems: "center", gap: "6px" }}>
                                {["#FF5F57","#FEBC2E","#28C840"].map(c => (
                                    <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: c, opacity: 0.85 }}/>
                                ))}
                                <span style={{ fontFamily: "monospace", fontSize: "10px", color: "rgba(255,255,255,0.6)", marginLeft: "8px" }}>
                                    olivia@northeastern ~ neofetch
                                </span>
                            </div>
                            <div className="grid md:grid-cols-2" style={{ padding: "20px 24px", gap: "5px 40px" }}>
                                {neofetch.map(({ key, value, isUptime, isTypewriter }) => (
                                    <div key={key} style={{ fontFamily: "monospace", fontSize: "12px", color: "rgba(255,255,255,0.9)", display: "flex", gap: "8px" }}>
                                        <span style={{ minWidth: "80px", color: "rgba(255,255,255,0.5)" }}>{key}</span>
                                        {isUptime ? (
                                            <UptimeCounter />
                                        ) : isTypewriter ? (
                                            <TypewriterText text={value} delay={600} />
                                        ) : (
                                            <span>{value}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* CURRENTLY */}
                <div style={{ padding: "0 0 64px" }}>
                    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 24px" }}>
                        <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, system-ui", fontSize: "13px", color: "#A89E99", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "24px" }}>currently</div>
                        <div className="grid grid-cols-2 md:grid-cols-3" style={{ border: "0.5px solid rgba(28,25,23,0.08)", borderRadius: "8px", overflow: "hidden" }}>
                            {currently.map(({ field, value }) => (
                                <div key={field} style={{ padding: "20px 22px", borderRight: "0.5px solid rgba(28,25,23,0.08)", borderBottom: "0.5px solid rgba(28,25,23,0.08)", backgroundColor: "#F2EDE4" }}>
                                    <div style={{ fontFamily: "monospace", fontSize: "10px", color: "#F0A8CF", letterSpacing: "0.04em", marginBottom: "6px" }}>{field}</div>
                                    <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", fontWeight: 300, color: "#1C1917", lineHeight: 1.4 }}>
                                        {value}
                                        {field === "building" && (
                                            <span style={{
                                                display: "inline-block",
                                                width: "1.5px",
                                                height: "15px",
                                                backgroundColor: "#F0A8CF",
                                                marginLeft: "2.2px",
                                                verticalAlign: "-1.5px",
                                                animation: "cursor-blink 1s step-end infinite",
                                            }}/>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CONTACT */}
                <div style={{ borderTop: "0.5px solid rgba(28,25,23,0.06)", padding: "48px 0 64px" }}>
                    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 24px" }}>
                        <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, system-ui", fontSize: "13px", color: "#A89E99", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "24px" }}>contact</div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            {contact.map(({ label, href, display }) => (
                                <a key={label} href={href} target={label !== "Email" ? "_blank" : undefined} rel="noopener noreferrer"
                                   style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "0.5px solid rgba(28,25,23,0.06)", textDecoration: "none" }}
                                   onMouseEnter={e => { (e.currentTarget.querySelector(".cv") as HTMLElement).style.color = "#D47BAD"; }}
                                   onMouseLeave={e => { (e.currentTarget.querySelector(".cv") as HTMLElement).style.color = "#F0A8CF"; }}
                                >
                                    <span style={{ fontFamily: "monospace", fontSize: "11px", color: "#A89E99", minWidth: "80px" }}>{label}</span>
                                    <span className="cv" style={{ fontFamily: "-apple-system,BlinkMacSystemFont,system-ui", fontSize: "12px", color: "#F0A8CF", transition: "color 0.2s ease" }}>
                                        {display} →
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <div style={{ borderTop: "0.5px solid rgba(28,25,23,0.06)", padding: "16px 0" }}>
                    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontFamily: "monospace", fontSize: "10px", color: "#A89E99" }}>last modified: May 2026</span>
                        <span style={{ fontFamily: "monospace", fontSize: "10px", color: "#A89E99" }}>uptime: <UptimeCounter /></span>
                    </div>
                </div>

            </main>
        </motion.div>
    );
}