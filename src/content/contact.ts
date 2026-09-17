export type ContactLink = {
    label: string;
    href: string;
    display: string;
    /** Square image used by the reach-out folder. null renders the PDF glyph. */
    icon: string | null;
    external: boolean;
};

/*
 * Single SOT  for every outbound personal link on the site.
 */
export const contact = {
    email: {
        label: "Email",
        href: "mailto:hill.ol@northeastern.edu",
        display: "hill.ol@northeastern.edu",
        icon: "/contact/outlook.png",
        external: false,
    },
    linkedin: {
        label: "LinkedIn",
        href: "https://linkedin.com/in/olivia-hill0",
        display: "linkedin.com/in/olivia-hill0",
        icon: "/contact/linkedin.png",
        external: true,
    },
    github: {
        label: "GitHub",
        href: "https://github.com/hill-ol",
        display: "github.com/hill-ol",
        icon: "/contact/github.png",
        external: true,
    },
    resume: {
        label: "Resume",
        href: "/resume_2026.pdf",
        display: "resume_2026.pdf",
        icon: null,
        external: true,
    },
} satisfies Record<string, ContactLink>;

export const contactLinks: ContactLink[] = [
    contact.email,
    contact.linkedin,
    contact.github,
    contact.resume,
];