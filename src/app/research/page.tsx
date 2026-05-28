"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const entries = [
    {
        number: "01",
        poster: "/research/quantum.png",
        posterLabel: "Poster #12-UR",
        institution: "The Mills Institute · Northeastern Oakland",
        title: "Quantum Computing Research",
        tagline: "Exploring whether quantum frameworks can classify medical datasets as effectively as classical ML.",
        meta: ["Solo research", "Advisor: Dr. Miguel Fuentes-Cabrera", "Spring 2025"],
        abstract: "Can quantum computing frameworks match classical machine learning on medical classification tasks? I explored this question by applying quantum circuit classification to the Iris and Wisconsin Breast Cancer datasets, embedding classical data into Hilbert space and running quantum circuit processing using IBM's Qiskit and Pennylane. The research compared accuracy, accessibility, and hybrid potential across both frameworks. Pennylane showed stronger promise for quantum-classical hybrid pipelines, while Qiskit encountered meaningful accessibility barriers following IBM Quantum Lab's transition in 2024. Test accuracy reached 64% on the breast cancer dataset using Pennylane. Presented at the Northeastern Oakland undergraduate research symposium (Poster #12-UR). Funded by The Mills Institute.",
        stack: ["Qiskit", "Pennylane", "Python", "PyTorch", "TensorFlow", "IBM Quantum"],
        award: null,
        credit: "Mills Institute · Spring 2025",
    },
    {
        number: "02",
        poster: "/research/therapydb.png",
        posterLabel: "Poster #18-UR",
        institution: "Northeastern University · Oakland",
        title: "Child Therapist Training Database",
        tagline: "An award-winning platform for training child therapists using AI-generated personas.",
        meta: ["Team of 5", "Advisor: Akram Bayat", "Spring 2025"],
        abstract: "No existing system uses AI-generated virtual personas to train therapists in Art Therapy through interactive case scenarios. We designed and built a relational database around six core entities: Therapist, Child, Training Supervisor, Guardian, Art Therapy, and Art Therapy Specialist, with therapist-child pairing based on shared art form preferences. The database went through conceptual, logical, and physical design stages and is normalized to 3NF. On top of the MySQL backend sits a React frontend and Flask API that integrates OpenAI to generate virtual pediatric patient personas whose responses evolve as training progresses. Presented at the Northeastern Oakland undergraduate research symposium (Poster #18-UR) and won the Khoury College Undergraduate Excellence Award.",
        stack: ["MySQL", "React", "Flask", "Python", "OpenAI API"],
        award: "Khoury Undergraduate Excellence Award",
        credit: "Northeastern Oakland · Spring 2025",
    },
];

