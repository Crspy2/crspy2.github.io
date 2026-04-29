export interface Project {
  name: string;
  year: string;
  tagline: string;
  url: string;
  tools: string[];
}

export const projects: Project[] = [
  {
    name: "forum.klar.gg",
    year: "2026",
    tagline: "Invision Community theme + storefront plugin",
    url: "https://forum.klar.gg",
    tools: ["PHP", "HTML", "CSS", "JavaScript", "Invision Community"],
  },
  {
    name: "bio.crspy.me",
    year: "2025",
    tagline: "Bio page with live Discord presence",
    url: "https://bio.crspy.me",
    tools: ["React", "TypeScript", "TailwindCSS"],
  },
  {
    name: "alterasms.io",
    year: "2024",
    tagline: "SMS aggregation dashboard",
    url: "https://alterasms.io",
    tools: ["NextJS", "TypeScript", "Golang", "gRPC", "Postgres"],
  },
];
