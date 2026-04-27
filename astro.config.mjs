// @ts-check
import { defineConfig, fontProviders } from 'astro/config'

import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://crspy.me",

  fonts: [
      {
          name: "Fraunces",
          cssVariable: "--font-fraunces",
          provider: fontProviders.google(),
          weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
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