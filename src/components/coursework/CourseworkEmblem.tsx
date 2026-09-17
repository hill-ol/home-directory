import { color } from "@/lib/theme";

interface CourseworkEmblemProps {
    width: number;
    height: number;
    /*
     * The desktop binder cover has room for the binary labels, the math
     * symbols, and the f(x) caption. The mobile card shows the same graph and
     * sine wave without them.
     */
    detail?: boolean;
}

/*
 * The binder cover mark: a four-node graph on the left for the CS half, a
 * sine wave on the right for the math half, split by a dashed seam.
 */
export default function CourseworkEmblem({
    width,
    height,
    detail = false,
}: CourseworkEmblemProps) {
    return (
        <svg
            aria-hidden="true"
            width={width}
            height={height}
            viewBox="0 0 200 100"
            fill="none"
        >
            <line x1="100" y1="8" x2="100" y2="92" stroke={color.rule} strokeWidth="0.5" strokeDasharray="4 3"/>

            {/* Graph nodes */}
            <circle cx="28" cy="50" r="6" fill="none" stroke={color.pink} strokeWidth="1.5"/>
            <circle cx="52" cy="30" r="6" fill="none" stroke={color.pink} strokeWidth="1.5"/>
            <circle cx="52" cy="70" r="6" fill="none" stroke={color.pink} strokeWidth="1.5"/>
            <circle cx="76" cy="50" r="6" fill="none" stroke={color.pink} strokeWidth="1.5"/>

            {/* Edges */}
            <line x1="34" y1="46" x2="46" y2="34" stroke={color.pink} strokeWidth="1"/>
            <line x1="34" y1="54" x2="46" y2="66" stroke={color.pink} strokeWidth="1"/>
            <line x1="58" y1="30" x2="70" y2="46" stroke={color.pink} strokeWidth="1"/>
            <line x1="58" y1="70" x2="70" y2="54" stroke={color.pink} strokeWidth="1"/>

            {detail && (
                <>
                    <circle cx="28" cy="50" r="2" fill={color.pink}/>
                    <circle cx="52" cy="30" r="2" fill={color.pink}/>
                    <circle cx="52" cy="70" r="2" fill={color.pink}/>
                    <circle cx="76" cy="50" r="2" fill={color.pink}/>
                    <text x="14" y="22" fontFamily="monospace" fontSize="8" fill={color.rule}>01</text>
                    <text x="72" y="22" fontFamily="monospace" fontSize="8" fill={color.rule}>10</text>
                    <text x="14" y="82" fontFamily="monospace" fontSize="8" fill={color.rule}>11</text>
                    <text x="72" y="82" fontFamily="monospace" fontSize="8" fill={color.rule}>00</text>
                </>
            )}

            {/* Sine wave */}
            <path d="M112,50 Q120,28 128,50 Q136,72 144,50 Q152,28 160,50 Q168,72 176,50 Q184,28 192,50" stroke={color.pinkDark} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
            <line x1="110" y1="50" x2="194" y2="50" stroke={color.rule} strokeWidth="0.5"/>

            {detail && (
                <>
                    <text x="114" y="22" fontFamily="Georgia,serif" fontStyle="italic" fontSize="12" fill={color.rule}>∫</text>
                    <text x="128" y="22" fontFamily="Georgia,serif" fontStyle="italic" fontSize="12" fill={color.rule}>∂</text>
                    <text x="143" y="22" fontFamily="Georgia,serif" fontStyle="italic" fontSize="12" fill={color.rule}>∑</text>
                    <text x="158" y="22" fontFamily="Georgia,serif" fontStyle="italic" fontSize="12" fill={color.rule}>π</text>
                    <text x="135" y="88" fontFamily="Georgia,serif" fontStyle="italic" fontSize="10" fill={color.inkSecondary}>f(x) = sin(x)</text>
                </>
            )}
        </svg>
    );
}
