export default function Loading() {
    return (
        <div style={{
            minHeight: "100vh",
            backgroundColor: "#F2EDE4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
                {/* Pulsing folder */}
                <div style={{
                    animation: "pulse 1.6s ease-in-out infinite",
                }}>
                    <svg width="64" height="52" viewBox="0 0 96 78" fill="none">
                        <path
                            d="M6,78 Q2,78 2,74 L2,8 Q2,2 8,2 L34,2 Q40,2 42,6 L44,12 Q46,16 50,16 L90,16 Q94,16 94,20 L94,74 Q94,78 90,78 Z"
                            fill="#D47BAD" opacity="0.5"
                        />
                        <rect x="2" y="18" width="92" height="58" rx="6" fill="#F0A8CF" opacity="0.5"/>
                    </svg>
                </div>
                <div style={{
                    fontFamily: "-apple-system,BlinkMacSystemFont,system-ui",
                    fontSize: "11px", color: "#A89E99",
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
        </div>
    );
}