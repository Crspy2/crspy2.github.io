import {
  memo,
  useEffect,
  useState,
  MouseEventHandler,
  ReactNode,
} from "react"
import { AnimationProps, motion } from "framer-motion"
import { Highlight } from "prism-react-renderer"
import { FaCodeCommit } from "react-icons/fa6"

export const CodeBeams = memo(() => {
  return (
    <div id="about" className="relative bg-slate-950 text-neutral-200">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <section className="relative z-2 py-20 md:py-36">
          <span className="mx-auto mb-3 block w-fit rounded bg-gradient-to-br from-slate-800 to-slate-950 p-3 text-3xl shadow-md shadow-blue-900">
            <FaCodeCommit />
          </span>
          <h2 className="mb-3 text-center text-3xl font-bold font-poppins leading-tight sm:text-4xl">
            Full-Stack Expertise
          </h2>
          <p className="max-w-3xl mx-auto mb-6 text-center text-base leading-snug text-neutral-400 sm:text-lg sm:leading-snug md:text-xl md:leading-snug">
            Experienced across multiple languages and frameworks, from crafting responsive React frontends to building{" "}
            <strong>BLAZINGLY FAST</strong> Go backends. Each line of code reflects my commitment to clean, efficient,
            and maintainable solutions.
          </p>
          <CodeCard />
        </section>
      </div>
      <BGGrid />
    </div>
  )
})

const BGGrid = memo(() => {
  return (
    <div
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='rgb(30 27 75 / 0.5)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
      className="absolute bottom-0 left-0 right-0 top-0"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/0 to-slate-950/80" />
      <Beams />
    </div>
  )
})

const Beams = memo(() => {
  const { width } = useWindowSize()

  const numColumns = width ? Math.floor(width / GRID_BOX_SIZE) : 0

  const placements = [
    {
      top: 0,
      left: Math.floor(numColumns * 0.05) * GRID_BOX_SIZE,
      transition: {
        duration: 3.5,
        repeatDelay: 5,
        delay: 2,
      },
    },
    {
      top: GRID_BOX_SIZE * 12,
      left: Math.floor(numColumns * 0.15) * GRID_BOX_SIZE,
      transition: {
        duration: 3.5,
        repeatDelay: 10,
        delay: 4,
      },
    },
    {
      top: GRID_BOX_SIZE * 3,
      left: Math.floor(numColumns * 0.25) * GRID_BOX_SIZE,
    },
    {
      top: GRID_BOX_SIZE * 9,
      left: Math.floor(numColumns * 0.75) * GRID_BOX_SIZE,
      transition: {
        duration: 2,
        repeatDelay: 7.5,
        delay: 3.5,
      },
    },
    {
      top: 0,
      left: Math.floor(numColumns * 0.7) * GRID_BOX_SIZE,
      transition: {
        duration: 3,
        repeatDelay: 2,
        delay: 1,
      },
    },
    {
      top: GRID_BOX_SIZE * 2,
      left: Math.floor(numColumns) * GRID_BOX_SIZE - GRID_BOX_SIZE,
      transition: {
        duration: 5,
        repeatDelay: 5,
        delay: 5,
      },
    },
  ]

  return (
    <>
      {placements.map((p, i) => (
        <Beam
          key={i}
          top={p.top}
          left={p.left - BEAM_WIDTH_OFFSET}
          transition={p.transition || {}}
        />
      ))}
    </>
  )
})

const Beam = memo(({
  top,
  left,
  transition = {},
}: {
  top: number
  left: number
  transition?: AnimationProps["transition"]
}) => {
  return (
    <motion.div
      initial={{
        y: 0,
        opacity: 0,
      }}
      animate={{
        opacity: [0, 1, 0],
        y: 32 * 8,
      }}
      transition={{
        ease: "easeInOut",
        duration: 3,
        repeat: Infinity,
        repeatDelay: 1.5,
        ...transition,
      }}
      style={{
        top,
        left,
      }}
      className="absolute z-1 h-[64px] w-[1px] bg-gradient-to-b from-blue-500/0 to-blue-500"
    />
  )
})

const CodeCard = memo(() => {
  const [selected, setSelected] = useState<"js" | "py" | "go">("js")

  return (
    <Card className="mx-auto max-w-3xl pt-3">
      <div className="-mx-6 mb-6 flex items-center justify-between border-b border-slate-700 px-6 pb-3">
        <div className="flex items-center gap-3">
          <ToggleChip
            onClick={() => setSelected("js")}
            selected={selected === "js"}
          >
            Javascript
          </ToggleChip>
          <ToggleChip
            onClick={() => setSelected("py")}
            selected={selected === "py"}
          >
            Python
          </ToggleChip>
          <ToggleChip
            onClick={() => setSelected("go")}
            selected={selected === "go"}
          >
            Golang
          </ToggleChip>
        </div>
      </div>
      <div className="-mx-6 overflow-x-auto px-6">
        <Markup code={selected === "js" ? reactCode : selected === "py" ? pythonCode : goCode} />
      </div>
      <span className="absolute left-0 top-1/2 h-48 w-[1px] -translate-y-1/2 animate-pulse bg-gradient-to-b from-blue-500/0 via-blue-800 to-blue-500/0" />
    </Card>
  )
})

