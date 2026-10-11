import { GITHUB_USER } from "../data/site"

export interface Repo {
  name: string
  description: string | null
  url: string
  stars: number
  language: string | null
}

export interface GitHubData {
  since: string | null
  publicRepos: number | null
  followers: number | null
  repos: Repo[]
  pushes: { name: string; url: string; at: string }[]
  languages: { name: string; count: number }[]
  /** Only with a token: GitHub's contribution calendar is GraphQL-only. */
  calendar: { total: number; streak: number; weeks: number[][] } | null
}

const token = process.env.GITHUB_TOKEN ?? import.meta.env.GITHUB_TOKEN
const headers: Record<string, string> = {
  Accept: "application/vnd.github+json",
  "User-Agent": "crspy.me",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
}

async function get(url: string, init?: RequestInit): Promise<any | null> {
  try {
    const res = await fetch(url, { headers, signal: AbortSignal.timeout(10000), ...init })
    return res.ok ? await res.json() : null
  } catch {
    return null
  }
}

const LEVELS = ["NONE", "FIRST_QUARTILE", "SECOND_QUARTILE", "THIRD_QUARTILE", "FOURTH_QUARTILE"]

async function getGraphQL() {
  if (!token) return null
  const query = `query($login: String!) {
    user(login: $login) {
      pinnedItems(first: 4, types: REPOSITORY) {
        nodes { ... on Repository { name description url stargazerCount primaryLanguage { name } } }
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks { contributionDays { contributionCount contributionLevel } }
        }
      }
    }
  }`
  const json = await get("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify({ query, variables: { login: GITHUB_USER } }),
  })
  return json?.data?.user ?? null
}

/** Consecutive days with contributions, ending today (or yesterday, if today is still empty). */
function streak(days: number[]) {
  let i = days.length - 1
  if (days[i] === 0) i--
  let n = 0
  while (i >= 0 && days[i] > 0) {
    n++
    i--
  }
  return n
}

export async function getGitHub(): Promise<GitHubData> {
  const [user, allRepos, gql] = await Promise.all([
    get(`https://api.github.com/users/${GITHUB_USER}`),
    get(`https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=100`),
    getGraphQL(),
  ])

  const own: any[] = (allRepos ?? []).filter((r: any) => !r.fork)
  const toRepo = (r: any): Repo => ({
    name: r.name,
    description: r.description,
    url: r.html_url ?? r.url,
    stars: r.stargazers_count ?? r.stargazerCount ?? 0,
    language: r.language ?? r.primaryLanguage?.name ?? null,
  })

  const pinned: Repo[] = gql?.pinnedItems?.nodes?.map(toRepo) ?? []
  const fallback = own
    .filter((r) => r.description && r.name.toLowerCase() !== GITHUB_USER)
    .sort((a, b) => b.stargazers_count - a.stargazers_count || Date.parse(b.pushed_at) - Date.parse(a.pushed_at))
    .slice(0, 4)
    .map(toRepo)

  const counts = new Map<string, number>()
  for (const r of own) if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1)

  const cal = gql?.contributionsCollection?.contributionCalendar
  const weeks: number[][] | undefined = cal?.weeks.map((w: any) =>
    w.contributionDays.map((d: any) => LEVELS.indexOf(d.contributionLevel)),
  )
  const dayCounts: number[] = cal?.weeks.flatMap((w: any) => w.contributionDays.map((d: any) => d.contributionCount)) ?? []

  return {
    since: user?.created_at ?? null,
    publicRepos: user?.public_repos ?? null,
    followers: user?.followers ?? null,
    repos: pinned.length ? pinned : fallback,
    pushes: own.slice(0, 5).map((r) => ({ name: r.name, url: r.html_url, at: r.pushed_at })),
    languages: [...counts].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 5),
    calendar: cal && weeks ? { total: cal.totalContributions, streak: streak(dayCounts), weeks } : null,
  }
}
