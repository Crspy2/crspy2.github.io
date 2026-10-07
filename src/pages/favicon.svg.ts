import type { APIRoute } from "astro"
import { getDiscordProfile } from "../lib/discord"
import fallback from "../assets/avatar.png?inline"

// Favicon = Discord avatar with rounded corners, fetched at build time (bundled copy if Discord is unreachable).
async function avatarDataUri() {
  const url = (await getDiscordProfile()).avatarUrl?.replace(/\.webp\?size=\d+$/, ".png?size=96")
  if (!url) return fallback
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) })
    if (!res.ok) return fallback
    return `data:image/png;base64,${Buffer.from(await res.arrayBuffer()).toString("base64")}`
  } catch {
    return fallback
  }
}

export const GET: APIRoute = async () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><clipPath id="r"><rect width="96" height="96" rx="24"/></clipPath><image href="${await avatarDataUri()}" width="96" height="96" clip-path="url(#r)"/></svg>`
  return new Response(svg, { headers: { "Content-Type": "image/svg+xml" } })
}
