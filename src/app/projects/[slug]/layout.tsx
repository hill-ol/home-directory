import { getProject, projects } from "@/content/projects";
import { notFound } from "next/navigation";
import ProjectContent from "@/components/ProjectContent";
import type { Metadata } from "next";

export async function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const project = getProject(slug);
    if (!project) return {};

    return {
        title: project.title,
        description: project.tagline,
        openGraph: {
            title: `${project.title} · Olivia Hill`,
            description: project.tagline,
            images: [{ url: "/og", width: 1200, height: 630 }],
        },
        twitter: {
            card: "summary_large_image",
            title: `${project.title} · Olivia Hill`,
            description: project.tagline,
            images: ["/og"],
        },
    };
}

export default async function ProjectPage({
                                              params,
                                          }: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = getProject(slug);
    if (!project) notFound();
    return <ProjectContent project={project!} />;
}