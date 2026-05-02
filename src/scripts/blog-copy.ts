const COPIED_DURATION_MS = 1500

const COPY_ICON_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
  '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>' +
  '<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>' +
  "</svg>"

const CHECK_ICON_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
  '<path d="M20 6 9 17l-5-5"/>' +
  "</svg>"

export function initBlogCopy(): void {
  const pres = document.querySelectorAll<HTMLPreElement>(".post-body pre")
  if (!pres.length) return

  pres.forEach((pre) => {
    if (pre.dataset.copyInjected) return
    pre.dataset.copyInjected = "true"

    const wrapper = document.createElement("div")
    wrapper.className = "code-block-wrapper"
    pre.parentNode?.insertBefore(wrapper, pre)
    wrapper.appendChild(pre)

    const btn = document.createElement("button")
    btn.type = "button"
    btn.className = "code-copy-btn"
    btn.setAttribute("aria-label", "Copy code to clipboard")
    btn.innerHTML = COPY_ICON_SVG
    wrapper.appendChild(btn)

    let resetTimer: number | null = null

    btn.addEventListener("click", () => {
      const codeEl = pre.querySelector("code")
      const text = codeEl?.textContent ?? pre.textContent ?? ""

      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(text).catch(() => {})
      }

      btn.classList.add("code-copy-btn--copied")
      btn.setAttribute("aria-label", "Code copied")
      btn.innerHTML = CHECK_ICON_SVG

      if (resetTimer !== null) window.clearTimeout(resetTimer)
      resetTimer = window.setTimeout(() => {
        btn.classList.remove("code-copy-btn--copied")
        btn.setAttribute("aria-label", "Copy code to clipboard")
        btn.innerHTML = COPY_ICON_SVG
        resetTimer = null
      }, COPIED_DURATION_MS)
    })
  })
}