const ToggleChip = memo(({
  children,
  selected,
  onClick,
}: {
  children: string
  selected: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}) => {
  return (
    <button
      onClick={onClick}
      className={`rounded px-1.5 py-0.5 text-sm font-medium transition-colors ${selected ? "bg-blue-600 text-slate-50" : "bg-slate-900 text-slate-50 hover:bg-slate-700"}`}
    >
      {children}
    </button>
  )
})

const Card = memo(({
  className,
  children,
}: {
  className?: string
  children?: ReactNode
}) => {
  return (
    <motion.div
      initial={{
        filter: "blur(4px)",
      }}
      whileInView={{
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        delay: 0.25,
      }}
      className={`relative h-full w-full overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950/50 to-slate-900/80 p-6 ${className}`}
    >
      {children}
    </motion.div>
  )
})

const Markup = memo(({ code }: { code: string }) => {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    <Highlight theme={theme} code={code} language="javascript">
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              <span className="inline-block w-[40px] select-none text-slate-400">
                {i + 1}
              </span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
})

type WindowSize = {
  width: number | undefined
  height: number | undefined
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })

    window.addEventListener("resize", handleResize)

    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return windowSize
}

const GRID_BOX_SIZE = 32
const BEAM_WIDTH_OFFSET = 1

const theme = {
  plain: {
    color: "#e2e8f0",
    backgroundColor: "transparent",
  },
  styles: [
    {
      types: ["comment"],
      style: {
        color: "#94a3b8)",
        fontStyle: "italic",
      },
    },
    {
      types: ["string", "inserted"],
      style: {
        color: "rgb(195, 232, 141)",
      },
    },
    {
      types: ["number"],
      style: {
        color: "rgb(247, 140, 108)",
      },
    },
    {
      types: ["builtin", "char", "constant", "function"],
      style: {
        color: "rgb(130, 170, 255)",
      },
    },
    {
      types: ["punctuation", "selector"],
      style: {
        color: "rgb(199, 146, 234)",
      },
    },
    {
      types: ["variable"],
      style: {
        color: "rgb(191, 199, 213)",
      },
    },
    {
      types: ["class-name", "attr-name"],
      style: {
        color: "rgb(255, 203, 107)",
      },
    },
    {
      types: ["tag", "deleted"],
      style: {
        color: "rgb(255, 85, 114)",
      },
    },
    {
      types: ["operator"],
      style: {
        color: "rgb(137, 221, 255)",
      },
    },
    {
      types: ["boolean"],
      style: {
        color: "rgb(255, 88, 116)",
      },
    },
    {
      types: ["keyword"],
      style: {
        fontStyle: "italic",
      },
    },
    {
      types: ["doctype"],
      style: {
        color: "rgb(199, 146, 234)",
        fontStyle: "italic",
      },
    },
    {
      types: ["namespace"],
      style: {
        color: "rgb(178, 204, 214)",
      },
    },
    {
      types: ["url"],
      style: {
        color: "rgb(221, 221, 221)",
      },
    },
    {
      types: ["keyword", "variable"],
      style: {
        color: "#c792e9",
        fontStyle: "normal",
      },
    },
  ],
}

const reactCode = `import { loadStripe } from '@stripe/stripe-js'

export const CheckoutButton = () => {
  const handleClick = async () => {
    const stripe = await loadStripe(process.env.STRIPE_PUBLISHABLE_KEY)
    
    await stripe.redirectToCheckout({
      lineItems: [
        {
          price: 'price_....',
          quantity: 1
        }
      ],
      mode: 'payment',
      successUrl: window.location.origin + '/success',
      cancelUrl: window.location.origin + '/cancel'
    })
  }

  return (
    <button onClick={handleClick}>
      Buy Now
    </button>
  )
}`

const pythonCode = `import discord
from discord import app_commands
import os

class DiscordBot(discord.Client):
    def __init__(self):
        super().__init__(intents=discord.Intents.default())
        self.tree = app_commands.CommandTree(self)

    async def setup_hook(self):
        await self.tree.sync()

client = DiscordBot()

@client.event
async def on_ready():
    print(f'Logged in as {client.user} (ID: {client.user.id})')
    print('------')

@client.tree.command(name="hello", description="Says hello!")
async def hello(interaction: discord.Interaction):
    await interaction.response.send_message(f'Hello!')

client.run(os.getenv('DISCORD_TOKEN'))`

const goCode = `package main

import (
    "fmt"
    "net/http"
)

func PingRoute(w http.ResponseWriter, r *http.Request) {
  fmt.Fprintln(w, "Pong!")
}

func main() {
    mux := http.NewServeMux()
    mux.HandleFunc("GET /ping", PingRoute)

    server := &http.Server{Addr: ":8080", Handler: mux}
    if err := server.ListenAndServe() err != nil {
        log.Fatal(err)
    }
}`