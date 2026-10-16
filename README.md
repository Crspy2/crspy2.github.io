# crspy.me

My extended Discord bio: what I'm up to right now, my staff history, GitHub activity, the stack I use and where to reach me.

Built with [Astro](https://astro.build) and GSAP, deployed to GitHub Pages.

## Develop

```sh
bun install
bun run dev
```

## Build

```sh
bun run build
```

Discord presence loads live in the browser from [Lanyard](https://github.com/Phineas/lanyard). GitHub data is fetched at build time; set `GITHUB_TOKEN` to include the contribution graph, streak and pinned repos (the deploy workflow passes it automatically).
