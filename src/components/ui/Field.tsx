"use client";

import { color, font, hairline, line } from "@/lib/theme";

/*
 * A labelled text control.
 *
 * The label and the control live in one component so the `htmlFor` and `id`
 * pairing cannot be forgotten, and so the three hand-rolled copies of this
 * style stop diverging: they had already picked 13px against 14px, cream
 * against card, and three different paddings.
 *
 * `onChange` hands back the value rather than the event, because no caller
 * wanted anything else off it.
 */
export default function Field({
    name,
    label,
    hint,
    value,
    onChange,
    idPrefix = "field",
    multiline = false,
    rows = 6,
    type = "text",
    required = false,
    autoComplete,
}: {
    name: string;
    /** Defaults to the name, uppercased. */
    label?: string;
    hint?: string;
    value: string;
    onChange: (value: string) => void;
    /** Keeps ids unique when two forms sit on one page. */
    idPrefix?: string;
    multiline?: boolean;
    rows?: number;
    type?: string;
    required?: boolean;
    autoComplete?: string;
}) {
    const id = `${idPrefix}-${name}`;

    const controlStyle: React.CSSProperties = {
        fontFamily: font.body,
        fontSize: "13px",
        fontWeight: 300,
        lineHeight: multiline ? 1.6 : undefined,
        color: color.ink,
        backgroundColor: color.cream,
        border: hairline(line.card),
        borderRadius: "2px",
        padding: "9px 11px",
        width: "100%",
        resize: multiline ? "vertical" : undefined,
    };

    return (
        <div>
            <label
                htmlFor={id}
                style={{
                    fontFamily: font.system,
                    fontSize: "10px",
                    letterSpacing: "0.04em",
                    color: color.inkSecondary,
                    display: "block",
                    marginBottom: "6px",
                }}
            >
                {label ?? name.toUpperCase()}{hint ? ` · ${hint}` : ""}
            </label>

            {multiline ? (
                <textarea
                    id={id}
                    rows={rows}
                    required={required}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    style={controlStyle}
                />
            ) : (
                <input
                    id={id}
                    type={type}
                    required={required}
                    autoComplete={autoComplete}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    style={controlStyle}
                />
            )}
        </div>
    );
}
