"use client";
import { cn } from "@/lib/utils";
import { useMotionValue, animate, motion } from "motion/react";
import { useState, useEffect, useMemo } from "react";
import useMeasure from "react-use-measure";

export type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  speed?: number;
  speedOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 16,
  speed = 50,
  speedOnHover,
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentSpeed, setCurrentSpeed] = useState(speed);
  const [containerRef, containerBounds] = useMeasure();
  const [contentRef, contentBounds] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  // Calculate how many copies we need to fill the viewport + buffer
  const numCopies = useMemo(() => {
    const containerSize =
      direction === "horizontal"
        ? containerBounds.width
        : containerBounds.height;
    const contentSize =
      direction === "horizontal" ? contentBounds.width : contentBounds.height;

    if (containerSize === 0 || contentSize === 0) {
      return 3; // Default fallback
    }

    // We need enough copies to fill the container + at least 2 extra for smooth looping
    const copiesNeeded = Math.ceil(containerSize / contentSize) + 2;
    return Math.max(3, copiesNeeded);
  }, [
    containerBounds.width,
    containerBounds.height,
    contentBounds.width,
    contentBounds.height,
    direction,
  ]);

  useEffect(() => {
    let controls;
    const contentSize =
      (direction === "horizontal"
        ? contentBounds.width
        : contentBounds.height) + gap;

    if (contentSize === 0) return;

    const from = reverse ? -contentSize : 0;
    const to = reverse ? 0 : -contentSize;
    const distanceToTravel = Math.abs(to - from);
    const duration = distanceToTravel / currentSpeed;

    if (isTransitioning) {
      const remainingDistance = Math.abs(translation.get() - to);
      const transitionDuration = remainingDistance / currentSpeed;
      controls = animate(translation, [translation.get(), to], {
        ease: "linear",
        duration: transitionDuration,
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prevKey) => prevKey + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: "linear",
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from);
        },
      });
    }

    return controls?.stop;
  }, [
    key,
    translation,
    currentSpeed,
    contentBounds.width,
    contentBounds.height,
    gap,
    isTransitioning,
    direction,
    reverse,
  ]);

  const hoverProps = speedOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentSpeed(speedOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentSpeed(speed);
        },
      }
    : {};

  return (
    <div className={cn("overflow-hidden", className)} ref={containerRef}>
      <motion.div
        className="flex w-max"
        style={{
          ...(direction === "horizontal"
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === "horizontal" ? "row" : "column",
        }}
        {...hoverProps}
      >
        <div
          ref={contentRef}
          className="flex"
          style={{
            gap: `${gap}px`,
            flexDirection: direction === "horizontal" ? "row" : "column",
          }}
        >
          {children}
        </div>
        {Array.from({ length: numCopies - 1 }).map((_, i) => (
          <div
            key={i}
            className="flex"
            style={{
              gap: `${gap}px`,
              flexDirection: direction === "horizontal" ? "row" : "column",
            }}
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
