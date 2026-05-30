import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
    const base = "https://home-directory.vercel.app";

    const staticRoutes: MetadataRoute.Sitemap = [
        { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
        { url: `${base}/work`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
        { url: `${base}/readme`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${base}/research`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${base}/coursework`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    ];

    const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
        url: `${base}/projects/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    return [...staticRoutes, ...projectRoutes];
}