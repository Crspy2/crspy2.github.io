import { memo } from "react"
import { motion } from "framer-motion"
import { DripButton } from "./ui/drip-btn.tsx"
import { EncryptButton } from "./ui/encrypt-btn.tsx"
import DiscordDND from "@/assets/discord/dnd.png"
import Hypesquad from "@/assets/discord/hypesquadbalance.svg"
import ActiveDev from "@/assets/discord/activedeveloper.svg"
import Nitro from "@/assets/discord/discordnitro.svg"
import Boost from "@/assets/discord/discordboost3.svg"
import Username from "@/assets/discord/username.png"
import Quest from "@/assets/discord/quest.png"
import {ShinyButton} from "@/components/ui/shiny-btn.tsx";

const badges = [Hypesquad, ActiveDev, Nitro, Boost, Username, Quest,]

export const Intro = memo(() => {
    return (
        <div className="h-screen flex flex-col items-center justify-center gap-y-5 overflow-hidden">
            <div className="flex flex-col gap-y-8 justify-center items-center">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col justify-center items-center select-none">
                    <h3 className="font-moranga font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl text-blue-400">Web Developer</h3>
                    <h1 className="font-moranga text-white font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl">Hi, I'm Crspy!</h1>
                </motion.div>
                <motion.p
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-neutral-200 font-poppins max-w-xl indent-4">
                    I am web developer based in California, United Stated, studying Computer Science and Computer
                    Engineering at university.
                </motion.p>
            </div>
            <div className="flex flex-col items-center justify-center">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-zinc-800/50 p-4 rounded-2xl backdrop-blur-sm max-w-2xl w-full mx-4"
                >
                    <motion.div
                        initial={{y: 20, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        transition={{delay: 0.2}}
                        className="flex items-center gap-4"
                    >
                        <div className="relative -m-2">
                            <div className="relative m-2 aspect-square h-16 sm:h-20">
                                <img alt="Avatar" draggable="false" loading="lazy" width="78" height="78"
                                     decoding="async" data-nimg="1"
                                     className="size-full bg-transparent rounded-lg"
                                     src="https://cdn.discordapp.com/avatars/385568884511473664/d888e0052b5a6b7a8399cd81b4dc251f.webp?size=128"
                                />
                                <span className="absolute bottom-0 right-0 z-10 -m-1 size-6">
                                    <img
                                        src={DiscordDND}
                                        alt="Discord do not disturb status"
                                        className="relative inline-flex size-6 rounded-full border-2 border-stone-800 bg-stone-800"
                                    />
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between gap-12">
                            <div className="flex flex-row gap-3">
                                <div>
                                    <h2 className="line-clamp-1 break-all font-medium font-chillax leading-tight lg:text-lg text-white">Crspy</h2>
                                    <p className="text-zinc-400 text-xs lg:text-sm">@crs.py</p>
                                </div>
                                <div className="flex flex-row gap-0.5 items-center">
                                    {badges.map(b => (
                                        <img
                                            src={b}
                                            alt={b}
                                            className="size-5"
                                        />
                                    ))}
                                </div>
                            </div>
                            <ShinyButton>View Profile</ShinyButton>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex gap-x-4 w-full mx-auto justify-center items-center"
            >
                <a href="/#projects">
                    <DripButton>See my work!</DripButton>
                </a>
                <a href="/#contact">
                    <EncryptButton targetText="Contact Me"/>
                </a>
            </motion.div>
        </div>
    )
})