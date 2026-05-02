import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

let initialized = false
const REVEAL_TO = "inset(0 0% 0 0)"

export function initSectionMarkers(): void {
  if (initialized) return
  initialized = true

  const markers = document.querySelectorAll<HTMLElement>("[data-section-marker]")
  if (!markers.length) return

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  markers.forEach((marker) => {
    const line = marker.querySelector<HTMLElement>("[data-marker-line]")
    if (!line) return

    if (reduceMotion) {
      gsap.set(marker, { clipPath: REVEAL_TO })
      gsap.set(line, { scaleX: 1 })
      return
    }

    ScrollTrigger.create({
      trigger: marker,
      start: "top 92%",
      once: true,
      onEnter: () => {
        const tl = gsap.timeline()
        tl.to(marker, { clipPath: REVEAL_TO, duration: 0.55, ease: "power3.out" })
        tl.to(
          line,
          { scaleX: 1, transformOrigin: "left center", duration: 0.5, ease: "power2.out" },
          "-=0.25",
        )
      },
    })
  })
}
