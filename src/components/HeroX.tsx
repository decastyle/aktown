import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Logo from "../assets/Logo_Aktown.png";

import AktownBg from "../assets/AKTOWN_BG.png";
import ConnectBg from "../assets/CONNECT_BG.png";
import BirAuylBg from "../assets/BIRAUYL_BG.jpg";
import TalksBg from "../assets/TALKS_BG.png";

import ZhinalaiykBg from "../assets/ZHINALAIYK_BG.png"

import BirAuylLogo from "../assets/BIRAUYL_LOGO.png";
import BirAuylBGVideo from "../assets/BIRAUYL_LOOP.webm";
import ConnectLogo from "../assets/CONNECT_LOGO.png";
import TalksLogo from "../assets/TALKS_LOGO.png";

import ZhinalaiykLogo from "../assets/ZHINALAIYK_LOGO.png"

const PROJECTS = [
  { id: "connect", logo: ConnectLogo, bgImage: ConnectBg, bgVideo: null },
  {
    id: "bir-auyl",
    logo: BirAuylLogo,
    bgImage: BirAuylBg,
    bgVideo: BirAuylBGVideo,
  },
  { id: "talks", logo: TalksLogo, bgImage: TalksBg, bgVideo: null },
  { id: "zhinalaiyk", logo: ZhinalaiykLogo, bgImage: ZhinalaiykBg, bgVideo: null},
];

const FADE_DURATION = 0.5;

// Consistent shadow styles - cleaner and reusable
const shadowClasses = "drop-shadow-md drop-shadow-sm drop-shadow-[0_0_20px_rgba(0,0,0,0.1)]";
const textShadowStyle = "0 4px 8px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.1), 0 0 20px rgba(0,0,0,0.1)";

export default function Hero5() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [currentIndex]);

  return (
    <div className="w-full h-[60vh] relative overflow-hidden">
      <div className="absolute inset-0">
        {/* Aktown Section - Top half on mobile, Left half on desktop */}
        <div className="absolute top-0 left-0 right-0 h-1/2 md:right-1/2 md:h-full md:w-1/2">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${AktownBg})` }}
          >
            <div className="absolute inset-0" />
          </div>
        </div>

        {/* Projects Section - Bottom half on mobile, Right half on desktop */}
        <div className="absolute top-1/2 left-0 right-0 bottom-0 md:left-1/2 md:top-0 md:h-full md:w-1/2">
          {/* Shared overlay */}
          <div className="absolute inset-0 z-10" />

          {/* Render all backgrounds, control visibility with opacity */}
          {PROJECTS.map((project, index) => {
            const isActive = currentIndex === index;

            return (
              <motion.div
                key={project.id}
                className="absolute inset-0"
                style={{ willChange: "opacity" }}
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  zIndex: isActive ? 2 : 1,
                }}
                transition={{ duration: FADE_DURATION, ease: "easeInOut" }}
              >
                {project.bgVideo ? (
                  <video
                    className="absolute inset-0 w-full h-full object-cover transform translate-z-0"
                    src={project.bgVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <div
                    className="absolute inset-0 bg-cover bg-center transform translate-z-0"
                    style={{ backgroundImage: `url(${project.bgImage})` }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full h-full">
        {/* Mobile Layout - Stacked vertically with X at boundary */}
        <div className="md:hidden h-full flex flex-col">
          {/* Top Section - Aktown */}
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="flex items-center justify-center">
              <img
                src={Logo}
                className={`w-10 h-10 mr-2 ${shadowClasses}`}
                alt="Aktown Logo"
              />
              <span
                className="font-[Kinetika] text-4xl text-white whitespace-nowrap"
                style={{ textShadow: textShadowStyle }}
              >
                AKTOWN
              </span>
            </div>
          </div>

          {/* X Symbol - At the boundary */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <svg
              className={`w-8 h-8 text-white ${shadowClasses}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>

          {/* Bottom Section - Project Logos with mask */}
          <div className="flex-1 flex items-center justify-center px-4 overflow-hidden">
            <div className="relative w-full h-[72px] flex items-center justify-center">
              {PROJECTS.map((project, index) => {
                const isActive = currentIndex === index;
                const wasPrev = currentIndex === (index + 1) % PROJECTS.length;

                return (
                  <motion.div
                    key={project.id}
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, y: 150 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 50,
                      damping: 15
                    }}
                    animate={
                      isActive
                        ? { y: 0, opacity: 1 }
                        : wasPrev
                          ? { y: -150, opacity: 0 }
                          : { y: 150, opacity: 0 }
                    }
                  >
                    <img
                      src={project.logo}
                      alt={project.id}
                      className={`h-[60px] w-auto object-contain ${shadowClasses} ${
                        project.id === "connect" ? "scale-[1.3]" : ""
                      }`}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Desktop Layout - Side by side */}
        <div className="hidden md:flex items-center justify-center h-full px-8">
          <div className="flex items-center justify-center gap-0 w-full max-w-7xl">
            {/* Aktown Logo + Text */}
            <div className="flex items-center justify-end w-[280px] lg:w-[420px]">
              <img
                src={Logo}
                className={`w-12 h-12 lg:w-32 lg:h-32 mr-3 lg:mr-4 ${shadowClasses}`}
                alt="Aktown Logo"
              />
              <span
                className="font-[Kinetika] text-5xl lg:text-7xl text-white whitespace-nowrap"
                style={{ textShadow: textShadowStyle }}
              >
                AKTOWN
              </span>
            </div>

            {/* X Symbol */}
            <svg
              className={`w-10 h-10 lg:w-16 lg:h-16 flex-shrink-0 mx-6 lg:mx-10 text-white ${shadowClasses}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>

            {/* Project Logos */}
            <div className="w-[280px] lg:w-[420px] flex items-center justify-start">
              <div className="relative w-full h-[70px] lg:h-[140px] flex items-center justify-start overflow-hidden">
                {PROJECTS.map((project, index) => {
                  const isActive = currentIndex === index;
                  const wasPrev = currentIndex === (index + 1) % PROJECTS.length;

                  return (
                    <motion.div
                      key={project.id}
                      className="absolute inset-0 flex items-center justify-start"
                      initial={{ opacity: 0, y: 150 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 50,
                        damping: 15
                      }}
                      animate={
                        isActive
                          ? { y: 0, opacity: 1 }
                          : wasPrev
                            ? { y: -150, opacity: 0 }
                            : { y: 150, opacity: 0 }
                      }
                    >
                      <img
                        src={project.logo}
                        alt={project.id}
                        className={`h-[70px] lg:h-[126px] w-auto object-contain ${shadowClasses} ${
                          project.id === "connect" ? "scale-[1.3]" : ""
                        }`}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}