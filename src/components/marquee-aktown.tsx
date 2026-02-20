import { InfiniteSlider } from "@/components/ui/infinite-slider";

export default function MarqueeAktown({ reverse }: { reverse: boolean }) {
  return (
    <InfiniteSlider gap={16} reverse={reverse} className="bg-chart-1 p-2">
      <div
        className="font-[Kinetika] font-medium text-4xl leading-none"
        style={{ transform: "translateY(-2px)" }}
      >
        AKTOWN
      </div>
      <div
        className="font-[Kinetika] font-semibold text-4xl leading-none"
        style={{
          color: "transparent",
          WebkitTextStroke: "0.75px white",
          transform: "translateY(-2px)",
        }}
      >
        AKTOWN
      </div>
    </InfiniteSlider>
  );
}