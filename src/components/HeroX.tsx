import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Logo from "../assets/Logo_Aktown.png";

import AktownBg from "../assets/AKTOWN_BG.png";
import ConnectBg from "../assets/CONNECT_BG.jpg";
import BirAuylBg from "../assets/BIRAUYL_BG.jpg";
import TalksBg from "../assets/TALKS_BG.png";

const PROJECTS = [
  { id: "connect", title: "Connect", bgImage: ConnectBg },
  { id: "bir-auyl", title: "Bir Auyl", bgImage: BirAuylBg },
  { id: "talks", title: "Talks", bgImage: TalksBg },
];

const FADE_DURATION = 0.5;

export default function Hero5() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
    }, 2000);
    
    return () => clearTimeout(timeoutId);
  }, [currentIndex]);

  return (
    <div className="w-full h-[75vh] relative overflow-hidden">
      <div className="absolute inset-0">
        {/* Left Half - Aktown (Static) */}
        <div className="absolute top-0 left-0 bottom-0 w-1/2">gg
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${AktownBg})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </div>

        {/* Right Half - Projects (Dynamic) */}
        <div className="absolute top-0 right-0 bottom-0 w-1/2">
          {/* Shared overlay - SINGLE layer on top of both images */}
          <div className="absolute inset-0 bg-black/40 z-10" />
          
          {/* Previous/Base Layer - stays visible, never animates */}
          {prevIndex !== null && (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${PROJECTS[prevIndex].bgImage})` }}
            />
          )}

          {/* Current Layer - fades in on top */}
          <motion.div
            key={currentIndex}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${PROJECTS[currentIndex].bgImage})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: FADE_DURATION, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div className="flex flex-row items-center justify-center">
          <div className="flex items-center justify-end w-[280px] md:w-[420px]">
            <img
              src={Logo}
              className="w-10 h-10 md:w-32 md:h-32 mr-2 md:mr-3 drop-shadow-2xl"
              alt="Aktown Logo"
            />
            <span className="font-[Kinetika] text-5xl md:text-7xl text-white drop-shadow-2xl">
              AKTOWN
            </span>
          </div>

          <svg
            className="w-12 h-12 md:w-20 md:h-20 flex-shrink-0 mx-4 md:mx-8 text-white drop-shadow-2xl"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <line x1="24" y1="0" x2="0" y2="24" />
            <line x1="0" y1="0" x2="24" y2="24" />
          </svg>

          <div className="w-[280px] md:w-[420px] flex items-center">
            <span className="relative inline-flex items-center overflow-hidden h-[60px] md:h-[100px] w-full">
              <span className="invisible font-[Kinetika] text-5xl md:text-7xl">
                Connect
              </span>
              {PROJECTS.map((project, index) => {
                const isActive = currentIndex === index;
                const wasPrev = currentIndex === (index + 1) % PROJECTS.length;

                return (
                  <motion.span
                    key={project.id}
                    className="absolute left-0 text-5xl md:text-7xl font-[Kinetika] text-white drop-shadow-2xl"
                    initial={{ opacity: 0, y: 150 }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      isActive
                        ? { y: 0, opacity: 1 }
                        : wasPrev
                        ? { y: -150, opacity: 0 }
                        : { y: 150, opacity: 0 }
                    }
                  >
                    {project.title}
                  </motion.span>
                );
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}