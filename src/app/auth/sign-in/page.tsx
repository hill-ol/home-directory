"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth/client";
import Button from "@/components/ui/Button";
import Field from "@/components/ui/Field";
import Page from "@/components/ui/Page";
import StatusText from "@/components/ui/StatusText";
import { color, font } from "@/lib/theme";

/*
 * A plain form rather than Better Auth UI. That package wants shadcn/ui and
 * TanStack Query, and this project has neither: everything is styled with
 * inline token objects, and the primitives in src/components/ui cover a form
 * this size.
 */
export default function SignInPage() {
    const router = useRouter();
    const params = useSearchParams();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault();
        setPending(true);
        setError(null);

        const { error: signInError } = await authClient.signIn.email({
            email,
            password,
        });

        setPending(false);

        if (signInError) {
            setError(signInError.message ?? "Could not sign in.");
            return;
        }

        /*
         * redirectTo is attacker-controllable, so only a same-origin path is
         * honoured. Anything else falls back to /studio.
         */
        const requested = params.get("redirectTo") ?? "";
        const safe =
            requested.startsWith("/") && !requested.startsWith("//")
                ? requested
                : "/studio";

        router.replace(safe);
        router.refresh();
    }

    return (
        <Page variant="centered">
            <form
                onSubmit={onSubmit}
                style={{
                    width: "100%",
                    maxWidth: "320px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                }}
            >
                <h1 style={{
                    fontFamily: font.display,
                    fontSize: "32px",
                    fontWeight: 400,
                    color: color.ink,
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    margin: "0 0 8px 0",
                }}>Sign in</h1>

                <Field
                    idPrefix="signin"
                    name="email"
                    type="email"
                    autoComplete="username"
                    required
                    value={email}
                    onChange={setEmail}
                />

                <Field
                    idPrefix="signin"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={setPassword}
                />

                <StatusText tone="error" size="md">{error}</StatusText>

                <Button
                    type="submit"
                    size="md"
                    disabled={pending}
                    style={{ width: "100%" }}
                >{pending ? "SIGNING IN" : "SIGN IN"}</Button>
            </form>
        </Page>
    );
}
