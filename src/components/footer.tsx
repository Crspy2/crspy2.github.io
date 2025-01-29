import { memo } from 'react'
import { FaRegCopyright } from "react-icons/fa6"
import { SiDiscord, SiGithub, SiTelegram, SiX } from "react-icons/si"

export const Footer = memo(() => {
    return (
        <div className="flex justify-between items-center w-full pb-6 max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto">
            <div className="flex flex-row items-center gap-2.5">
                <a href="https://discord.com/users/385568884511473664" target="_blank">
                    <SiDiscord className="size-4 md:size-6" />
                </a>
                <a href="https://t.me/crs_py" target="_blank">
                    <SiTelegram className="size-4 md:size-6" />
                </a>
            </div>
            <div className="flex flex-row gap-1.5 items-center text-sm md:text-base">
                <FaRegCopyright />
                <span>Crspy — All rights reserved.</span>
            </div>
            <div className="flex flex-row items-center gap-2.5">
                <a href="https://github.com/crspy2" target="_blank">
                    <SiGithub className="size-4 md:size-6" />
                </a>
                <a href="https://x.com/imlacrspy" target="_blank">
                    <SiX className="size-4 md:size-6" />
                </a >
            </div>
        </div>
    )
})