import Image from "next/image";

export default function Polaroid() {
    return (
        <div
            style={{
                position: "absolute",
                top: "10%",
                left: "6%",
                zIndex: 6,
                paddingTop: "32px",
            }}
        >
            {/* Thumbtack — flat disc, short stem, thin needle */}
            <div
                style={{
                    position: "absolute",
                    top: "0px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 7,
                }}
            >
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    {/* Needle — thin, straight down */}
                    <line x1="18" y1="26" x2="18" y2="35" stroke="#BF6090" strokeWidth="1" strokeLinecap="round"/>
                    {/* Stem — short cylinder */}
                    <rect x="15" y="18" width="6" height="9" rx="3" fill="#D47BAD"/>
                    {/* Disc underside — thin rim for depth */}
                    <ellipse cx="18" cy="18" rx="15" ry="5" fill="#D47BAD"/>
                    {/* Disc top face — wide and flat */}
                    <ellipse cx="18" cy="15" rx="15" ry="5" fill="#F0A8CF"/>
                    {/* Center dimple */}
                    <ellipse cx="18" cy="15" rx="4" ry="1.8" fill="#D47BAD" opacity="0.4"/>
                    {/* Highlight — off-center glint */}
                    <ellipse cx="11" cy="12.5" rx="5" ry="1.8" fill="white" opacity="0.25"/>
                </svg>
            </div>

            {/* Polaroid frame */}
            <div
                style={{
                    backgroundColor: "white",
                    padding: "10px 10px 36px 10px",
                    border: "0.5px solid rgba(28, 25, 23, 0.10)",
                    transform: "rotate(-4deg)",
                    width: "148px",
                }}
            >
                <div
                    style={{
                        width: "128px",
                        height: "128px",
                        overflow: "hidden",
                        position: "relative",
                    }}
                >
                    <Image
                        src="/readme/Headshot.jpg"
                        alt="Olivia Hill"
                        fill
                        style={{ objectFit: "cover", objectPosition: "center top" }}
                    />
                </div>
                </div>
            </div>
    );
}