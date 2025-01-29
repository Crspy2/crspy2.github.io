import { memo, useState, ReactNode } from 'react';
import {FaCircleChevronLeft, FaCircleChevronRight, FaDiscord, FaGithub} from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import {DripButton} from "./ui/drip-btn.tsx";
import {EncryptButton} from "./ui/encrypt-btn.tsx";

type CarouselSection = {
    component: ReactNode;
};

const carouselSections: CarouselSection[] = [
    {
        component: (
            <div className="h-full flex flex-col items-center justify-center gap-y-5">
                <div className="flex flex-col gap-y-8 justify-center items-center">
                    <div className="flex flex-col justify-center items-center select-none">
                        <motion.h3
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="font-moranga font-normal text-lg sm:text-xl md:text-2xl lg:text-3xl text-blue-400"
                        >
                            Web Developer
                        </motion.h3>
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="font-moranga text-white font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-center"
                        >
                            Hi, I'm Crspy!
                        </motion.h1>
                    </div>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-neutral-200 font-poppins max-w-xl indent-4 text-center px-4"
                    >
                        I am web developer based in California, United Stated, studying Computer Science and Computer
                        Engineering at university. I've been working on Websites for over 3 years, love to learn new things,
                        and always looking for new opportunities to grow and improve my skills.
                    </motion.p>
                </div>
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex gap-x-4 w-full mx-auto justify-center items-center"
                >
                    <a href="/#projects">
                        <DripButton>See my work!</DripButton>
                    </a>
                    <a href="/#contact">
                        <EncryptButton targetText="Contact Me" />
                    </a>
                </motion.div>
            </div>
        )
    },
    {
        component: (
            <div className="h-full flex flex-col items-center justify-center">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-zinc-800/50 p-8 rounded-2xl backdrop-blur-sm max-w-2xl w-full mx-4"
                >
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-4 mb-6"
                    >
                        <div className="p-3 bg-zinc-700 rounded-xl">
                            <FaGithub size={32} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">GitHub</h2>
                            <p className="text-zinc-400">Open Source Contributions</p>
                        </div>
                    </motion.div>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-zinc-300 mb-8"
                    >
                        Check out my open source contributions and personal projects on GitHub.
                        I'm passionate about collaborating with others and sharing knowledge through code.
                    </motion.p>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <a href="https://github.com/yourusername">
                            <DripButton>View GitHub</DripButton>
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        )
    },
    {
        component: (
            <div className="h-full flex flex-col items-center justify-center">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-gradient-to-br from-indigo-600 to-purple-700 p-10 rounded-3xl shadow-2xl max-w-2xl mx-4"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-6 mb-8"
                    >
                        <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                            <FaDiscord size={40} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">Join Our Community</h2>
                            <p className="text-indigo-200">Connect, Learn, Grow</p>
                        </div>
                    </motion.div>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-white/90 text-lg mb-8"
                    >
                        Join my Discord community where we discuss web development,
                        share resources, and help each other grow as developers.
                    </motion.p>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex justify-center"
                    >
                        <a href="https://discord.gg/yourinvite">
                            <DripButton>Join Discord</DripButton>
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        )
    }
];

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
};

export const Intro = memo(() => {
    const [[currentIndex, direction], setPage] = useState([0, 0]);

    const nextSlide = () => {
        setPage([currentIndex + 1 >= carouselSections.length ? 0 : currentIndex + 1, 1]);
    };

    const prevSlide = () => {
        setPage([currentIndex - 1 < 0 ? carouselSections.length - 1 : currentIndex - 1, -1]);
    };

    const goToSlide = (index: number) => {
        const newDirection = index > currentIndex ? 1 : -1;
        setPage([index, newDirection]);
    };

    return (
        <div className="relative h-screen flex justify-center items-center overflow-x-hidden">
            <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                <button
                    onClick={prevSlide}
                    className="p-2 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 text-white pointer-events-auto transition-colors"
                    aria-label="Previous slide"
                >
                    <FaCircleChevronLeft size={24} />
                </button>
                <button
                    onClick={nextSlide}
                    className="p-2 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 text-white pointer-events-auto transition-colors"
                    aria-label="Next slide"
                >
                    <FaCircleChevronRight size={24} />
                </button>
            </div>

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
                >
                    {carouselSections[currentIndex].component}
                </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-40 left-0 right-0">
                <div className="flex justify-center gap-2 px-4">
                    {carouselSections.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`h-2 transition-all duration-300 rounded-full ${
                                index === currentIndex
                                    ? 'w-16 bg-zinc-300'
                                    : 'w-8 bg-zinc-600 hover:bg-zinc-500 hover:w-12'
                            }`}
                            aria-label={`Go to tab ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
});