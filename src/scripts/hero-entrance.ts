import { gsap } from "gsap";

let initialized = false;

export function initHeroEntrance(): void {
  if (initialized) return;
  initialized = true;

  const hero = document.querySelector<HTMLElement>("[data-hero]");
  const eyebrow = document.querySelector<HTMLElement>("[data-hero-eyebrow]");
  const cmd = document.querySelector<HTMLElement>("[data-hero-eyebrow] .cmd");
  const title = document.querySelector<HTMLElement>("[data-hero-title]");
  const bio = document.querySelector<HTMLElement>("[data-hero-bio]");
  const contacts = document.querySelectorAll<HTMLElement>("[data-hero-contacts] li");

  if (!hero || !eyebrow || !cmd || !title || !bio) return;

  hero.setAttribute("data-hero-loaded", "");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const fullCmd = cmd.textContent ?? "";
  cmd.textContent = "";

  if (reduceMotion) {
    cmd.textContent = fullCmd;
    gsap.set([title, bio, ...contacts], { opacity: 1, y: 0 });
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.to(
    { i: 0 },
    {
      i: fullCmd.length,
      duration: Math.max(0.5, fullCmd.length * 0.06),
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

  tl.to(title, { opacity: 1, y: 0, duration: 0.8 }, "+=0.2");
  tl.to(bio, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");
  tl.to(contacts, { opacity: 1, y: 0, duration: 0.5, stagger: 0.07 }, "-=0.3");
}
