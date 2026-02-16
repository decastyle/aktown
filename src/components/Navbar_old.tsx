import { useEffect, useState } from "react";
import { ModeToggle } from "./mode-toggle";
import LogoAktown from "./LogoAktown";

function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      // Hide navbar when scrolling down (past threshold)
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      }
      // Show when at top
      else if (currentScrollY < 10) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <>
      {/* Invisible hover zone that stays at the top */}
      <div
        className="fixed top-0 left-0 right-0 h-16 z-40"
        onMouseEnter={() => setIsVisible(true)}
      />

      {/* Actual navbar */}
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
            <LogoAktown margin={2} />
          </div>
          <ModeToggle />
        </div>
      </nav>

      {/* Spacer to prevent content from going under navbar */}
      <div className="h-[52px]" />
    </>
  );
}

export default Navbar;
