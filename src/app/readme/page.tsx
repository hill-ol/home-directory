"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
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
    { key: "OS",        value: "Northeastern University",         isUptime: false },
    { key: "Host",      value: "CS + Math, Class of 2028",        isUptime: false },
    { key: "Uptime",    value: "",                                isUptime: true  },
    { key: "Shell",     value: "TypeScript · Python",             isUptime: false },
    { key: "Editor",    value: "VS Code",                         isUptime: false },
    { key: "Location",  value: "Boston, MA",                      isUptime: false },
    { key: "Status",    value: "on co-op @ Chewy",                isUptime: false },
    { key: "Interests", value: "fashion · traveling · running", isUptime: false },
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

export default function ReadmePage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <main style={{ minHeight: "100vh", backgroundColor: "#F2EDE4" }}>

                {/* HERO — two column */}
                <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr", minHeight: "100vh" }}>

                    {/* Left — full bleed photo */}
                    <div style={{ position: "relative", minHeight: "100vh" }}>
                        {/* uncomment when photo is ready:
            <Image
              src="/readme/photo.jpg"
              alt="Olivia Hill"
              fill
              style={{ objectFit: "cover", objectPosition: "center top" }}
              priority
            /> */}
                        <div style={{
                            position: "absolute", inset: 0,
                            backgroundColor: "#E0D9D0",
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
              <span style={{
                  fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                  fontSize: "11px", color: "#A89E99",
              }}>your photo here</span>
                        </div>
                    </div>

                    {/* Right — bio + passport stamps side by side */}
                    <div style={{
                        padding: "120px 56px 80px 56px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: "20px",
                    }}>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "48px",
                            alignItems: "start",
                        }}>

                            {/* Left: bio */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                <div style={{
                                    fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                                    fontSize: "10px", color: "#F0A8CF",
                                    letterSpacing: "0.06em", textTransform: "uppercase",
                                }}>
                                    readme.md
                                </div>

                                <h1 style={{
                                    fontFamily: "var(--font-playfair)",
                                    fontSize: "clamp(32px, 4vw, 52px)",
                                    fontWeight: 400, color: "#1C1917",
                                    lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0,
                                }}>
                                    Hi, I&apos;m Olivia.
                                </h1>

                                <p style={{
                                    fontFamily: "var(--font-dm-sans)", fontSize: "13px",
                                    fontWeight: 300, color: "#6B6560", lineHeight: 1.8, margin: 0,
                                }}>
                                    I&apos;m a CS and Math student at Northeastern, currently on co-op at Chewy as a
                                    software engineer. Studying math alongside CS has changed how I approach building.
                                    It gives me stronger context for the tools I reach for and pushes me toward problems
                                    that sit at technical intersections. Outside of class, I build at Generate Product
                                    Development Studio, where I&apos;ve wrapped up my first semester shipping a trip
                                    planning app with an incredible team.
                                </p>

                                <p style={{
                                    fontFamily: "var(--font-dm-sans)", fontSize: "13px",
                                    fontWeight: 300, color: "#6B6560", lineHeight: 1.8, margin: 0,
                                }}>
                                    Before that I was working on full-stack projects ranging from a geographically-tagged
                                    art commission platform to a job aggregator I built to solve a problem I had myself.
                                    My math background helps here too. It&apos;s less about the coursework and more
                                    about having a framework for thinking carefully before reaching for a solution.
                                </p>

                                <p style={{
                                    fontFamily: "var(--font-dm-sans)", fontSize: "13px",
                                    fontWeight: 300, color: "#6B6560", lineHeight: 1.8, margin: 0,
                                }}>
                                    When I&apos;m not at my desk I&apos;m usually running, exploring Boston, reading, or
                                    planning my next trip. Open to SWE co-ops where I can work on real problems and keep
                                    learning.
                                </p>

                                <Link
                                    href="/coursework"
                                    style={{
                                        fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                                        fontSize: "11px", color: "#A89E99",
                                        textDecoration: "none", marginTop: "4px",
                                        transition: "color 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#F0A8CF")}
                                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#A89E99")}
                                >
                                    view coursework →
                                </Link>
                            </div>

                            {/* Right: passport stamps */}
                            <div style={{ paddingTop: "40px" }}>
                                <PassportStamps />
                            </div>

                        </div>
                    </div>
                </div>

                {/* NEOFETCH TERMINAL */}
                <div style={{ padding: "64px 0", borderTop: "0.5px solid rgba(28,25,23,0.06)" }}>
                    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 40px" }}>
                        <div style={{
                            backgroundColor: "#D47BAD",
                            borderRadius: "10px",
                            overflow: "hidden",
                        }}>
                            <div style={{
                                padding: "8px 14px",
                                backgroundColor: "rgba(0,0,0,0.15)",
                                display: "flex", alignItems: "center", gap: "6px",
                            }}>
                                {["#FF5F57","#FEBC2E","#28C840"].map((c) => (
                                    <div key={c} style={{
                                        width: "10px", height: "10px", borderRadius: "50%",
                                        backgroundColor: c, opacity: 0.85,
                                    }} />
                                ))}
                                <span style={{
                                    fontFamily: "monospace", fontSize: "10px",
                                    color: "rgba(255,255,255,0.6)", marginLeft: "8px",
                                }}>
                  olivia@northeastern ~ neofetch
                </span>
                            </div>
                            <div style={{
                                padding: "20px 24px",
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "5px 40px",
                            }}>
                                {neofetch.map(({ key, value, isUptime }) => (
                                    <div key={key} style={{
                                        fontFamily: "monospace", fontSize: "12px",
                                        color: "rgba(255,255,255,0.9)",
                                        display: "flex", gap: "8px",
                                    }}>
                                        <span style={{ minWidth: "80px", color: "rgba(255,255,255,0.5)" }}>{key}</span>
                                        {isUptime ? <UptimeCounter /> : <span>{value}</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* CURRENTLY */}
                <div style={{ padding: "0 0 64px" }}>
                    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 40px" }}>
                        <div style={{
                            fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                            fontSize: "13px", color: "#A89E99",
                            letterSpacing: "0.06em", textTransform: "uppercase",
                            marginBottom: "24px",
                        }}>
                            currently
                        </div>
                        <div style={{
                            display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                            border: "0.5px solid rgba(28,25,23,0.08)",
                            borderRadius: "8px", overflow: "hidden",
                        }}>
                            {currently.map(({ field, value }, i) => (
                                <div key={field} style={{
                                    padding: "20px 22px",
                                    borderRight: i % 3 !== 2 ? "0.5px solid rgba(28,25,23,0.08)" : "none",
                                    borderBottom: i < 3 ? "0.5px solid rgba(28,25,23,0.08)" : "none",
                                    backgroundColor: "#F2EDE4",
                                }}>
                                    <div style={{
                                        fontFamily: "monospace", fontSize: "10px",
                                        color: "#F0A8CF", letterSpacing: "0.04em", marginBottom: "6px",
                                    }}>
                                        {field}
                                    </div>
                                    <div style={{
                                        fontFamily: "var(--font-dm-sans)", fontSize: "13px",
                                        fontWeight: 300, color: "#1C1917", lineHeight: 1.4,
                                    }}>
                                        {value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CONTACT */}
                <div style={{ borderTop: "0.5px solid rgba(28,25,23,0.06)", padding: "48px 0 64px" }}>
                    <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 40px" }}>
                        <div style={{
                            fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                            fontSize: "13px", color: "#A89E99",
                            letterSpacing: "0.06em", textTransform: "uppercase",
                            marginBottom: "24px",
                        }}>
                            contact
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            {contact.map(({ label, href, display }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target={label !== "Email" ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    style={{
                                        display: "flex", justifyContent: "space-between",
                                        alignItems: "center", padding: "14px 0",
                                        borderBottom: "0.5px solid rgba(28,25,23,0.06)",
                                        textDecoration: "none",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget.querySelector(".cv") as HTMLElement).style.color = "#D47BAD";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget.querySelector(".cv") as HTMLElement).style.color = "#F0A8CF";
                                    }}
                                >
                  <span style={{
                      fontFamily: "monospace", fontSize: "11px",
                      color: "#A89E99", minWidth: "80px",
                  }}>
                    {label}
                  </span>
                                    <span className="cv" style={{
                                        fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                                        fontSize: "12px", color: "#F0A8CF",
                                        transition: "color 0.2s ease",
                                    }}>
                    {display} →
                  </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <div style={{ borderTop: "0.5px solid rgba(28,25,23,0.06)", padding: "16px 0" }}>
                    <div style={{
                        maxWidth: "860px", margin: "0 auto", padding: "0 40px",
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                    }}>
            <span style={{ fontFamily: "monospace", fontSize: "10px", color: "#A89E99" }}>
              last modified: May 2026
            </span>
                        <span style={{ fontFamily: "monospace", fontSize: "10px", color: "#A89E99" }}>
              uptime: <UptimeCounter />
            </span>
                    </div>
                </div>

            </main>
        </motion.div>
    );
}