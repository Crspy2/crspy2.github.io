// @ts-check
import { defineConfig, fontProviders } from "astro/config"

// https://astro.build/config
export default defineConfig({
  site: "https://crspy.me",
  fonts: [
    {
      name: "Funnel Display",
      cssVariable: "--font-display",
      provider: fontProviders.google(),
      weights: [800],
    },
    {
      name: "Funnel Sans",
      cssVariable: "--font-sans",
      provider: fontProviders.google(),
      weights: [400, 500, 700],
    },
    {
      name: "Noto Sans",
      cssVariable: "--font-discord",
      provider: fontProviders.google(),
      weights: [400, 600, 700],
    },
  ],
})
