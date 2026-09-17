/*
 * Who I am, in the smallest pieces the site needs.
 *
 * Stored as atoms rather than finished sentences on purpose. Each surface has
 * its own voice: the context menu says "Co-op at Chewy", the readme terminal
 * says "on co-op @ Chewy", and the metadata says "Software engineer co-op at
 * Chewy". Sharing the fact rather than the phrasing means changing employer is
 * one edit without flattening those into the same wording.
 */
export const bio = {
    name: "Olivia Hill",
    /** Shorthand for the combined major, used in running copy. */
    study: "CS + Math @ Northeastern",
    school: "Northeastern University",
    majors: ["Computer Science", "Mathematics"],
    gradClass: "Class of 2028",
    coop: "Chewy",
    location: "Boston, MA",
    /** Semester the co-op search is aimed at. */
    availableFrom: "S'28",
    scholarCities: ["London", "Oakland", "Budapest"],
} as const;

export const tagline =
    "Building full-stack products and software that makes a meaningful impact.";

export const intro = `${bio.study}. ${tagline}`;

export const introInline = `${bio.study} · ${tagline}`;

export const introWithClass = `${bio.study}, ${bio.gradClass}. ${tagline}`;

export const metaDescription = [
    introWithClass,
    `Software engineer co-op at ${bio.coop}.`,
    `Global Scholar: ${bio.scholarCities.join(", ")}.`,
].join(" ");