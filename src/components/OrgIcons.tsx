"use client";

import Image from "next/image";
import { useState } from "react";

function OrgTile({
                     label,
                     top,
                     left,
                     src,
                     bg = "white",
                 }: {
    label: string;
    top: string;
    left: string;
    src: string;
    bg?: string;
}) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: "absolute",
                top,
                left,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "5px",
                cursor: "default",
                padding: "10px",
                margin: "-10px",
                transform: hovered ? "scale(1.08)" : "scale(1)",
                transition: "transform 0.2s ease",
                zIndex: 6,
            }}
        >
            <div
                style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    backgroundColor: bg,
                    border: "0.5px solid rgba(28,25,23,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                }}
            >
                <Image
                    src={src}
                    alt={label}
                    width={32}
                    height={32}
                    style={{ objectFit: "contain" }}
                />
            </div>
            <span
                style={{
                    fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                    fontSize: "10px",
                    color: hovered ? "#1C1917" : "#A89E99",
                    transition: "color 0.2s ease",
                    whiteSpace: "nowrap",
                }}
            >
        {label}
      </span>
        </div>
    );
}

export default function OrgIcons() {
    return (
        <>
            <OrgTile
                label="Chewy"
                top="57%"
                left="88%"
                src="/orgs/chewy.png"
                bg="white"
            />
            <OrgTile
                label="Generate"
                top="36%"
                left="91%"
                src="/orgs/generate.png"
                bg="white"
            />
            <OrgTile
                label="Argonne"
                top="80%"
                left="74%"
                src="/orgs/argonne1.png"
                bg="white"
            />
            <OrgTile
                label="Girls Who Code"
                top="86%"
                left="57%"
                src="/orgs/girlswhocode.png"
                bg="white"
            />
        </>
    );
}