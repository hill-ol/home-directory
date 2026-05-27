import StackOrbit from "@/components/StackOrbit";
import Polaroid from "@/components/Polaroid";
import FolderIcon from "@/components/FolderIcon";
import OrgIcons from "@/components/OrgIcons";
import ResumeIcon from "@/components/ResumeIcon";

export default function Home() {
    return (
        <main
            style={{
                minHeight: "100vh",
                backgroundColor: "#F2EDE4",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    minHeight: "100vh",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: "48px",
                }}
            >
                <StackOrbit />
                <Polaroid />
                <OrgIcons />
                <ResumeIcon />
                {/* Project folders */}
                <FolderIcon label="StyleBoard.jsx"  href="/projects/styleboard" top="47%" left="4%"  />
                <FolderIcon label="therapy_db.sql"  href="/projects/therapydb"  top="70%" left="14%"  />
                <FolderIcon label="toggo.ts"        href="/projects/toggo"       top="78%" left="43%" />
                <FolderIcon label="mills_research/" href="/projects/mills"       top="40%" left="77%" />
                <FolderIcon label="CoopScout.py"    href="/projects/coopscout"   top="15%"  left="85%" />

                {/* Hero */}
                <div
                    style={{
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "12px",
                        zIndex: 10,
                    }}
                >
                    <h1
                        style={{
                            fontFamily: "var(--font-playfair)",
                            fontSize: "clamp(48px, 7vw, 88px)",
                            fontWeight: 400,
                            color: "#1C1917",
                            lineHeight: 1.05,
                            letterSpacing: "-0.02em",
                            margin: 0,
                        }}
                    >
                        Olivia Hill
                    </h1>

                    <p
                        style={{
                            fontFamily: "var(--font-dm-sans)",
                            fontSize: "13px",
                            fontWeight: 300,
                            color: "#6B6560",
                            lineHeight: 1.7,
                            maxWidth: "340px",
                            margin: 0,
                        }}
                    >
                        CS + Math @ Northeastern. Building full-stack products
                        and exploring computing at the edge of the physical world.
                    </p>

                    {/* Supplementary skill pills */}
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "6px",
                            justifyContent: "center",
                            marginTop: "4px",
                            maxWidth: "320px",
                        }}
                    >
                        {["Java", "MongoDB", "Qiskit", "Go"].map((tag) => (
                            <span
                                key={tag}
                                style={{
                                    fontFamily: "-apple-system, BlinkMacSystemFont, system-ui",
                                    fontSize: "10px",
                                    color: "#A89E99",
                                    backgroundColor: "rgba(28, 25, 23, 0.04)",
                                    border: "0.5px solid rgba(28, 25, 23, 0.08)",
                                    borderRadius: "20px",
                                    padding: "3px 10px",
                                    letterSpacing: "0.01em",
                                }}
                            >
                {tag}
              </span>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}