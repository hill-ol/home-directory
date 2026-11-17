import Link from "next/link";
import { notFound } from "next/navigation";
import { currentUser } from "@/lib/auth/server";
import Page from "@/components/ui/Page";
import PageHeader from "@/components/ui/PageHeader";
import { color } from "@/lib/theme";

export const dynamic = "force-dynamic";

export default async function StudioPage() {
    const user = await currentUser();

    if (!user) notFound();

    return (
        <Page>
            <PageHeader eyebrow="studio/" title="Studio">
                Signed in as {user.email}.{" "}
                <Link href="/studio/work" style={{ color: color.pinkText }}>
                    Edit projects
                </Link>.
            </PageHeader>
        </Page>
    );
}
