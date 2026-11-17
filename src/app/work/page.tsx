"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SectionLabel from "@/components/SectionLabel";
import WorkRow from "@/components/work/WorkRow";
import { useContent } from "@/components/ContentProvider";
import { color, font } from "@/lib/theme";

export default function WorkPage() {
    const { projects } = useContent();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <main style={{ minHeight: "100vh", backgroundColor: color.cream, paddingTop: "80px", paddingBottom: "96px" }}>
                <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>

                    {/* Header */}
                    <div style={{ marginBottom: "56px" }}>
                        <SectionLabel tone="accent" size="11px" style={{ marginBottom: "12px" }}>work/</SectionLabel>
                        <h1 style={{
                            fontFamily: font.display,
                            fontSize: "clamp(32px, 5vw, 52px)",
                            fontWeight: 400, color: color.ink,
                            lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 16px 0",
                        }}>Projects</h1>
                        <p style={{
                            fontFamily: font.body, fontSize: "14px",
                            fontWeight: 300, color: color.inkSecondary,
                            margin: 0, lineHeight: 1.7, maxWidth: "480px",
                        }}>
                            A selection of things I&apos;ve built: full-stack products,
                            research tools, and everything in between.
                        </p>
                    </div>

                    {/* Project list */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        {projects.map((project, i) => (
                            <motion.div
                                key={project.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ delay: i * 0.05, duration: 0.45, ease: "easeOut" }}
                            >
                                <Link href={`/projects/${project.slug}`} style={{ textDecoration: "none" }}>
                                    <WorkRow project={project} />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>
        </motion.div>
    );
}
