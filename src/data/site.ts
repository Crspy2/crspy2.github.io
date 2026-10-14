import { siDiscord, siGithub, siTelegram, type SimpleIcon } from "simple-icons"

export const DISCORD_ID = "1323519785694265356"
export const GITHUB_USER = "crspy2"

export interface Contact {
  label: string
  handle: string
  href: string
  icon: SimpleIcon
  /** Tile colour (GitHub's near-black would vanish on the dark page, so it goes light). */
  brand: string
  /** Text colour that stays readable on the brand colour. */
  onBrand: string
}

export const contacts: Contact[] = [
  {
    label: "Discord",
    handle: "@crs_py",
    href: `https://discord.com/users/${DISCORD_ID}`,
    icon: siDiscord,
    brand: "#5865F2",
    onBrand: "#FFFFFF",
  },
  {
    label: "GitHub",
    handle: GITHUB_USER,
    href: `https://github.com/${GITHUB_USER}`,
    icon: siGithub,
    brand: "#F2F0EB",
    onBrand: "#0B0B0F",
  },
  {
    label: "Telegram",
    handle: "@crs_py",
    href: "https://t.me/crs_py",
    icon: siTelegram,
    brand: "#26A5E4",
    onBrand: "#0B0B0F",
  },
]
