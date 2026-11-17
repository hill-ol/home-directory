import Link from "next/link";
import { notFound } from "next/navigation";
import { currentUser } from "@/lib/auth/server";
import { getSiteContent } from "@/lib/site-content";
import WorkRow from "@/components/work/WorkRow";
import DescriptionEditor from "@/components/work/DescriptionEditor";
import AddProjectForm from "@/components/work/AddProjectForm";
import Page from "@/components/ui/Page";
import PageHeader from "@/components/ui/PageHeader";
import { color } from "@/lib/theme";

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
        <Page>
            <PageHeader eyebrow="studio/work/" title="Edit projects">
                Signed in as {user.email}. Saving republishes immediately,
                so check it on{" "}
                <Link href="/work" style={{ color: color.pinkText }}>work</Link>{" "}
                afterwards.
            </PageHeader>

            <AddProjectForm />

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
        </Page>
    );
}
