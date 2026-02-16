import { InfiniteSlider } from "@/components/ui/infinite-slider";
// import AKTOWN from "/assets"

export default function AktownSlider({ reverse }: { reverse: boolean }) {
  return (
    <InfiniteSlider gap={16} reverse={reverse} className="bg-chart-1 p-2">
      <img
        src="/src/assets/AKTOWN.png"
        alt="Apple Music logo"
        className="h-8 w-auto"
      />
      <img
        src="/src/assets/AKTOWN-1-1.png"
        alt="Chrome logo"
        className="h-8 w-auto"
      />
    </InfiniteSlider>
  );
}
