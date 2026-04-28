import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function findSection(path: string): HTMLElement | null {
	return document.querySelector<HTMLElement>(`[data-page="${path}"]`);
}

function updateActiveLink(path: string): void {
	for (const link of document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]")) {
		const href = link.getAttribute("href");
		if (href === path) {
			link.setAttribute("aria-current", "page");
		} else {
			link.removeAttribute("aria-current");
		}
	}
}

const initialPath = window.location.pathname;
const initialTarget = findSection(initialPath);
if (initialTarget && initialPath !== "/") {
	window.scrollTo({ top: initialTarget.offsetTop, behavior: "instant" });
}
updateActiveLink(initialPath);

for (const section of document.querySelectorAll<HTMLElement>("[data-page]")) {
	const route = section.getAttribute("data-page");
	if (!route) continue;

	ScrollTrigger.create({
		trigger: section,
		start: "top 40%",
		end: "bottom 40%",
		onToggle: (self) => {
			if (!self.isActive) return;
			if (window.location.pathname !== route) {
				history.replaceState(null, "", route);
				updateActiveLink(route);
			}
		},
	});
}

for (const link of document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]")) {
	link.addEventListener("click", (event) => {
		const href = link.getAttribute("href");
		if (!href) return;
		const target = findSection(href);
		if (!target) return;

		event.preventDefault();
		gsap.to(window, {
			duration: 0.8,
			scrollTo: { y: target, autoKill: true },
			ease: "power2.inOut",
		});
		history.pushState(null, "", href);
		updateActiveLink(href);
	});
}

window.addEventListener("popstate", () => {
	const path = window.location.pathname;
	const target = findSection(path);
	if (!target) return;
	gsap.to(window, {
		duration: 0.8,
		scrollTo: { y: target, autoKill: true },
		ease: "power2.inOut",
	});
	updateActiveLink(path);
});
