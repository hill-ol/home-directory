import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: siteUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
        { url: `${siteUrl}/work`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
        { url: `${siteUrl}/readme`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${siteUrl}/research`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${siteUrl}/coursework`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    ];

    const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
        url: `${siteUrl}/projects/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    return [...staticRoutes, ...projectRoutes];
}