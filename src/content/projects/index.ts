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
        tagline: "A full-stack fashion curation platform with AI-powered outfit suggestions.",
        description:
            "StyleBoard is a fashion curation platform built around two distinct user roles: Explorers and Stylists. Explorers save and organize clothing items sourced via the Unsplash API into boards and Lookbooks; Stylists can publish curated collections for others to discover. The most technically interesting piece was integrating Gemini 2.0 Flash for AI outfit suggestions: given a board's saved items, the model returns styled outfit combinations with reasoning. Auth went through two iterations: the first used Express sessions which Vercel stripped on proxied responses, so I switched to JWT. Deployed on Vercel (frontend) and Render (backend).",
        stack: ["Next.js", "TypeScript", "Express", "MongoDB", "Mongoose", "JWT", "Gemini API", "Unsplash API"],
        github: "https://github.com/hill-ol/styleboard",
        live: "https://styleboard-two.vercel.app/",
        period: "Spring 2026",
        role: "Project Developer",
    },
    {
        slug: "toggo",
        filename: "toggo.ts",
        title: "Toggo",
        tagline: "A mobile trip planning app built for real users through Generate.",
        description:
            "Toggo is a mobile trip planning application developed as part of Northeastern's Generate product studio: a semester-long client project cycle where student engineering teams build real software for real product owners. The app helps users plan, organize, and share trips with a clean, intuitive interface. The stack pairs TypeScript on the frontend with Go on the backend, with Supabase handling the database and authentication. Working within Generate meant shipping on a fixed timeline with weekly stakeholder check-ins, the closest thing to a real product team experience available at Northeastern.",
        stack: ["TypeScript", "Go", "Supabase", "React Native"],
        github: "",
        live: "",
        period: "Spring 2026",
        role: "Software Engineer — Generate",
    },
    {
        slug: "coopscout",
        filename: "CoopScout.py",
        title: "CoopScout",
        tagline: "A Python scraper and dashboard that aggregates Northeastern co-op listings.",
        description:
            "The Northeastern co-op search is fragmented across at least four different platforms, none of which talk to each other. CoopScout scrapes and aggregates listings relevant to CS students into a single clean React/Vite dashboard. The scraper is written in Python using BeautifulSoup and runs on a schedule, storing results in a lightweight backend. The frontend lets you filter by role type, company, and cycle. Built out of genuine frustration during the co-op search process, which is exactly the right reason to build something.",
        stack: ["Python", "BeautifulSoup", "React", "Vite"],
        github: "https://github.com/crbridget/coopscout",
        live: "",
        period: "Fall 2025",
        role: "Project Developer",
    },
    {
        slug: "therapydb",
        filename: "therapy_db.sql",
        title: "Child Therapist Training Database",
        tagline: "An award-winning platform for training child therapists using AI-generated personas.",
        description:
            "No existing system uses AI-generated virtual personas to train therapists in Art Therapy through interactive case scenarios. We designed and built a relational database around six core entities: Therapist, Child, Training Supervisor, Guardian, Art Therapy, and Art Therapy Specialist, with therapist-child pairing based on shared art form preferences. The database went through conceptual, logical, and physical design stages and is normalized to 3NF. On top of the MySQL backend sits a React frontend and Flask API that integrates OpenAI to generate virtual pediatric patient personas whose responses evolve as training progresses. Presented at the Northeastern Oakland undergraduate research symposium (Poster #18-UR) and won the Khoury College Undergraduate Excellence Award.",
        stack: ["MySQL", "React", "Flask", "Python", "OpenAI API"],
        github: "",
        live: "",
        period: "Spring 2025",
        role: "Full-Stack Engineer, Northeastern Oakland",
    },
    {
        slug: "mills",
        filename: "mills_research/",
        title: "Quantum Computing Research",
        tagline: "Exploring whether quantum frameworks can classify medical datasets as effectively as classical ML.",
        description:
            "Can quantum computing frameworks match classical machine learning on medical classification tasks? I explored this question by applying quantum circuit classification to the Iris and Wisconsin Breast Cancer datasets, embedding classical data into Hilbert space and running quantum circuit processing using IBM's Qiskit and Pennylane. The research compared accuracy, accessibility, and hybrid potential across both frameworks. Pennylane showed stronger promise for quantum-classical hybrid pipelines, while Qiskit encountered meaningful accessibility barriers following IBM Quantum Lab's transition in 2024. Test accuracy reached 64% on the breast cancer dataset using Pennylane. Presented at the Northeastern Oakland undergraduate research symposium (Poster #12-UR). Funded by The Mills Institute.",
        stack: ["Qiskit", "Pennylane", "Python", "PyTorch", "TensorFlow", "IBM Quantum"],
        github: "",
        live: "",
        period: "Spring 2025",
        role: "Undergraduate Researcher, The Mills Institute",
    },
];

export function getProject(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug);
}