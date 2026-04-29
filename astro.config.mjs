// @ts-check
import { defineConfig, fontProviders } from 'astro/config'

import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://crspy.me",

  fonts: [
      {
          name: "Inter",
          cssVariable: "--font-inter",
          provider: fontProviders.google(),
          weights: [400, 500, 600],
      },
      {
          name: "Playfair Display",
          cssVariable: "--font-playfair",
          provider: fontProviders.google(),
          weights: [500],
          styles: ["italic"],
      },
      {
          name: "JetBrains Mono",
          cssVariable: "--font-jetbrains",
          provider: fontProviders.google(),
          weights: [400, 500],
      },
  ],

  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});