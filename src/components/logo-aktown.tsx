import Logo from "../assets/aktown-logo.png";

export default function LogoAktown({ margin }: { margin: number }) {
  return (
    <a href="" className="flex flex-row items-center gap-1">
      <img
        src={Logo}
        className={`m-${margin} mr-0 w-6 dark:invert-0 invert`}
        alt="Aktown Logo"
      />
      <div className="font-medium text-primary font-[Kinetika]">AKTOWN</div>
    </a>
  );
}
