import { MotionProps, motion } from "framer-motion"
import { cn } from "@/lib/utils.ts"
import { LinkPreview } from "@/components/ui/link-preview.tsx"
import { IoIosMore } from "react-icons/io"
import { GrTechnology } from "react-icons/gr"

import DiscordJS from "@/assets/logos/discordjs.svg"
import DiscordPy from "@/assets/logos/discordpy.png"
import MongoDB from "@/assets/logos/mongodb.svg"
import NextJS from "@/assets/logos/nextjs.svg"
import NodeJS from "@/assets/logos/nodejs.png"
import Postman from "@/assets/logos/postman.png"
import Prisma from "@/assets/logos/prisma.svg"
import Python from "@/assets/logos/python.png"
import React from "@/assets/logos/react.png"
import Redis from "@/assets/logos/redis.svg"
import Supabase from "@/assets/logos/supabase.jpg"
import Tailwind from "@/assets/logos/tailwind.svg"
import Tanstack from "@/assets/logos/tanstack.png"
import TRPC from "@/assets/logos/trpc.png"
import Vite from "@/assets/logos/vite.png"

interface TechnologyIcon {
    src: string
    url: string
    color: string
    className?: string
}

const technologies: TechnologyIcon[] = [
    {
        src: React,
        url: "https://react.dev/",
        color: "#61DAFB"
    },
    {
        src: Vite,
        url: "https://vitejs.dev/",
        color: "#646CFF"
    },
    {
        src: NextJS,
        url: "https://nextjs.org/",
        color: "#000000",
        className: "bg-white rounded-lg p-0.5"
    },
    {
        src: Tailwind,
        url: "https://tailwindcss.com/",
        color: "#38B2AC",
        className: "bg-white rounded-full"
    },
    {
        src: Tanstack,
        url: "https://tanstack.com/",
        color: "#FF4154"
    },
    {
        src: TRPC,
        url: "https://trpc.io/",
        color: "#2596BE"
    },
    {
        src: Prisma,
        url: "https://www.prisma.io/",
        color: "#2D3748"
    },
    {
        src: Supabase,
        url: "https://supabase.com/",
        color: "#3ECF8E"
    },
    {
        src: NodeJS,
        url: "https://nodejs.org/",
        color: "#339933",
        className: "bg-white rounded-lg p-0.5"
    },
    {
        src: Python,
        url: "https://www.python.org/",
        color: "#3776AB"
    },
    {
        src: MongoDB,
        url: "https://www.mongodb.com/",
        color: "#00ED64"
    },
    {
        src: Redis,
        url: "https://redis.io/",
        color: "#DC382D"
    },
    {
        src: Postman,
        url: "https://www.postman.com/",
        color: "#FF6C37"
    },
    {
        src: DiscordJS,
        url: "https://discord.js.org/",
        color: "#5865F2",
        className: "bg-white rounded-lg p-0.5"
    },
    {
        src: DiscordPy,
        url: "https://discordpy.readthedocs.io/",
        color: "#5865F2"
    },
]

export const Tools = () => {
    return (
        <div id="tools" className="px-4 py-12">
            <div className="flex flex-col items-center justify-center mb-8">
                <span className="mx-auto mb-3 block w-fit rounded bg-gradient-to-br from-slate-800 to-slate-950 p-3 text-3xl shadow-md shadow-blue-900">
                    <GrTechnology />
                </span>
                <h3 className="text-white text-3xl md:text-5xl font-light italic font-moranga">
                    What I work with!
                </h3>
            </div>
            <motion.div
                initial="initial"
                animate="animate"
                transition={{
                    staggerChildren: 0.05,
                }}
                className="mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4"
            >
                <HeaderBlock />
                <TechnologiesBlock />
            </motion.div>
        </div>
    )
}

type BlockProps = {
    className?: string
} & MotionProps

const Block = ({ className, ...rest }: BlockProps) => {
    return (
        <motion.div
            variants={{
                initial: {
                    scale: 0.5,
                    y: 50,
                    opacity: 0,
                },
                animate: {
                    scale: 1,
                    y: 0,
                    opacity: 1,
                },
            }}
            transition={{
                type: "spring",
                mass: 3,
                stiffness: 400,
                damping: 50,
            }}
            className={cn(
                "col-span-4 rounded-lg border border-zinc-700 bg-zinc-800 p-6",
                className
            )}
            {...rest}
        />
    )
}

const TechnologiesBlock = () => (
    <>
        {technologies.map((tech, index) => (
            <Block
                key={tech.url}
                whileHover={{
                    rotate: index % 2 === 0 ? "2.5deg" : "-2.5deg",
                    scale: 1.1,
                }}
                className="col-span-6 md:col-span-3"
                style={{ backgroundColor: tech.color }}
            >

                <LinkPreview
                    url={tech.url}
                    target="_blank"
                    // rel="noopener noreferrer"
                    className="grid h-full place-content-center p-4"
                >
                    <img
                        src={tech.src}
                        alt={`${tech.url.split("//")[1].split(".")[0]} logo`}
                        className={cn("h-12 w-12 object-contain rounded-lg", tech.className)}
                    />
                </LinkPreview>
            </Block>
        ))}
        <Block className="col-span-12 flex flex-col items-center gap-4 md:col-span-3">
            <IoIosMore className="text-3xl" />
            <p className="text-center text-lg text-zinc-400">And More!</p>
        </Block>
    </>
)

const HeaderBlock = () => (
    <Block className="col-span-12 row-span-2 md:col-span-6">
        <h4 className="mb-12 text-3xl font-poppins font-medium leading-tight">
            Tools and technologies I use to{" "}
            <span className="text-zinc-400">
                build cool websites like this one.
            </span>
        </h4>
        <p className="text-sm text-neutral-300">
            A curated selection of modern technologies I use to build efficient, scalable applications. Each tool is
            chosen for its reliability, performance, and ability to solve complex problems effectively and securely.
        </p>
    </Block>
)