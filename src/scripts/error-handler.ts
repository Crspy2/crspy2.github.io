// Catches uncaught errors and unhandled promise rejections at runtime and
// hard-navigates to /500.

let installed = false

const ERROR_PATH = "/500"

function redirect(): void {
  if (window.location.pathname === ERROR_PATH) return // never loop
  window.location.replace(ERROR_PATH)
}

export function installErrorHandler(): void {
  if (installed) return
  installed = true

  // In dev, surface errors in the console instead of bouncing to /500.
  // Vite's dependency-optimization reloads can momentarily produce module-load
  // errors that have nothing to do with real application bugs.
  if (import.meta.env.DEV) return

  window.addEventListener("error", redirect)
  window.addEventListener("unhandledrejection", redirect)
}
