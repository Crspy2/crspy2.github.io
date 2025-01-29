import { memo } from "react"
import { motion } from "framer-motion"
import { DripButton } from "./ui/drip-btn.tsx"
import { EncryptButton } from "./ui/encrypt-btn.tsx"
import { IntroTabs } from "@/components/intro-carousel.tsx"


export const Intro = memo(() => {
    return (
        <div className="h-screen flex flex-col items-center justify-center gap-y-5 overflow-hidden">
            <div className="flex flex-col gap-y-8 justify-center items-center">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col justify-center items-center select-none">
                    <h3 className="font-moranga font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl text-blue-400">Web Developer</h3>
                    <h1 className="font-moranga text-white font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-nowrap">Hi, I'm Crspy!</h1>
                </motion.div>
                <motion.p
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-neutral-200 font-poppins text-sm mx-2 sm:mx-0 md:text-base max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
                    I am web developer based in California, United Stated, studying Computer Science and Computer
                    Engineering at university. I have a passion for building cool stuff. My main tech stack is React,
                    Tailwind CSS, Framer Motion and, if a backend is needed, NextJS. I can get so much work done with this
                    stack that almost all of my projects are done with it. I also like rock climbing, skiing and video games.
                </motion.p>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
                <IntroTabs />
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