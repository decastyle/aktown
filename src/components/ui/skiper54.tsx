import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";

import abzalImg from "../../assets/team-members/abzal.png";
import aidanaImg from "../../assets/team-members/aidana.png";
import ailanaImg from "../../assets/team-members/ailana.png";
import amirImg from "../../assets/team-members/amir.png";
import askhatImg from "../../assets/team-members/askhat.png";
import bekbolatImg from "../../assets/team-members/bekbolat.png";
import dilnapeImg from "../../assets/team-members/dilnape.png";
import evelinaImg from "../../assets/team-members/evelina.png";
import guldanaImg from "../../assets/team-members/guldana.png";
import islamImg from "../../assets/team-members/islam.png";
import karakatImg from "../../assets/team-members/karakat.png";
import nurlybekImg from "../../assets/team-members/nurlybek.png";
import nursultanImg from "../../assets/team-members/nursultan.png";
import sagynyshImg from "../../assets/team-members/sagynysh.png";
import veronikaImg from "../../assets/team-members/veronika.png";
import yerkebulanImg from "../../assets/team-members/yerkebulan.png";
import arsenImg from "../../assets/team-members/arsen.png";
import AktownLogo from "../../assets/svg/aktown.svg";

import { cn } from "@/lib/utils";
import type { CarouselApi } from "@/components/ui/carousel";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

// ─── Constants ───────────────────────────────────────────────────────────────

const TEAM_MEMBERS: TeamMember[] = [
  { src: arsenImg,      title: "Arsen",      job: "Motion Designer" },
  { src: nursultanImg,  title: "Nursultan",  job: "Founder" },
  { src: guldanaImg,    title: "Guldana",    job: "Marketing Manager" },
  { src: nurlybekImg,   title: "Nurlybek",   job: "VFX / Motion Designer" },
  { src: askhatImg,     title: "Askhat",     job: "Music Artist" },
  { src: bekbolatImg,   title: "Bekbolat",   job: "Mobilographer" },
  { src: islamImg,      title: "Islam",      job: "Music Artist / Sound Designer" },
  { src: sagynyshImg,   title: "Sagynysh",   job: "Graphic Designer" },
  { src: aidanaImg,     title: "Aidana",     job: "Event Manager" },
  { src: veronikaImg,   title: "Veronika",   job: "Dancer" },
  { src: abzalImg,      title: "Abzal",      job: "Music Artist" },
  { src: evelinaImg,    title: "Evelina",    job: "Dancer" },
  { src: dilnapeImg,    title: "Dilnape",    job: "Event Manager" },
  { src: ailanaImg,     title: "Ailana",     job: "Music Artist" },
  { src: amirImg,       title: "Amir",       job: "Music Artist" },
  { src: karakatImg,    title: "Karakat",    job: "Copywriter" },
  { src: yerkebulanImg, title: "Yerkebulan", job: "Videographer" },
];

// ─── Types ───────────────────────────────────────────────────────────────────

interface TeamMember {
  src: string;
  title: string;
  job: string;
}

interface TeamCarouselProps {
  images?: TeamMember[];
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
}

// ─── Card ────────────────────────────────────────────────────────────────────

interface CardProps {
  img: TeamMember;
  isActive: boolean;
  eager: boolean;
}

const TeamCard = React.memo(({ img, isActive, eager }: CardProps) => (
  <CarouselItem
    className="relative flex flex-col h-full basis-[73%] sm:basis-[50%] md:basis-[30%] lg:basis-[25%] xl:basis-[21%]"
    style={{ maxWidth: "calc(500px * 0.7)" }}
  >
    {/* Photo card */}
    <motion.div
      initial={false}
      animate={{
        clipPath: isActive
          ? "inset(0% 0% 0% 0% round 1rem)"
          : "inset(5% 0% 0% 0% round 1rem)",
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-full w-full rounded-3xl"
    >
      <div className="relative h-full w-full border bg-[#fafafa] scale-101">
        {/* Watermark logo — behind photo */}
        <img
          src={AktownLogo}
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 w-auto object-contain z-10 invert"
        />
        {/* Member photo */}
        <img
          src={img.src}
          alt={`Portrait of ${img.title}`}
          className="absolute inset-0 h-full w-full scale-101 object-cover object-top z-20"
          loading={eager ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
    </motion.div>

    {/* Name + role */}
    <div className="mt-2 pointer-events-none select-none font-[Kinetika]">
      <p className="text-2xl font-medium leading-tight">{img.title}</p>
      <p className="text-base text-muted-foreground">{img.job}</p>
    </div>
  </CarouselItem>
));

TeamCard.displayName = "TeamCard";

// ─── Carousel ────────────────────────────────────────────────────────────────

const TeamCarousel = ({
  images = TEAM_MEMBERS,
  className,
  autoplay = false,
  loop = true,
}: TeamCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Per-instance plugin — never shared across renders or multiple instances
  const autoplayPlugin = useMemo(
    () =>
      Autoplay({
        delay: 2000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    [],
  );

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);

    if (!autoplay) {
      return () => api.off("select", onSelect);
    }

    const stopAutoplay = () => {
      autoplayPlugin.stop();
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    };

    const resumeAutoplay = () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = setTimeout(() => autoplayPlugin.play(), 3000);
    };

    api.on("pointerDown", stopAutoplay);
    api.on("pointerUp", resumeAutoplay);

    return () => {
      api.off("select", onSelect);
      api.off("pointerDown", stopAutoplay);
      api.off("pointerUp", resumeAutoplay);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [api, autoplay, autoplayPlugin]);

  return (
    <Carousel
      setApi={setApi}
      className={cn("relative w-full", className)}
      opts={{ loop, slidesToScroll: 1, skipSnaps: true, duration: 20 }}
      plugins={autoplay ? [autoplayPlugin] : []}
    >
      <CarouselContent className="h-[500px]">
        {images.map((img, index) => (
          <TeamCard
            key={img.title}
            img={img}
            isActive={current === index}
            eager={index < 4}
          />
        ))}
      </CarouselContent>
    </Carousel>
  );
};

// ─── Page wrapper ─────────────────────────────────────────────────────────────

const Skiper54 = () => (
  <div className="flex h-full w-screen items-center justify-center overflow-hidden">
    <div className="w-full">
      <TeamCarousel autoplay loop />
    </div>
  </div>
);

export { Skiper54, TeamCarousel };
export type { TeamMember, TeamCarouselProps };