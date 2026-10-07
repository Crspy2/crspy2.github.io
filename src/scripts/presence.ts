// Live Discord presence from Lanyard, rendered into the "Right now" card.

type Activity = {
  type: number
  name: string
  details?: string
  state?: string
  application_id?: string
  timestamps?: { start?: number; end?: number }
  assets?: { large_image?: string }
  emoji?: { name?: string }
}

type Presence = {
  discord_status: "online" | "idle" | "dnd" | "offline"
  activities: Activity[]
  listening_to_spotify: boolean
  spotify: { song: string; artist: string; album: string; album_art_url: string; timestamps: { start: number; end: number } } | null
  active_on_discord_desktop: boolean
  active_on_discord_mobile: boolean
  active_on_discord_web: boolean
}

const STATUS_LABEL = { online: "Online", idle: "Idle", dnd: "Do not disturb", offline: "Offline" }

const card = document.querySelector<HTMLElement>("[data-presence]")
if (card) start(card)

function start(card: HTMLElement) {
  const id = card.dataset.presence!
  const $ = <T extends HTMLElement>(name: string) => card.querySelector<T>(`[data-p="${name}"]`)!

  let tick = 0

  function activityImage(a: Activity) {
    const img = a.assets?.large_image
    if (!img) return ""
    if (img.startsWith("mp:")) return `https://media.discordapp.net/${img.slice(3)}`
    return a.application_id ? `https://cdn.discordapp.com/app-assets/${a.application_id}/${img}.png?size=160` : ""
  }

  function clock(ms: number) {
    const s = Math.max(0, Math.floor(ms / 1000))
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = String(s % 60).padStart(2, "0")
    return h ? `${h}:${String(m).padStart(2, "0")}:${sec}` : `${m}:${sec}`
  }

  function setArt(el: HTMLElement, src: string) {
    el.style.backgroundImage = src ? `url("${src}")` : ""
  }

  function render(p: Presence) {
    const status = p.discord_status
    card.dataset.status = status
    const device = p.active_on_discord_desktop ? "desktop" : p.active_on_discord_mobile ? "mobile" : p.active_on_discord_web ? "web" : ""
    $("status").textContent = status === "offline" ? "Offline" : `${STATUS_LABEL[status]}${device ? ` · on ${device}` : ""}`

    const custom = p.activities.find((a) => a.type === 4)
    const customText = [custom?.emoji?.name, custom?.state].filter(Boolean).join(" ")
    $("custom").hidden = !customText
    $("custom").textContent = customText

    const game = p.activities.find((a) => a.type === 0)
    $("game").hidden = !game
    if (game) {
      $("game-name").textContent = game.name
      $("game-detail").textContent = [game.details, game.state].filter(Boolean).join(" · ")
      setArt($("game-img"), activityImage(game))
    }

    const sp = p.listening_to_spotify ? p.spotify : null
    $("spotify").hidden = !sp
    if (sp) {
      $("sp-song").textContent = sp.song
      $("sp-artist").textContent = `by ${sp.artist.replaceAll(";", ",")}`
      $("sp-album").textContent = `on ${sp.album}`
      setArt($("sp-img"), sp.album_art_url)
    }

    $("idle").hidden = status !== "offline"
    $("idle").textContent = "Offline right now. Messages still reach me."

    clearInterval(tick)
    const update = () => {
      const now = Date.now()
      if (game?.timestamps?.start) $("game-time").textContent = `${clock(now - game.timestamps.start)} elapsed`
      else if (game) $("game-time").textContent = ""
      if (sp) {
        const total = sp.timestamps.end - sp.timestamps.start
        const done = Math.min(total, now - sp.timestamps.start)
        $("sp-bar").style.transform = `scaleX(${total > 0 ? done / total : 0})`
        $("sp-now").textContent = clock(done)
        $("sp-total").textContent = clock(total)
      }
    }
    update()
    if (game || sp) tick = window.setInterval(update, 1000)
  }

  function unreachable() {
    if (card.dataset.status) return
    $("status").textContent = "Status unavailable"
    $("idle").hidden = false
    $("idle").textContent = "Couldn't reach Discord. Messages still reach me."
  }

  // Lanyard websocket: hello (op 1) -> subscribe (op 2) -> heartbeat (op 3); events arrive as op 0.
  let retry = 1000
  function connect() {
    const ws = new WebSocket("wss://api.lanyard.rest/socket")
    let beat = 0
    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data)
      if (msg.op === 1) {
        ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: id } }))
        beat = window.setInterval(() => ws.send(JSON.stringify({ op: 3 })), msg.d.heartbeat_interval)
        retry = 1000
      } else if (msg.op === 0 && (msg.t === "INIT_STATE" || msg.t === "PRESENCE_UPDATE")) {
        render(msg.d)
      }
    }
    ws.onclose = () => {
      clearInterval(beat)
      unreachable()
      setTimeout(connect, (retry = Math.min(retry * 2, 30000)))
    }
  }
  connect()
}
