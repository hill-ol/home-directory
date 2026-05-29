import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "1200px",
                    height: "630px",
                    backgroundColor: "#F2EDE4",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 100px",
                    position: "relative",
                    fontFamily: "Georgia, serif",
                }}
            >
                {/* Left — text content */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0px", maxWidth: "620px" }}>

                    {/* Eyebrow */}
                    <div style={{
                        fontSize: "18px",
                        color: "#F0A8CF",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        marginBottom: "24px",
                        fontFamily: "system-ui, sans-serif",
                        fontWeight: 300,
                    }}>
                        oliviahill.dev
                    </div>

                    {/* Name */}
                    <div style={{
                        fontSize: "96px",
                        fontWeight: 400,
                        color: "#1C1917",
                        lineHeight: "1.0",
                        letterSpacing: "-3px",
                        marginBottom: "28px",
                    }}>
                        Olivia Hill
                    </div>

                    {/* Role */}
                    <div style={{
                        fontSize: "26px",
                        color: "#6B6560",
                        lineHeight: "1.5",
                        fontFamily: "system-ui, sans-serif",
                        fontWeight: 300,
                        marginBottom: "36px",
                    }}>
                        CS + Math @ Northeastern
                    </div>

                    {/* Divider */}
                    <div style={{
                        width: "48px",
                        height: "3px",
                        backgroundColor: "#F0A8CF",
                        borderRadius: "2px",
                        marginBottom: "36px",
                    }} />

                    {/* Stack row */}
                    <div style={{ display: "flex", gap: "12px" }}>
                        {["TypeScript", "Next.js", "Java", "Python", "Qiskit"].map(tag => (
                            <div key={tag} style={{
                                fontSize: "15px",
                                color: "#A89E99",
                                border: "1px solid rgba(28,25,23,0.12)",
                                borderRadius: "40px",
                                padding: "5px 16px",
                                fontFamily: "monospace",
                                backgroundColor: "rgba(28,25,23,0.03)",
                            }}>
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right — large folder illustration */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.9 }}>
                    <svg width="280" height="228" viewBox="0 0 96 78" fill="none">
                        <path
                            d="M6,78 Q2,78 2,74 L2,8 Q2,2 8,2 L34,2 Q40,2 42,6 L44,12 Q46,16 50,16 L90,16 Q94,16 94,20 L94,74 Q94,78 90,78 Z"
                            fill="#D47BAD"
                        />
                        <rect x="2" y="18" width="92" height="58" rx="6" fill="#F0A8CF"/>
                    </svg>
                </div>

                {/* Subtle second folder behind */}
                <div style={{
                    position: "absolute",
                    right: "60px",
                    bottom: "60px",
                    display: "flex",
                    opacity: 0.15,
                }}>
                    <svg width="120" height="98" viewBox="0 0 96 78" fill="none">
                        <path d="M6,78 Q2,78 2,74 L2,8 Q2,2 8,2 L34,2 Q40,2 42,6 L44,12 Q46,16 50,16 L90,16 Q94,16 94,20 L94,74 Q94,78 90,78 Z" fill="#D47BAD"/>
                        <rect x="2" y="18" width="92" height="58" rx="6" fill="#F0A8CF"/>
                    </svg>
                </div>
            </div>
        ),
        { width: 1200, height: 630 }
    );
}