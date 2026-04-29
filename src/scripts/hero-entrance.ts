import { gsap } from "gsap";

export function initHeroEntrance(): void {
  const eyebrow = document.querySelector<HTMLElement>("[data-hero-eyebrow]");
  const cmd = document.querySelector<HTMLElement>("[data-hero-eyebrow] .cmd");
  const title = document.querySelector<HTMLElement>("[data-hero-title]");
  const bio = document.querySelector<HTMLElement>("[data-hero-bio]");
  const contacts = document.querySelectorAll<HTMLElement>("[data-hero-contacts] li");

  if (!eyebrow || !cmd || !title || !bio) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    gsap.set([eyebrow, title, bio, ...contacts], { opacity: 1, y: 0 });
    return;
  }

  // capture full eyebrow command, blank it for typewriter
  const fullCmd = cmd.textContent ?? "";
  cmd.textContent = "";

  // initial states (set via JS so noscript users see the content)
  gsap.set(eyebrow, { opacity: 1 });
  gsap.set(title, { opacity: 0, y: 14 });
  gsap.set(bio, { opacity: 0, y: 10 });
  gsap.set(contacts, { opacity: 0, y: 8 });

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // typewriter on the command
  tl.to(
    { i: 0 },
    {
      i: fullCmd.length,
      duration: Math.max(0.4, fullCmd.length * 0.04),
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

  tl.to(title, { opacity: 1, y: 0, duration: 0.7 }, "+=0.15");
  tl.to(bio, { opacity: 1, y: 0, duration: 0.55 }, "-=0.35");
  tl.to(contacts, { opacity: 1, y: 0, duration: 0.45, stagger: 0.06 }, "-=0.25");
}
