"use client";

import { useState } from "react";

const stamps = [
    {
        city: "London",
        country: "United Kingdom",
        detail: "Global Scholar",
        season: "Fall 2024",
        rotation: "-6deg",
        top: "0px",
        left: "70px",
        color: "#C8B8E8",
        darkColor: "#9B84C8",
    },
    {
        city: "Oakland",
        country: "United States",
        detail: "Global Scholar",
        season: "Spring 2025",
        rotation: "5deg",
        top: "70px",
        left: "200px",
        color: "#F0A8CF",
        darkColor: "#D47BAD",
    },
    {
        city: "Budapest",
        country: "Hungary",
        detail: "Summer Program",
        season: "Summer 2025",
        rotation: "-4deg",
        top: "200px",
        left: "75px",
        color: "#A8D4C8",
        darkColor: "#6AAFA0",
    },
    {
        city: "Boston",
        country: "United States",
        detail: "Home Base",
        season: "Fall 2025 —",
        rotation: "4deg",
        top: "320px",
        left: "190px",
        color: "#F5C8A0",
        darkColor: "#D4926A",
    },
];

function Landmark({ city, fill, bg }: { city: string; fill: string; bg: string }) {
    if (city === "London") return (
        <g transform="translate(19,18)">
            <rect width="92" height="56" fill={bg} style={{ transition: "fill 0.3s ease" }}/>
            <rect x="38" y="8"  width="16" height="40" fill={fill} style={{ transition: "fill 0.3s ease" }}/>
            <polygon points="38,8 46,2 54,8" fill={fill} style={{ transition: "fill 0.3s ease" }}/>
            <rect x="44" y="0" width="4" height="8" fill={fill} style={{ transition: "fill 0.3s ease" }}/>
            <circle cx="46" cy="22" r="6" fill={bg} stroke={fill} strokeWidth="1.5" style={{ transition: "all 0.3s ease" }}/>
            <line x1="46" y1="22" x2="46" y2="17" stroke={fill} strokeWidth="1" style={{ transition: "stroke 0.3s ease" }}/>
            <line x1="46" y1="22" x2="50" y2="22" stroke={fill} strokeWidth="1" style={{ transition: "stroke 0.3s ease" }}/>
            <rect x="32" y="48" width="28" height="6" fill={fill} style={{ transition: "fill 0.3s ease" }}/>
            <rect x="43" y="34" width="6" height="8" fill={bg} stroke={fill} strokeWidth="0.5" style={{ transition: "all 0.3s ease" }}/>
            <rect x="0" y="54" width="92" height="1.5" fill={fill} opacity="0.3" style={{ transition: "fill 0.3s ease" }}/>
        </g>
    );

    if (city === "Oakland") return (
        <g transform="translate(19,18)">
            <rect width="92" height="56" fill={bg} style={{ transition: "fill 0.3s ease" }}/>
            <rect x="0" y="44" width="92" height="8" fill={fill} opacity="0.15" style={{ transition: "fill 0.3s ease" }}/>
            <rect x="0" y="36" width="92" height="3" fill={fill} style={{ transition: "fill 0.3s ease" }}/>
            <rect x="22" y="14" width="5" height="28" fill={fill} style={{ transition: "fill 0.3s ease" }}/>
            <rect x="65" y="14" width="5" height="28" fill={fill} style={{ transition: "fill 0.3s ease" }}/>
            <line x1="24" y1="14" x2="4"  y2="38" stroke={fill} strokeWidth="0.8" style={{ transition: "stroke 0.3s ease" }}/>
            <line x1="24" y1="14" x2="14" y2="38" stroke={fill} strokeWidth="0.8" style={{ transition: "stroke 0.3s ease" }}/>
            <line x1="24" y1="14" x2="34" y2="38" stroke={fill} strokeWidth="0.8" style={{ transition: "stroke 0.3s ease" }}/>
            <line x1="24" y1="14" x2="44" y2="38" stroke={fill} strokeWidth="0.8" style={{ transition: "stroke 0.3s ease" }}/>
            <line x1="67" y1="14" x2="48" y2="38" stroke={fill} strokeWidth="0.8" style={{ transition: "stroke 0.3s ease" }}/>
            <line x1="67" y1="14" x2="58" y2="38" stroke={fill} strokeWidth="0.8" style={{ transition: "stroke 0.3s ease" }}/>
            <line x1="67" y1="14" x2="78" y2="38" stroke={fill} strokeWidth="0.8" style={{ transition: "stroke 0.3s ease" }}/>
            <line x1="67" y1="14" x2="88" y2="38" stroke={fill} strokeWidth="0.8" style={{ transition: "stroke 0.3s ease" }}/>
            <polygon points="22,14 24,8 29,14" fill={fill} style={{ transition: "fill 0.3s ease" }}/>
            <polygon points="65,14 67,8 72,14" fill={fill} style={{ transition: "fill 0.3s ease" }}/>
        </g>
    );

    if (city === "Budapest") return (
        <g transform="translate(19,18)">
            <rect width="92" height="56" fill={bg} style={{ transition: "fill 0.3s ease" }}/>
            <ellipse cx="46" cy="26" rx="12" ry="14" fill={fill} style={{ transition: "fill 0.3s ease" }}/>
            <rect x="44" y="6" width="4" height="12" fill={fill} style={{ transition: "fill 0.3s ease" }}/>
            <polygon points="44,10 46,4 48,10" fill={fill} style={{ transition: "fill 0.3s ease" }}/>
            <rect x="14" y="34" width="64" height="16" fill={fill} style={{ transition: "fill 0.3s ease" }}/>
            <rect x="4"  y="38" width="14" height="12" fill={fill} style={{ transition: "fill 0.3s ease" }}/>
            <rect x="74" y="38" width="14" height="12" fill={fill} style={{ transition: "fill 0.3s ease" }}/>
            <polygon points="4,38 11,28 18,38"  fill={fill} style={{ transition: "fill 0.3s ease" }}/>
            <polygon points="74,38 81,28 88,38" fill={fill} style={{ transition: "fill 0.3s ease" }}/>
            {[22,32,42,52,62].map(x => (
                <rect key={x} x={x} y="38" width="5" height="8" fill={bg} stroke={fill} strokeWidth="0.5" style={{ transition: "all 0.3s ease" }}/>
            ))}
            <rect x="0" y="52" width="92" height="3" fill={fill} opacity="0.2" style={{ transition: "fill 0.3s ease" }}/>
        </g>
    );

    // Boston
    return (
        <g transform="translate(19,18)">
            <rect width="92" height="56" fill={bg} style={{ transition: "fill 0.3s ease" }}/>
            <rect x="36" y="6" width="20" height="22" fill={fill} opacity="0.15" stroke={fill} strokeWidth="1.2" style={{ transition: "all 0.3s ease" }}/>
            <polygon points="46,10 40,20 52,20" fill={fill} style={{ transition: "fill 0.3s ease" }}/>
            <text x="46" y="26" textAnchor="middle" fontFamily="monospace" fontSize="5" fill={fill} fontWeight="bold" style={{ transition: "fill 0.3s ease" }}>CITGO</text>
            <rect x="44" y="28" width="3" height="22" fill={fill} style={{ transition: "fill 0.3s ease" }}/>
            <rect x="0" y="50" width="92" height="2" fill={fill} opacity="0.3" style={{ transition: "fill 0.3s ease" }}/>
        </g>
    );
}

