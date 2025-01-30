import { memo } from "react"
import { motion } from "framer-motion"
import { DripButton } from "./ui/drip-btn.tsx"
import { EncryptButton } from "./ui/encrypt-btn.tsx"
import { IntroTabs } from "@/components/intro-carousel.tsx"
import { LinkPreview } from "@/components/ui/link-preview.tsx"


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
                    I am a web developer based in California, United States, studying Computer Science and Computer
                    Engineering at university. For frontend development, I work with{" "}
                    <LinkPreview url="https://react.dev">React</LinkPreview>,{" "}
                    <LinkPreview url="https://tailwindcss.com">Tailwind CSS</LinkPreview>,{" "}
                    and{" "}
                    <LinkPreview url="https://motion.dev">
                        Framer Motion
                    </LinkPreview>.{" "}
                    For backend development, I primarily use{" "}
                    <LinkPreview url="https://nextjs.org">
                        NextJS
                    </LinkPreview>{" "}
                    and{" "}
                    <LinkPreview url="https://go.dev">
                        Go
                    </LinkPreview>.{" "}
                    I also like rock climbing, skiing, and video games.
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