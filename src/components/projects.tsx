import { Dispatch, memo, SetStateAction, useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils.ts"
import { WebScreenshot } from "./ui/web-screenshot.tsx"
import { IconType } from "react-icons"
import { FiEye } from "react-icons/fi"

import DiscordJS from "@/assets/logos/discordjs.svg"
import Mintlify from "@/assets/logos/mintlify.svg"
import NextJS from "@/assets/logos/nextjs.svg"
import Prisma from "@/assets/logos/prisma.svg"
import Redis from "@/assets/logos/redis.svg"
import Sanity from "@/assets/logos/sanity.svg"
import Tailwind from "@/assets/logos/tailwind.svg"


export const Projects = memo(() => {
  const [featureInView, setFeatureInView] = useState<ProjectType>(features[0]);

  return (
    <section id="projects" className="relative mx-auto max-w-7xl">
      <div className="flex items-center justify-center">
        <h3 className="text-white text-5xl font-bold font-poppins">
          My Projects
        </h3>
      </div>
      <div className="-mt-32">
        <SlidingFeatureDisplay featureInView={featureInView} />

        {/* Offsets the height of SlidingFeatureDisplay so that it renders on top of Content to start */}
        <div className="-mt-[100vh] hidden md:block" />
        {features.map((s) => (
          <Content
            key={s.id}
            featureInView={s}
            setFeatureInView={setFeatureInView}
            {...s}
          />
        ))}
      </div>
    </section>
  );
})

const SlidingFeatureDisplay = memo(({
  featureInView,
}: {
  featureInView: ProjectType;
}) => {
  return (
    <div
      style={{
        justifyContent:
          featureInView.contentPosition === "l" ? "flex-end" : "flex-start",
      }}
      className="pointer-events-none sticky top-0 z-9 hidden h-screen w-full items-center justify-center md:flex"
    >
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        className="h-fit w-3/5 rounded-xl p-8"
      >
        <WebScreenshot url={featureInView.url} width={400} height={250} />
      </motion.div>
    </div>
  );
})

const Content = memo(({
  setFeatureInView,
  featureInView,
}: {
  setFeatureInView: Dispatch<SetStateAction<ProjectType>>;
  featureInView: ProjectType;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-150px",
  });

  useEffect(() => {
    if (isInView) {
      setFeatureInView(featureInView);
    }
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="relative z-0 flex h-fit md:h-screen"
      style={{
        justifyContent:
          featureInView.contentPosition === "l" ? "flex-start" : "flex-end",
      }}
    >
      <div className="grid h-full w-full place-content-center px-4 py-12 md:w-2/5 md:px-8 md:py-8">
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col gap-3"
          >
            <div>
              <a href={featureInView.url} target="_blank" className="rounded-full bg-blue-600 px-2 py-1.5 text-xs font-medium text-white">
                {featureInView.title}
              </a>
              <p className="my-3 text-5xl text-neutral-200 font-poppins font-bold">{featureInView.title}</p>
              <p className="text-neutral-400">{featureInView.description}</p>
            </div>
            <div className="flex flex-row gap-3 items-center">
              {featureInView.tools.map(tool => (
                <img src={tool.icon} alt={`${tool.name} icon`} className={cn("h-8 w-8", tool.className)}  />
              ))}
            </div>
          </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="mt-8 block md:hidden"
        >
          <WebScreenshot url={featureInView.url} width={400} height={250} />
        </motion.div>
      </div>
    </section>
  );
})

interface ProjectType {
  id: number;
  title: string;
  description: string;
  url: string;
  contentPosition: "l" | "r";
  icon: IconType
  tools: { name: string, icon: string, className?: string }[]
}

const features: ProjectType[] = [
  {
    id: 1,
    title: "AlteraSMS",
    description:
      "Monorepo built on top of NextJS and discord.js. Provides streamlined access to one-time use non-VoiP phone numbers that can be used to bypass number restrictions for online accounts.",
    url: "https://alterasms.io",
    contentPosition: "r",
    icon: FiEye,
    tools: [
      { name: "NextJS", icon: NextJS, className: "bg-neutral-50 p-1.5 rounded-md" },
      { name: "TailwindCSS", icon: Tailwind },
      { name: "DiscordJS", icon: DiscordJS },
      { name: "Redis", icon: Redis },
      { name: "Prisma", icon: Prisma, className: "bg-neutral-50 p-1.5 rounded-md" },
    ],
  },
  {
    id: 1,
    title: "Sellix Documentation",
    description:
        "The documentation website for Sellix.io. Contains detailed explanations on how to get started using their API and how to access features on their dashboard.",
    url: "https://docs.sellix.io",
    contentPosition: "l",
    icon: FiEye,
    tools: [
      { name: "Mintlify", icon: Mintlify, className: "rounded-md" },
    ],
  },
  {
    id: 1,
    title: "Chairstore",
    description:
        "Storefront for sellix video game mods. Uses sanity as a CMS allowing the merchant to update content on the website without needing to redeploy. Also utilizes Sellix API and embeds to dynamically display products/information and handle checkout process.",
    url: "https://chairstore.vip",
    contentPosition: "r",
    icon: FiEye,
    tools: [
      { name: "NextJS", icon: NextJS, className: "bg-neutral-50 p-1.5 rounded-md" },
      { name: "TailwindCSS", icon: Tailwind },
      { name: "Sanity", icon: Sanity, className: "rounded-md" },
    ],
  },
];