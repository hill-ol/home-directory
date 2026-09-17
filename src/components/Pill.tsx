import type { ReactNode } from "react";

import { color, hairline, line } from "@/lib/theme";

interface PillProps {
    padding?: string;
    children: ReactNode;
}

export default function Pill({
    padding = "2px 10px",
    children,
}: PillProps) {
    return (
        <span
            style={{
                padding,
                color: color.inkSecondary,
                backgroundColor: line.wash,
                border: hairline(line.tile),
                borderRadius: "20px",
                fontFamily: "monospace",
                fontSize: "10px",
                whiteSpace: "nowrap",
            }}
        >
            {children}
        </span>
    );
}
