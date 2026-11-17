"use client";

import { useState, useTransition } from "react";
import { addProject, type NewProject } from "@/app/studio/work/actions";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import Modal from "@/components/ui/Modal";
import StatusText from "@/components/ui/StatusText";
import { color, font } from "@/lib/theme";

const EMPTY: NewProject = {
    slug: "", filename: "", title: "", tagline: "",
    description: "", period: "", role: "", stack: [],
    github: "", live: "",
};

/*
 * Derives a slug from the title the way the existing ones read: lowercase,
 * punctuation dropped, runs of anything else collapsed to single hyphens.
 * It only fills the field until the field is touched, because the slug is
 * the key the rest of the site joins on, and renaming one later is refused
 * while a research entry points at it.
 */
function slugify(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export default function AddProjectForm() {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<NewProject>(EMPTY);
    const [stackText, setStackText] = useState("");
    const [slugTouched, setSlugTouched] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [added, setAdded] = useState<string | null>(null);
    const [pending, startTransition] = useTransition();

    /*
     * Closing keeps whatever has been typed. Escape and the close button both
     * reach here, and losing a half-written description to a stray keypress
     * would be worse than a draft still waiting when you reopen. Only a
     * successful add clears the form.
     */
    const close = () => setOpen(false);

    const set = (key: keyof NewProject, value: string) =>
        setForm((previous) => ({ ...previous, [key]: value }));

    function onSubmit(event: React.FormEvent) {
        event.preventDefault();
        setError(null);
        setAdded(null);

        const payload: NewProject = {
            ...form,
            slug: slugTouched ? form.slug : slugify(form.title),
            stack: stackText.split(",").map((s) => s.trim()).filter(Boolean),
        };

        startTransition(async () => {
            const result = await addProject(payload);

            if (result.ok) {
                setForm(EMPTY);
                setStackText("");
                setSlugTouched(false);
                setAdded(payload.title);
                setOpen(false);
                return;
            }

            setError(result.error);
        });
    }

    return (
        <div style={{
            marginBottom: "32px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
        }}>
            <Button size="md" onClick={() => { setOpen(true); setAdded(null); }}>
                + ADD A PROJECT
            </Button>

            <StatusText>{added ? `Added ${added}.` : ""}</StatusText>

            <Modal
                open={open}
                onClose={close}
                title="Add a project"
                closeLabel="Close add project"
            >
                <form
                    onSubmit={onSubmit}
                    style={{ display: "flex", flexDirection: "column", gap: "16px" }}
                >
                    <div style={{
                        display: "grid", gap: "16px",
                        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    }}>
                        <Field idPrefix="add" name="title" required
                            value={form.title}
                            onChange={(v) => set("title", v)} />

                        <Field idPrefix="add" name="slug" required
                            hint="the URL, and the key research joins on"
                            value={slugTouched ? form.slug : slugify(form.title)}
                            onChange={(v) => { setSlugTouched(true); set("slug", v); }} />

                        <Field idPrefix="add" name="filename" required
                            hint="a real extension, such as app.tsx"
                            value={form.filename}
                            onChange={(v) => set("filename", v)} />

                        <Field idPrefix="add" name="period" required
                            hint="such as Spring 2026"
                            value={form.period}
                            onChange={(v) => set("period", v)} />

                        <Field idPrefix="add" name="role" required
                            value={form.role}
                            onChange={(v) => set("role", v)} />

                        <Field idPrefix="add" name="stack"
                            hint="comma separated"
                            value={stackText}
                            onChange={setStackText} />

                        <Field idPrefix="add" name="github" type="url"
                            hint="optional"
                            value={form.github}
                            onChange={(v) => set("github", v)} />

                        <Field idPrefix="add" name="live" type="url"
                            hint="optional"
                            value={form.live}
                            onChange={(v) => set("live", v)} />
                    </div>

                    <Field idPrefix="add" name="tagline" required
                        hint="one line, shown on the work list"
                        value={form.tagline}
                        onChange={(v) => set("tagline", v)} />

                    <Field idPrefix="add" name="description" required multiline
                        hint="the long prose on the project page"
                        value={form.description}
                        onChange={(v) => set("description", v)} />

                    <p style={{
                        fontFamily: font.body, fontSize: "12px", fontWeight: 300,
                        color: color.inkSecondary, margin: 0, lineHeight: 1.6,
                    }}>
                        Goes to the top of the list, so it leads work, the mobile
                        grid and the sitemap. It will not appear on the desktop
                        canvas, which is still placed by hand.
                    </p>

                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                        <Button type="submit" disabled={pending}>
                            {pending ? "ADDING" : "ADD PROJECT"}
                        </Button>

                        <Button type="button" variant="quiet" disabled={pending} onClick={close}>
                            CANCEL
                        </Button>

                        <StatusText tone="error">{error}</StatusText>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
