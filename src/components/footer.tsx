import { memo } from 'react'
import { FaRegCopyright } from "react-icons/fa6"

export const Footer = memo(() => {
    return (
        <div className="flex gap-0.5 text-sm md:text-base justify-center items-center w-full pb-6">
            <FaRegCopyright />
            <span>Crspy — All rights reserved.</span>
        </div>
    )
})