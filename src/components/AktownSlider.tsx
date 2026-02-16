import { InfiniteSlider } from "@/components/ui/infinite-slider";

import Aktown from "../assets/AKTOWN.png";
import AktownHollow from "../assets/AKTOWN-1-1.png"
// import AKTOWN from "/assets"

export default function AktownSlider({ reverse }: { reverse: boolean }) {
  return (
    <InfiniteSlider gap={16} reverse={reverse} className="bg-chart-1 p-2">
      <img
        src={Aktown}
        alt="Apple Music logo"
        className="h-8 w-auto"
      />
      <img
        src={AktownHollow}
        alt="Chrome logo"
        className="h-8 w-auto"
      />
    </InfiniteSlider>
  );
}
