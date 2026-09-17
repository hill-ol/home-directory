"use client";

import Image from "next/image";
import { useState } from "react";

import { orgs, type Org } from "@/content/orgs";

function OrgTile({ label, src, desktop }: Org) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: "absolute",
                top: desktop.top,
                left: desktop.left,
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
                    backgroundColor: "white",
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
                    color: hovered ? "#1C1917" : "#6B6560",
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
            {orgs.map((org) => (
                <OrgTile key={org.label} {...org} />
            ))}
        </>
    );
}
