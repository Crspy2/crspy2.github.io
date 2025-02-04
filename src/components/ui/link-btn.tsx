import { memo, ReactNode } from "react"
import { FiArrowRight } from "react-icons/fi"

interface LinkButtonProps {
    link: string
    children: ReactNode
}

export const LinkButton = memo(({ link, children }: LinkButtonProps) => {
    return (
        <a href={link} target="_blank" className="group grid place-content-center">
            <button className="group flex h-10 items-center gap-2 rounded-full bg-neutral-200 pl-3 pr-4 transition-all duration-300 ease-in-out hover:bg-black hover:pl-2 hover:text-white active:bg-neutral-700">
                <span className="rounded-full bg-black p-1 text-sm transition-colors duration-300 group-hover:bg-white">
                  <FiArrowRight className="-translate-x-[200%] text-[0px] transition-all duration-300 group-hover:translate-x-0 group-hover:text-lg group-hover:text-black group-active:-rotate-45" />
                </span>
                <span className="text-black group-hover:text-white transition-all duration-300">{children}</span>
            </button>
        </a>
    )
})