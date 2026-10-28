import { bio } from "@/content/bio";

/** The heading above the bio, and the long-form prose under it. */
export const heading = `Hi, I'm ${bio.name.split(" ")[0]}.`;

export const bioParagraphs = [
    "I'm a CS and Math student at Northeastern, currently on co-op at Chewy, where I build the frontend for a feature that lets vets fill prescriptions through Chewy.com alongside their own pharmacies. I also build at Generate Product Development Studio, where I'm a software engineer on Tomoji, a platform connecting developer-tool companies with creators, built with a real startup client. Last semester I helped ship Toggo, a trip planning app.",
    "Graduate-level Algorithms taught me to sit with a hard problem for hours, sketching it out until I could build a solution, and I try to bring that same patience to what I build outside of work. When I have time, I pick up small side projects, from a geo-tagged art commission platform to Co-op Scout, a job aggregator that scrapes co-op postings from Northeastern's portal.",
    "When I'm not at my desk, I'm usually running, exploring Boston, reading, or planning my next trip. I'm looking for a Fall 2027 SWE co-op, ideally full-stack work on a product people use every day.",
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

// The fake neofetch readout.3
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

export const lastModified = "September 2026";