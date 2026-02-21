// import Logo from "../assets/aktown-logo.png";
import AktownLogo from "../assets/svg/aktown.svg";

export default function LogoAktown({ margin }: { margin: number }) {
  return (
    <a href="" className="flex flex-row items-center gap-1">
      <img
        src={AktownLogo}
        className={`m-${margin} mr-0 w-6 dark:invert-0 invert`}
        alt="Aktown Logo"
      />
      <div className="font-regular text-primary font-[NeueHaasDisplay]"  >AKTOWN</div>
        {/* style={{ transform: "translateY(2px)" }} */}
    </a>
  );
}
