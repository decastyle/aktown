"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

import ConnectLogo   from "../assets/svg/connect.svg";
import BirAuylLogo   from "../assets/svg/birauyl.svg";
import TalksLogo     from "../assets/svg/talks.svg";
import JinalaiyqLogo from "../assets/svg/jinalaiyq.svg";
import OisalLogo     from "../assets/svg/1oisal.svg";
import UpcreateLogo  from "../assets/svg/upcreate.svg";
import UshuLogo      from "../assets/svg/ushu.svg";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Photo {
  src: string;
}

interface Stat {
  label: string;
  value: string;
}

interface Project {
  id: string;
  logo: string;
  logoScale?: number;       // grid cell logo size
  drawerLogoScale?: number; // drawer header logo size (independent)
  category: string;
  year: string;
  description: string;
  stats: Stat[];
  cover: string;
  photos: Photo[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: "connect", logo: ConnectLogo, logoScale: 1.4, drawerLogoScale: 1.8, category: "Медиа", year: "2022",
    description: "Медиа-платформа для молодёжи Актау. Интервью, репортажи и истории людей города.",
    stats: [{ label: "Лет", value: "3" }, { label: "Охват", value: "10 000" }, { label: "Выпусков", value: "24" }],
    cover: "https://picsum.photos/seed/c1cv/600/400",
    photos: Array.from({ length: 8 }, (_, i) => ({ src: `https://picsum.photos/seed/c1p${i}/900/600` })),
  },
  {
    id: "bir-auyl", logo: BirAuylLogo, logoScale: 1.2, drawerLogoScale: 1.0, category: "Мероприятия", year: "2021",
    description: "Фестиваль единства, объединяющий молодёжь разных районов через культуру и спорт.",
    stats: [{ label: "Лет", value: "4" }, { label: "Участников", value: "5 000" }, { label: "Изданий", value: "4" }],
    cover: "https://picsum.photos/seed/c2cv/600/400",
    photos: Array.from({ length: 6 }, (_, i) => ({ src: `https://picsum.photos/seed/c2p${i}/900/600` })),
  },
  {
    id: "talks", logo: TalksLogo, logoScale: 1.2, drawerLogoScale: 1.7, category: "Контент", year: "2023",
    description: "Открытые дискуссии с экспертами, предпринимателями и творческими личностями.",
    stats: [{ label: "Лет", value: "2" }, { label: "Охват", value: "8 000" }, { label: "Эпизодов", value: "12" }],
    cover: "https://picsum.photos/seed/c3cv/600/400",
    photos: Array.from({ length: 7 }, (_, i) => ({ src: `https://picsum.photos/seed/c3p${i}/900/600` })),
  },
  {
    id: "jinalaiyq", logo: JinalaiyqLogo, logoScale: 2.0, drawerLogoScale: 2.7, category: "Музыка", year: "2023",
    description: "Музыкальный проект, продвигающий локальных артистов и казахскую независимую сцену.",
    stats: [{ label: "Лет", value: "2" }, { label: "Охват", value: "15 000" }, { label: "Треков", value: "18" }],
    cover: "https://picsum.photos/seed/c4cv/600/400",
    photos: Array.from({ length: 9 }, (_, i) => ({ src: `https://picsum.photos/seed/c4p${i}/900/600` })),
  },
  {
    id: "1oisal", logo: OisalLogo, logoScale: 1.3, drawerLogoScale: 1.7, category: "Фестиваль", year: "2022",
    description: "Ежегодный городской фестиваль с музыкой, едой и арт-инсталляциями на набережной.",
    stats: [{ label: "Лет", value: "3" }, { label: "Гостей", value: "12 000" }, { label: "Артистов", value: "30" }],
    cover: "https://picsum.photos/seed/c5cv/600/400",
    photos: Array.from({ length: 5 }, (_, i) => ({ src: `https://picsum.photos/seed/c5p${i}/900/600` })),
  },
  {
    id: "upcreate", logo: UpcreateLogo, logoScale: 0.9, drawerLogoScale: 0.8, category: "Продакшн", year: "2024",
    description: "Внутренняя студия AKTOWN — звукозапись, видеосъёмка и постпродакшн.",
    stats: [{ label: "Лет", value: "1" }, { label: "Проектов", value: "40+" }, { label: "Студий", value: "2" }],
    cover: "https://picsum.photos/seed/c6cv/600/400",
    photos: Array.from({ length: 6 }, (_, i) => ({ src: `https://picsum.photos/seed/c6p${i}/900/600` })),
  },
  {
    id: "ushu", logo: UshuLogo, logoScale: 1.0, drawerLogoScale: 1.0, category: "Спорт", year: "2023",
    description: "Спортивный проект, развивающий ушу и боевые искусства среди молодёжи Актау.",
    stats: [{ label: "Лет", value: "2" }, { label: "Участников", value: "300" }, { label: "Турниров", value: "6" }],
    cover: "https://picsum.photos/seed/c7cv/600/400",
    photos: Array.from({ length: 7 }, (_, i) => ({ src: `https://picsum.photos/seed/c7p${i}/900/600` })),
  },
];