function StampSVG({ city, country, detail, season, color, darkColor, hovered }: {
    city: string; country: string; detail: string; season: string;
    color: string; darkColor: string; hovered: boolean;
}) {
    const w = 130;
    const h = 150;
    const fill = hovered ? darkColor : "#C8C4BF";
    const bg   = hovered ? `${color}60` : "rgba(28,25,23,0.04)";

    return (
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width={w} height={h} rx="4"
                  fill={hovered ? color : "#FAF7F2"}
                  style={{ transition: "fill 0.3s ease" }}
            />

            {Array.from({ length: 14 }, (_, i) => <circle key={`t${i}`} cx={6 + i * 9} cy={0}  r={3.5} fill="#F2EDE4"/>)}
            {Array.from({ length: 14 }, (_, i) => <circle key={`b${i}`} cx={6 + i * 9} cy={h}  r={3.5} fill="#F2EDE4"/>)}
            {Array.from({ length: 15 }, (_, i) => <circle key={`l${i}`} cx={0} cy={6 + i * 9}  r={3.5} fill="#F2EDE4"/>)}
            {Array.from({ length: 15 }, (_, i) => <circle key={`r${i}`} cx={w} cy={6 + i * 9}  r={3.5} fill="#F2EDE4"/>)}

            <rect x="8" y="8" width={w - 16} height={h - 16}
                  fill="none"
                  stroke={hovered ? darkColor : "#D3CEC9"}
                  strokeWidth="0.5"
                  style={{ transition: "stroke 0.3s ease" }}
            />

            <Landmark city={city} fill={fill} bg={bg} />

            <text x={w / 2} y="90" textAnchor="middle"
                  fontFamily="var(--font-playfair), Georgia, serif"
                  fontStyle="italic" fontSize="14"
                  fill={hovered ? darkColor : "#1C1917"}
                  style={{ transition: "fill 0.3s ease" }}
            >{city}</text>

            <text x={w / 2} y="102" textAnchor="middle"
                  fontFamily="-apple-system, BlinkMacSystemFont, system-ui"
                  fontSize="7" letterSpacing="0.08em"
                  fill={hovered ? darkColor : "#A89E99"}
                  style={{ transition: "fill 0.3s ease" }}
            >{country.toUpperCase()}</text>

            <rect x="20" y="108" width={w - 40} height="0.5"
                  fill={hovered ? darkColor : "#D3CEC9"} opacity="0.6"/>

            <text x={w / 2} y="120" textAnchor="middle"
                  fontFamily="-apple-system, BlinkMacSystemFont, system-ui"
                  fontSize="7.5"
                  fill={hovered ? darkColor : "#6B6560"}
                  style={{ transition: "fill 0.3s ease" }}
            >{detail}</text>

            <text x={w / 2} y="132" textAnchor="middle"
                  fontFamily="-apple-system, BlinkMacSystemFont, system-ui"
                  fontSize="7"
                  fill={hovered ? darkColor : "#A89E99"}
                  style={{ transition: "fill 0.3s ease" }}
            >{season}</text>
        </svg>
    );
}

export default function PassportStamps() {
    const [hovered, setHovered] = useState<string | null>(null);

    return (
        <div style={{ position: "relative", height: "440px", width: "320px" }}>
            {stamps.map((stamp) => (
                <div
                    key={stamp.city}
                    onMouseEnter={() => setHovered(stamp.city)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                        position: "absolute",
                        top: stamp.top,
                        left: stamp.left,
                        transform: `rotate(${stamp.rotation})`,
                        cursor: "default",
                        transition: "transform 0.25s ease, filter 0.25s ease",
                        filter: hovered === stamp.city
                            ? "drop-shadow(0 6px 16px rgba(28,25,23,0.18))"
                            : "drop-shadow(0 2px 4px rgba(28,25,23,0.08))",
                        zIndex: hovered === stamp.city ? 10 : 1,
                    }}
                >
                    <StampSVG
                        city={stamp.city}
                        country={stamp.country}
                        detail={stamp.detail}
                        season={stamp.season}
                        color={stamp.color}
                        darkColor={stamp.darkColor}
                        hovered={hovered === stamp.city}
                    />
                </div>
            ))}
        </div>
    );
}