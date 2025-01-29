"use client"
import React, { memo, useState, ReactNode, useRef, useEffect } from "react"
import { createPortal } from "react-dom"
import {
    motion,
    useTransform,
    AnimatePresence,
    useMotionValue,
    useSpring,
} from "framer-motion"

interface AnimatedTooltipProps {
    children: ReactNode
    hoverText: string
}

export const AnimatedTooltip = memo(({ children, hoverText }: AnimatedTooltipProps) => {
    const [isHovered, setIsHovered] = useState(false)
    const targetRef = useRef<HTMLDivElement>(null)
    const springConfig = { stiffness: 100, damping: 5 }
    const x = useMotionValue(0)

    const rotate = useSpring(
        useTransform(x, [-100, 100], [-45, 45]),
        springConfig
    )

    const translateX = useSpring(
        useTransform(x, [-100, 100], [-50, 50]),
        springConfig
    )

    const handleMouseMove = (event: React.MouseEvent) => {
        const rect = targetRef.current?.getBoundingClientRect()
        if (rect) {
            const halfWidth = rect.width / 2
            x.set(event.clientX - rect.left - halfWidth)
        }
    }

    const Tooltip = () => {
        const [position, setPosition] = useState({ top: 0, left: 0 })

        useEffect(() => {
            if (targetRef.current) {
                const rect = targetRef.current.getBoundingClientRect()
                setPosition({
                    top: rect.top + window.scrollY,
                    left: rect.left + rect.width / 2
                })
            }
        }, [])

        return createPortal(
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                        type: "spring",
                        stiffness: 260,
                        damping: 10,
                    },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                    position: 'absolute',
                    top: position.top - 48, // Position above the target with smaller gap
                    left: position.left - 70, // Adjust left position to center correctly
                    transform: `translateX(${translateX}px)`,
                    rotate,
                    whiteSpace: 'nowrap',
                }}
                className="flex text-xs flex-col items-center justify-center rounded-md bg-black z-[100] shadow-xl px-4 py-2"
            >
                <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-px" />
                <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
                <div className="text-neutral-200 text-xs font-chillax relative z-30">
                    {hoverText}
                </div>
            </motion.div>,
            document.body
        )
    }

    return (
        <div
            ref={targetRef}
            className="relative group inline-block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
        >
            <AnimatePresence mode="popLayout">
                {isHovered && <Tooltip />}
            </AnimatePresence>
            <div className="group-hover:scale-105 group-hover:z-30 transition duration-500">
                {children}
            </div>
        </div>
    )
})