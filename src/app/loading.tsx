import FolderGlyph from "@/components/glyphs/FolderGlyph";
import Page from "@/components/ui/Page";
import { color, font } from "@/lib/theme";

export default function Loading() {
    return (
        <Page variant="centered">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
                {/* Pulsing folder */}
                <div style={{
                    animation: "pulse 1.6s ease-in-out infinite",
                }}>
                    <FolderGlyph width={64} height={52} opacity={0.5} />
                </div>
                <div style={{
                    fontFamily: font.system,
                    fontSize: "11px", color: color.inkSecondary,
                    letterSpacing: "0.06em",
                    animation: "pulse 1.6s ease-in-out infinite",
                }}>loading</div>
            </div>

            <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
        </Page>
    );
}
