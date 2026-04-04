"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

import { useNavigate } from "@tanstack/react-router";

import { cn } from "@/lib/utils";
import { useLang } from "../i18n";

import ConnectLogo   from "../assets/svg/connect.svg";
import BirAuylLogo   from "../assets/svg/birauyl.svg";
import TalksLogo     from "../assets/svg/talks.svg";
import JinalaiyqLogo from "../assets/svg/jinalaiyq.svg";
import OisalLogo     from "../assets/svg/1oisal.svg";
import UpcreateLogo  from "../assets/svg/upcreate.svg";
import UshuLogo      from "../assets/svg/ushu.svg";

const PLACEHOLDER_COVER = "/placeholders/cover.jpg";
const PLACEHOLDER_GALLERY = "/placeholders/gallery.jpg";

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
  logoScale?: number;
  drawerLogoScale?: number;
  category: string;
  year: string;
  description: string;
  stats: Stat[];
  cover: string;
  photos: Photo[];
}

const PROJECTS: Project[] = [
  {
    id: "connect", logo: ConnectLogo, logoScale: 1.4, drawerLogoScale: 1.8, category: "Медиа", year: "2022",
    description: "Медиа-платформа для молодёжи Актау. Интервью, репортажи и истории людей города.",
    stats: [{ label: "Лет", value: "3" }, { label: "Охват", value: "10 000" }, { label: "Выпусков", value: "24" }],
    cover: PLACEHOLDER_COVER,
    photos: Array.from({ length: 8 }, () => ({ src: PLACEHOLDER_GALLERY })),
  },
  {
    id: "bir-auyl", logo: BirAuylLogo, logoScale: 1.2, drawerLogoScale: 1.0, category: "Игра", year: "2021",
    description:
      "Настольная карточная игра о единстве и стратегии: объединяй, планируй победу вместе с аулом.",
    stats: [{ label: "Лет", value: "4" }, { label: "Участников", value: "5 000" }, { label: "Изданий", value: "4" }],
    cover: PLACEHOLDER_COVER,
    photos: Array.from({ length: 6 }, () => ({ src: PLACEHOLDER_GALLERY })),
  },
  {
    id: "talks", logo: TalksLogo, logoScale: 1.2, drawerLogoScale: 1.7, category: "Контент", year: "2023",
    description: "Открытые дискуссии с экспертами, предпринимателями и творческими личностями.",
    stats: [{ label: "Лет", value: "2" }, { label: "Охват", value: "8 000" }, { label: "Эпизодов", value: "12" }],
    cover: PLACEHOLDER_COVER,
    photos: Array.from({ length: 7 }, () => ({ src: PLACEHOLDER_GALLERY })),
  },
  {
    id: "jinalaiyq", logo: JinalaiyqLogo, logoScale: 2.0, drawerLogoScale: 2.7, category: "Музыка", year: "2023",
    description: "Музыкальный проект, продвигающий локальных артистов и казахскую независимую сцену.",
    stats: [{ label: "Лет", value: "2" }, { label: "Охват", value: "15 000" }, { label: "Треков", value: "18" }],
    cover: PLACEHOLDER_COVER,
    photos: Array.from({ length: 9 }, () => ({ src: PLACEHOLDER_GALLERY })),
  },
  {
    id: "1oisal", logo: OisalLogo, logoScale: 1.3, drawerLogoScale: 1.7, category: "Фестиваль", year: "2022",
    description: "Ежегодный городской фестиваль с музыкой, едой и арт-инсталляциями на набережной.",
    stats: [{ label: "Лет", value: "3" }, { label: "Гостей", value: "12 000" }, { label: "Артистов", value: "30" }],
    cover: PLACEHOLDER_COVER,
    photos: Array.from({ length: 5 }, () => ({ src: PLACEHOLDER_GALLERY })),
  },
  {
    id: "upcreate", logo: UpcreateLogo, logoScale: 0.9, drawerLogoScale: 0.8, category: "Продакшн", year: "2024",
    description: "Внутренняя студия AKTOWN — звукозапись, видеосъёмка и постпродакшн.",
    stats: [{ label: "Лет", value: "1" }, { label: "Проектов", value: "40+" }, { label: "Студий", value: "2" }],
    cover: PLACEHOLDER_COVER,
    photos: Array.from({ length: 6 }, () => ({ src: PLACEHOLDER_GALLERY })),
  },
  {
    id: "ushu", logo: UshuLogo, logoScale: 1.0, drawerLogoScale: 1.0, category: "Спорт", year: "2023",
    description: "Спортивный проект, развивающий ушу и боевые искусства среди молодёжи Актау.",
    stats: [{ label: "Лет", value: "2" }, { label: "Участников", value: "300" }, { label: "Турниров", value: "6" }],
    cover: PLACEHOLDER_COVER,
    photos: Array.from({ length: 7 }, () => ({ src: PLACEHOLDER_GALLERY })),
  },
];

