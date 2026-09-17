import { ImageResponse } from "next/og";

import FolderGlyph from "@/components/glyphs/FolderGlyph";
import { bio, introInline } from "@/content/bio";
import { color } from "@/lib/theme";

export const runtime = "edge";

export async function GET() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "1200px",
                    height: "630px",
                    backgroundColor: color.cream,
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
                    <FolderGlyph
                        width={360}
                        height={292}
                        preserveAspectRatio="xMidYMid meet"
                    />
                </div>

                {/* Ghost folder top right */}
                <div style={{
                    position: "absolute",
                    right: "360px",
                    top: "72px",
                    display: "flex",
                    opacity: 0.2,
                }}>
                    <FolderGlyph
                        width={120}
                        height={98}
                        preserveAspectRatio="xMidYMid meet"
                    />
                </div>

                {/* Left content */}
                <div style={{ display: "flex", flexDirection: "column", maxWidth: "580px" }}>

                    {/* Pink bar */}
                    <div style={{
                        width: "40px",
                        height: "4px",
                        backgroundColor: color.pink,
                        borderRadius: "2px",
                        marginBottom: "32px",
                    }} />

                    {/* Name */}
                    <div style={{
                        fontSize: "100px",
                        fontWeight: 400,
                        color: color.ink,
                        lineHeight: 1,
                        letterSpacing: "-4px",
                        marginBottom: "24px",
                        fontFamily: "Georgia, 'Times New Roman', serif",
                    }}>
                        {bio.name}
                    </div>

                    {/* Role */}
                    <div style={{
                        fontSize: "28px",
                        color: color.inkSecondary,
                        lineHeight: 1.4,
                        fontFamily: "'Helvetica Neue', Arial, sans-serif",
                        fontWeight: 300,
                        marginBottom: "40px",
                    }}>
                        {introInline}
                    </div>

                    {/* Tags */}
                    <div style={{ display: "flex", gap: "10px" }}>
                        {["TypeScript", "Next.js", "Java", "Python"].map(tag => (
                            <div key={tag} style={{
                                fontSize: "16px",
                                color: color.inkSecondary,
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