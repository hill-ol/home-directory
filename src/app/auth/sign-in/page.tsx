"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth/client";
import { color, font, hairline, line } from "@/lib/theme";

/*
 * A plain form rather than Better Auth UI. That package wants shadcn/ui and
 * TanStack Query, and this project has neither: everything is styled with
 * inline token objects. One form with two fields is not worth two
 * dependencies and a component system.
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

    const field: React.CSSProperties = {
        fontFamily: font.body,
        fontSize: "14px",
        fontWeight: 300,
        color: color.ink,
        backgroundColor: color.card,
        border: hairline(line.card),
        borderRadius: "2px",
        padding: "10px 12px",
        width: "100%",
    };

    const label: React.CSSProperties = {
        fontFamily: font.system,
        fontSize: "10px",
        letterSpacing: "0.04em",
        color: color.inkSecondary,
        display: "block",
        marginBottom: "6px",
    };

    return (
        <main style={{
            minHeight: "100vh",
            backgroundColor: color.cream,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px 24px",
        }}>
            <form
                onSubmit={onSubmit}
                style={{ width: "100%", maxWidth: "320px" }}
            >
                <h1 style={{
                    fontFamily: font.display,
                    fontSize: "32px",
                    fontWeight: 400,
                    color: color.ink,
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    margin: "0 0 24px 0",
                }}>Sign in</h1>

                <div style={{ marginBottom: "16px" }}>
                    <label style={label} htmlFor="email">EMAIL</label>
                    <input
                        id="email"
                        type="email"
                        autoComplete="username"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={field}
                    />
                </div>

                <div style={{ marginBottom: "24px" }}>
                    <label style={label} htmlFor="password">PASSWORD</label>
                    <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={field}
                    />
                </div>

                {error && (
                    <p role="alert" style={{
                        fontFamily: font.body,
                        fontSize: "13px",
                        fontWeight: 300,
                        color: color.pinkText,
                        margin: "0 0 16px 0",
                        lineHeight: 1.5,
                    }}>{error}</p>
                )}

                <button
                    type="submit"
                    disabled={pending}
                    style={{
                        fontFamily: font.system,
                        fontSize: "11px",
                        letterSpacing: "0.04em",
                        color: color.cream,
                        backgroundColor: color.ink,
                        border: "none",
                        borderRadius: "2px",
                        padding: "12px 16px",
                        width: "100%",
                        cursor: pending ? "default" : "pointer",
                        opacity: pending ? 0.6 : 1,
                    }}
                >{pending ? "SIGNING IN" : "SIGN IN"}</button>
            </form>
        </main>
    );
}
