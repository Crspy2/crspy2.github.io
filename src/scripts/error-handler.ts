// Catches uncaught errors and unhandled promise rejections at runtime and
// hard-navigates to /error?msg=<encoded message>. The /error page reads the
// query param and shows the message inside the eyebrow.

let installed = false;

const ERROR_PATH = "/error";

function redirect(message: string): void {
  if (window.location.pathname === ERROR_PATH) return; // never loop
  const url = ERROR_PATH + "?msg=" + encodeURIComponent(message);
  window.location.replace(url);
}

export function installErrorHandler(): void {
  if (installed) return;
  installed = true;

  window.addEventListener("error", (event) => {
    const msg =
      event.message ||
      (event.error && (event.error.message ?? String(event.error))) ||
      "Unknown error";
    redirect(msg);
  });

  window.addEventListener("unhandledrejection", (event) => {
    let msg = "Unhandled promise rejection";
    if (event.reason != null) {
      if (typeof event.reason === "string") msg = event.reason;
      else if (event.reason.message) msg = event.reason.message;
      else msg = String(event.reason);
    }
    redirect(msg);
  });
}
