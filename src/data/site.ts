import { siDiscord, siGithub, siTelegram, type SimpleIcon } from "simple-icons"

export const DISCORD_ID = "1323519785694265356"
export const GITHUB_USER = "crspy2"

export interface Contact {
  label: string
  handle: string
  href: string
  icon: SimpleIcon
  /** Text colour that stays readable on the brand colour. */
  onBrand: string
}

export const contacts: Contact[] = [
  {
    label: "Discord",
    handle: "@crs_py",
    href: `https://discord.com/users/${DISCORD_ID}`,
    icon: siDiscord,
    onBrand: "#FFFFFF",
  },
  {
    label: "GitHub",
    handle: GITHUB_USER,
    href: `https://github.com/${GITHUB_USER}`,
    icon: siGithub,
    onBrand: "#0B0B0F",
  },
  {
    label: "Telegram",
    handle: "@crs_py",
    href: "https://t.me/crs_py",
    icon: siTelegram,
    onBrand: "#0B0B0F",
  },
]
