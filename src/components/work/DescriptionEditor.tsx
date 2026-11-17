"use client";

import { useState, useTransition } from "react";
import { saveProjectDescription } from "@/app/studio/work/actions";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import StatusText from "@/components/ui/StatusText";

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

    return (
        <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
            {/* The slug keeps the id unique across the rows on this page. */}
            <Field
                idPrefix={slug}
                name="description"
                multiline
                value={value}
                onChange={setValue}
            />

            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                <Button type="button" onClick={onSave} disabled={!dirty || pending}>
                    {pending ? "SAVING" : "SAVE"}
                </Button>

                <Button
                    type="button"
                    variant="quiet"
                    disabled={!dirty || pending}
                    onClick={() => { setValue(saved); setError(null); setJustSaved(false); }}
                >REVERT</Button>

                <StatusText tone={error ? "error" : "neutral"}>
                    {error ?? (justSaved && !dirty ? "Saved." : dirty ? "Unsaved changes." : "")}
                </StatusText>
            </div>
        </div>
    );
}
