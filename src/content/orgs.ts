export type Org = {
    label: string;
    src: string;
    desktop: { top: string; left: string };
};

export const orgs: Org[] = [
    { label: "Chewy",          src: "/orgs/chewy.png",        desktop: { top: "57%", left: "88%" } },
    { label: "Generate",       src: "/orgs/generate.png",     desktop: { top: "36%", left: "91%" } },
    { label: "Argonne",        src: "/orgs/argonne1.png",     desktop: { top: "80%", left: "74%" } },
    { label: "Girls Who Code", src: "/orgs/girlswhocode.png", desktop: { top: "86%", left: "57%" } },
];