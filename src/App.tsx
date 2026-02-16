import AktownSlider from "./components/AktownSlider";
import Navbar from "./components/Navbar_old";
import { ThemeProvider } from "@/components/theme-provider";
import Team from "./components/Team";
import HeroX from "./components/HeroX";
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
