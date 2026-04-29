import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initSectionMarkers(): void {
  const markers = document.querySelectorAll<HTMLElement>("[data-section-marker]");
  if (!markers.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  markers.forEach((marker) => {
    const label = marker.querySelector<HTMLElement>(".marker-label");
    const line = marker.querySelector<HTMLElement>("[data-marker-line]");
    if (!label || !line) return;

    if (reduceMotion) {
      gsap.set(line, { scaleX: 1 });
      return;
    }

    const fullText = label.textContent ?? "";
    label.textContent = "";
    gsap.set(line, { scaleX: 0, transformOrigin: "left center" });

    ScrollTrigger.create({
      trigger: marker,
      start: "top 88%",
      once: true,
      onEnter: () => {
        const tl = gsap.timeline();
        tl.to(
          { i: 0 },
          {
            i: fullText.length,
            duration: Math.max(0.3, fullText.length * 0.025),
            ease: "none",
            onUpdate() {
              const i = Math.floor((this.targets()[0] as { i: number }).i);
              label.textContent = fullText.slice(0, i);
            },
            onComplete() {
              label.textContent = fullText;
            },
          }
        );
        tl.to(line, { scaleX: 1, duration: 0.45, ease: "power2.out" }, "+=0.05");
      },
    });
  });
}
