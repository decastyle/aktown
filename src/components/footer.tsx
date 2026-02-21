import {
  InstagramIcon,
  BrandTelegramIcon,
  WhatsappIcon,
  YoutubeIcon,
  MailFilledIcon,
  PhoneVolume,
} from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import LogoAktown from "./logo-aktown";

const CONTACTS = {
  email: "info@aktown.kz",
  phone: "+7 778-(101)-41-94",
};

const SOCIAL_LINKS = [
  {
    icon: InstagramIcon,
    href: "https://instagram.com/aktownx",
    label: "Instagram",
  },
  { icon: BrandTelegramIcon, href: "https://t.me/aktown", label: "Telegram" },
  { icon: WhatsappIcon, href: "https://wa.me/77781014194", label: "WhatsApp" },
  { icon: YoutubeIcon, href: "https://youtube.com/@aktown", label: "YouTube" },
];

const Footer = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // TODO: Implement actual form submission
    console.log({
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    });
  };

  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 py-4 lg:grid-cols-2 lg:gap-16 ">
          {/* Left Column - Info */}
          <div className="flex flex-col gap-12 pt-8">
            {/* Logo */}
            <div className="flex flex-row lg:justify-start justify-center py-4">
              <LogoAktown margin={0} />
            </div>

            {/* Contacts */}
            <div className="flex flex-col gap-4 items-start lg:items-start">
              <h3 className="font-[Kinetika] text-2xl font-medium tracking-tight">
                КОНТАКТЫ
              </h3>
              <p className="text-foreground leading-normal ">
                Свяжитесь с нами по вопросам партнерства, продакшна и букинга
                артистов.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
                <a
                  href={`mailto:${CONTACTS.email}`}
                  className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                >
                  <MailFilledIcon className="h-4 w-4 flex-shrink-0" />
                  <span>{CONTACTS.email}</span>
                </a>
                <a
                  href={`tel:${CONTACTS.phone.replace(/[^\d+]/g, "")}`}
                  className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                >
                  <PhoneVolume className="max-h-5 max-w-4 flex-shrink-0" />
                  <span>{CONTACTS.phone}</span>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-4 lg:items-start items-end">
              <h3 className="font-[Kinetika] text-2xl font-medium tracking-tight">
                СОЦ.СЕТИ
              </h3>
              <div className="flex gap-4">
                {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-opacity hover:opacity-70"
                    aria-label={label}
                  >
                    <Icon className="max-h-10 max-w-10" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:pt-0">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="font-[Kinetika] text-2xl font-medium tracking-tight"
                >
                  Имя
                </label>
                <Input id="name" name="name" placeholder="Ваше имя" required />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="font-[Kinetika] text-2xl font-medium tracking-tight"
                >
                  E-Mail
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Ваша почта"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="font-[Kinetika] text-2xl font-medium tracking-tight"
                >
                  Сообщение
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Коротко опишите запрос"
                  rows={4}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Отправить
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t py-6">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()}{" "}
            <a href="/" className="hover:text-foreground transition-colors">
              Aktown
            </a>{" "}
            — барлық құқықтар қорғалған
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
