const CHARS = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%&*"
const FRAMES = 14
const FRAME_MS = 28

let initialized = false

export function initScramble(): void {
  if (initialized) return
  initialized = true

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

  const targets = document.querySelectorAll<HTMLElement>("[data-nav-link]")

  targets.forEach((el) => {
    const original = el.textContent ?? ""
    let intervalId: number | null = null

    const stop = () => {
      if (intervalId !== null) {
        clearInterval(intervalId)
        intervalId = null
      }
      el.textContent = original
    }

    el.addEventListener("mouseenter", () => {
      if (intervalId !== null) clearInterval(intervalId)
      let frame = 0
      intervalId = window.setInterval(() => {
        frame++
        if (frame >= FRAMES) {
          stop()
          return
        }
        const revealCount = Math.floor((frame / FRAMES) * original.length)
        let result = original.slice(0, revealCount)
        for (let i = revealCount; i < original.length; i++) {
          result += original[i] === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]
        }
        el.textContent = result
      }, FRAME_MS)
    })

    el.addEventListener("mouseleave", stop)
  })
}
