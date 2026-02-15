import AktownSlider from "./components/AktownSlider";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import Team from "./components/Team";
import Hero from "./components/Hero";
import AktownLoop from "./components/AktownLoop";
import Gallery from "./components/Gallery";
import HeroX from "./components/HeroX";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <HeroX />
      {/* <Hero /> */}
      <AktownSlider />
      <Team />
      <HeroX />
      {/* <Gallery /> */}
      {/* <AktownLoop /> */}
      {/* <Splitter />
        <Carousel />
        <Projects />
        <Artists />
        <BirAuyl />
        <Splitter />
        <Footer /> */}
    </ThemeProvider>
  );
}

export default App;
