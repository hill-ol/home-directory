"use client";

import Image from "next/image";
import { useState } from "react";

import HoverLabel from "@/components/HoverLabel";
import IconTile from "@/components/IconTile";
import { orgs, type Org } from "@/content/orgs";

function OrgTile({ label, src, desktop }: Org) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            style={{
                position: "absolute",
                top: desktop.top,
                left: desktop.left,
                zIndex: 6,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "5px",
                padding: "10px",
                margin: "-10px",
                cursor: "default",
                transform: hovered ? "scale(1.08)" : "scale(1)",
                transition: "transform 0.2s ease",
            }}
        >
            <IconTile active={hovered}>
                <Image
                    src={src}
                    alt={label}
                    width={32}
                    height={32}
                    style={{ objectFit: "contain" }}
                />
            </IconTile>

            <HoverLabel active={hovered}>{label}</HoverLabel>
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
