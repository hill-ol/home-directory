"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import type { SimpleIcon } from "simple-icons";

import FolderIcon from "@/components/FolderIcon";
import HoverLabel from "@/components/HoverLabel";
import IconTile from "@/components/IconTile";
import PdfGlyph from "@/components/glyphs/PdfGlyph";
import { bio, intro } from "@/content/bio";
import { contact } from "@/content/contact";
import { orgs } from "@/content/orgs";
import { projects } from "@/content/projects";
import { stack } from "@/content/stack";
import { color, font } from "@/lib/theme";

function MobileStackIcon({ icon, label }: { icon: SimpleIcon; label: string }) {
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
            >
                <IconTile active={active} accent={`#${icon.hex}`}>
                    <svg viewBox="0 0 24 24" width="22" height="22" fill={active ? `#${icon.hex}` : color.inkMuted}
                         style={{ transition: "fill 0.2s ease" }}>
                        <path d={icon.path}/>
                    </svg>
                </IconTile>
            </motion.div>
            <HoverLabel active={active} size="9px">{label}</HoverLabel>
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
            backgroundColor: color.cream,
            paddingTop: "72px",
            paddingBottom: "96px",
        }}>
            <div style={{ padding: "0 24px", display: "flex", flexDirection: "column", gap: "40px" }}>

                {/* Hero — Polaroid + name */}
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "24px",
                    paddingTop: "16px",
                }}>
                    {/* Polaroid card */}
                    <div style={{
                        backgroundColor: "white",
                        padding: "10px 10px 32px 10px",
                        boxShadow: "0 4px 24px rgba(28,25,23,0.12), 0 1px 4px rgba(28,25,23,0.06)",
                        borderRadius: "2px",
                        transform: "rotate(-2deg)",
                        width: "180px",
                        flexShrink: 0,
                    }}>
                        <div style={{
                            position: "relative",
                            width: "160px",
                            height: "200px",
                            overflow: "hidden",
                            backgroundColor: color.imagePlaceholder,
                        }}>
                            <Image
                                src="/readme/Headshot.jpg"
                                alt="Olivia Hill"
                                fill
                                priority
                                style={{ objectFit: "cover", objectPosition: "center top" }}
                            />
                        </div>
                        <div style={{
                            fontFamily: font.display,
                            fontStyle: "italic",
                            fontSize: "13px",
                            color: color.inkSecondary,
                            textAlign: "center",
                            marginTop: "10px",
                            letterSpacing: "0.01em",
                        }}></div>
                    </div>

                    {/* Name + bio */}
                    <div style={{ textAlign: "center" }}>
                        <h1 style={{
                            fontFamily: font.display,
                            fontSize: "42px",
                            fontWeight: 400,
                            color: color.ink,
                            lineHeight: 1.0,
                            letterSpacing: "-0.02em",
                            margin: "0 0 10px 0",
                        }}>{bio.name}</h1>
                        <p style={{
                            fontFamily: font.body,
                            fontSize: "13px",
                            fontWeight: 300,
                            color: color.inkSecondary,
                            lineHeight: 1.7,
                            margin: 0,
                            maxWidth: "280px",
                        }}>
                            {intro}
                        </p>
                    </div>
                </div>

                {/* Projects */}
                <div>
                    <div style={{ fontFamily: font.system, fontSize: "10px", color: color.inkSecondary, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "16px" }}>projects</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
                        {projects.map(project => (
                            <FolderIcon
                                key={project.slug}
                                label={project.filename}
                                slug={project.slug}
                                variant="mobile"
                                onClick={onFolderClick}
                            />
                        ))}

                        {/* Resume */}
                        <a href={contact.resume.href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", textDecoration: "none" }}>
                            <PdfGlyph />
                            <span style={{ fontFamily: font.system, fontSize: "10px", color: color.inkSecondary, textAlign: "center" }}>{contact.resume.display}</span>
                        </a>
                    </div>
                </div>

                {/* Stack */}
                <div>
                    <div style={{ fontFamily: font.system, fontSize: "10px", color: color.inkSecondary, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "16px" }}>stack</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
                        {stack.map(({ icon, label }) => (
                            <MobileStackIcon key={label} icon={icon} label={label} />
                        ))}
                    </div>
                </div>

                {/* Orgs */}
                <div>
                    <div style={{ fontFamily: font.system, fontSize: "10px", color: color.inkSecondary, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "16px" }}>experience</div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
                        {orgs.map(org => (
                            <div key={org.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                                <IconTile>
                                    <Image src={org.src} alt={org.label} fill style={{ objectFit: "contain" }}/>
                                </IconTile>
                                <HoverLabel size="9px" wrap>{org.label}</HoverLabel>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </main>
    );
}