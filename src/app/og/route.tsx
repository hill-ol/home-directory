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
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    padding: "80px 100px",
                    position: "relative",
                }}
            >
                {/* Background folder shapes — decorative */}
                <div style={{
                    position: "absolute", top: "60px", right: "120px",
                    width: "96px", height: "78px", opacity: 0.18,
                    display: "flex",
                }}>
                    <svg width="96" height="78" viewBox="0 0 96 78" fill="none">
                        <path d="M6,78 Q2,78 2,74 L2,8 Q2,2 8,2 L34,2 Q40,2 42,6 L44,12 Q46,16 50,16 L90,16 Q94,16 94,20 L94,74 Q94,78 90,78 Z" fill="#D47BAD"/>
                        <rect x="2" y="18" width="92" height="58" rx="6" fill="#F0A8CF"/>
                    </svg>
                </div>
                <div style={{
                    position: "absolute", bottom: "80px", right: "200px",
                    width: "72px", height: "58px", opacity: 0.12,
                    display: "flex",
                }}>
                    <svg width="72" height="58" viewBox="0 0 96 78" fill="none">
                        <path d="M6,78 Q2,78 2,74 L2,8 Q2,2 8,2 L34,2 Q40,2 42,6 L44,12 Q46,16 50,16 L90,16 Q94,16 94,20 L94,74 Q94,78 90,78 Z" fill="#D47BAD"/>
                        <rect x="2" y="18" width="92" height="58" rx="6" fill="#F0A8CF"/>
                    </svg>
                </div>
                <div style={{
                    position: "absolute", top: "180px", right: "80px",
                    width: "56px", height: "46px", opacity: 0.10,
                    display: "flex",
                }}>
                    <svg width="56" height="46" viewBox="0 0 96 78" fill="none">
                        <path d="M6,78 Q2,78 2,74 L2,8 Q2,2 8,2 L34,2 Q40,2 42,6 L44,12 Q46,16 50,16 L90,16 Q94,16 94,20 L94,74 Q94,78 90,78 Z" fill="#D47BAD"/>
                        <rect x="2" y="18" width="92" height="58" rx="6" fill="#F0A8CF"/>
                    </svg>
                </div>

                {/* Pink accent bar */}
                <div style={{
                    width: "48px", height: "4px",
                    backgroundColor: "#F0A8CF",
                    borderRadius: "2px",
                    marginBottom: "32px",
                }}/>

                {/* Name */}
                <div style={{
                    fontSize: "88px",
                    fontWeight: 400,
                    color: "#1C1917",
                    lineHeight: 1.0,
                    letterSpacing: "-3px",
                    marginBottom: "20px",
                    fontFamily: "Georgia, serif",
                }}>
                    Olivia Hill
                </div>

                {/* Tagline */}
                <div style={{
                    fontSize: "24px",
                    fontWeight: 300,
                    color: "#6B6560",
                    lineHeight: 1.5,
                    maxWidth: "680px",
                    fontFamily: "system-ui, sans-serif",
                    marginBottom: "40px",
                }}>
                    CS + Math @ Northeastern · Software Engineer · Global Scholar
                </div>

                {/* Pills */}
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    {["TypeScript", "Next.js", "Python", "Java", "Qiskit"].map(tag => (
                        <div
                            key={tag}
                            style={{
                                fontSize: "16px",
                                color: "#A89E99",
                                backgroundColor: "rgba(28,25,23,0.05)",
                                border: "1px solid rgba(28,25,23,0.10)",
                                borderRadius: "40px",
                                padding: "6px 18px",
                                fontFamily: "monospace",
                            }}
                        >
                            {tag}
                        </div>
                    ))}
                </div>

                {/* Domain */}
                <div style={{
                    position: "absolute",
                    bottom: "60px",
                    right: "100px",
                    fontSize: "18px",
                    color: "#A89E99",
                    fontFamily: "monospace",
                    letterSpacing: "0.04em",
                }}>
                    home-directory.vercel.app
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}