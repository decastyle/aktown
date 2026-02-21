"use client";
import { cn } from "@/lib/utils";
import { useId } from "react";

export type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  speed?: number;
  speedOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
};

// How many copies to render. 6 is enough to fill any reasonable viewport.
// CSS handles the loop — no JS measurement needed.
const COPIES = 6;

export function InfiniteSlider({
  children,
  gap = 16,
  speed = 5,
  speedOnHover,
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteSliderProps) {
  // Unique id so multiple sliders on the same page don't share keyframe names
  const id = useId().replace(/:/g, "");
  const isHorizontal = direction === "horizontal";

  // We can't know content size at CSS time, so we use a trick:
  // animate by exactly 1/COPIES of the total track width (translateX(-1/6 * 100%)).
  // Since all copies are identical, this creates a seamless loop.
  // const durationSeconds = speed
  //   ? undefined // calculated below
  //   : 10;

  // Speed is in px/s but we don't know content width at CSS time.
  // Instead expose a `duration` prop approach: default 20s looks good,
  // and users can pass `speed` as seconds directly (rename semantics below).
  // If you need true px/s control, switch to the JS version.
  const duration = `${speed}s`;

  const animationName = `infinite-slider-${id}`;

  const keyframes = isHorizontal
    ? `@keyframes ${animationName} {
        from { transform: translateX(0); }
        to   { transform: translateX(calc(-100% / ${COPIES})); }
      }`
    : `@keyframes ${animationName} {
        from { transform: translateY(0); }
        to   { transform: translateY(calc(-100% / ${COPIES})); }
      }`;

  const hoverStyle = speedOnHover
    ? `#slider-${id}:hover > .slider-track {
        animation-duration: ${speedOnHover}s;
      }`
    : "";

  return (
    <>
      <style>{`
        ${keyframes}
        ${hoverStyle}
        #slider-${id} > .slider-track {
          animation: ${animationName} ${duration} linear infinite ${reverse ? "reverse" : "normal"};
          /* GPU composite layer — no layout recalc on every frame */
          will-change: transform;
        }
      `}</style>

      <div
        id={`slider-${id}`}
        className={cn("overflow-hidden", className)}
      >
        {/* Single track containing all copies. Animating the track as one
            unit means the browser never needs to remeasure children. */}
        <div
          className="slider-track flex center"
          style={{
            flexDirection: isHorizontal ? "row" : "column",
            gap: `${gap}px`,
            // Width must be auto so it grows to fit all copies
            width: isHorizontal ? "max-content" : undefined,
          }}
        >
          {Array.from({ length: COPIES }).map((_, i) => (
            <div
              key={i}
              className="flex"
              style={{
                flexDirection: isHorizontal ? "row" : "column",
                gap: `${gap}px`,
                flexShrink: 0,
              }}
            >
              {children}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}