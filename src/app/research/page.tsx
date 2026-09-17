"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import PosterImage from "@/components/PosterImage";
import { research } from "@/content/research";
import { accentPill, accentText } from "@/lib/hover";
import { color, font, hairline, line } from "@/lib/theme";

export default function ResearchPage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <main
                style={{
                    minHeight: "100vh",
                    paddingTop: "80px",
                    paddingBottom: "96px",
                    backgroundColor: color.cream,
                }}
            >
                <div
                    style={{
                        maxWidth: "900px",
                        margin: "0 auto",
                        padding: "0 24px",
                    }}
                >
                    <Link
                        href="/"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            marginBottom: "48px",
                            color: color.inkSecondary,
                            fontFamily: font.system,
                            fontSize: "12px",
                            textDecoration: "none",
                            transition: "color 0.2s",
                        }}
                        {...accentText}
                    >
                        ← back to desktop
                    </Link>

                    <header style={{ marginBottom: "64px" }}>
                        <div
                            style={{
                                marginBottom: "12px",
                                color: color.pink,
                                fontFamily: font.system,
                                fontSize: "10px",
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                            }}
                        >
                            research/
                        </div>

                        <h1
                            style={{
                                margin: "0 0 12px",
                                color: color.ink,
                                fontFamily: font.display,
                                fontSize: "clamp(32px, 5vw, 48px)",
                                fontWeight: 400,
                                lineHeight: 1.1,
                                letterSpacing: "-0.02em",
                            }}
                        >
                            Research
                        </h1>

                        <p
                            style={{
                                margin: 0,
                                color: color.inkSecondary,
                                fontFamily: font.body,
                                fontSize: "13px",
                                fontWeight: 300,
                                lineHeight: 1.7,
                            }}
                        >
                            Undergraduate and pre-collegiate
                            research across quantum computing,
                            database systems, and environmental
                            chemistry.
                        </p>
                    </header>

                    {research.map((entry, index) => (
                        <motion.article
                            key={entry.number}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{
                                once: true,
                                margin: "-60px",
                            }}
                            transition={{
                                duration: 0.5,
                                ease: "easeOut",
                            }}
                            style={{
                                marginBottom:
                                    index < research.length - 1
                                        ? "80px"
                                        : 0,
                            }}
                        >
                            <div
                                aria-hidden="true"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    marginBottom: "28px",
                                }}
                            >
                                <span
                                    style={{
                                        color: color.pink,
                                        fontFamily: "monospace",
                                        fontSize: "11px",
                                        letterSpacing: "0.04em",
                                    }}
                                >
                                    {entry.number} ·
                                </span>

                                <div
                                    style={{
                                        flex: 1,
                                        height: "0.5px",
                                        backgroundColor: line.card,
                                    }}
                                />

                                <span
                                    style={{
                                        padding: "2px 8px",
                                        color: color.inkSecondary,
                                        backgroundColor:
                                            "rgba(28,25,23,0.04)",
                                        border: hairline(line.tile),
                                        borderRadius: "20px",
                                        fontFamily: "monospace",
                                        fontSize: "10px",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    [ status: completed ]
                                </span>
                            </div>

                            <PosterImage entry={entry} />

                            <div
                                style={{
                                    marginBottom: "28px",
                                    color: color.inkSecondary,
                                    fontFamily: font.system,
                                    fontSize: "10px",
                                }}
                            >
                                {entry.credit}
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "14px",
                                }}
                            >
                                <div
                                    style={{
                                        color: color.inkSecondary,
                                        fontFamily: "monospace",
                                        fontSize: "10px",
                                        letterSpacing: "0.06em",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    {entry.institution}
                                </div>

                                <h2
                                    style={{
                                        margin: 0,
                                        color: color.ink,
                                        fontFamily: font.display,
                                        fontSize:
                                            "clamp(18px, 3vw, 22px)",
                                        fontWeight: 400,
                                        lineHeight: 1.25,
                                    }}
                                >
                                    {entry.title}
                                </h2>

                                <p
                                    style={{
                                        margin: 0,
                                        color: color.inkSecondary,
                                        fontFamily: font.body,
                                        fontSize: "14px",
                                        fontStyle: "italic",
                                        fontWeight: 300,
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {entry.tagline}
                                </p>

                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                        gap: "8px",
                                    }}
                                >
                                    {entry.meta.map(
                                        (metadata, metaIndex) => (
                                            <span
                                                key={metadata}
                                                style={{
                                                    display: "flex",
                                                    alignItems:
                                                        "center",
                                                    gap: "8px",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        color: color.inkSecondary,
                                                        fontFamily:
                                                            font.body,
                                                        fontSize:
                                                            "11px",
                                                    }}
                                                >
                                                    {metadata}
                                                </span>

                                                {metaIndex <
                                                    entry.meta
                                                        .length -
                                                        1 && (
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            color: color.rule,
                                                        }}
                                                    >
                                                        ·
                                                    </span>
                                                )}
                                            </span>
                                        ),
                                    )}
                                </div>

                                <div
                                    aria-hidden="true"
                                    style={{
                                        height: "0.5px",
                                        backgroundColor: line.tile,
                                    }}
                                />

                                <p
                                    style={{
                                        margin: 0,
                                        color: color.inkSecondary,
                                        fontFamily: font.body,
                                        fontSize: "13px",
                                        fontWeight: 300,
                                        lineHeight: 1.8,
                                    }}
                                >
                                    {entry.abstract}
                                </p>

                                <div
                                    aria-label="Research methods and technologies"
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: "6px",
                                        marginTop: "4px",
                                    }}
                                >
                                    {entry.stack.map((tag) => (
                                        <span
                                            key={tag}
                                            style={{
                                                padding: "2px 10px",
                                                color: color.inkSecondary,
                                                backgroundColor:
                                                    "rgba(28,25,23,0.04)",
                                                border: hairline(
                                                    line.tile,
                                                ),
                                                borderRadius: "20px",
                                                fontFamily:
                                                    "monospace",
                                                fontSize: "10px",
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {entry.link && (
                                    <a
                                        href={entry.link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            width: "fit-content",
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "6px",
                                            padding: "6px 16px",
                                            color: color.ink,
                                            fontFamily: font.system,
                                            fontSize: "12px",
                                            textDecoration: "none",
                                            border: hairline(
                                                line.pill,
                                            ),
                                            borderRadius: "20px",
                                            transition:
                                                "border-color 0.2s, color 0.2s",
                                        }}
                                        {...accentPill}
                                    >
                                        {entry.link.label} →
                                    </a>
                                )}
                            </div>
                        </motion.article>
                    ))}
                </div>
            </main>
        </motion.div>
    );
}