const COLS_DESKTOP = 4;
const COLS_MOBILE  = 2;

// ─── Icons ────────────────────────────────────────────────────────────────────

const CloseIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const ChevronIcon = ({ dir = "right" }: { dir?: "left" | "right" }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round"
    style={{ transform: dir === "left" ? "rotate(180deg)" : undefined }}>
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

// ─── Drawer ────────────────────────────────────────────────────────────────────

const Drawer = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);

  const prev = useCallback(() => setActiveIdx(i => (i - 1 + project.photos.length) % project.photos.length), [project.photos.length]);
  const next = useCallback(() => setActiveIdx(i => (i + 1) % project.photos.length), [project.photos.length]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  useEffect(() => { setImgLoaded(false); }, [activeIdx]);

  // Drawer logo uses drawerLogoScale to size the logo within its fixed-height section
  const drawerScale = project.drawerLogoScale ?? 1;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
      />

      <motion.div
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 340, damping: 38 }}
        className="fixed top-0 right-0 bottom-0 z-50 flex flex-col bg-background overflow-y-auto overflow-x-hidden"
        style={{ width: "min(80vg, 100vw)", boxShadow: "-4px 0 40px rgba(0,0,0,0.4)" }}
      >
        {/* Header */}
        <div style={{ height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1.25rem", borderBottom: "1px solid rgba(255,255,255,0.1)", flexShrink: 0, position: "sticky", top: 0, background: "hsl(var(--background))", zIndex: 10 }}>
          <motion.img
            src={project.logo}
            alt={project.id}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              height: `${Math.round(28 * drawerScale)}px`,
              width: "auto",
              maxWidth: "75%",
              objectFit: "contain",
              display: "block",
            }}
          />
          <button onClick={onClose} style={{ width: 32, height: 32, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", cursor: "pointer", color: "inherit" }}>
            <CloseIcon />
          </button>
        </div>

        {/* Cover */}
        <div className="flex-shrink-0 h-48 overflow-hidden bg-muted">
          <img src={project.cover} alt="" className="w-full h-full object-cover block" />
        </div>

        {/* Info */}
        <div className="px-5 pt-5">
          {/* Pills */}
          <div className="flex gap-2 mb-3">
            {[project.category, project.year].map(t => (
              <span key={t} className="font-[Kinetika] text-[0.62rem] tracking-[0.1em] uppercase text-muted-foreground bg-muted px-2 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="font-[Kinetika] text-sm text-muted-foreground leading-relaxed mb-5">
            {project.description}
          </p>

          {/* Stats */}
          <div className="flex border-t border-b border-border mb-5">
            {project.stats.map((stat, i) => (
              <div key={stat.label} className={`flex-1 py-4 text-center ${i < project.stats.length - 1 ? "border-r border-border" : ""}`}>
                <div className="font-[Kinetika] text-2xl font-medium leading-none tabular-nums mb-1">{stat.value}</div>
                <div className="font-[Kinetika] text-[0.58rem] tracking-[0.1em] uppercase text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div className="px-5 pb-6">
          <p className="font-[Kinetika] text-[0.62rem] tracking-[0.12em] uppercase text-muted-foreground mb-3">
            Фотографии
          </p>

          {/* Main viewer */}
          <div className="relative rounded-lg overflow-hidden bg-muted mb-2" style={{ aspectRatio: "3/2" }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIdx}
                src={project.photos[activeIdx].src}
                onLoad={() => setImgLoaded(true)}
                initial={{ opacity: 0 }} animate={{ opacity: imgLoaded ? 1 : 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="w-full h-full object-cover block"
              />
            </AnimatePresence>

            {(["left", "right"] as const).map(dir => (
              <button key={dir} onClick={dir === "left" ? prev : next}
                className={`absolute top-1/2 -translate-y-1/2 ${dir === "left" ? "left-2" : "right-2"} w-8 h-8 rounded-full border-0 bg-background/80 backdrop-blur-sm flex items-center justify-center cursor-pointer text-foreground shadow-md`}>
                <ChevronIcon dir={dir} />
              </button>
            ))}

            <span className="absolute bottom-2 right-3 font-[Kinetika] text-[0.6rem] tracking-widest text-white/50 tabular-nums">
              {String(activeIdx + 1).padStart(2, "0")} / {String(project.photos.length).padStart(2, "0")}
            </span>
          </div>

          {/* Filmstrip */}
          <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {project.photos.map((photo, i) => (
              <motion.button key={i} onClick={() => setActiveIdx(i)}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                className={`flex-shrink-0 w-14 h-10 rounded overflow-hidden cursor-pointer border-0 p-0 ${i === activeIdx ? "outline outline-2 outline-offset-2 outline-foreground/70" : ""}`}>
                <img src={photo.src} className="w-full h-full object-cover"
                  style={{ opacity: i === activeIdx ? 1 : 0.3, transition: "opacity 0.12s" }} />
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

// ─── Logo Cell ─────────────────────────────────────────────────────────────────
//
// BASE_LOGO_SIZE: how much of the cell the logo occupies at logoScale=1.
// logoScale in PROJECTS multiplies this. 1.5 = 50% bigger than base.
const BASE_LOGO_SIZE = 0.55; // 55% of cell dimensions

const LogoCell = ({
  project, colIndex, rowIndex, totalRows, cols, onOpen,
}: {
  project: Project; colIndex: number; rowIndex: number;
  totalRows: number; cols: number; onOpen: () => void;
}) => {
  const [hovered, setHovered] = useState(false);
  const scale = project.logoScale ?? 1;
  const logoSize = `${Math.min(BASE_LOGO_SIZE * scale * 100, 90)}%`;

  return (
    <button
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        aspectRatio: "4 / 3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: hovered ? "rgba(255,255,255,0.06)" : "transparent",
        borderRight:  colIndex < cols - 1       ? "1px solid rgba(255,255,255,0.1)" : "none",
        borderBottom: rowIndex < totalRows - 1  ? "1px solid rgba(255,255,255,0.1)" : "none",
        borderTop: "none",
        borderLeft: "none",
        cursor: "pointer",
        padding: 0,
        margin: 0,
        outline: "none",
        transition: "background 0.15s ease",
      }}
    >
      <img
        src={project.logo}
        alt={project.id}
        style={{
          width: logoSize,
          height: logoSize,
          objectFit: "contain",
          display: "block",
          pointerEvents: "none",
        }}
      />
    </button>
  );
};

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function ProjectsGallery() {
  const [active, setActive] = useState<Project | null>(null);
  const [cols, setCols] = useState(COLS_DESKTOP);

  useEffect(() => {
    const update = () => setCols(window.innerWidth < 640 ? COLS_MOBILE : COLS_DESKTOP);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const totalRows = Math.ceil(PROJECTS.length / cols);

  return (
    <div className="w-full bg-background">
      <div className="container mx-auto">
        <div className="flex gap-8 py-8 lg:py-16 items-center justify-center flex-col">

          <div className="flex gap-4 flex-col px-4 items-center w-full max-w-5xl">
            <h2 className="text-3xl md:text-6xl font-regular font-[Kinetika] text-center">
              Наши проекты
            </h2>
          </div>

          {/* Grid — no outer border, only inner separators */}
          <div className="w-full px-4 max-w-5xl">
            <div
              className="w-full"
              style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)` }}
            >
              {PROJECTS.map((project, i) => {
                const colIndex = i % cols;
                const rowIndex = Math.floor(i / cols);
                return (
                  <LogoCell
                    key={project.id}
                    project={project}
                    colIndex={colIndex}
                    rowIndex={rowIndex}
                    totalRows={totalRows}
                    cols={cols}
                    onOpen={() => setActive(project)}
                  />
                );
              })}
            </div>
          </div>

        </div>
      </div>

      <AnimatePresence>
        {active && <Drawer project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </div>
  );
}