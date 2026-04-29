import { gsap } from "gsap";

let played = false;

const REVEAL_FROM = "inset(0 100% 0 0)";
const REVEAL_TO = "inset(0 0% 0 0)";

export function initHeroEntrance(): void {
  if (played) return;

  const nav = document.querySelector<HTMLElement>("[data-nav]");
  const eyebrow = document.querySelector<HTMLElement>("[data-hero-eyebrow]");
  const cmd = document.querySelector<HTMLElement>("[data-hero-eyebrow] .cmd");
  const title = document.querySelector<HTMLElement>("[data-hero-title]");
  const bio = document.querySelector<HTMLElement>("[data-hero-bio]");
  const contacts = document.querySelectorAll<HTMLElement>("[data-hero-contacts] li");

  if (!eyebrow || !cmd || !title || !bio) return;

  played = true;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    if (nav) gsap.set(nav, { clipPath: REVEAL_TO });
    gsap.set([eyebrow, title, bio, ...contacts], { clipPath: REVEAL_TO });
    return;
  }

  // capture full eyebrow command before clearing for the typewriter
  const fullCmd = cmd.textContent ?? "";
  cmd.textContent = "";

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  if (nav) {
    tl.to(nav, { clipPath: REVEAL_TO, duration: 0.55 }, 0);
  }

  tl.to(eyebrow, { clipPath: REVEAL_TO, duration: 0.5 }, 0.25);

  // typewriter on the cmd, after the eyebrow has wiped in
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
    "+=0.05"
  );

  tl.to(title, { clipPath: REVEAL_TO, duration: 0.85 }, "+=0.05");
  tl.to(bio, { clipPath: REVEAL_TO, duration: 0.7 }, "-=0.55");
  tl.to(contacts, { clipPath: REVEAL_TO, duration: 0.55, stagger: 0.08 }, "-=0.4");
}
