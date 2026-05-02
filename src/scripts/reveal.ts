import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

let initialized = false
const REVEAL_TO = "inset(0 0% 0 0)"

export function initReveal(): void {
  if (initialized) return
  initialized = true

  const hero = document.getElementById("hero")

  const all = document.querySelectorAll<HTMLElement>("[data-reveal]")
  const targets = Array.from(all).filter((el) => {
    if (hero && hero.contains(el)) return false
    if (el.matches("[data-section-marker]")) return false
    if (el.matches("[data-nav]")) return false
    return true
  })

  if (!targets.length) return

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (reduceMotion) {
    targets.forEach((el) => gsap.set(el, { clipPath: REVEAL_TO }))
    return
  }

  targets.forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: "top bottom-=40",
      once: true,
      onEnter: () =>
        gsap.to(el, {
          clipPath: REVEAL_TO,
          duration: 0.7,
          ease: "power3.out",
        }),
    })
  })

  // re-evaluate after layout settles (fonts, images, etc.)
  requestAnimationFrame(() => ScrollTrigger.refresh())
  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true })
}
