import type { ReactNode } from "react";
import { hairline, line } from "@/lib/theme";

interface IconTileProps {
    active?: boolean;
    accent?: string;
    children: ReactNode;
}

export default function IconTile({
    active = false,
    accent,
    children,
}: IconTileProps) {
    const tinted = active && accent !== undefined;

    return (
        <div
            style={{
                position: "relative",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                backgroundColor: "white",
                border: hairline(tinted ? `${accent}40` : line.tile),
                borderRadius: "10px",
                boxShadow: tinted ? `0 2px 12px ${accent}30` : "none",
                transition: "border-color 0.2s ease",
            }}
        >
            {children}
        </div>
    );
}
