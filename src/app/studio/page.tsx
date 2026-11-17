import Link from "next/link";
import { notFound } from "next/navigation";
import { currentUser } from "@/lib/auth/server";
import { color, font } from "@/lib/theme";

/*
 * Always dynamic: it reads the session cookie, so there is nothing to
 * prerender. Declaring it here keeps `next build` from attempting a static
 * pass and logging the resulting cookie error as if it were a failure.
 */
export const dynamic = "force-dynamic";

/*
 * Placeholder. The editor surfaces land here in phase 4: this exists now so
 * the protected route is real and the middleware has something to guard.
 */
export default async function StudioPage() {
    const user = await currentUser();

    /*
     * The middleware only proves there is a session. If sign-up is open on
     * the branch, that session could belong to anyone, so the owner check
     * runs here too and a non-owner gets the 404 they would have got if the
     * route did not exist.
     */
    if (!user) notFound();

    return (
        <main style={{
            minHeight: "100vh",
            backgroundColor: color.cream,
            paddingTop: "80px",
            paddingBottom: "96px",
        }}>
            <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>
                <h1 style={{
                    fontFamily: font.display,
                    fontSize: "clamp(32px, 5vw, 52px)",
                    fontWeight: 400,
                    color: color.ink,
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    margin: "0 0 16px 0",
                }}>Studio</h1>
                <p style={{
                    fontFamily: font.body,
                    fontSize: "14px",
                    fontWeight: 300,
                    color: color.inkSecondary,
                    margin: 0,
                    lineHeight: 1.7,
                }}>
                    Signed in as {user.email}. <Link href="/studio/work" style={{ color: color.pinkText }}>Edit projects</Link>.
                </p>
            </div>
        </main>
    );
}
