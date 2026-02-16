import AktownSlider from "./components/AktownSlider";
import Navbar from "./components/Navbar_old";
// import Navbar from "./components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import Team from "./components/Team";
// import Hero from "./components/Hero";
// import AktownLoop from "./components/AktownLoop";
// import Gallery from "./components/Gallery";
import HeroX from "./components/HeroX";
// import { Skiper54 } from "./components/skiper54";
import Footer from "./components/footer";
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <HeroX />
      <AktownSlider reverse={true} />
      <Team />
      <AktownSlider reverse={false} />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
