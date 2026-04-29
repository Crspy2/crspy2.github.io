export interface Project {
  name: string;
  year: string;
  tagline: string;
  url: string;
  tools: string[];
}

export const projects: Project[] = [
  {
    name: "alterasms.io",
    year: "2025",
    tagline: "SMS aggregation dashboard",
    url: "https://alterasms.io",
    tools: ["NextJS", "TypeScript", "Golang", "gRPC", "Postgres"],
  },
  {
    name: "bio.crspy.me",
    year: "2024",
    tagline: "Bio page with live Discord presence",
    url: "https://bio.crspy.me",
    tools: ["React", "TypeScript", "TailwindCSS"],
  },
  {
    name: "forum.klar.gg",
    year: "2024",
    tagline: "Invision Community storefront plugin",
    url: "https://forum.klar.gg",
    tools: ["PHP", "Stripe", "Invision Community"],
  },
];
