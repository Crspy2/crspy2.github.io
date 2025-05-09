"use client"
import { memo, MouseEvent, ReactNode, useEffect, useState } from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import { encode } from "qss"
import {
    AnimatePresence,
    motion,
    useMotionValue,
    useSpring,
} from "framer-motion"
import { cn } from "@/lib/utils"

type LinkPreviewProps = {
    children: ReactNode
    url: string
    className?: string
    width?: number
    height?: number
    quality?: number
    layout?: string
} & (
    | { isStatic: true, imageSrc: string }
    | { isStatic?: false, imageSrc?: never }
    )

export const LinkPreview = memo(({
                                children,
                                url,
                                className,
                                width = 200,
                                height = 125,
                                isStatic = false,
                                imageSrc = "",
                            }: LinkPreviewProps) => {
    let src
    if (!isStatic) {
        const params = encode({
            url,
            screenshot: true,
            meta: false,
            embed: "screenshot.url",
            colorScheme: "dark",
            "viewport.isMobile": true,
            "viewport.deviceScaleFactor": 1,
            "viewport.width": width * 5,
            "viewport.height": height * 5,
        })
        src = `https://api.microlink.io/?${params}`
    } else {
        src = imageSrc
    }

    const [isOpen, setOpen] = useState(false)

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const springConfig = { stiffness: 100, damping: 15 }
    const x = useMotionValue(0)

    const translateX = useSpring(x, springConfig)

    const handleMouseMove = (event: MouseEvent<HTMLAnchorElement>) => {
        const targetRect = (event.target as HTMLElement).getBoundingClientRect()
        const eventOffsetX = event.clientX - targetRect.left
        const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2 // Reduce the effect to make it subtle
        x.set(offsetFromCenter)
    }

    return (
        <>
            {isMounted ? (
                <div className="hidden">
                    <img
                        src={src}
                        width={width}
                        height={height}
                        alt="hidden image"
                    />
                </div>
            ) : null}

            <HoverCardPrimitive.Root
                openDelay={50}
                closeDelay={100}
                onOpenChange={(open) => {
                    setOpen(open)
                }}
            >
                <HoverCardPrimitive.Trigger
                    onMouseMove={handleMouseMove}
                    className={cn("text-white font-bold underline underline-offset-2 hover:underline-offset-4 transition-all decoration-blue-500", className)}
                    href={url}
                    target="_blanks"
                >
                    {children}
                </HoverCardPrimitive.Trigger>

                <HoverCardPrimitive.Content
                    className="[transform-origin:var(--radix-hover-card-content-transform-origin)]"
                    side="top"
                    align="center"
                    sideOffset={10}
                >
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    transition: {
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                    },
                                }}
                                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                                className="shadow-xl rounded-xl"
                                style={{
                                    x: translateX,
                                }}
                            >
                                <a
                                    href={url}
                                    className="block p-1 bg-white border-2 border-transparent shadow rounded-xl hover:border-neutral-200 dark:hover:border-neutral-800"
                                    style={{ fontSize: 0 }}
                                    target="_blank"
                                >
                                    <img
                                        src={isStatic ? imageSrc : src}
                                        width={width}
                                        height={height}
                                        className="rounded-lg"
                                        alt="preview image"
                                    />
                                </a>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </HoverCardPrimitive.Content>
            </HoverCardPrimitive.Root>
        </>
    )
})