export interface NavLink {
    href: string;
    label: string;
    /** Stroked path for the mobile bottom bar, drawn on a 24x24 viewBox. */
    icon: string;
    /** Present on the entries the desktop menu bar lists. */
    desktop?: true;
}

/*
 * One list for both bars. The desktop bar is the subset marked `desktop`:
 * home is already reachable from the wordmark at the left of that bar, and
 * coursework is reached from the readme page rather than the top level.
 */
export const navLinks: NavLink[] = [
    {
        href: "/",
        label: "home",
        icon: "M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z M9 21V12h6v9",
    },
    {
        href: "/work",
        label: "work",
        icon: "M3 7h18M3 12h18M3 17h18",
        desktop: true,
    },
    {
        href: "/readme",
        label: "readme",
        icon: "M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z",
        desktop: true,
    },
    {
        href: "/research",
        label: "research",
        icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18",
        desktop: true,
    },
    {
        href: "/coursework",
        label: "courses",
        icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    },
];

export const homeLink = navLinks[0];

export const desktopNavLinks = navLinks.filter((link) => link.desktop);
