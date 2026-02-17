import MarqueeAktown from "./components/marquee-aktown";
import Navbar from "./components/navbar";
import { ThemeProvider } from "@/components/theme-provider/theme-provider";
import Team from "./components/team";
import HeroX from "./components/hero";
import Footer from "./components/footer";
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <HeroX />
      <MarqueeAktown reverse={true} />
      <Team />
      <MarqueeAktown reverse={false} />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
