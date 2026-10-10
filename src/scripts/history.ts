// Pins the history section and turns vertical scroll into a sideways slide through the org panels.
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const section = document.querySelector<HTMLElement>("[data-history]")

if (section) {
  const track = section.querySelector<HTMLElement>("[data-track]")!
  const bars = [...section.querySelectorAll<HTMLButtonElement>("[data-bar]")]
  const steps = bars.length - 1
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches

  section.classList.add("is-pinned")

  let active = 0
  const setActive = (i: number) => {
    if (i === active) return
    active = i
    bars.forEach((b, j) => b.setAttribute("aria-current", String(j === i)))
  }

  const slide = gsap.to(track, {
    xPercent: -100 * steps,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      pin: true,
      scrub: reduce ? true : 0.6,
      end: () => `+=${window.innerWidth * steps}`,
      snap: reduce ? undefined : { snapTo: 1 / steps, directional: false, inertia: false, duration: { min: 0.2, max: 0.5 }, ease: "power2.out" },
      invalidateOnRefresh: true,
      onUpdate: (st) => setActive(Math.round(st.progress * steps)),
    },
  })

  bars.forEach((bar, i) =>
    bar.addEventListener("click", () => {
      const st = slide.scrollTrigger!
      const y = st.start + (st.end - st.start) * (i / steps)
      // Jump straight to the panel's scroll position; the scrub eases the slide there.
      // (Smooth-scrolling the page instead gets cancelled by ScrollTrigger's snap.)
      window.scrollTo(0, y)
    }),
  )
}
