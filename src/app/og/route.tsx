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
                    padding: "0 112px",
                    position: "relative",
                }}
            >
                {/* Large folder — right side, drawn at native resolution */}
                <div style={{
                    position: "absolute",
                    right: "80px",
                    top: "50%",
                    marginTop: "-180px",
                    display: "flex",
                }}>
                    <svg width="360" height="292" viewBox="0 0 96 78" preserveAspectRatio="xMidYMid meet" fill="none">
                        <path d="M6,78 Q2,78 2,74 L2,8 Q2,2 8,2 L34,2 Q40,2 42,6 L44,12 Q46,16 50,16 L90,16 Q94,16 94,20 L94,74 Q94,78 90,78 Z" fill="#D47BAD"/>
                        <rect x="2" y="18" width="92" height="58" rx="6" fill="#F0A8CF"/>
                    </svg>
                </div>

                {/* Ghost folder top right */}
                <div style={{
                    position: "absolute",
                    right: "360px",
                    top: "72px",
                    display: "flex",
                    opacity: 0.2,
                }}>
                    <svg width="120" height="98" viewBox="0 0 96 78" preserveAspectRatio="xMidYMid meet" fill="none">
                        <path d="M6,78 Q2,78 2,74 L2,8 Q2,2 8,2 L34,2 Q40,2 42,6 L44,12 Q46,16 50,16 L90,16 Q94,16 94,20 L94,74 Q94,78 90,78 Z" fill="#D47BAD"/>
                        <rect x="2" y="18" width="92" height="58" rx="6" fill="#F0A8CF"/>
                    </svg>
                </div>

                {/* Left content */}
                <div style={{ display: "flex", flexDirection: "column", maxWidth: "580px" }}>

                    {/* Pink bar */}
                    <div style={{
                        width: "40px",
                        height: "4px",
                        backgroundColor: "#F0A8CF",
                        borderRadius: "2px",
                        marginBottom: "32px",
                    }} />

                    {/* Name */}
                    <div style={{
                        fontSize: "100px",
                        fontWeight: 400,
                        color: "#1C1917",
                        lineHeight: 1,
                        letterSpacing: "-4px",
                        marginBottom: "24px",
                        fontFamily: "Georgia, 'Times New Roman', serif",
                    }}>
                        Olivia Hill
                    </div>

                    {/* Role */}
                    <div style={{
                        fontSize: "28px",
                        color: "#6B6560",
                        lineHeight: 1.4,
                        fontFamily: "'Helvetica Neue', Arial, sans-serif",
                        fontWeight: 300,
                        marginBottom: "40px",
                    }}>
                        CS + Math @ Northeastern
                    </div>

                    {/* Tags */}
                    <div style={{ display: "flex", gap: "10px" }}>
                        {["TypeScript", "Next.js", "Java", "Python"].map(tag => (
                            <div key={tag} style={{
                                fontSize: "16px",
                                color: "#A89E99",
                                border: "1.5px solid rgba(28,25,23,0.14)",
                                borderRadius: "40px",
                                padding: "6px 18px",
                                fontFamily: "monospace",
                            }}>
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}