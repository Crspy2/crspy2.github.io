// WebGL liquid behind the first screen: tonal metaballs drifting on klar blue, with one that follows the cursor.
// Phones, reduced motion and browsers without WebGL keep the CSS version underneath.

const host = document.querySelector<HTMLElement>("[data-liquid]")
const fine = matchMedia("(hover: hover) and (pointer: fine)").matches
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches

if (host && fine && !reduce) start(host)

const VERT = `attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }`

const FRAG = `
precision highp float;
uniform vec2 res;
uniform float time;
uniform vec2 mouse;

const vec3 base = vec3(0.192, 0.243, 0.878); // #313EE0
const vec3 deep = vec3(0.102, 0.145, 0.722); // #1A25B8

float ball(vec2 p, vec2 c, float r) {
  vec2 d = p - c;
  return r * r / dot(d, d);
}

void main() {
  float aspect = res.x / res.y;
  vec2 uv = gl_FragCoord.xy / res;
  vec2 p = vec2(uv.x * aspect, uv.y);
  float t = time * 0.25;

  float f = 0.0;
  f += ball(p, vec2((0.18 + 0.16 * sin(t * 1.3)) * aspect, 0.78 + 0.14 * cos(t * 1.1)), 0.27);
  f += ball(p, vec2((0.52 + 0.20 * cos(t * 0.9)) * aspect, 0.30 + 0.16 * sin(t * 1.4)), 0.21);
  f += ball(p, vec2((0.86 + 0.10 * sin(t * 0.7)) * aspect, 0.86 + 0.10 * cos(t * 1.2)), 0.31);
  f += ball(p, vec2((0.30 + 0.14 * cos(t * 1.7)) * aspect, 0.12 + 0.08 * sin(t * 0.8)), 0.17);
  f += ball(p, vec2(mouse.x * aspect, mouse.y), 0.15);

  float m = smoothstep(0.96, 1.04, f);
  gl_FragColor = vec4(mix(base, deep, m), 1.0);
}`

function start(host: HTMLElement) {
  const canvas = document.createElement("canvas")
  canvas.setAttribute("aria-hidden", "true")
  const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" })
  if (!gl) return

  const shader = (type: number, src: string) => {
    const s = gl.createShader(type)!
    gl.shaderSource(s, src)
    gl.compileShader(s)
    return s
  }
  const prog = gl.createProgram()!
  gl.attachShader(prog, shader(gl.VERTEX_SHADER, VERT))
  gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, FRAG))
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
  gl.useProgram(prog)

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(prog, "p")
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

  const uRes = gl.getUniformLocation(prog, "res")
  const uTime = gl.getUniformLocation(prog, "time")
  const uMouse = gl.getUniformLocation(prog, "mouse")

  host.append(canvas)
  host.classList.add("is-gl")

  const resize = () => {
    const dpr = Math.min(devicePixelRatio, 1.5)
    canvas.width = Math.round(host.clientWidth * dpr)
    canvas.height = Math.round(host.clientHeight * dpr)
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.uniform2f(uRes, canvas.width, canvas.height)
  }
  new ResizeObserver(resize).observe(host)
  resize()

  // The cursor blob eases toward the pointer and settles back to a resting spot when it leaves.
  const rest = { x: 0.68, y: 0.42 }
  const target = { ...rest }
  const mouse = { ...rest }
  host.parentElement!.addEventListener("pointermove", (e) => {
    const r = host.getBoundingClientRect()
    target.x = (e.clientX - r.left) / r.width
    target.y = 1 - (e.clientY - r.top) / r.height
  })
  host.parentElement!.addEventListener("pointerleave", () => Object.assign(target, rest))

  let raf = 0
  const t0 = performance.now()
  const frame = (now: number) => {
    mouse.x += (target.x - mouse.x) * 0.05
    mouse.y += (target.y - mouse.y) * 0.05
    gl.uniform2f(uMouse, mouse.x, mouse.y)
    gl.uniform1f(uTime, (now - t0) / 1000)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    raf = requestAnimationFrame(frame)
  }

  // Only draw while the first screen is on screen.
  new IntersectionObserver(([entry]) => {
    cancelAnimationFrame(raf)
    if (entry.isIntersecting) raf = requestAnimationFrame(frame)
  }).observe(host)
}
