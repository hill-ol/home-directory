import type { SimpleIcon } from "simple-icons";
import {
    siGit,
    siGo,
    siMongodb,
    siNextdotjs,
    siNodedotjs,
    siOpenjdk,
    siPostgresql,
    siPython,
    siReact,
    siSupabase,
    siTypescript,
} from "simple-icons";

export type StackItem = {
    label: string;
    icon: SimpleIcon;
    desktop: { top: string; left: string };
};

export const stack: StackItem[] = [
    { label: "TypeScript", icon: siTypescript, desktop: { top: "34%", left: "24%" } },
    { label: "Python",     icon: siPython,     desktop: { top: "27%", left: "71%" } },
    { label: "React",      icon: siReact,      desktop: { top: "54%", left: "20%" } },
    { label: "Next.js",    icon: siNextdotjs,  desktop: { top: "60%", left: "76%" } },
    { label: "Node.js",    icon: siNodedotjs,  desktop: { top: "25%", left: "36%" } },
    { label: "SQL",        icon: siPostgresql, desktop: { top: "70%", left: "34%" } },
    { label: "Supabase",   icon: siSupabase,   desktop: { top: "68%", left: "64%" } },
    { label: "Git",        icon: siGit,        desktop: { top: "20%", left: "62%" } },
    { label: "MongoDB",    icon: siMongodb,    desktop: { top: "80%", left: "25%" } },
    { label: "Java",       icon: siOpenjdk,    desktop: { top: "15%", left: "27%" } },
    { label: "Go",         icon: siGo,         desktop: { top: "72%", left: "84%" } },
];