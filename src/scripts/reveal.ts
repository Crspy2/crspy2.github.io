import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let initialized = false;

export function initReveal(): void {
  if (initialized) return;
  initialized = true;

  const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
  if (!targets.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  targets.forEach((el) => {
    gsap.set(el, { opacity: 0, y: 14 });

    ScrollTrigger.create({
      trigger: el,
      start: "top 92%",
      onEnter: () =>
        gsap.to(el, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }),
      onLeaveBack: () =>
        gsap.to(el, { opacity: 0, y: 14, duration: 0.35, ease: "power2.in" }),
    });
  });

  // ensure triggers re-evaluate after fonts/layout settle so elements that
  // were already in-viewport on load (e.g. /#about) animate in correctly.
  requestAnimationFrame(() => ScrollTrigger.refresh());
}
