import {
    InstagramIcon,
    BrandTelegramIcon,
    WhatsappIcon,
    YoutubeIcon,
    MailFilledIcon,
    PhoneVolume,
} from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import LogoAktown from './logo-aktown';
import { useLang } from '../i18n';

const CONTACTS = {
    email: 'info@aktown.kz',
    phone: '+7 (778) 101-41-94',
};

const SOCIAL_LINKS = [
    {
        icon: InstagramIcon,
        href: 'https://instagram.com/aktownx',
        label: 'Instagram',
    },
    { icon: BrandTelegramIcon, href: 'https://t.me/aktown', label: 'Telegram' },
    {
        icon: WhatsappIcon,
        href: 'https://wa.me/77781014194',
        label: 'WhatsApp',
    },
    {
        icon: YoutubeIcon,
        href: 'https://youtube.com/@aktown',
        label: 'YouTube',
    },
];

const FOOTER_SECTION_TITLE =
    'text-xl font-medium tracking-tight sm:text-2xl';

const CONTACT_PHONE_TEL = CONTACTS.phone.replace(/[^\d+]/g, '');

const CONTACT_LINK_ROWS = [
    {
        href: `mailto:${CONTACTS.email}`,
        icon: MailFilledIcon,
        text: CONTACTS.email,
        iconClassName: 'h-4 w-4',
        textClassName: 'truncate font-medium',
    },
    {
        href: `tel:${CONTACT_PHONE_TEL}`,
        icon: PhoneVolume,
        text: CONTACTS.phone,
        iconClassName: 'max-h-5 w-4',
        textClassName: 'font-medium tabular-nums',
    },
] as const;

const contactLinkRowClass =
    'group flex items-center gap-3 rounded-xl border border-transparent px-3 py-3 text-sm transition-colors hover:border-border/60 hover:bg-muted/40';

const contactIconWrapClass =
    'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-background/80 text-foreground shadow-sm ring-1 ring-border/30 transition group-hover:ring-primary/25';

const Footer = () => {
    const { tr } = useLang();
    const T = tr.footer;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log({
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
        });
    };

    return (
        <footer className="border-t border-border/80 bg-gradient-to-b from-background to-muted/15">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-0 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16 lg:gap-x-20 lg:py-16">
                    <div className="border-b border-border/70 pb-12 lg:border-b-0 lg:border-r lg:border-border/50 lg:pb-0 lg:pr-12">
                        <div className="flex flex-col gap-10 pt-2 lg:pt-0">
                            <div className="flex justify-center lg:justify-start">
                                <LogoAktown margin={0} />
                            </div>

                            <section className="flex flex-col items-center gap-5 lg:items-start">
                                <h3 className={FOOTER_SECTION_TITLE}>
                                    {T.contactsHeading}
                                </h3>
                                <p className="max-w-md text-center text-sm leading-relaxed text-muted-foreground lg:text-left">
                                    {T.contactsBody}
                                </p>
                                <div className="flex w-full max-w-md flex-col gap-2">
                                    {CONTACT_LINK_ROWS.map(
                                        ({
                                            href,
                                            icon: Icon,
                                            text,
                                            iconClassName,
                                            textClassName,
                                        }) => (
                                            <a
                                                key={href}
                                                href={href}
                                                className={contactLinkRowClass}
                                            >
                                                <span className={contactIconWrapClass}>
                                                    <Icon
                                                        className={iconClassName}
                                                    />
                                                </span>
                                                <span className={textClassName}>
                                                    {text}
                                                </span>
                                            </a>
                                        )
                                    )}
                                </div>
                            </section>

                            <section className="flex flex-col items-center gap-4 lg:items-start">
                                <h3 className={FOOTER_SECTION_TITLE}>
                                    {T.socialsHeading}
                                </h3>
                                <div className="flex flex-wrap gap-2.5">
                                    {SOCIAL_LINKS.map(
                                        ({ icon: Icon, href, label }) => (
                                            <a
                                                key={label}
                                                href={href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-background/60 text-foreground shadow-sm transition hover:border-primary/40 hover:bg-muted/50 hover:shadow-md"
                                                aria-label={label}
                                            >
                                                <Icon className="h-5 w-5" />
                                            </a>
                                        )
                                    )}
                                </div>
                            </section>
                        </div>
                    </div>

                    <div className="pt-10 lg:pt-8 lg:pl-4">
                        <div className="rounded-2xl border border-border/50 bg-card/40 p-4  ring-1 ring-border/30 backdrop-blur-sm">
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div className="flex flex-col gap-2 sm:col-span-1">
                                        <label
                                            htmlFor="name"
                                            className="text-sm font-medium text-foreground"
                                        >
                                            {T.formName}
                                        </label>
                                        <Input
                                            id="name"
                                            name="name"
                                            placeholder={
                                                T.formNamePlaceholder
                                            }
                                            className="h-10 rounded-lg border-border/60 bg-background/50"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 sm:col-span-1">
                                        <label
                                            htmlFor="email"
                                            className="text-sm font-medium text-foreground"
                                        >
                                            {T.formEmail}
                                        </label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder={
                                                T.formEmailPlaceholder
                                            }
                                            className="h-10 rounded-lg border-border/60 bg-background/50"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="message"
                                        className="text-sm font-medium text-foreground"
                                    >
                                        {T.formMessage}
                                    </label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        placeholder={T.formMessagePlaceholder}
                                        rows={4}
                                        className="min-h-[120px] rounded-lg border-border/60 bg-background/50 resize-y"
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="mt-1 w-full rounded-lg sm:w-auto sm:min-w-[160px]"
                                >
                                    {T.formSubmit}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border/60 py-8">
                    <p className="text-center text-xs text-muted-foreground sm:text-sm">
                        &copy; {new Date().getFullYear()}{' '}
                        <a
                            href="/"
                            className="font-medium text-foreground/90 underline-offset-4 transition hover:text-foreground hover:underline"
                        >
                            Aktown
                        </a>{' '}
                        <span className="text-muted-foreground/80">
                            — {T.copyright}
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
