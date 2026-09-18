import { bio } from "@/content/bio";

/** The heading above the bio, and the long-form prose under it. */
export const heading = `Hi, I'm ${bio.name.split(" ")[0]}.`;

export const bioParagraphs = [
    "I'm a CS and Math student at Northeastern, currently on co-op at Chewy as a software engineer. Studying math alongside CS has changed how I approach building. It gives me stronger context for the tools I reach for and pushes me toward problems that sit at technical intersections. Outside of class, I build at Generate Product Development Studio, where I've wrapped up my first semester shipping a trip planning app with an incredible team.",
    "Before that I was working on full-stack projects ranging from a geographically-tagged art commission platform to a job aggregator I built to solve a problem I had myself. My math background helps here too. It's less about the coursework and more about having a framework for thinking carefully before reaching for a solution.",
    "When I'm not at my desk I'm usually running, exploring Boston, reading, or planning my next trip. Open to SWE co-ops where I can work on real problems and keep learning.",
];

// Currently Grid
export const currently = [
    { field: "building",  value: "this portfolio"           },
    { field: "reading",   value: "Seven Brief Lessons on Physics" },
    { field: "listening", value: "Lorde"                    },
    { field: "wearing",   value: "new work bag"             },
    { field: "eating",    value: "peanut butter pretzels"   },
    { field: "watching",  value: "Claude YouTube videos"    },
];

// The fake neofetch readout.
export type NeofetchRow = {
    key: string;
    value: string;
    kind: "text" | "uptime" | "typewriter";
};

export const neofetch: NeofetchRow[] = [
    { key: "OS",        value: bio.school,                    kind: "text"       },
    { key: "Host",      value: `CS + Math, ${bio.gradClass}`, kind: "text"       },
    { key: "Uptime",    value: "",                            kind: "uptime"     },
    { key: "Shell",     value: "TypeScript · Python",         kind: "text"       },
    { key: "Editor",    value: "VS Code",                     kind: "text"       },
    { key: "Location",  value: bio.location,                  kind: "text"       },
    { key: "Status",    value: `on co-op @ ${bio.coop}`,      kind: "text"       },
    { key: "Interests", value: "fashion · traveling · running", kind: "typewriter" },
];

// Shown in the page footer
export const lastModified = "September 2026";