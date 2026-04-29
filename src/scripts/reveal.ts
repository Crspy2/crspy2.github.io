import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initReveal(): void {
  const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
  if (!targets.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  targets.forEach((el) => {
    gsap.set(el, { opacity: 0, y: 12 });

    ScrollTrigger.create({
      trigger: el,
      start: "top 92%",
      onEnter: () =>
        gsap.to(el, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }),
      onLeaveBack: () =>
        gsap.to(el, { opacity: 0, y: 12, duration: 0.3, ease: "power2.in" }),
    });
  });
}
