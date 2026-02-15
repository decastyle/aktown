import LogoLoop from "./LogoLoop";

// Alternative with image sources
const imageLogos = [
  {
    src: "/src/assets/AKTOWN.png",
    alt: "Company 1",
    href: "https://company1.com",
  },
  {
    src: "/src/assets/AKTOWN-1-1.png",
    alt: "Company 2",
    href: "https://company2.com",
  },
];

export default function AktownLoop() {
  return (
    <div className="bg-chart-1 p-2">
      {/* Basic horizontal loop */}
      <LogoLoop
        logos={imageLogos}
        speed={50}
        direction="left"
        logoHeight={30}
        gap={24}
        hoverSpeed={0}
        scaleOnHover
        // fadeOut
        // fadeOutColor="#ffffff"
        ariaLabel="Technology partners"
      />
    </div>
  );
}
