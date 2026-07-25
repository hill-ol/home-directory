"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    type MouseEvent as ReactMouseEvent,
    useCallback,
    useRef,
    useState,
} from "react";

import { useDialogA11y } from "@/hooks/useDialogA11y";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const entries = [
    {
        number: "01",
        poster: "/research/quantum.png",
        posterWidth: 2651,
        posterHeight: 1794,
        posterLabel: "Poster #12-UR",
        institution:
            "The Mills Institute · Northeastern Oakland",
        title: "Quantum Computing Research",
        tagline:
            "Exploring whether quantum frameworks can classify medical datasets as effectively as classical ML.",
        meta: [
            "Solo research",
            "Advisor: Dr. Miguel Fuentes-Cabrera",
            "Spring 2025",
        ],
        abstract:
            "Can quantum computing frameworks match classical machine learning on medical classification tasks? I explored this question by applying quantum circuit classification to the Iris and Wisconsin Breast Cancer datasets, embedding classical data into Hilbert space and running quantum circuit processing using IBM's Qiskit and Pennylane. The research compared accuracy, accessibility, and hybrid potential across both frameworks. Pennylane showed stronger promise for quantum-classical hybrid pipelines, while Qiskit encountered meaningful accessibility barriers following IBM Quantum Lab's transition in 2024. Test accuracy reached 64% on the breast cancer dataset using Pennylane. Presented at the Northeastern Oakland undergraduate research symposium (Poster #12-UR). Funded by The Mills Institute.",
        stack: [
            "Qiskit",
            "Pennylane",
            "Python",
            "PyTorch",
            "TensorFlow",
            "IBM Quantum",
        ],
        award: null,
        credit: "Mills Institute · Spring 2025",
        link: null,
    },
    {
        number: "02",
        poster: "/research/therapydb.png",
        posterWidth: 2651,
        posterHeight: 1795,
        posterLabel: "Poster #18-UR",
        institution: "Northeastern University · Oakland",
        title: "Child Therapist Training Database",
        tagline:
            "An award-winning platform for training child therapists using AI-generated personas.",
        meta: [
            "Team of 5",
            "Advisor: Akram Bayat",
            "Spring 2025",
        ],
        abstract:
            "No existing system uses AI-generated virtual personas to train therapists in Art Therapy through interactive case scenarios. We designed and built a relational database around six core entities: Therapist, Child, Training Supervisor, Guardian, Art Therapy, and Art Therapy Specialist, with therapist-child pairing based on shared art form preferences. The database went through conceptual, logical, and physical design stages and is normalized to 3NF. On top of the MySQL backend sits a React frontend and Flask API that integrates OpenAI to generate virtual pediatric patient personas whose responses evolve as training progresses. Presented at the Northeastern Oakland undergraduate research symposium (Poster #18-UR) and won the Khoury College Undergraduate Excellence Award.",
        stack: [
            "MySQL",
            "React",
            "Flask",
            "Python",
            "OpenAI API",
        ],
        award: "Khoury Undergraduate Excellence Award",
        credit: "Northeastern Oakland · Spring 2025",
        link: null,
    },
    {
        number: "03",
        poster: "/research/argonne.png",
        posterWidth: 7200,
        posterHeight: 9600,
        posterLabel: "ESRP 2024",
        institution: "Argonne National Laboratory · ESRP",
        title: 'Not So "Forever" Chemicals',
        tagline:
            "Investigating whether everyday materials like coffee grounds and biochar can filter PFAS 'Forever Chemicals' from contaminated water, using ATR-IR and HPLC spectroscopy at Argonne's Advanced Photon Source.",
        meta: [
            "Team of 12",
            "Advisors: Dr. Elizabeth Laudadio, Dr. Debora Meira",
            "2024",
        ],
        abstract:
            "Per- and polyfluorinated substances (PFAS), known as 'Forever Chemicals', are synthetic organofluorine compounds increasingly present in everyday products. Toxic even at low concentrations, they damage the liver and immune system and increase cancer risk. Because they are not biodegradable, safe disposal is a significant environmental challenge. Our team investigated whether low-cost, accessible materials could effectively filter perfluorooctanoic acid (PFOA) from contaminated water. Six filtration materials were tested: coffee grounds, biochar, ground coconut, sawdust, rayon, and cut-up water bottles. Each 5g filter sample was applied to a solution of 0.5g PFOA dissolved in 0.5L distilled water, representing concentrations found in highly contaminated areas. Three trials were conducted per material, including a control trial using filter paper alone. Samples were analyzed using ATR-IR (Attenuated Total Internal Reflectance Infrared Spectroscopy) to confirm PFAS presence and HPLC (High-Performance Liquid Chromatography) to quantify the amount of PFOA removed. Biochar and coffee grounds were the most effective filtration materials, significantly reducing PFOA concentration. Plastic bottles and rayon performed no better than filter paper alone. Sawdust and coconut shell were similarly ineffective. No material achieved complete removal of PFOAs in a single pass. Research conducted through the Exemplary Student Research Program (ESRP) at Argonne National Laboratory.",
        stack: [
            "HPLC",
            "ATR-IR Spectroscopy",
            "Advanced Photon Source",
            "Environmental Chemistry",
        ],
        award: null,
        credit:
            "Argonne National Laboratory · ESRP 2024",
        link: "https://www.anl.gov/education/lyons-township-high-school-esrp-2024",
    },
];

