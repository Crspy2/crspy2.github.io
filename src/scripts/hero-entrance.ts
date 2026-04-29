import { gsap } from "gsap";

let played = false;

export function initHeroEntrance(): void {
  if (played) return;

  const eyebrow = document.querySelector<HTMLElement>("[data-hero-eyebrow]");
  const cmd = document.querySelector<HTMLElement>("[data-hero-eyebrow] .cmd");
  const title = document.querySelector<HTMLElement>("[data-hero-title]");
  const bio = document.querySelector<HTMLElement>("[data-hero-bio]");
  const contacts = document.querySelectorAll<HTMLElement>("[data-hero-contacts] li");

  if (!eyebrow || !cmd || !title || !bio) return;

  played = true;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fullCmd = cmd.textContent ?? "";

  if (reduceMotion) {
    gsap.set([title, bio, ...contacts], { opacity: 1, y: 0 });
    return;
  }

  // initial states (JS-only so noscript users see content)
  gsap.set(title, { opacity: 0, y: 16 });
  gsap.set(bio, { opacity: 0, y: 12 });
  gsap.set(contacts, { opacity: 0, y: 10 });
  cmd.textContent = "";

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.to(
    { i: 0 },
    {
      i: fullCmd.length,
      duration: Math.max(0.6, fullCmd.length * 0.07),
      ease: "none",
      onUpdate() {
        const i = Math.floor((this.targets()[0] as { i: number }).i);
        cmd.textContent = fullCmd.slice(0, i);
      },
      onComplete() {
        cmd.textContent = fullCmd;
      },
    },
    0
  );

  tl.to(title, { opacity: 1, y: 0, duration: 0.9 }, "+=0.15");
  tl.to(bio, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5");
  tl.to(contacts, { opacity: 1, y: 0, duration: 0.55, stagger: 0.07 }, "-=0.35");
}
