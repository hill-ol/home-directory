"use client";

import { useState, useTransition } from "react";
import { saveProjectDescription } from "@/app/studio/work/actions";
import { color, font, hairline, line } from "@/lib/theme";

/**
 * The description field on one row of `/studio/work`.
 *
 * Saving is explicit rather than on blur. The write can be refused by the
 * schema or by the cross-row reference check, and a rejection needs somewhere
 * to land: blur-save would give the message nowhere to go and no way to back
 * out of the edit that caused it.
 *
 * There is no optimistic update either. setContent ends with updateTag, which
 * gives read-your-own-writes, so by the time the action resolves the value is
 * genuinely stored. Faking it earlier would only add a rollback path.
 */
export default function DescriptionEditor({
    slug,
    initial,
}: {
    slug: string;
    initial: string;
}) {
    const [saved, setSaved] = useState(initial);
    const [value, setValue] = useState(initial);
    const [error, setError] = useState<string | null>(null);
    const [justSaved, setJustSaved] = useState(false);
    const [pending, startTransition] = useTransition();

    const dirty = value !== saved;

    function onSave() {
        setError(null);
        setJustSaved(false);

        startTransition(async () => {
            const result = await saveProjectDescription(slug, value);

            if (result.ok) {
                setSaved(value);
                setJustSaved(true);
                return;
            }

            setError(result.error);
        });
    }

    const button: React.CSSProperties = {
        fontFamily: font.system,
        fontSize: "10px",
        letterSpacing: "0.04em",
        borderRadius: "2px",
        padding: "7px 12px",
        cursor: "pointer",
    };

    return (
        <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <label
                htmlFor={`description-${slug}`}
                style={{
                    fontFamily: font.system,
                    fontSize: "10px",
                    letterSpacing: "0.04em",
                    color: color.inkSecondary,
                }}
            >DESCRIPTION</label>

            <textarea
                id={`description-${slug}`}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                rows={6}
                style={{
                    fontFamily: font.body,
                    fontSize: "13px",
                    fontWeight: 300,
                    lineHeight: 1.6,
                    color: color.ink,
                    backgroundColor: color.card,
                    border: hairline(line.card),
                    borderRadius: "2px",
                    padding: "10px 12px",
                    width: "100%",
                    resize: "vertical",
                }}
            />

            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                <button
                    type="button"
                    onClick={onSave}
                    disabled={!dirty || pending}
                    style={{
                        ...button,
                        color: color.cream,
                        backgroundColor: color.ink,
                        border: "none",
                        cursor: !dirty || pending ? "default" : "pointer",
                        opacity: !dirty || pending ? 0.4 : 1,
                    }}
                >{pending ? "SAVING" : "SAVE"}</button>

                <button
                    type="button"
                    onClick={() => { setValue(saved); setError(null); setJustSaved(false); }}
                    disabled={!dirty || pending}
                    style={{
                        ...button,
                        color: color.inkSecondary,
                        backgroundColor: "transparent",
                        border: hairline(line.pill),
                        cursor: !dirty || pending ? "default" : "pointer",
                        opacity: !dirty || pending ? 0.4 : 1,
                    }}
                >REVERT</button>

                <span
                    role="status"
                    style={{
                        fontFamily: font.system,
                        fontSize: "10px",
                        color: error ? color.pinkText : color.inkSecondary,
                    }}
                >
                    {error ? error : justSaved && !dirty ? "Saved." : dirty ? "Unsaved changes." : ""}
                </span>
            </div>
        </div>
    );
}