type ResearchEntry = (typeof entries)[number];

function PosterImage({ entry }: { entry: ResearchEntry }) {
    const [hovered, setHovered] = useState(false);
    const [zoomed, setZoomed] = useState(false);
    const [zoomPosition, setZoomPosition] = useState({
        x: 50,
        y: 50,
    });

    const dialogRef = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery("(max-width: 767px)");

    const closeZoom = useCallback(() => {
        setZoomed(false);
    }, []);

    useDialogA11y({
        open: zoomed,
        onClose: closeZoom,
        dialogRef,
    });

    const handleMouseMove = (
        event: ReactMouseEvent<HTMLDivElement>,
    ) => {
        const bounds =
            event.currentTarget.getBoundingClientRect();

        const x =
            ((event.clientX - bounds.left) / bounds.width) *
            100;

        const y =
            ((event.clientY - bounds.top) / bounds.height) *
            100;

        setZoomPosition({ x, y });
    };

    const posterAlt = `${entry.title} research poster`;

    return (
        <>
            {/*
             * A semantic button provides Enter and Space keyboard support
             * automatically. Reset its native styles so it still looks like
             * the original poster card.
             */}
            <button
                type="button"
                aria-haspopup="dialog"
                aria-label={`Open ${entry.title} poster`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onFocus={() => setHovered(true)}
                onBlur={() => setHovered(false)}
                onClick={() => setZoomed(true)}
                style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16 / 9",
                    display: "block",
                    marginBottom: "10px",
                    padding: 0,
                    cursor: "zoom-in",
                    background: "none",
                    border: "none",
                    borderRadius: "6px",
                    transform: hovered
                        ? "scale(1.02)"
                        : "scale(1)",
                    transition: "transform 0.3s ease",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        overflow: "hidden",
                        backgroundColor: "#E8E4DC",
                        border:
                            "0.5px solid rgba(28,25,23,0.10)",
                        borderRadius: "6px",
                    }}
                >
                    <Image
                        src={entry.poster}
                        alt={posterAlt}
                        fill
                        sizes="(max-width: 900px) 100vw, 900px"
                        style={{
                            objectFit: "contain",
                            pointerEvents: "none",
                        }}
                    />
                </div>

                {/* Desktop zoom prompt */}
                <div
                    aria-hidden="true"
                    className="hidden md:flex"
                    style={{
                        position: "absolute",
                        right: "12px",
                        bottom: "12px",
                        zIndex: 3,
                        alignItems: "center",
                        gap: "5px",
                        padding: "5px 10px",
                        pointerEvents: "none",
                        backgroundColor:
                            "rgba(242,237,228,0.95)",
                        backdropFilter: "blur(8px)",
                        border:
                            "0.5px solid rgba(28,25,23,0.10)",
                        borderRadius: "20px",
                        opacity: hovered ? 1 : 0,
                        transform: hovered
                            ? "translateY(0)"
                            : "translateY(4px)",
                        transition:
                            "opacity 0.15s ease, transform 0.15s ease",
                    }}
                >
                    <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#A89E99"
                        strokeWidth="2"
                        strokeLinecap="round"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                        <path d="M11 8v6M8 11h6" />
                    </svg>

                    <span
                        style={{
                            color: "#6B6560",
                            fontFamily: "monospace",
                            fontSize: "9px",
                            whiteSpace: "nowrap",
                        }}
                    >
                        click to zoom
                    </span>
                </div>

                <div
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        zIndex: 2,
                        padding: "3px 8px",
                        color: "#7A2D5A",
                        backgroundColor: "#F0A8CF",
                        borderRadius: "3px",
                        fontFamily: "monospace",
                        fontSize: "9px",
                    }}
                >
                    {entry.posterLabel}
                </div>

                {entry.award && (
                    <div
                        aria-hidden="true"
                        style={{
                            position: "absolute",
                            bottom: "12px",
                            left: "12px",
                            zIndex: 2,
                            padding: "3px 10px",
                            color: "#633806",
                            backgroundColor: "#FAC775",
                            borderRadius: "3px",
                            fontFamily: "monospace",
                            fontSize: "9px",
                        }}
                    >
                        {entry.award}
                    </div>
                )}
            </button>

            <AnimatePresence>
                {zoomed && (
                    <>
                        <motion.div
                            key="poster-backdrop"
                            aria-hidden="true"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={closeZoom}
                            style={{
                                position: "fixed",
                                inset: 0,
                                zIndex: 200,
                                backgroundColor:
                                    "rgba(28,25,23,0.88)",
                                backdropFilter: "blur(10px)",
                                WebkitBackdropFilter:
                                    "blur(10px)",
                            }}
                        />

                        {isMobile ? (
                            <motion.div
                                ref={dialogRef}
                                key="poster-mobile-dialog"
                                role="dialog"
                                aria-modal="true"
                                aria-label={`${entry.title} poster viewer`}
                                tabIndex={-1}
                                initial={{
                                    opacity: 0,
                                    scale: 0.96,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.96,
                                }}
                                transition={{
                                    duration: 0.25,
                                    ease: [0.32, 0.72, 0, 1],
                                }}
                                onClick={closeZoom}
                                style={{
                                    position: "fixed",
                                    inset: 0,
                                    zIndex: 201,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "24px",
                                }}
                            >
                                <ClosePosterButton
                                    onClose={closeZoom}
                                />

                                <div
                                    style={{
                                        width: "100%",
                                        overflow: "hidden",
                                        backgroundColor: "#E8E4DC",
                                        borderRadius: "8px",
                                        boxShadow:
                                            "0 16px 48px rgba(28,25,23,0.5)",
                                    }}
                                >
                                    <Image
                                        src={entry.poster}
                                        alt={posterAlt}
                                        width={entry.posterWidth}
                                        height={entry.posterHeight}
                                        sizes="calc(100vw - 48px)"
                                        style={{
                                            display: "block",
                                            width: "100%",
                                            height: "auto",
                                            pointerEvents: "none",
                                            userSelect: "none",
                                        }}
                                    />
                                </div>

                                <div
                                    aria-hidden="true"
                                    style={{
                                        position: "absolute",
                                        bottom: "40px",
                                        left: "50%",
                                        padding: "6px 16px",
                                        color: "#6B6560",
                                        backgroundColor:
                                            "rgba(242,237,228,0.92)",
                                        borderRadius: "20px",
                                        fontFamily: "monospace",
                                        fontSize: "10px",
                                        transform:
                                            "translateX(-50%)",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    tap to close
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                ref={dialogRef}
                                key="poster-desktop-dialog"
                                role="dialog"
                                aria-modal="true"
                                aria-label={`${entry.title} poster viewer`}
                                tabIndex={-1}
                                initial={{
                                    opacity: 0,
                                    scale: 0.94,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.94,
                                }}
                                transition={{
                                    duration: 0.25,
                                    ease: [0.32, 0.72, 0, 1],
                                }}
                                onMouseMove={handleMouseMove}
                                onClick={closeZoom}
                                style={{
                                    position: "fixed",
                                    top: "50vh",
                                    left: "50vw",
                                    zIndex: 201,
                                    width:
                                        "min(92vw, 1100px)",
                                    aspectRatio: "16 / 9",
                                    marginTop:
                                        "calc(min(92vw, 1100px) * -9 / 32)",
                                    marginLeft:
                                        "calc(min(92vw, 1100px) * -1 / 2)",
                                    overflow: "hidden",
                                    cursor: "zoom-out",
                                    backgroundColor: "#E8E4DC",
                                    borderRadius: "8px",
                                    boxShadow:
                                        "0 32px 80px rgba(28,25,23,0.6)",
                                }}
                            >
                                <ClosePosterButton
                                    onClose={closeZoom}
                                />

                                <Image
                                    src={entry.poster}
                                    alt={posterAlt}
                                    width={entry.posterWidth}
                                    height={entry.posterHeight}
                                    sizes="230vw"
                                    style={{
                                        position: "absolute",
                                        top: `${-zoomPosition.y * 1.5}%`,
                                        left: `${-zoomPosition.x * 1.5}%`,
                                        width: "250%",
                                        maxWidth: "none",
                                        height: "250%",
                                        objectFit: "contain",
                                        pointerEvents: "none",
                                        userSelect: "none",
                                    }}
                                />

                                <div
                                    aria-hidden="true"
                                    style={{
                                        position: "absolute",
                                        top: "14px",
                                        right: "54px",
                                        zIndex: 3,
                                        padding: "4px 12px",
                                        color: "#6B6560",
                                        backgroundColor:
                                            "rgba(242,237,228,0.92)",
                                        borderRadius: "20px",
                                        fontFamily: "monospace",
                                        fontSize: "9px",
                                        pointerEvents: "none",
                                    }}
                                >
                                    move to pan · click to close
                                </div>
                            </motion.div>
                        )}
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

function ClosePosterButton({
    onClose,
}: {
    onClose: () => void;
}) {
    return (
        <button
            type="button"
            aria-label="Close poster viewer"
            onClick={(event) => {
                // Prevent the parent dialog's click handler from receiving
                // the same event after this button closes the dialog.
                event.stopPropagation();
                onClose();
            }}
            style={{
                position: "absolute",
                top: "14px",
                right: "14px",
                zIndex: 4,
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
                cursor: "pointer",
                color: "#1C1917",
                backgroundColor: "rgba(242,237,228,0.92)",
                border: "none",
                borderRadius: "50%",
            }}
        >
            <svg
                aria-hidden="true"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
            >
                <path
                    d="M1 1l10 10M11 1L1 11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
            </svg>
        </button>
    );
}

export default function ResearchPage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <main
                style={{
                    minHeight: "100vh",
                    paddingTop: "80px",
                    paddingBottom: "96px",
                    backgroundColor: "#F2EDE4",
                }}
            >
                <div
                    style={{
                        maxWidth: "900px",
                        margin: "0 auto",
                        padding: "0 24px",
                    }}
                >
                    <Link
                        href="/"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            marginBottom: "48px",
                            color: "#6B6560",
                            fontFamily:
                                "-apple-system, BlinkMacSystemFont, system-ui",
                            fontSize: "12px",
                            textDecoration: "none",
                            transition: "color 0.2s",
                        }}
                        onMouseEnter={(event) => {
                            event.currentTarget.style.color =
                                "#F0A8CF";
                        }}
                        onMouseLeave={(event) => {
                            event.currentTarget.style.color =
                                "#6B6560";
                        }}
                    >
                        ← back to desktop
                    </Link>

                    <header
                        style={{
                            marginBottom: "64px",
                        }}
                    >
                        <div
                            style={{
                                marginBottom: "12px",
                                color: "#F0A8CF",
                                fontFamily:
                                    "-apple-system, BlinkMacSystemFont, system-ui",
                                fontSize: "10px",
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                            }}
                        >
                            research/
                        </div>

                        <h1
                            style={{
                                margin: "0 0 12px",
                                color: "#1C1917",
                                fontFamily:
                                    "var(--font-playfair)",
                                fontSize:
                                    "clamp(32px, 5vw, 48px)",
                                fontWeight: 400,
                                lineHeight: 1.1,
                                letterSpacing: "-0.02em",
                            }}
                        >
                            Research
                        </h1>

                        <p
                            style={{
                                margin: 0,
                                color: "#6B6560",
                                fontFamily:
                                    "var(--font-dm-sans)",
                                fontSize: "13px",
                                fontWeight: 300,
                                lineHeight: 1.7,
                            }}
                        >
                            Undergraduate and pre-collegiate
                            research across quantum computing,
                            database systems, and environmental
                            chemistry.
                        </p>
                    </header>

                    {entries.map((entry, index) => (
                        <motion.article
                            key={entry.number}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                            viewport={{
                                once: true,
                                margin: "-60px",
                            }}
                            transition={{
                                duration: 0.5,
                                ease: "easeOut",
                            }}
                            style={{
                                marginBottom:
                                    index <
                                    entries.length - 1
                                        ? "80px"
                                        : 0,
                            }}
                        >
                            <div
                                aria-hidden="true"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    marginBottom: "28px",
                                }}
                            >
                                <span
                                    style={{
                                        color: "#F0A8CF",
                                        fontFamily: "monospace",
                                        fontSize: "11px",
                                        letterSpacing: "0.04em",
                                    }}
                                >
                                    {entry.number} ·
                                </span>

                                <div
                                    style={{
                                        flex: 1,
                                        height: "0.5px",
                                        backgroundColor:
                                            "rgba(28,25,23,0.10)",
                                    }}
                                />

                                <span
                                    style={{
                                        padding: "2px 8px",
                                        color: "#6B6560",
                                        backgroundColor:
                                            "rgba(28,25,23,0.04)",
                                        border:
                                            "0.5px solid rgba(28,25,23,0.08)",
                                        borderRadius: "20px",
                                        fontFamily: "monospace",
                                        fontSize: "10px",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    [ status: completed ]
                                </span>
                            </div>

                            <PosterImage entry={entry} />

                            <div
                                style={{
                                    marginBottom: "28px",
                                    color: "#6B6560",
                                    fontFamily:
                                        "-apple-system, BlinkMacSystemFont, system-ui",
                                    fontSize: "10px",
                                }}
                            >
                                {entry.credit}
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "14px",
                                }}
                            >
                                <div
                                    style={{
                                        color: "#6B6560",
                                        fontFamily: "monospace",
                                        fontSize: "10px",
                                        letterSpacing: "0.06em",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    {entry.institution}
                                </div>

                                <h2
                                    style={{
                                        margin: 0,
                                        color: "#1C1917",
                                        fontFamily:
                                            "var(--font-playfair)",
                                        fontSize:
                                            "clamp(18px, 3vw, 22px)",
                                        fontWeight: 400,
                                        lineHeight: 1.25,
                                    }}
                                >
                                    {entry.title}
                                </h2>

                                <p
                                    style={{
                                        margin: 0,
                                        color: "#6B6560",
                                        fontFamily:
                                            "var(--font-dm-sans)",
                                        fontSize: "14px",
                                        fontStyle: "italic",
                                        fontWeight: 300,
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {entry.tagline}
                                </p>

                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                        gap: "8px",
                                    }}
                                >
                                    {entry.meta.map(
                                        (metadata, metaIndex) => (
                                            <span
                                                key={metadata}
                                                style={{
                                                    display: "flex",
                                                    alignItems:
                                                        "center",
                                                    gap: "8px",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        color:
                                                            "#6B6560",
                                                        fontFamily:
                                                            "var(--font-dm-sans)",
                                                        fontSize:
                                                            "11px",
                                                    }}
                                                >
                                                    {metadata}
                                                </span>

                                                {metaIndex <
                                                    entry.meta
                                                        .length -
                                                        1 && (
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            color:
                                                                "#D3CEC9",
                                                        }}
                                                    >
                                                        ·
                                                    </span>
                                                )}
                                            </span>
                                        ),
                                    )}
                                </div>

                                <div
                                    aria-hidden="true"
                                    style={{
                                        height: "0.5px",
                                        backgroundColor:
                                            "rgba(28,25,23,0.08)",
                                    }}
                                />

                                <p
                                    style={{
                                        margin: 0,
                                        color: "#6B6560",
                                        fontFamily:
                                            "var(--font-dm-sans)",
                                        fontSize: "13px",
                                        fontWeight: 300,
                                        lineHeight: 1.8,
                                    }}
                                >
                                    {entry.abstract}
                                </p>

                                <div
                                    aria-label="Research methods and technologies"
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: "6px",
                                        marginTop: "4px",
                                    }}
                                >
                                    {entry.stack.map((tag) => (
                                        <span
                                            key={tag}
                                            style={{
                                                padding:
                                                    "2px 10px",
                                                color: "#6B6560",
                                                backgroundColor:
                                                    "rgba(28,25,23,0.04)",
                                                border:
                                                    "0.5px solid rgba(28,25,23,0.08)",
                                                borderRadius:
                                                    "20px",
                                                fontFamily:
                                                    "monospace",
                                                fontSize: "10px",
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {entry.link && (
                                    <a
                                        href={entry.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            width: "fit-content",
                                            display:
                                                "inline-flex",
                                            alignItems: "center",
                                            gap: "6px",
                                            padding:
                                                "6px 16px",
                                            color: "#1C1917",
                                            fontFamily:
                                                "-apple-system, BlinkMacSystemFont, system-ui",
                                            fontSize: "12px",
                                            textDecoration:
                                                "none",
                                            border:
                                                "0.5px solid rgba(28,25,23,0.20)",
                                            borderRadius:
                                                "20px",
                                            transition:
                                                "border-color 0.2s, color 0.2s",
                                        }}
                                        onMouseEnter={(
                                            event,
                                        ) => {
                                            event.currentTarget.style.borderColor =
                                                "#F0A8CF";

                                            event.currentTarget.style.color =
                                                "#F0A8CF";
                                        }}
                                        onMouseLeave={(
                                            event,
                                        ) => {
                                            event.currentTarget.style.borderColor =
                                                "rgba(28,25,23,0.20)";

                                            event.currentTarget.style.color =
                                                "#1C1917";
                                        }}
                                    >
                                        View on Argonne.gov →
                                    </a>
                                )}
                            </div>
                        </motion.article>
                    ))}
                </div>
            </main>
        </motion.div>
    );
}
