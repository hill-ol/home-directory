import { findProject } from "@/content/projects";
import { getSiteContent } from "@/lib/site-content";
import { notFound } from "next/navigation";
import ProjectContent from "@/components/ProjectContent";

export async function generateStaticParams() {
    const { projects } = await getSiteContent();
    return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
                                              params,
                                          }: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const { projects } = await getSiteContent();
    const project = findProject(projects, slug);

    if (!project) notFound();

    return <ProjectContent project={project} />;
}
