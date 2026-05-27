export type Project = {
    slug: string;
    filename: string;
    title: string;
    tagline: string;
    description: string;
    stack: string[];
    github?: string;
    live?: string;
    period: string;
    role: string;
};

export const projects: Project[] = [
    {
        slug: "styleboard",
        filename: "StyleBoard.jsx",
        title: "StyleBoard",
        tagline: "A full-stack fashion curation app with AI outfit suggestions.",
        description:
            "StyleBoard is a fashion curation platform built around dual user roles — Explorers and Stylists. Users can create boards, save items via the Unsplash API, build Lookbooks, and get AI-powered outfit suggestions through Gemini 2.0 Flash. Built with Next.js, Express, Mongoose, and MongoDB Atlas, deployed on Vercel and Render.",
        stack: ["Next.js", "TypeScript", "Express", "MongoDB", "Mongoose", "JWT", "Gemini API", "Unsplash API"],
        github: "https://github.com/hill-ol/styleboard",
        live: "",
        period: "Spring 2025",
        role: "Full-Stack Engineer",
    },
    {
        slug: "toggo",
        filename: "toggo.ts",
        title: "Toggo",
        tagline: "A mobile trip planning app built for Generate.",
        description:
            "Toggo is a mobile trip planning application developed as part of Northeastern's Generate product studio. The app helps users plan and organize trips with a clean, intuitive interface. Built with TypeScript on the frontend and Go on the backend, with Supabase handling the database and authentication.",
        stack: ["TypeScript", "Go", "Supabase", "React Native"],
        github: "",
        live: "",
        period: "2024–2025",
        role: "Software Engineer — Generate",
    },
    {
        slug: "coopscout",
        filename: "CoopScout.py",
        title: "CoopScout",
        tagline: "A Python web scraper and dashboard for Northeastern co-op listings.",
        description:
            "CoopScout scrapes and aggregates co-op job listings relevant to Northeastern students, surfacing them through a clean React/Vite frontend. Built out of a real need — the co-op search process is fragmented across multiple platforms. The scraper is written in Python and the frontend is a React/Vite app.",
        stack: ["Python", "React", "Vite", "BeautifulSoup"],
        github: "https://github.com/hill-ol/coopscout",
        live: "",
        period: "2024",
        role: "Solo Project",
    },
    {
        slug: "therapydb",
        filename: "therapy_db.sql",
        title: "Child Therapist Training Database",
        tagline: "Award-winning database platform for child therapist training programs.",
        description:
            "A full-stack platform built to support child therapist training programs, featuring a structured MySQL database, a React frontend, a Flask API backend, and an OpenAI API integration for training assistance. Won the Khoury College Undergraduate Excellence Award.",
        stack: ["MySQL", "React", "Flask", "Python", "OpenAI API"],
        github: "",
        live: "",
        period: "2023–2024",
        role: "Full-Stack Engineer",
    },
    {
        slug: "mills",
        filename: "mills_research/",
        title: "Quantum Computing Research",
        tagline: "Quantum circuit research at The Mills Institute.",
        description:
            "Research conducted at The Mills Institute exploring quantum computing concepts and circuit design using Qiskit. The work focused on quantum gate operations and circuit optimization, bridging theoretical computer science with physical computing systems.",
        stack: ["Qiskit", "Python", "IBM Quantum"],
        github: "",
        live: "",
        period: "2023–2024",
        role: "Undergraduate Researcher",
    },
];

export function getProject(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug);
}