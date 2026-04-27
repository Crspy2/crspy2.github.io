// @ts-check
import { defineConfig, fontProviders } from 'astro/config'

import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://crspy.me",

  fonts: [
      {
          name: "Playfair Display",
          cssVariable: "--font-playfair",
          provider: fontProviders.google(),
          weights: [400, 700],
      },
      {
          name: "Inter",
          cssVariable: "--font-inter",
          provider: fontProviders.google(),
          weights: [300, 400, 500, 700],
      },
  ],

  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});