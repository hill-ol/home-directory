import { color } from "@/lib/theme";

export type Stamp = {
    city: string;
    country: string;
    detail: string;
    season: string;
    rotation: string;
    top: string;
    left: string;
    color: string;
    darkColor: string;
};

export const stamps: Stamp[] = [
    {
        city: "London",
        country: "United Kingdom",
        detail: "Global Scholar",
        season: "Fall 2024",
        rotation: "-6deg",
        top: "0px",
        left: "70px",
        color: "#C8B8E8",
        darkColor: "#9B84C8",
    },
    {
        city: "Oakland",
        country: "United States",
        detail: "Global Scholar",
        season: "Spring 2025",
        rotation: "5deg",
        top: "70px",
        left: "200px",
        color: color.pink,
        darkColor: color.pinkDark,
    },
    {
        city: "Budapest",
        country: "Hungary",
        detail: "Summer Program",
        season: "Summer 2025",
        rotation: "-4deg",
        top: "200px",
        left: "75px",
        color: "#A8D4C8",
        darkColor: "#6AAFA0",
    },
    {
        city: "Boston",
        country: "United States",
        detail: "Home Base",
        season: "Fall 2025 - Spring 2028",
        rotation: "4deg",
        top: "320px",
        left: "190px",
        color: "#F5C8A0",
        darkColor: "#D4926A",
    },
];