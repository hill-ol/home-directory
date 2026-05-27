import { getProject, projects } from "@/content/projects";
import { notFound } from "next/navigation";
import ProjectContent from "@/components/ProjectContent";

export async function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
                                              params,
                                          }: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = getProject(slug);

    if (!project) notFound();

    return <ProjectContent project={project} />;
}