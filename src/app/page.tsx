"use client";

import { useState, useCallback, useEffect } from "react";
import StackOrbit from "@/components/StackOrbit";
import Polaroid from "@/components/Polaroid";
import FolderIcon from "@/components/FolderIcon";
import OrgIcons from "@/components/OrgIcons";
import ResumeIcon from "@/components/ResumeIcon";
import MobileHome from "@/components/MobileHome";
import ProjectOverlay from "@/components/ProjectOverlay";
import { getProject } from "@/content/projects";
import ContextMenu from "@/components/ContextMenu";
import type { Project } from "@/content/projects";

export default function Home() {
    const [activeProject, setActiveProject] = useState<Project | null>(null);
    const [folderRect, setFolderRect] = useState<DOMRect | null>(null);

    const openProject = useCallback((slug: string, rect: DOMRect) => {
        const project = getProject(slug);
        if (!project) return;
        setFolderRect(rect);
        setActiveProject(project);
        // Update URL without triggering Next.js navigation
        window.history.pushState({ slug }, "", `/projects/${slug}`);
    }, []);

    const closeProject = useCallback(() => {
        setActiveProject(null);
        // Restore URL
        window.history.pushState({}, "", "/");
    }, []);

    // Handle browser back button — close overlay if open
    useEffect(() => {
        const handler = (e: PopStateEvent) => {
            if (activeProject) {
                setActiveProject(null);
            }
        };
        window.addEventListener("popstate", handler);
        return () => window.removeEventListener("popstate", handler);
    }, [activeProject]);

    return (
        <>
            {/* Desktop */}
            <main
                className="hidden md:block"
                style={{
                    minHeight: "100vh",
                    backgroundColor: "#F2EDE4",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <div style={{
                    minHeight: "100vh",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: "48px",
                }}>
                    <StackOrbit />
                    <Polaroid />
                    <OrgIcons />
                    <ResumeIcon />

                    <FolderIcon label="StyleBoard.jsx"  slug="styleboard" top="47%" left="4%"  onClick={openProject} />
                    <FolderIcon label="therapy_db.sql"  slug="therapydb"  top="70%" left="14%" onClick={openProject} />
                    <FolderIcon label="toggo.ts"        slug="toggo"      top="78%" left="43%" onClick={openProject} />
                    <FolderIcon label="mills_research/" slug="mills"      top="40%" left="77%" onClick={openProject} />
                    <FolderIcon label="CoopScout.py"    slug="coopscout"  top="15%" left="85%" onClick={openProject} />

                    <div style={{
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "12px",
                        zIndex: 10,
                    }}>
                        <h1 style={{
                            fontFamily: "var(--font-playfair)",
                            fontSize: "clamp(48px, 7vw, 88px)",
                            fontWeight: 400, color: "#1C1917",
                            lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0,
                        }}>Olivia Hill</h1>
                        <p style={{
                            fontFamily: "var(--font-dm-sans)",
                            fontSize: "13px", fontWeight: 300,
                            color: "#6B6560", lineHeight: 1.7,
                            maxWidth: "340px", margin: 0,
                        }}>
                            CS + Math @ Northeastern. Building full-stack products
                            and software that makes a meaningful impact.
                        </p>
                    </div>
                </div>

                <ProjectOverlay project={activeProject} folderRect={folderRect} onClose={closeProject} />
                <ContextMenu />
            </main>

            {/* Mobile */}
            <div className="block md:hidden">
                <MobileHome onFolderClick={openProject} />
                <ProjectOverlay project={activeProject} folderRect={folderRect} onClose={closeProject} />
            </div>
        </>
    );
}