export default function ResearchPage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <main style={{ minHeight: "100vh", backgroundColor: "#F2EDE4", paddingTop: "80px", paddingBottom: "80px" }}>
                <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 40px" }}>

                    {/* Back */}
                    <Link href="/" style={{
                        fontFamily: "-apple-system,BlinkMacSystemFont,system-ui",
                        fontSize: "12px", color: "#A89E99", textDecoration: "none",
                        display: "inline-flex", alignItems: "center", gap: "6px",
                        marginBottom: "48px", transition: "color .2s",
                    }}
                          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#F0A8CF")}
                          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "#A89E99")}
                    >← back to desktop</Link>

                    {/* Header */}
                    <div style={{ marginBottom: "64px" }}>
                        <div style={{
                            fontFamily: "-apple-system,BlinkMacSystemFont,system-ui",
                            fontSize: "10px", color: "#F0A8CF",
                            letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "12px",
                        }}>research/</div>
                        <h1 style={{
                            fontFamily: "var(--font-playfair)",
                            fontSize: "clamp(32px,5vw,48px)",
                            fontWeight: 400, color: "#1C1917",
                            lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 12px 0",
                        }}>Research</h1>
                        <p style={{
                            fontFamily: "var(--font-dm-sans)", fontSize: "13px",
                            fontWeight: 300, color: "#6B6560", lineHeight: 1.7, margin: 0,
                        }}>
                            Two undergraduate research projects presented at Northeastern University symposia.
                        </p>
                    </div>

                    {/* Entries */}
                    {entries.map((entry, i) => (
                        <motion.div
                            key={entry.number}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.12, duration: 0.4 }}
                            style={{ marginBottom: i < entries.length - 1 ? "80px" : 0 }}
                        >
                            {/* Entry rule */}
                            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
                <span style={{
                    fontFamily: "monospace", fontSize: "11px",
                    color: "#F0A8CF", letterSpacing: "0.04em",
                }}>{entry.number} ·</span>
                                <div style={{ flex: 1, height: "0.5px", backgroundColor: "rgba(28,25,23,0.10)" }}/>
                                <span style={{
                                    fontFamily: "monospace", fontSize: "10px", color: "#A89E99",
                                    backgroundColor: "rgba(28,25,23,0.04)",
                                    border: "0.5px solid rgba(28,25,23,0.08)",
                                    padding: "2px 8px", borderRadius: "20px",
                                }}>[ status: completed ]</span>
                            </div>

                            {/* Poster */}
                            <div style={{
                                position: "relative",
                                width: "100%",
                                aspectRatio: "16/9",
                                backgroundColor: "#E8E4DC",
                                border: "0.5px solid rgba(28,25,23,0.10)",
                                borderRadius: "6px",
                                overflow: "hidden",
                                marginBottom: "10px",
                            }}>
                                <Image
                                    src={entry.poster}
                                    alt={entry.posterLabel}
                                    fill
                                    style={{ objectFit: "contain" }}
                                />
                                <div style={{
                                    position: "absolute", inset: 0,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    pointerEvents: "none",
                                }}>
                  <span style={{ fontFamily: "monospace", fontSize: "11px", color: "#A89E99" }}>
                    {entry.posterLabel}
                  </span>
                                </div>
                                {entry.award && (
                                    <div style={{
                                        position: "absolute", bottom: "12px", left: "12px",
                                        backgroundColor: "#FAC775", color: "#633806",
                                        fontFamily: "monospace", fontSize: "9px",
                                        padding: "3px 10px", borderRadius: "3px", zIndex: 2,
                                    }}>{entry.award}</div>
                                )}
                            </div>

                            {/* Credit */}
                            <div style={{
                                fontFamily: "-apple-system,BlinkMacSystemFont,system-ui",
                                fontSize: "10px", color: "#A89E99", marginBottom: "28px",
                            }}>{entry.credit}</div>

                            {/* Content */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

                                {/* Institution */}
                                <div style={{
                                    fontFamily: "monospace", fontSize: "10px", color: "#A89E99",
                                    letterSpacing: "0.06em", textTransform: "uppercase",
                                }}>{entry.institution}</div>

                                {/* Title */}
                                <h2 style={{
                                    fontFamily: "var(--font-playfair)",
                                    fontSize: "22px", fontWeight: 400, color: "#1C1917",
                                    lineHeight: 1.25, margin: 0,
                                }}>{entry.title}</h2>

                                {/* Tagline */}
                                <p style={{
                                    fontFamily: "var(--font-dm-sans)", fontSize: "15px",
                                    fontWeight: 300, color: "#6B6560", lineHeight: 1.6,
                                    margin: 0, fontStyle: "italic",
                                }}>{entry.tagline}</p>

                                {/* Meta */}
                                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                                    {entry.meta.map((m, idx) => (
                                        <span key={m} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", color: "#6B6560" }}>{m}</span>
                                            {idx < entry.meta.length - 1 && <span style={{ color: "#D3CEC9" }}>·</span>}
                    </span>
                                    ))}
                                </div>

                                {/* Divider */}
                                <div style={{ height: "0.5px", backgroundColor: "rgba(28,25,23,0.08)" }}/>

                                {/* Abstract */}
                                <p style={{
                                    fontFamily: "var(--font-dm-sans)", fontSize: "13px",
                                    fontWeight: 300, color: "#6B6560", lineHeight: 1.8, margin: 0,
                                }}>{entry.abstract}</p>

                                {/* Stack */}
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "4px" }}>
                                    {entry.stack.map(tag => (
                                        <span key={tag} style={{
                                            fontFamily: "monospace", fontSize: "10px", color: "#A89E99",
                                            backgroundColor: "rgba(28,25,23,0.04)",
                                            border: "0.5px solid rgba(28,25,23,0.08)",
                                            borderRadius: "20px", padding: "2px 10px",
                                        }}>{tag}</span>
                                    ))}
                                </div>

                            </div>
                        </motion.div>
                    ))}

                </div>
            </main>
        </motion.div>
    );
}