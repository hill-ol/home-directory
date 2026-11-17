"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import WorkRow from "@/components/work/WorkRow";
import Page from "@/components/ui/Page";
import PageHeader from "@/components/ui/PageHeader";
import { useContent } from "@/components/ContentProvider";

export default function WorkPage() {
    const { projects } = useContent();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <Page>
                <PageHeader eyebrow="work/" title="Projects">
                    A selection of things I&apos;ve built: full-stack products,
                    research tools, and everything in between.
                </PageHeader>

                {/* Project list */}
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ delay: i * 0.05, duration: 0.45, ease: "easeOut" }}
                        >
                            <Link href={`/projects/${project.slug}`} style={{ textDecoration: "none" }}>
                                <WorkRow project={project} />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </Page>
        </motion.div>
    );
}
