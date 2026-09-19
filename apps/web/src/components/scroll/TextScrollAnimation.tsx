"use client";

/**
 * Adapted from "Skiper 31 — ScrollAnimation_002" by Skiper UI
 * (https://skiper-ui.com), created by Gurvinder Singh (@gurvinder-singh02,
 * https://gxuri.me). Used under Skiper UI's free-tier license, which
 * requires this attribution.
 */

import { useRef } from "react";
import { useScroll } from "framer-motion";
import { ReactLenis } from "lenis/react";
import {
  SiDiscord,
  SiFigma,
  SiFramer,
  SiGithub,
  SiMongodb,
  SiNotion,
  SiPostman,
  SiVercel,
  SiLinear,
} from "@icons-pack/react-simple-icons";
import { CharacterV1 } from "./CharacterV1";
import { CharacterV2 } from "./CharacterV2";
import { CharacterV3 } from "./CharacterV3";

const icons = [
  SiDiscord,
  SiFigma,
  SiFramer,
  SiGithub,
  SiMongodb,
  SiNotion,
  SiPostman,
  SiVercel,
  SiLinear,
];
const iconCenterIndex = Math.floor(icons.length / 2);

function Bracket({ className = "" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 27 78" className={className}>
      <path
        fill="currentColor"
        d="M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z"
      />
    </svg>
  );
}

export default function TextScrollAnimation() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const targetRef2 = useRef<HTMLDivElement | null>(null);
  const targetRef3 = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({ target: targetRef });
  const { scrollYProgress: scrollYProgress2 } = useScroll({ target: targetRef2 });
  const { scrollYProgress: scrollYProgress3 } = useScroll({ target: targetRef3 });

  const text = "gotlui scroll";
  const characters = text.split("");
  const centerIndex = Math.floor(characters.length / 2);

  return (
    <ReactLenis root>
      <main className="w-full bg-black">
        <div className="sticky top-10 z-10 flex justify-center">
          <span className="text-xs uppercase tracking-wide text-zinc-500">
            Scroll to see more
          </span>
        </div>

        <div
          ref={targetRef}
          className="relative box-border flex h-[210vh] items-center justify-center overflow-hidden bg-black p-[2vw]"
        >
          <div
            className="w-full max-w-4xl text-center text-6xl font-bold uppercase tracking-tighter"
            style={{ perspective: "500px" }}
          >
            {characters.map((char, index) => (
              <CharacterV1
                key={index}
                char={char}
                index={index}
                centerIndex={centerIndex}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        <div
          ref={targetRef2}
          className="relative -mt-[100vh] box-border flex h-[210vh] flex-col items-center justify-center gap-[2vw] overflow-hidden bg-black p-[2vw]"
        >
          <p className="flex items-center justify-center gap-3 text-2xl font-medium tracking-tight text-white">
            <Bracket className="h-12 text-white" />
            <span>integrate with your fav tech stack</span>
            <Bracket className="h-12 scale-x-[-1] text-white" />
          </p>
          <div className="flex w-full max-w-4xl flex-wrap items-center justify-center gap-6">
            {icons.map((Icon, index) => (
              <CharacterV2
                key={index}
                Icon={Icon}
                index={index}
                centerIndex={iconCenterIndex}
                scrollYProgress={scrollYProgress2}
              />
            ))}
          </div>
        </div>

        <div
          ref={targetRef3}
          className="relative -mt-[95vh] box-border flex h-[210vh] flex-col items-center justify-center gap-[2vw] overflow-hidden bg-black p-[2vw]"
        >
          <p className="flex items-center justify-center gap-3 text-2xl font-medium tracking-tight text-white">
            <Bracket className="h-12 text-white" />
            <span>integrate with your fav tech stack</span>
            <Bracket className="h-12 scale-x-[-1] text-white" />
          </p>
          <div
            className="flex w-full max-w-4xl flex-wrap items-center justify-center gap-6"
            style={{ perspective: "500px" }}
          >
            {icons.map((Icon, index) => (
              <CharacterV3
                key={index}
                Icon={Icon}
                index={index}
                centerIndex={iconCenterIndex}
                scrollYProgress={scrollYProgress3}
              />
            ))}
          </div>
        </div>
      </main>
    </ReactLenis>
  );
}
