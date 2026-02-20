import Autoplay from "embla-carousel-autoplay";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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

import Logo from "../../assets/aktown-logo.png";

import { cn } from "@/lib/utils";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const Skiper54 = () => {
  const images = [
    {
      src: arsenImg,
      alt: "Portrait image of a man standing in a costume",
      title: "Arsen",
      job: "Motion Designer",
    },
    {
      src: nursultanImg,
      alt: "Illustrations by ©AarzooAly",
      title: "Nursultan",
      job: "Founder",
    },
    {
      src: guldanaImg,
      alt: "Illustrations by ©AarzooAly",
      title: "Guldana",
      job: "Marketing Manager",
    },
    {
      src: nurlybekImg,
      alt: "Illustrations by ©AarzooAly",
      title: "Nurlybek",
      job: "VFX / Motion Designer",
    },
    {
      src: askhatImg,
      alt: "Illustrations by ©AarzooAly",
      title: "Askhat",
      job: "Music Artist",
    },
    {
      src: bekbolatImg,
      alt: "Illustrations by ©AarzooAly",
      title: "Bekbolat",
      job: "Mobilographer",
    },
    {
      src: islamImg,
      alt: "Illustrations by ©AarzooAly",
      title: "Islam",
      job: "Music Artist / Sound Designer",
    },
    {
      src: sagynyshImg,
      alt: "Illustrations by ©AarzooAly",
      title: "Sagynysh",
      job: "Graphic Designer",
    },
    {
      src: aidanaImg,
      alt: "Illustrations by ©AarzooAly",
      title: "Aidana",
      job: "Event Manager",
    },
    {
      src: veronikaImg,
      alt: "Illustrations by ©AarzooAly",
      title: "Veronika",
      job: "Dancer",
    },
    {
      src: abzalImg,
      alt: "Illustrations by ©AarzooAly",
      title: "Abzal",
      job: "Music Artist",
    },
    {
      src: evelinaImg,
      alt: "Illustrations by ©AarzooAly",
      title: "Evelina",
      job: "Dancer",
    },
    {
      src: dilnapeImg,
      alt: "Illustrations by ©AarzooAly",
      title: "Dilnape",
      job: "Event Manager",
    },
    {
      src: ailanaImg,
      alt: "Illustrations by ©AarzooAly",
      title: "Ailana",
      job: "Music Artist",
    },
    {
      src: amirImg,
      alt: "Illustrations by ©AarzooAly",
      title: "Amir",
      job: "Music Artist",
    },
    {
      src: karakatImg,
      alt: "Illustrations by ©AarzooAly",
      title: "Karakat",
      job: "Copywriter",
    },
    {
      src: yerkebulanImg,
      alt: "Illustrations by ©AarzooAly",
      title: "Yerkebulan",
      job: "Videographer",
    },
  ];
  return (
    <div className="flex h-full w-screen items-center justify-center overflow-hidden">
      <div className="w-full">
        <Carousel_006
          images={images}
          className=""
          autoplay={true}
          loop={true}
          showNavigation={false}
          showPagination={false}
        />
      </div>
    </div>
  );
};

interface Carousel_006Props {
  images: { src: string; alt: string; title: string; job: string }[];
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
}

const Carousel_006 = ({
  images,
  className,
  autoplay = false,
  loop = true,
  showNavigation = true,
  showPagination = true,
}: Carousel_006Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const autoplayPluginRef = useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });

    if (autoplay) {
      const handlePointerDown = () => {
        autoplayPluginRef.current.stop();
        if (resumeTimerRef.current) {
          clearTimeout(resumeTimerRef.current);
          resumeTimerRef.current = null;
        }
      };

      const handlePointerUp = () => {
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = setTimeout(() => {
          autoplayPluginRef.current.play();
        }, 3000);
      };

      api.on("pointerDown", handlePointerDown);
      api.on("pointerUp", handlePointerUp);

      return () => {
        api.off("pointerDown", handlePointerDown);
        api.off("pointerUp", handlePointerUp);
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      };
    }
  }, [api, autoplay]);

  return (
    <Carousel
      setApi={setApi}
      className={cn("relative w-full", className)}
      opts={{
        loop,
        slidesToScroll: 1,
        dragFree: true,
      }}
      plugins={autoplay ? [autoplayPluginRef.current] : []}
    >
      <CarouselContent className="flex h-[500px] w-full">
        {images.map((img, index) => (
          <CarouselItem
            key={index}
            className="relative flex flex-col h-[100%] w-full basis-[73%] justify-center sm:basis-[50%] md:basis-[30%] lg:basis-[25%] xl:basis-[21%]"
            style={{ maxWidth: "calc(500px * 0.7)" }}
          >
            <motion.div
              initial={false}
              animate={{
                clipPath:
                  current !== index
                    ? "inset(5% 0% 0% 0 round 1rem)"
                    : "inset(0 0 0 0 round 1rem)",
              }}
              className="h-full w-full rounded-3xl"
            >
              <div className="relative h-full w-full border bg-[#fafafa] scale-101">
                {/* Logo sits on top of white bg but behind the photo */}
                <img
                  src={Logo}
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[50%] w-auto object-contain z-10 invert"
                />
                {/* Photo renders on top of the logo */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="absolute inset-0 h-full w-full scale-101 object-cover object-top z-20"
                />
              </div>
            </motion.div>
            <AnimatePresence mode="wait">
              {current === index && (
                <motion.div
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.5 }}
                  className="absolute bottom-0 left-2 flex h-[14%] w-full translate-y-full items-center justify-center p-2 text-center font-medium tracking-tight text-black/20"
                >
                  {img.title}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-2 text-2xl max-w-xl font-regular font-[Kinetika] pointer-events-none select-none">
              {img.title}
            </div>
            <div className="text-base max-w-xl font-regular font-[Kinetika] pointer-events-none select-none">
              {img.job}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {showNavigation && (
        <div className="absolute -bottom-4 right-0 flex w-full items-center justify-between gap-2 px-4">
          <button
            aria-label="Previous slide"
            onClick={() => api?.scrollPrev()}
            className="rounded-full bg-black/10 p-2"
          >
            <ChevronLeft className="text-white" />
          </button>
          <button
            aria-label="Next slide"
            onClick={() => api?.scrollNext()}
            className="rounded-full bg-black/10 p-2"
          >
            <ChevronRight className="text-white" />
          </button>
        </div>
      )}

      {showPagination && (
        <div className="flex w-full items-center justify-center">
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: images.length }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "h-2 w-2 cursor-pointer rounded-full transition-all",
                  current === index ? "bg-black" : "bg-[#D9D9D9]",
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </Carousel>
  );
};

export { Skiper54 };
