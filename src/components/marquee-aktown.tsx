import { InfiniteSlider } from "@/components/ui/infinite-slider";
import AktownTextOpaque from "../assets/aktown-text-opaque.png";
import AktownTextHollow from "../assets/aktown-text-hollow.png";

export default function MarqueeAktown({ reverse }: { reverse: boolean }) {
  return (
    <InfiniteSlider gap={16} reverse={reverse} className="bg-chart-1 p-2">
      <img src={AktownTextOpaque} className="h-8 w-auto" />
      <img src={AktownTextHollow} className="h-8 w-auto" />
    </InfiniteSlider>
  );
}
