import { getProject } from "@/content/projects";

type Presentation = {
    number: string;
    poster: string;
    posterWidth: number;
    posterHeight: number;
    posterLabel: string;
    institution: string;
    meta: string[];
    award: string | null;
    credit: string;
    link: { href: string; label: string } | null;
};

type Writeup = {
    title: string;
    tagline: string;
    abstract: string;
    stack: string[];
};

export type ResearchEntry = Presentation &
    Writeup & {
        slug?: string;
    };

type ResearchSource = Presentation & ({ project: string } | Writeup);

const sources: ResearchSource[] = [
    {
        number: "01",
        project: "mills",
        poster: "/research/quantum.png",
        posterWidth: 2651,
        posterHeight: 1794,
        posterLabel: "Poster #12-UR",
        institution:
            "The Mills Institute · Northeastern Oakland",
        meta: [
            "Solo research",
            "Advisor: Dr. Miguel Fuentes-Cabrera",
            "Spring 2025",
        ],
        award: null,
        credit: "Mills Institute · Spring 2025",
        link: null,
    },
    {
        number: "02",
        project: "therapydb",
        poster: "/research/therapydb.png",
        posterWidth: 2651,
        posterHeight: 1795,
        posterLabel: "Poster #18-UR",
        institution: "Northeastern University · Oakland",
        meta: ["Team of 5", "Advisor: Dr. Akram Bayat", "Spring 2025"],
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
        abstract:
            "Per- and polyfluorinated substances (PFAS), known as 'Forever Chemicals', are synthetic organofluorine compounds increasingly present in everyday products. Toxic even at low concentrations, they damage the liver and immune system and increase cancer risk. Because they are not biodegradable, safe disposal is a significant environmental challenge. Our team investigated whether low-cost, accessible materials could effectively filter perfluorooctanoic acid (PFOA) from contaminated water. Six filtration materials were tested: coffee grounds, biochar, ground coconut, sawdust, rayon, and cut-up water bottles. Each 5g filter sample was applied to a solution of 0.5g PFOA dissolved in 0.5L distilled water, representing concentrations found in highly contaminated areas. Three trials were conducted per material, including a control trial using filter paper alone. Samples were analyzed using ATR-IR (Attenuated Total Internal Reflectance Infrared Spectroscopy) to confirm PFAS presence and HPLC (High-Performance Liquid Chromatography) to quantify the amount of PFOA removed. Biochar and coffee grounds were the most effective filtration materials, significantly reducing PFOA concentration. Plastic bottles and rayon performed no better than filter paper alone. Sawdust and coconut shell were similarly ineffective. No material achieved complete removal of PFOAs in a single pass. Research conducted through the Exemplary Student Research Program (ESRP) at Argonne National Laboratory.",
        stack: [
            "HPLC",
            "ATR-IR Spectroscopy",
            "Advanced Photon Source",
            "Environmental Chemistry",
        ],
        meta: [
            "Team of 12",
            "Advisors: Dr. Elizabeth Laudadio, Dr. Debora Meira",
            "2024",
        ],
        award: null,
        credit: "Argonne National Laboratory · ESRP 2024",
        link: {
            href: "https://www.anl.gov/education/lyons-township-high-school-esrp-2024",
            label: "View on anl.gov",
        },
    },
];

function resolve(source: ResearchSource): ResearchEntry {
    if (!("project" in source)) return source;

    const { project: slug, ...presentation } = source;
    const match = getProject(slug);

    if (!match) {
        throw new Error(
            `Research entry ${source.number} references unknown project "${slug}".`,
        );
    }

    return {
        ...presentation,
        slug: match.slug,
        title: match.title,
        tagline: match.tagline,
        abstract: match.description,
        stack: match.stack,
    };
}

export const research: ResearchEntry[] = sources.map(resolve);