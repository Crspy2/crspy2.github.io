export interface Role {
  title: string
  /** "YYYY-MM" */
  from: string
  /** Discord role colour, when known. */
  color?: string
}

export interface Stint {
  org: string
  /** Panel colour and the text colour that reads on it. */
  bg: string
  fg: string
  /** Colour for the org's timeline bar (defaults to bg). */
  bar?: string
  from: string
  /** "YYYY-MM", or null while it's ongoing. */
  to: string | null
  /** Newest first. */
  roles: Role[]
}

// Newest first: visitors see what's current before the history behind it.
export const history: Stint[] = [
  {
    org: "klar.gg",
    bg: "#313EE0",
    fg: "#FFFFFF",
    from: "2023-09",
    to: null,
    roles: [
      { title: "Staff Manager", from: "2025-02", color: "#F663F1" },
      { title: "Lead Staff", from: "2024-09", color: "#8F63F6" },
      { title: "Senior Staff", from: "2024-03", color: "#6377F6" },
      { title: "Staff", from: "2023-09", color: "#63AFF6" },
    ],
  },
  {
    org: "hyperaim.gg",
    bg: "#CA58FF",
    fg: "#0B0B0F",
    from: "2022-01",
    to: "2023-03",
    roles: [
      { title: "Staff Manager", from: "2022-08" },
      { title: "Staff", from: "2022-01" },
    ],
  },
  {
    org: "chairstore",
    bg: "#000000",
    fg: "#FFFFFF",
    bar: "#F2F0EB",
    from: "2022-04",
    to: "2022-08",
    roles: [{ title: "Support", from: "2022-04" }],
  },
  {
    org: "wax.cc",
    bg: "#FF0000",
    fg: "#FFFFFF",
    from: "2021-07",
    to: "2022-04",
    roles: [{ title: "Support", from: "2021-07" }],
  },
]

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const monthIndex = (ym: string) => {
  const [y, m] = ym.split("-").map(Number)
  return y * 12 + (m - 1)
}

const nowIndex = () => {
  const d = new Date()
  return d.getFullYear() * 12 + d.getMonth()
}

export const formatMonth = (ym: string) => {
  const [y, m] = ym.split("-").map(Number)
  return `${MONTHS[m - 1]} ${y}`
}

export const tenure = (s: Stint) => {
  const months = (s.to ? monthIndex(s.to) : nowIndex()) - monthIndex(s.from)
  const y = Math.floor(months / 12)
  const m = months % 12
  if (!y) return `${m} months`
  return m ? `${y} yr ${m} mo` : `${y} yr`
}

/** Rail geometry: each stint as left/width percentages across whole years. */
export function rail(stints: Stint[]) {
  const first = Math.min(...stints.map((s) => Number(s.from.slice(0, 4))))
  const last = new Date().getFullYear()
  const start = first * 12
  const span = (last - first + 1) * 12
  const years = Array.from({ length: last - first + 1 }, (_, i) => first + i)
  const bars = stints.map((s) => {
    const a = monthIndex(s.from) - start
    const b = (s.to ? monthIndex(s.to) : nowIndex()) - start
    return { left: (a / span) * 100, width: ((b - a) / span) * 100 }
  })
  return { years, bars }
}
