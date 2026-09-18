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
                /*
                 * No fill. It used to carry line.wash, a 4% ink tint that
                 * measured deltaE 2.9 from cream, so invisible by the rule in
                 * CLAUDE.md, while dragging the label from 4.93:1 down to
                 * 4.57:1 against the 4.5 floor. Sitting that close to the
                 * limit also made the axe suite flake, because compositing
                 * rounds the background either side of it.
                 */
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
