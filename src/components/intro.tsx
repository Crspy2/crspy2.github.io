import { memo } from "react"
import { motion } from "framer-motion"
import { IntroTabs } from "@/components/intro-carousel.tsx"
import { LinkPreview } from "@/components/ui/link-preview.tsx"


export const Intro = memo(() => {
    return (
        <div className="h-screen flex flex-col items-center justify-center gap-y-5 overflow-hidden">
            <div className="relative flex flex-col gap-y-5 bg-gray-900 py-4 sm:p-8 rounded-lg border border-slate-300/20">
                <div className="flex flex-col gap-y-4 justify-center items-center">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex flex-col sm:flex-row gap-x-6"
                        >
                            <img alt="Avatar" draggable="false" loading="lazy"
                                 decoding="async" data-nimg="1"
                                 className="bg-transparent rounded-full size-40 sm:size-30 mx-auto"
                                 src="https://cdn.discordapp.com/avatars/385568884511473664/d888e0052b5a6b7a8399cd81b4dc251f.webp?size=128"
                            />
                            <div className="flex flex-col text-center sm:text-start select-none">
                                <h3 className="font-moranga font-normal text-lg sm:text-xl lg:text-2xl text-blue-400">Gambling Addict</h3>
                                <h1 className="font-moranga text-white font-black text-3xl sm:text-4xl md:text-5xl text-nowrap">Hi, I'm Crspy!</h1>
                                <h4 className="text-gray-400 text-sm">Developer / Support</h4>
                            </div>
                    </motion.div>
                    <motion.p
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-neutral-200 font-poppins text-center sm:text-start text-sm md:text-base max-w-sm sm:max-w-lg">
                        Founder and developer for{" "}
                        <LinkPreview url="https://alterasms.io">AlteraSMS</LinkPreview>. I am a developer interested in fullstack development, authentication, video game mods, and more...
                    </motion.p>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 sm:w-135">
                    <IntroTabs />
                </div>
            </div>
        </div>
    )
})