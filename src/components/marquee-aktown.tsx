import { InfiniteSlider } from "@/components/ui/infinite-slider";

export default function MarqueeAktown({ reverse }: { reverse: boolean }) {
  return (
    <InfiniteSlider gap={16} reverse={reverse} className="bg-chart-1 p-2">
      <div
        className="font-[NeueHaasDisplay] font-regular text-4xl"
        style={{ transform: "translateY(2px)" }}
      >
        AKTOWN
      </div>
      <div
        className="aktown-outline font-[NeueHaasDisplay] font-medium text-4xl"
        style={{ transform: "translateY(2px)" }}
      >
        AKTOWN
      </div>
    </InfiniteSlider>
  );
}