const COLS_DESKTOP = 4;
const COLS_MOBILE  = 2;

const COLOR_LOGO_IDS = new Set<string>(["talks", "jinalaiyq"]);

function projectLogoClass(id: string) {
  if (COLOR_LOGO_IDS.has(id)) {
    return "drop-shadow-[0_1px_3px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_2px_16px_rgba(0,0,0,0.55)]";
  }
  return "brightness-0 dark:filter-none";
}

const CloseIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const ChevronIcon = ({ dir = "right" }: { dir?: "left" | "right" }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={dir === "left" ? "rotate-180" : undefined}
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const Drawer = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const { tr } = useLang();
  const [activeIdx, setActiveIdx] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);

  const prev = useCallback(() => setActiveIdx(i => (i - 1 + project.photos.length) % project.photos.length), [project.photos.length]);
  const next = useCallback(() => setActiveIdx(i => (i + 1) % project.photos.length), [project.photos.length]);

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

  const drawerScale = project.drawerLogoScale ?? 1;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px]"
      />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 380, damping: 40 }}
        className={cn(
          "fixed top-0 right-0 bottom-0 z-50 flex w-full max-w-full flex-col overflow-y-auto overflow-x-hidden border-l border-border/60 bg-background",
          "shadow-[-6px_0_24px_rgba(0,0,0,0.06)] dark:shadow-[-8px_0_36px_rgba(0,0,0,0.45)]",
          "sm:max-w-[min(22rem,calc(100vw-1.5rem))] md:max-w-[min(24rem,calc(100vw-2rem))] lg:max-w-[min(26rem,36vw)]",
        )}
      >
        <div className="sticky top-0 z-10 flex h-11 shrink-0 items-center justify-between gap-3 border-b border-border bg-background/90 px-4 backdrop-blur-md supports-[backdrop-filter]:bg-background/75">
          <motion.img
            src={project.logo}
            alt={project.id}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "block w-auto max-w-[68%] object-contain",
              projectLogoClass(project.id),
            )}
            style={{ height: `${Math.round(22 * drawerScale)}px` }}
          />
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border/80 bg-muted/30 text-foreground transition-colors hover:bg-muted"
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="h-32 shrink-0 overflow-hidden bg-muted sm:h-36">
          <img src={project.cover} alt="" className="block h-full w-full object-cover" />
        </div>

        <div className="px-4 pt-3.5">
          <div className="mb-2 flex flex-wrap gap-1.5">
            {[project.category, project.year].map((t) => (
              <span
                key={t}
                className="rounded-full bg-muted px-2 py-0.5 text-[0.58rem] uppercase tracking-[0.12em] text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>

          <p className="mb-3 text-xs leading-relaxed text-muted-foreground sm:text-[0.8125rem]">
            {project.description}
          </p>

          <div className="mb-4 flex border-y border-border py-2">
            {project.stats.map((stat, i) => (
              <div
                key={stat.label}
                className={cn(
                  "min-w-0 flex-1 px-1 text-center",
                  i < project.stats.length - 1 && "border-r border-border",
                )}
              >
                <div className="text-base font-semibold tabular-nums leading-tight sm:text-lg">
                  {stat.value}
                </div>
                <div className="mt-0.5 text-[0.5rem] uppercase leading-tight tracking-[0.08em] text-muted-foreground sm:text-[0.55rem]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col px-4 pb-5">
          <p className="mb-2 text-[0.58rem] uppercase tracking-[0.14em] text-muted-foreground">
            {tr.projects.photos}
          </p>

          <div className="relative mb-2 h-36 w-full overflow-hidden rounded-lg bg-muted ring-1 ring-border/40 sm:h-40">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIdx}
                src={project.photos[activeIdx].src}
                onLoad={() => setImgLoaded(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: imgLoaded ? 1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>

            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/55 to-transparent"
              aria-hidden
            />

            {(["left", "right"] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={dir === "left" ? prev : next}
                className={cn(
                  "absolute top-1/2 flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-0 bg-background/85 text-foreground shadow-sm backdrop-blur-sm",
                  dir === "left" ? "left-1.5" : "right-1.5",
                )}
              >
                <ChevronIcon dir={dir} />
              </button>
            ))}

            <span className="absolute bottom-2 right-2.5 text-[0.55rem] tabular-nums tracking-widest text-white/90 drop-shadow-sm">
              {String(activeIdx + 1).padStart(2, "0")} /{" "}
              {String(project.photos.length).padStart(2, "0")}
            </span>
          </div>

          <div
            className="flex gap-1 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {project.photos.map((photo, i) => (
              <motion.button
                key={i}
                type="button"
                onClick={() => setActiveIdx(i)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  "h-8 w-11 shrink-0 cursor-pointer overflow-hidden rounded border-0 p-0",
                  i === activeIdx
                    ? "ring-2 ring-foreground/50 ring-offset-1 ring-offset-background"
                    : "opacity-50 hover:opacity-80",
                )}
              >
                <img
                  src={photo.src}
                  alt=""
                  className="h-full w-full object-cover transition-opacity duration-150"
                />
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

const BASE_LOGO_SIZE = 0.55;

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
      type="button"
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "flex aspect-[4/3] cursor-pointer items-center justify-center border-0 bg-transparent p-0 outline-none transition-colors",
        hovered && "bg-muted/50 dark:bg-white/[0.06]",
        colIndex < cols - 1 && "border-r border-border/70",
        rowIndex < totalRows - 1 && "border-b border-border/70",
      )}
    >
      <img
        src={project.logo}
        alt={project.id}
        className={cn(
          "pointer-events-none block object-contain",
          projectLogoClass(project.id),
        )}
        style={{
          width: logoSize,
          height: logoSize,
        }}
      />
    </button>
  );
};

export default function ProjectsGallery() {
  const navigate = useNavigate();
  const { tr } = useLang();
  const [active, setActive] = useState<Project | null>(null);
  const [cols, setCols] = useState(() =>
    typeof window !== "undefined" && window.innerWidth < 640 ? COLS_MOBILE : COLS_DESKTOP
  );

  useEffect(() => {
    const update = () => setCols(window.innerWidth < 640 ? COLS_MOBILE : COLS_DESKTOP);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const totalRows = Math.ceil(PROJECTS.length / cols);

  return (
    <div className="w-full bg-background">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-8 py-10 lg:gap-10 lg:py-16">

          <div className="flex w-full max-w-5xl flex-col items-center px-4">
            <h2 className="text-center text-3xl font-medium tracking-tight md:text-5xl lg:text-6xl">
              {tr.projects.heading}
            </h2>
          </div>

          <div className="w-full max-w-4xl px-4">
            <div className="">
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
                      onOpen={() => {
                        if (project.id === "bir-auyl") {
                          navigate({ to: "/birauyl" });
                          return;
                        }
                        setActive(project);
                      }}
                    />
                  );
                })}
              </div>
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