import type { ImageMetadata } from "astro"
import { siCplusplus, siGo, siNextdotjs, siSvelte, siTypescript, type SimpleIcon } from "simple-icons"
// Official press-kit mark (astro.build/press) and the logo used on bio.crspy.me.
import astroSvg from "../assets/logos/astro.svg?raw"
import discordjsSvg from "../assets/logos/discordjs.svg?raw"
import pythonPng from "../assets/logos/python.png"
import discordpyPng from "../assets/logos/discord-py.png"

export interface Tool {
  name: string
  /** Inline SVG markup, in the logo's own colours... */
  svg?: string
  /** ...or a raster logo (cropped to a circle when round). */
  img?: ImageMetadata
  round?: boolean
  /** Chip fill on hover: the logo's accent. */
  hover: string
}

const simple = (name: string, icon: SimpleIcon): Tool => ({
  name,
  svg: `<svg viewBox="0 0 24 24" fill="#${icon.hex}" aria-hidden="true"><path d="${icon.path}"/></svg>`,
  hover: `#${icon.hex}`,
})

const python: Tool = { name: "Python", img: pythonPng, hover: "#3776AB" }

export const stack: { group: string; tools: Tool[] }[] = [
  {
    group: "Languages",
    tools: [simple("TypeScript", siTypescript), python, simple("Go", siGo), simple("C++", siCplusplus)],
  },
  {
    group: "Web",
    tools: [
      simple("Next.js", siNextdotjs),
      simple("SvelteKit", siSvelte),
      { name: "Astro", svg: astroSvg, hover: "linear-gradient(135deg, #D83333, #F041FF)" },
    ],
  },
  {
    group: "Discord bots",
    tools: [
      { name: "Discord.js", svg: discordjsSvg, hover: "#5865F2" },
      { name: "discord.py", img: discordpyPng, round: true, hover: "#3776AB" },
    ],
  },
]

export const projects = [
  { name: "forum.klar.gg", url: "https://forum.klar.gg", note: "Invision Community theme + storefront plugin", year: 2026 },
  { name: "bio.crspy.me", url: "https://bio.crspy.me", note: "Bio page with live Discord presence", year: 2026 },
  { name: "alterasms.io", url: "https://alterasms.io", note: "SMS aggregation dashboard", year: 2024 },
]
