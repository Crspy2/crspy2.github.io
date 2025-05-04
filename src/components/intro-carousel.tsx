import { memo, useState, ReactNode, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { LinkButton } from "@/components/ui/link-btn.tsx"
import { AnimatedTooltip } from "@/components/ui/animated-tooltip.tsx"
import GitHubCalendar from "react-github-calendar"
import DiscordDND from "@/assets/discord/dnd.png"
import Hypesquad from "@/assets/discord/hypesquadbalance.svg"
import ActiveDev from "@/assets/discord/activedeveloper.svg"
import Nitro from "@/assets/discord/discordgoldnitro.png"
import Boost from "@/assets/discord/boost6month.svg"
import Username from "@/assets/discord/username.png"
import Quest from "@/assets/discord/quest.png"
import { cn } from '@/lib/utils'

const badges = [
    { src: Nitro, name: "Subscriber since 10/12/24" },
    { src: Hypesquad, name: "HypeSquad Balance" },
    { src: ActiveDev, name: "Active Developer" },
    { src: Boost, name: "Server boosting since Oct 12, 2024" },
    { src: Username, name: "Originally known as Crspy#1794" },
    { src: Quest, name: "Completed a Quest" }
]

type CarouselSection = {
    component: ReactNode
}

const carouselSections: CarouselSection[] = [
    {
        component: (
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-zinc-800/50 py-2.5 px-3 rounded-2xl backdrop-blur-sm max-w-2xl"
            >
                <motion.div
                    initial={{y: 20, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{delay: 0.2}}
                    className="flex items-center gap-4 w-full"
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
                                <h2 className="font-medium font-chillax leading-tight lg:text-lg text-white">Crspy</h2>
                                <p className="text-zinc-400 text-xs lg:text-sm">@crs.py</p>
                            </div>
                            <div className="hidden sm:flex flex-row gap-0.5 items-center">
                                {badges.map((b, idx) => (
                                    <AnimatedTooltip key={idx} hoverText={b.name}>
                                        <img
                                            src={b.src}
                                            alt={b.name}
                                            className="size-6"
                                        />
                                    </AnimatedTooltip>
                                ))}
                            </div>
                        </div>
                        <div className="w-40">
                            <LinkButton link="https://discord.com/users/385568884511473664">View Profile</LinkButton>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )
    },
    {
        component: (
            <div className="scale-65 -mt-6">
                <GitHubCalendar username="crspy2" fontSize={16} throwOnError />
            </div>
        )
    }
]

const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
    })
}

export const IntroTabs = memo(() => {
    const [[currentIndex, direction], setPage] = useState([0, 0])
    const [progress, setProgress] = useState(0)

    const goToSlide = useCallback((index: number) => {
        const newDirection = index > currentIndex ? 1 : -1
        setPage([index, newDirection])
        setProgress(0) // Reset progress when manually switching
    }, [currentIndex])

    const goToNextSlide = useCallback(() => {
        const nextIndex = (currentIndex + 1) % carouselSections.length
        goToSlide(nextIndex)
    }, [currentIndex, goToSlide])

    // Auto-switch effect
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    goToNextSlide()
                    return 0
                }
                return prev + 1
            })
        }, 100) // Update progress every 100ms

        return () => clearInterval(timer)
    }, [goToNextSlide])

    return (
        <>
            <div className="hidden md:flex flex-col justify-center items-center overflow-x-hidden">
                <AnimatePresence initial={true} custom={direction} mode="wait">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className={cn("h-42", currentIndex == 1 && "-mx-37")}
                    >
                        {carouselSections[currentIndex].component}
                    </motion.div>
                </AnimatePresence>
                <div className="bottom-40 left-0 right-0">
                    <div className="flex justify-center gap-2 px-4">
                        {carouselSections.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className="h-2 relative"
                                aria-label={`Go to tab ${index + 1}`}
                            >
                                {/* Background track */}
                                <div
                                    className={`h-full transition-all duration-300 rounded-full bg-zinc-600 ${
                                        index === currentIndex ? 'w-16' : 'w-8 hover:w-12'
                                    }`}
                                />

                                {/* Progress fill */}
                                {index === currentIndex && (
                                    <div
                                        className="absolute top-0 left-0 h-full rounded-full bg-zinc-300 transition-all duration-100"
                                        style={{
                                            width: `${progress}%`,
                                            maxWidth: '64px' // equivalent to w-16
                                        }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex md:hidden">
                {carouselSections[0].component}
            </div>
        </>
    )
})