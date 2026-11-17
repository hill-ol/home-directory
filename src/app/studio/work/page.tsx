import Link from "next/link";
import { notFound } from "next/navigation";
import { currentUser } from "@/lib/auth/server";
import { getSiteContent } from "@/lib/site-content";
import SectionLabel from "@/components/SectionLabel";
import WorkRow from "@/components/work/WorkRow";
import DescriptionEditor from "@/components/work/DescriptionEditor";
import { color, font } from "@/lib/theme";

/*
 * Always dynamic: it reads the session cookie. That is the whole reason the
 * editor lives here rather than on /work, which stays statically rendered
 * and carries none of this code.
 */
export const dynamic = "force-dynamic";

export default async function StudioWorkPage() {
    /*
     * The middleware proves there is a session; it does not prove whose. A
     * non-owner gets the 404 they would have got if the route did not exist.
     */
    const user = await currentUser();
    if (!user) notFound();

    const { projects } = await getSiteContent();

    return (
        <main style={{ minHeight: "100vh", backgroundColor: color.cream, paddingTop: "80px", paddingBottom: "96px" }}>
            <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>

                <div style={{ marginBottom: "56px" }}>
                    <SectionLabel tone="accent" size="11px" style={{ marginBottom: "12px" }}>studio/work/</SectionLabel>
                    <h1 style={{
                        fontFamily: font.display,
                        fontSize: "clamp(32px, 5vw, 52px)",
                        fontWeight: 400, color: color.ink,
                        lineHeight: 1.1, letterSpacing: "-0.02em", margin: "0 0 16px 0",
                    }}>Edit projects</h1>
                    <p style={{
                        fontFamily: font.body, fontSize: "14px",
                        fontWeight: 300, color: color.inkSecondary,
                        margin: 0, lineHeight: 1.7, maxWidth: "480px",
                    }}>
                        Signed in as {user.email}. Saving republishes immediately,
                        so check it on <Link href="/work" style={{ color: color.pinkText }}>work</Link> afterwards.
                    </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    {projects.map((project) => (
                        <WorkRow key={project.slug} project={project} variant="edit">
                            <DescriptionEditor
                                slug={project.slug}
                                initial={project.description}
                            />
                        </WorkRow>
                    ))}
                </div>
            </div>
        </main>
    );
}
