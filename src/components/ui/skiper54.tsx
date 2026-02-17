import Autoplay from "embla-carousel-autoplay";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import arsenImg from "../../assets/arsen.jpeg"; 

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
      src: arsenImg, 
      alt: "Illustrations by ©AarzooAly",
      title: "Nursultan",
      job: "Founder",
    },
    {
      src: arsenImg, 
      alt: "Illustrations by ©AarzooAly",
      title: "Guldana",
      job: "Marketing Manager",
    },
    {
      src: arsenImg, 
      alt: "Illustrations by ©AarzooAly",
      title: "Nurlybek",
      job: "VFX / Motion Designer",
    },
    {
      src: arsenImg, 
      alt: "Illustrations by ©AarzooAly",
      title: "Askhat",
      job: "Music Artist",
    },
    {
      src: arsenImg, 
      alt: "Illustrations by ©AarzooAly",
      title: "Bekbolat",
      job: "Mobilographer",
    },
    {
      src: arsenImg, 
      alt: "Illustrations by ©AarzooAly",
      title: "Islam",
      job: "Music Artist / Sound Designer",
    },
    {
      src: arsenImg, 
      alt: "Illustrations by ©AarzooAly",
      title: "Sagynysh",
      job: "Graphic Designer",
    },
    {
      src: arsenImg, 
      alt: "Illustrations by ©AarzooAly",
      title: "Aidana",
      job: "Event Manager",
    },
    {
      src: arsenImg, 
      alt: "Illustrations by ©AarzooAly",
      title: "Veronika",
      job: "Dancer",
    },
    {
      src: arsenImg, 
      alt: "Illustrations by ©AarzooAly",
      title: "Abzal",
      job: "Music Artist",
    },
    {
      src: arsenImg, 
      alt: "Illustrations by ©AarzooAly",
      title: "Evelina",
      job: "Dancer",
    },
    {
      src: arsenImg, 
      alt: "Illustrations by ©AarzooAly",
      title: "Dilnape",
      job: "Event Manager",
    },
    {
      src: arsenImg, 
      alt: "Illustrations by ©AarzooAly",
      title: "Ailana",
      job: "Music Artist",
    },
    {
      src: arsenImg, 
      alt: "Illustrations by ©AarzooAly",
      title: "Amir",
      job: "Music Artist",
    },
    {
      src: arsenImg, 
      alt: "Illustrations by ©AarzooAly",
      title: "Karakat",
      job: "Copywriter",
    },
    {
      src: arsenImg, 
      alt: "Illustrations by ©AarzooAly",
      title: "Yerkebulan",
      job: "Videographer",
    },
  ];
  return (
    <div className="flex h-full w-screen items-center justify-center overflow-hidden">
      <Carousel_006
        images={images}
        className=""
        autoplay={true}
        loop={true}
        showNavigation={false}
        showPagination={false}
      />
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

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      className={cn("w-full", className)}
      opts={{
        loop,
        slidesToScroll: 1,
      }}
      plugins={
        autoplay
          ? [
              Autoplay({
                delay: 2000,
                stopOnInteraction: true,
                stopOnMouseEnter: false,
              }),
            ]
          : []
      }
    >
      <CarouselContent className="flex h-[500px] w-full">
        {images.map((img, index) => (
          <CarouselItem
            key={index}
            className="relative flex flex-col h-[100%] w-full basis-[73%] justify-center sm:basis-[50%] md:basis-[30%] lg:basis-[25%] xl:basis-[21%]"
          >
            <motion.div
              initial={false}
              animate={{
                clipPath:
                  current !== index
                    ? "inset(15% 0% 0% 0 round 1rem)"
                    : "inset(0 0 0 0 round 1rem)",
              }}
              className="h-full w-full overflow-hidden rounded-3xl"
            >
              <div className="relative h-full w-full border">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full scale-101 object-cover"
                />
                <div></div>
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

            <div className="mt-2 text-2xl max-w-xl font-regular font-[Kinetika]">
              {img.title}
            </div>
            <div className=" text-base max-w-xl font-regular font-[Kinetika] ">
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