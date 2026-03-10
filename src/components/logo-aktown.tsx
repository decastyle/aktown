import AktownLogo from "../assets/svg/aktown.svg";

interface LogoAktownProps {
  margin: number;
  onClick?: () => void;
}

export default function LogoAktown({ margin, onClick }: LogoAktownProps) {
  const inner = (
    <>
      <img
        src={AktownLogo}
        className={`m-${margin} mr-0 w-6 dark:invert-0 invert`}
        alt="Aktown Logo"
      />
      <div className="font-medium text-primary font-[Gilroy]">AKTOWN</div>
    </>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="flex flex-row items-center gap-1 bg-transparent border-0 p-0 cursor-pointer"
      >
        {inner}
      </button>
    );
  }

  return (
    <a
      href="https://www.instagram.com/aktownx/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-row items-center gap-1"
    >
      {inner}
    </a>
  );
}
