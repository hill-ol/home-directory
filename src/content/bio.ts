export const bio = {
    name: "Olivia Hill",
    study: "CS + Math @ Northeastern",
    school: "Northeastern University",
    majors: ["Computer Science", "Mathematics"],
    gradClass: "Class of 2028",
    coop: "Chewy",
    location: "Boston, MA",
    availableFrom: "S'28",
    scholarCities: ["London", "Oakland", "Budapest"],
    uptimeStart: "2024-09-01",
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