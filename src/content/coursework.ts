import { color } from "@/lib/theme";

export type Course = {
    name: string;
    note: string;
};

export type Semester = {
    id: string;
    label: string;
    vibe: string;
    location: string;
    /*
     * Tab and margin color, and the darker shade used for its label. This
     * palette belongs to the coursework page rather than the design system:
     * it exists to make five semesters tell apart at a glance, so it is not
     * in theme.ts.
     */
    color: string;
    darkColor: string;
    courses: Course[];
};

export const semesters: Semester[] = [
    {
        id: "fall2024",
        label: "Fall 2024",
        vibe: "the beginning",
        location: "Boston",
        color: color.pink,
        darkColor: color.pinkDark,
        courses: [
            { name: "CS 1802 Fundamentals of Computer Science I",  note: "where it all started"              },
            { name: "PHIL 1145 Technology and Human Values",       note: "asking why before asking how"      },
            { name: "INSH 1600 Cultures of London",                note: "studied this one from London"      },
            { name: "CS 1800 Discrete Structures",                 note: "first taste of mathematical proof" },
        ],
    },
    {
        id: "spring2025",
        label: "Spring 2025",
        vibe: "finding my footing",
        location: "Oakland",
        color: "#A8D4C8",
        darkColor: "#6AAFA0",
        courses: [
            { name: "CS 2510 Fundamentals of Computer Science II",       note: "data structures clicked here"       },
            { name: "CY 2550 Foundations of Cybersecurity",              note: "threat models and defense thinking" },
            { name: "MATH 2341 Differential Equations & Linear Algebra", note: "the semester that humbled me"       },
            { name: "CS 3200 Introduction to Databases",                 note: "first real project with SQL"        },
        ],
    },
    {
        id: "summer2025",
        label: "Summer 2025",
        vibe: "full send",
        location: "Budapest",
        color: "#F5C8A0",
        darkColor: "#D4926A",
        courses: [
            { name: "PHYS 1151 Physics for Engineering I",         note: "quantum context made this hit different" },
            { name: "MATH 3527 Number Theory I",                   note: "beautiful and useless in the best way"   },
            { name: "MATH 3081 Probability & Statistics",          note: "now I actually understand p-values"      },
            { name: "MATH 3090 Exploration of Modern Mathematics", note: "math can be playful"                     },
            { name: "MATH 2321 Calculus III",                      note: "gradients, surfaces, and suffering"      },
        ],
    },
    {
        id: "fall2025",
        label: "Fall 2025",
        vibe: "leveling up",
        location: "Boston",
        color: "#C8B8E8",
        darkColor: "#9B84C8",
        courses: [
            { name: "CS 5800 Algorithms",                          note: "made me think like an engineer"          },
            { name: "CS 3950 Introduction to CS Research",         note: "research as a practice, not a class"     },
            { name: "MATH 2331 Linear Algebra",                    note: "SVD, eigenvalues, the whole thing"       },
            { name: "CS 3100 Program Design & Implementation II",  note: "Java, design patterns, SOLID principles" },
        ],
    },
    {
        id: "spring2026",
        label: "Spring 2026",
        vibe: "in it now",
        location: "Boston",
        color: color.pinkDark,
        darkColor: "#A8547E",
        courses: [
            { name: "CS 4550 Web Development",                       note: "built StyleBoard in this one"           },
            { name: "MATH 3175 Group Theory",                        note: "abstract algebra is genuinely beautiful" },
            { name: "CS 4535 Professional Practicum Capstone",       note: "agile, testing, the real stuff"         },
            { name: "MISM 2301 Introduction to Information Systems", note: "MISM crossover"                        },
        ],
    },
];
