import { DISCORD_ID } from "../data/site"

export interface DiscordProfile {
  displayName: string
  username: string
  avatarUrl: string | null
  bannerUrl: string | null
  decorationUrl: string | null
}

const cdn = "https://cdn.discordapp.com"

const bannerUrl = (hash: string) => `${cdn}/banners/${DISCORD_ID}/${hash}.${hash.startsWith("a_") ? "gif" : "png"}?size=600`
const decorationUrl = (asset: string) => `${cdn}/avatar-decoration-presets/${asset}.png?size=240&passthrough=true`

async function getJson(url: string): Promise<any | null> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) })
    return res.ok ? await res.json() : null
  } catch {
    return null
  }
}

/** Identity bits that rarely change, fetched once at build time. Presence is live in the browser. */
export async function getDiscordProfile(): Promise<DiscordProfile> {
  const profile: DiscordProfile = {
    displayName: "Crspy",
    username: "crs_py",
    avatarUrl: null,
    bannerUrl: null,
    decorationUrl: null,
  }

  const lanyard = await getJson(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`)
  const user = lanyard?.data?.discord_user
  if (user) {
    profile.username = user.username ?? profile.username
    profile.displayName = user.global_name ?? profile.displayName
    if (user.avatar) profile.avatarUrl = `${cdn}/avatars/${DISCORD_ID}/${user.avatar}.webp?size=160`
    if (user.banner) profile.bannerUrl = bannerUrl(user.banner)
    if (user.avatar_decoration_data?.asset) profile.decorationUrl = decorationUrl(user.avatar_decoration_data.asset)
  }

  // Lanyard often leaves out the banner and decoration; this profile mirror has them.
  if (!profile.bannerUrl || !profile.decorationUrl) {
    const extra = (await getJson(`https://dcdn.dstn.to/profile/${DISCORD_ID}`))?.user
    if (!profile.bannerUrl && extra?.banner) profile.bannerUrl = bannerUrl(extra.banner)
    if (!profile.decorationUrl && extra?.avatar_decoration_data?.asset)
      profile.decorationUrl = decorationUrl(extra.avatar_decoration_data.asset)
  }

  return profile
}
