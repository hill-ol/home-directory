"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import {
    siTypescript, siPython, siReact, siNextdotjs,
    siNodedotjs, siPostgresql, siSupabase, siGit,
    siMongodb, siOpenjdk, siGo,
} from "simple-icons";

const stackIcons = [
    { icon: siTypescript, label: "TypeScript" },
    { icon: siPython,     label: "Python"     },
    { icon: siReact,      label: "React"      },
    { icon: siNextdotjs,  label: "Next.js"    },
    { icon: siNodedotjs,  label: "Node.js"    },
    { icon: siPostgresql, label: "SQL"        },
    { icon: siSupabase,   label: "Supabase"   },
    { icon: siGit,        label: "Git"        },
    { icon: siMongodb,    label: "MongoDB"    },
    { icon: siOpenjdk,    label: "Java"       },
    { icon: siGo,         label: "Go"         },
];

const folders = [
    { label: "StyleBoard.jsx",  slug: "styleboard" },
    { label: "CoopScout.py",    slug: "coopscout"  },
    { label: "toggo.ts",        slug: "toggo"      },
    { label: "therapy_db.sql",  slug: "therapydb"  },
    { label: "mills_research/", slug: "mills"      },
];

const orgs = [
    { label: "Chewy",          src: "/orgs/chewy.png"        },
    { label: "Generate",       src: "/orgs/generate.png"     },
    { label: "Argonne",        src: "/orgs/argonne1.png"     },
    { label: "Girls Who Code", src: "/orgs/girlswhocode.png" },
];

