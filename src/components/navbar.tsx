import { ModeToggle } from './theme-provider/mode-toggle';
import LogoAktown from './logo-aktown';
import { useLang } from '../i18n';

interface NavbarProps {
    onLogoClick?: () => void;
}

function Navbar({ onLogoClick }: NavbarProps) {
    const { lang, setLang } = useLang();

    return (
        <>
            <nav
                className="fixed top-0 left-0 right-0 z-50 p-2 bg-background border-b border-border"
            >
                <div className="flex flex-row items-center gap-1 justify-between">
                    <div className="ml-2">
                        <LogoAktown margin={2} onClick={onLogoClick} />
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setLang(lang === 'ru' ? 'kz' : 'ru')}
                            className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                            aria-label="Toggle language"
                            title={`Language: ${lang.toUpperCase()}`}
                        >
                            {lang.toUpperCase()}
                        </button>
                        <ModeToggle />
                    </div>
                </div>
            </nav>
            <div className="h-[52px]" />
        </>
    );
}

export default Navbar;
