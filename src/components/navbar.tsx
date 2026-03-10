import { useEffect, useState } from "react";
import { ModeToggle } from "./theme-provider/mode-toggle";
import LogoAktown from "./logo-aktown";

interface NavbarProps {
  onLogoClick?: () => void;
}

function Navbar({ onLogoClick }: NavbarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else if (currentScrollY < 10) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 h-16 z-40"
        onMouseEnter={() => setIsVisible(true)}
      />
      <nav
        className={`
          fixed top-0 left-0 right-0 z-50
          p-2 bg-background border-b border-border
          transition-transform duration-300 ease-in-out
          ${isVisible ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="flex flex-row items-center gap-1 justify-between">
          <div className="ml-2">
            <LogoAktown margin={2} onClick={onLogoClick} />
          </div>
          <ModeToggle />
        </div>
      </nav>
      <div className="h-[52px]" />
    </>
  );
}

export default Navbar;