function MobileFolder({ label, slug, onClick }: { label: string; slug: string; onClick: (slug: string, rect: DOMRect) => void }) {
    const [hovered, setHovered] = useState(false);
    return (
        <button
            onClick={(e) => { const rect = e.currentTarget.getBoundingClientRect(); onClick(slug, rect); }}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
            <motion.div
                animate={{ scale: hovered ? 1.06 : 1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{ borderRadius: "8px" }}
            >
                <svg width="64" height="52" viewBox="0 0 96 78" fill="none">
                    <path
                        d="M6,78 Q2,78 2,74 L2,8 Q2,2 8,2 L34,2 Q40,2 42,6 L44,12 Q46,16 50,16 L90,16 Q94,16 94,20 L94,74 Q94,78 90,78 Z"
                        fill={hovered ? "#C966A0" : "#D47BAD"}
                        style={{ transition: "fill 0.2s ease" }}
                    />
                    <rect x="2" y="18" width="92" height="58" rx="6"
                          fill={hovered ? "#F5BADB" : "#F0A8CF"}
                          style={{ transition: "fill 0.2s ease" }}
                    />
                </svg>
            </motion.div>
            <span style={{ fontFamily: "-apple-system,BlinkMacSystemFont,system-ui", fontSize: "10px", color: hovered ? "#1C1917" : "#6B6560", textAlign: "center", whiteSpace: "nowrap", transition: "color 0.2s ease" }}>
        {label}
      </span>
        </button>
    );
}

function MobileStackIcon({ icon, label }: { icon: { path: string; hex: string }; label: string }) {
    const [active, setActive] = useState(false);
    return (
        <motion.div
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}
            whileTap={{ scale: 0.92 }}
            onPointerEnter={() => setActive(true)}
            onPointerLeave={() => setActive(false)}
        >
            <motion.div
                animate={{ scale: active ? 1.1 : 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{
                    width: "44px", height: "44px", borderRadius: "10px",
                    backgroundColor: "white",
                    border: `0.5px solid ${active ? `#${icon.hex}40` : "rgba(28,25,23,0.08)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "border-color 0.2s ease",
                    boxShadow: active ? `0 2px 12px #${icon.hex}30` : "none",
                }}
            >
                <svg viewBox="0 0 24 24" width="22" height="22" fill={active ? `#${icon.hex}` : "#A89E99"}
                     style={{ transition: "fill 0.2s ease" }}>
                    <path d={icon.path}/>
                </svg>
            </motion.div>
            <span style={{
                fontFamily: "-apple-system,BlinkMacSystemFont,system-ui",
                fontSize: "9px",
                color: active ? "#1C1917" : "#A89E99",
                whiteSpace: "nowrap",
                transition: "color 0.2s ease",
            }}>{label}</span>
        </motion.div>
    );
}

interface Props {
    onFolderClick: (slug: string, rect: DOMRect) => void;
}

export default function MobileHome({ onFolderClick }: Props) {
    return (
        <main style={{
            minHeight: "100vh",
            backgroundColor: "#F2EDE4",
            paddingTop: "72px",
            paddingBottom: "96px",
        }}>
            <div style={{ padding: "0 24px", display: "flex", flexDirection: "column", gap: "48px" }}>

                {/* Hero */}
                <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", paddingTop: "24px" }}>
                    <div style={{
                        width: "100px", height: "100px", borderRadius: "50%",
                        overflow: "hidden", backgroundColor: "#E8E4DC",
                        border: "3px solid white", boxShadow: "0 2px 12px rgba(28,25,23,0.10)",
                        position: "relative", flexShrink: 0,
                    }}>
                        <Image src="/readme/Headshot.jpg" alt="Olivia Hill" fill style={{ objectFit: "cover", objectPosition: "center top" }}/>
                    </div>
                    <div>
                        <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "42px", fontWeight: 400, color: "#1C1917", lineHeight: 1.05, letterSpacing: "-0.02em", margin: "0 0 10px 0" }}>Olivia Hill</h1>
                        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", fontWeight: 300, color: "#6B6560", lineHeight: 1.7, margin: 0, maxWidth: "280px" }}>
                            CS + Math @ Northeastern. Building full-stack products and software that makes a meaningful impact.
                        </p>
                    </div>
                </div>

                {/* Projects */}
                <div>
                    <div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,system-ui", fontSize: "10px", color: "#A89E99", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "16px" }}>projects</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
                        {folders.map(folder => (
                            <MobileFolder
                                key={folder.slug}
                                label={folder.label}
                                slug={folder.slug}
                                onClick={onFolderClick}
                            />
                        ))}

                        {/* Resume */}
                        <a href="/resume_2026.pdf" target="_blank" rel="noopener noreferrer" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", textDecoration: "none" }}>
                            <div style={{ width: "44px", height: "52px", backgroundColor: "white", border: "0.5px solid rgba(28,25,23,0.10)", borderRadius: "4px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
                                <div style={{ position: "absolute", top: 0, right: 0, width: "10px", height: "10px", backgroundColor: "#F2EDE4", borderLeft: "0.5px solid rgba(28,25,23,0.10)", borderBottom: "0.5px solid rgba(28,25,23,0.10)" }}/>
                                <span style={{ fontFamily: "monospace", fontSize: "9px", color: "#D47BAD", fontWeight: 600 }}>PDF</span>
                            </div>
                            <span style={{ fontFamily: "-apple-system,BlinkMacSystemFont,system-ui", fontSize: "10px", color: "#6B6560", textAlign: "center" }}>resume_2026.pdf</span>
                        </a>
                    </div>
                </div>

                {/* Stack */}
                <div>
                    <div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,system-ui", fontSize: "10px", color: "#A89E99", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "16px" }}>stack</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
                        {stackIcons.map(({ icon, label }) => (
                            <MobileStackIcon key={label} icon={icon} label={label} />
                        ))}
                    </div>
                </div>

                {/* Orgs */}
                <div>
                    <div style={{ fontFamily: "-apple-system,BlinkMacSystemFont,system-ui", fontSize: "10px", color: "#A89E99", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "16px" }}>experience</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
                        {orgs.map(org => (
                            <div key={org.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                                <div style={{ width: "44px", height: "44px", borderRadius: "10px", backgroundColor: "white", border: "0.5px solid rgba(28,25,23,0.08)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}>
                                    <Image src={org.src} alt={org.label} fill style={{ objectFit: "contain" }}/>
                                </div>
                                <span style={{ fontFamily: "-apple-system,BlinkMacSystemFont,system-ui", fontSize: "9px", color: "#A89E99", textAlign: "center", lineHeight: 1.3 }}>{org.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </main>
    );
}