import { useEffect, useState, memo } from "react";
import { motion } from "framer-motion";

import AktownLogo from "../assets/svg/aktown.svg";
import AktownTeam from "../assets/aktown-team.png";

import ConnectBg from "../assets/connect-bg.png";
import ConnectLogo from "../assets/svg/connect.svg";

import BirAuylLogo from "../assets/birauyl-logo.png";
import BirAuylBg from "../assets/talks-bg.png";

import TalksLogo from "../assets/svg/talks.svg";
import TalksBg from "../assets/talks-bg.png";

import JinalaiyqLogo from "../assets/svg/jinalaiyq.svg";
import JinalaiyqBg from "../assets/jinalaiyq-bg.png";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Project {
  id: string;
  logo: string;
  bgImage: string;
  scale?: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  { id: "connect",     logo: ConnectLogo,   bgImage: ConnectBg,   scale: 1.0 },
  { id: "bir-auyl",   logo: BirAuylLogo,   bgImage: BirAuylBg,   scale: 1.5 },
  { id: "talks",      logo: TalksLogo,     bgImage: TalksBg,      scale: 0.9 },
  { id: "zhinalaiyk", logo: JinalaiyqLogo, bgImage: JinalaiyqBg,  scale: 1.5 },
];

const INTERVAL_MS        = 2000;
const FADE_DURATION      = 0.5;
const BASE_WIDTH_MOBILE  = 150;
const BASE_WIDTH_DESKTOP = 240;
const BASE_WIDTH_LG      = 360;

const shadowClasses   = "drop-shadow-md drop-shadow-[0_0_20px_rgba(0,0,0,0.1)]";
const textShadowStyle = "0 4px 8px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.1), 0 0 20px rgba(0,0,0,0.1)";

// ─── Static sub-components ────────────────────────────────────────────────────

const AktownSection = memo(() => (
  <div className="absolute top-0 left-0 right-0 h-1/2 md:right-1/2 md:h-full md:w-1/2">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${AktownTeam})` }}
    />
  </div>
));
AktownSection.displayName = "AktownSection";

const XIcon = memo(({ className }: { className: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
));
XIcon.displayName = "XIcon";

const AktownBrand = memo(({ mobile }: { mobile: boolean }) =>
  mobile ? (
    <div className="flex-1 flex items-center justify-center px-4">
      <div className="flex items-center justify-center">
        <img src={AktownLogo} className={`w-10 h-10 mr-2 ${shadowClasses}`} alt="Aktown Logo" />
        <span
          className="font-[Kinetika] text-4xl text-white whitespace-nowrap"
          style={{ textShadow: textShadowStyle, transform: "translateY(-2px)" }}
        >
          AKTOWN
        </span>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-end w-[280px] lg:w-[420px]">
      <img src={AktownLogo} className={`w-12 h-12 lg:w-32 lg:h-32 mr-3 lg:mr-4 ${shadowClasses}`} alt="Aktown Logo" />
      <span
        className="font-[Kinetika] text-5xl lg:text-7xl text-white whitespace-nowrap"
        style={{ textShadow: textShadowStyle, transform: "translateY(-2px)" }}
      >
        AKTOWN
      </span>
    </div>
  )
);
AktownBrand.displayName = "AktownBrand";

// ─── Project backgrounds ──────────────────────────────────────────────────────
// Sequential cross-fade: incoming fades in fully first (z-index 2),
// outgoing snaps to opacity 0 only after incoming is done (delay = FADE_DURATION).
// At no point are both slides semi-transparent simultaneously.

const ProjectBackgrounds = memo(({ currentIndex }: { currentIndex: number }) => (
  <div className="absolute top-1/2 left-0 right-0 bottom-0 md:left-1/2 md:top-0 md:h-full md:w-1/2">
    {PROJECTS.map((project, index) => {
      const isActive = currentIndex === index;
      return (
        <motion.div
          key={project.id}
          className="absolute inset-0"
          initial={false}
          animate={{
            opacity: isActive ? 1 : 0,
            zIndex: isActive ? 2 : 1,
          }}
          transition={
            isActive
              ? {
                  // Incoming: fade in over FADE_DURATION, z-index jumps immediately
                  opacity: { duration: FADE_DURATION, ease: "easeInOut" },
                  zIndex:  { delay: 0, duration: 0 },
                }
              : {
                  // Outgoing: wait for incoming to finish, then snap invisible
                  opacity: { delay: FADE_DURATION, duration: 0 },
                  zIndex:  { delay: FADE_DURATION, duration: 0 },
                }
          }
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${project.bgImage})` }}
          />
        </motion.div>
      );
    })}
  </div>
));
ProjectBackgrounds.displayName = "ProjectBackgrounds";

// ─── Project logos ────────────────────────────────────────────────────────────

const ProjectLogos = memo(({ currentIndex, mobile }: { currentIndex: number; mobile: boolean }) => (
  <div className={mobile
    ? "flex-1 flex items-center justify-center px-4 overflow-hidden"
    : "w-[280px] lg:w-[420px] flex items-center justify-start"
  }>
    <div className={mobile
      ? "relative w-full h-[120px] flex items-center justify-center"
      : "relative w-full h-[80px] lg:h-[160px] flex items-center justify-start overflow-hidden"
    }>
      {PROJECTS.map((project, index) => {
        const isActive  = currentIndex === index;
        const prevIndex = (currentIndex - 1 + PROJECTS.length) % PROJECTS.length;
        const wasPrev   = prevIndex === index;

        const s     = project.scale ?? 1;
        const wBase = mobile ? BASE_WIDTH_MOBILE : BASE_WIDTH_DESKTOP;
        const wLg   = BASE_WIDTH_LG * s;
        const width = wBase * s;

        return (
          <motion.div
            key={project.id}
            className={`absolute inset-0 flex items-center ${mobile ? "justify-center" : "justify-start"}`}
            initial={{ opacity: 0, y: 150 }}
            animate={
              isActive ? { y: 0,    opacity: 1 } :
              wasPrev  ? { y: -150, opacity: 0 } :
                         { y: 150,  opacity: 0 }
            }
            transition={{ type: "spring", stiffness: 50, damping: 15 }}
          >
            <img
              src={project.logo}
              alt={project.id}
              style={{ width: `${width}px`, ...(!mobile && { maxWidth: `${wLg}px` }) }}
              className={`object-contain ${shadowClasses}`}
            />
          </motion.div>
        );
      })}
    </div>
  </div>
));
ProjectLogos.displayName = "ProjectLogos";

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full h-[60vh] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <AktownSection />
        <ProjectBackgrounds currentIndex={currentIndex} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full">

        {/* Mobile */}
        <div className="md:hidden h-full flex flex-col">
          <AktownBrand mobile />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <XIcon className={`w-10 h-10 text-white stroke-[2.5] ${shadowClasses}`} />
          </div>
          <ProjectLogos currentIndex={currentIndex} mobile />
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center justify-center h-full px-8">
          <div className="flex items-center justify-center gap-0 w-full max-w-7xl">
            <AktownBrand mobile={false} />
            <XIcon className={`w-12 h-12 flex-shrink-0 mx-6 lg:mx-10 text-white stroke-[2.5] ${shadowClasses}`} />
            <ProjectLogos currentIndex={currentIndex} mobile={false} />
          </div>
        </div>

      </div>
    </div>
  );
}