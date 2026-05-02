import { gsap } from "gsap"

let initialized = false

export function initProjectHover(): void {
  if (initialized) return
  initialized = true

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
  if (window.matchMedia("(pointer: coarse)").matches) return

  const rows = Array.from(document.querySelectorAll<HTMLElement>("[data-project-row]"))
  if (!rows.length) return

  rows.forEach((row) => {
    const name = row.querySelector<HTMLElement>(".project-name")
    const live = row.querySelector<HTMLElement>("[data-project-live]")

    row.addEventListener("mouseenter", () => {
      rows.forEach((other) => {
        if (other !== row) gsap.to(other, { opacity: 0.4, duration: 0.25 })
      })
      if (name) gsap.to(name, { x: 4, duration: 0.25, ease: "power2.out" })
      if (live)
        gsap.fromTo(
          live,
          { x: 8, opacity: 0.5 },
          { x: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
        )
    })

    row.addEventListener("mouseleave", () => {
      rows.forEach((other) => gsap.to(other, { opacity: 1, duration: 0.25 }))
      if (name) gsap.to(name, { x: 0, duration: 0.25 })
    })
  })
}
