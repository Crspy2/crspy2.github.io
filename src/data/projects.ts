export interface Project {
  name: string
  year: string
  tagline: string
  url: string
  tools: string[]
  /** "live" links to an external site (default), "blog" links to an internal post. */
  linkType?: "live" | "blog"
}

export const projects: Project[] = [
  {
    name: "space-invaders",
    year: "2026",
    tagline: "Tilt-controlled Space Invaders on a Nexys A7",
    url: "/blog/2-space-invaders",
    tools: ["Verilog", "FPGA", "ADXL362"],
    linkType: "blog",
  },
  {
    name: "forum.klar.gg",
    year: "2026",
    tagline: "Invision Community theme + storefront plugin",
    url: "https://forum.klar.gg",
    tools: ["PHP", "HTML", "CSS", "JavaScript", "Invision Community"],
  },
  {
    name: "bio.crspy.me",
    year: "2026",
    tagline: "Bio page with live Discord presence",
    url: "https://bio.crspy.me",
    tools: ["React", "TypeScript", "TailwindCSS"],
  },
  {
    name: "chord-detector",
    year: "2025",
    tagline: "Live guitar chord recognition with chroma + MQTT",
    url: "/blog/1-guitar-chords",
    tools: ["Python", "librosa", "MQTT", "React"],
    linkType: "blog",
  },
  {
    name: "alterasms.io",
    year: "2024",
    tagline: "SMS aggregation dashboard",
    url: "https://alterasms.io",
    tools: ["NextJS", "TypeScript", "Golang", "gRPC", "Postgres"],
  },
]
