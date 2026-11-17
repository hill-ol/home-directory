"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

import FolderIcon from "@/components/FolderIcon";
import HoverLabel from "@/components/HoverLabel";
import IconTile from "@/components/IconTile";
import SectionLabel from "@/components/SectionLabel";
import PdfGlyph from "@/components/glyphs/PdfGlyph";
import StackGlyph from "@/components/glyphs/StackGlyph";
import { useContent } from "@/components/ContentProvider";
import { color, font } from "@/lib/theme";

function MobileStackIcon({ path, hex, label }: { path: string; hex: string; label: string }) {
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
                <IconTile active={active} accent={`#${hex}`}>
                    <StackGlyph path={path} hex={hex} active={active}/>
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
    const { bio, intro, contact, orgs, projects, stack } = useContent();
    return (
        <main style={{
            minHeight: "100vh",
            backgroundColor: color.cream,
            paddingTop: "72px",
            paddingBottom: "96px",
        }}>
            <div style={{ padding: "0 24px", display: "flex", flexDirection: "column", gap: "40px" }}>

                {/* Hero: name + bio */}
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "24px",
                    paddingTop: "16px",
                }}>
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
                    <SectionLabel style={{ marginBottom: "16px" }}>projects</SectionLabel>
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
                    <SectionLabel style={{ marginBottom: "16px" }}>stack</SectionLabel>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
                        {stack.map(({ path, hex, label }) => (
                            <MobileStackIcon key={label} path={path} hex={hex} label={label} />
                        ))}
                    </div>
                </div>

                {/* Orgs */}
                <div>
                    <SectionLabel style={{ marginBottom: "16px" }}>experience</SectionLabel>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
                        {orgs.map(org => (
                            <div key={org.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                                <IconTile>
                                    <Image src={org.src} alt={org.label} fill sizes="44px" style={{ objectFit: "contain" }}/>
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