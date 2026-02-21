"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

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
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(2);
  const [contentSize, setContentSize] = useState(0);
  const animRef = useRef<Animation | null>(null);
  const isHorizontal = direction === "horizontal";

  // Measure and compute how many copies we need to fill the container
  useEffect(() => {
    if (!contentRef.current || !containerRef.current) return;

    const measure = () => {
      const content = contentRef.current!;
      const container = containerRef.current!;
      const cSize = isHorizontal ? content.offsetWidth : content.offsetHeight;
      const vSize = isHorizontal ? container.offsetWidth : container.offsetHeight;
      if (cSize === 0) return;
      setContentSize(cSize + gap);
      // Enough copies to fill viewport twice (so the loop never shows a gap)
      const needed = Math.ceil((vSize * 2) / cSize) + 2;
      setCopies(Math.max(4, needed));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(containerRef.current);
    ro.observe(contentRef.current);
    return () => ro.disconnect();
  }, [isHorizontal, gap, children]);

  // Web Animations API — no external deps, perfectly smooth
  useEffect(() => {
    if (!containerRef.current || contentSize === 0) return;

    const track = containerRef.current.querySelector<HTMLElement>(".inf-track");
    if (!track) return;

    const from = reverse ? -contentSize : 0;
    const to = reverse ? 0 : -contentSize;
    const duration = (Math.abs(to - from) / speed) * 1000;

    animRef.current?.cancel();
    animRef.current = track.animate(
      isHorizontal
        ? [{ transform: `translateX(${from}px)` }, { transform: `translateX(${to}px)` }]
        : [{ transform: `translateY(${from}px)` }, { transform: `translateY(${to}px)` }],
      { duration, iterations: Infinity, easing: "linear" }
    );

    return () => animRef.current?.cancel();
  }, [contentSize, speed, isHorizontal, reverse, copies]);

  const handleMouseEnter = () => {
    if (speedOnHover && animRef.current) {
      animRef.current.updatePlaybackRate(speed / speedOnHover);
    }
  };
  const handleMouseLeave = () => {
    if (speedOnHover && animRef.current) {
      animRef.current.updatePlaybackRate(1);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="inf-track flex"
        style={{
          flexDirection: isHorizontal ? "row" : "column",
          gap: `${gap}px`,
          width: isHorizontal ? "max-content" : undefined,
          willChange: "transform",
        }}
      >
        <div
          ref={contentRef}
          className="flex"
          style={{ flexDirection: isHorizontal ? "row" : "column", gap: `${gap}px`, flexShrink: 0 }}
        >
          {children}
        </div>
        {Array.from({ length: copies - 1 }).map((_, i) => (
          <div
            key={i}
            aria-hidden
            className="flex"
            style={{ flexDirection: isHorizontal ? "row" : "column", gap: `${gap}px`, flexShrink: 0 }}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}