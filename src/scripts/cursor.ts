import { gsap } from "gsap";

let initialized = false;
const INTERACTIVE = "a, button, [data-project-row], input, textarea, select, [role='button']";

export function initCursor(): void {
  if (initialized) return;
  if (window.matchMedia("(pointer: coarse)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  initialized = true;

  const cursor = document.createElement("div");
  cursor.className = "site-cursor";
  cursor.setAttribute("aria-hidden", "true");
  document.body.appendChild(cursor);

  gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 });

  const xTo = gsap.quickTo(cursor, "x", { duration: 0.25, ease: "power3" });
  const yTo = gsap.quickTo(cursor, "y", { duration: 0.25, ease: "power3" });

  let visible = false;

  document.addEventListener("mousemove", (e) => {
    if (!visible) {
      gsap.to(cursor, { opacity: 1, duration: 0.2 });
      visible = true;
    }
    xTo(e.clientX);
    yTo(e.clientY);
  });

  document.addEventListener("mouseleave", () => {
    gsap.to(cursor, { opacity: 0, duration: 0.2 });
    visible = false;
  });

  document.addEventListener("mouseover", (e) => {
    const target = (e.target as HTMLElement | null)?.closest(INTERACTIVE);
    if (target) cursor.classList.add("is-hover");
  });

  document.addEventListener("mouseout", (e) => {
    const target = (e.target as HTMLElement | null)?.closest(INTERACTIVE);
    if (target) cursor.classList.remove("is-hover");
  });
}
