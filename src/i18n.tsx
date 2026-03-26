// ─── Types ───────────────────────────────────────────────────────────────────

export type Lang = 'ru' | 'kz';
type TranslationShape = {
    nav: {
        instagram: string;
    };
    team: {
        heading: string;
        subheading: string;
        body: string;
    };
    hero: Record<string, never>;
    projects: {
        heading: string;
        photos: string;
    };
    footer: {
        contactsHeading: string;
        contactsBody: string;
        socialsHeading: string;
        formName: string;
        formNamePlaceholder: string;
        formEmail: string;
        formEmailPlaceholder: string;
        formMessage: string;
        formMessagePlaceholder: string;
        formSubmit: string;
        copyright: string;
    };
    birauyl: {
        badge: string;
        description: string;
        statPlayers: string;
        statTime: string;
        statAge: string;
        ctaPrimary: string;
        ctaSecondary: string;
    };
};

// ─── Translations ─────────────────────────────────────────────────────────────

export const t: Record<Lang, TranslationShape> = {
    ru: {
        // Navbar / shared
        nav: {
            instagram: 'Instagram',
        },

        // Team section (team.tsx)
        team: {
            heading: 'Кто мы?',
            subheading: 'AKTOWN — это творческое объединение города Актау.',
            body: 'Мы — медиа-проект, объединяющий молодёжь. Создаём контент, организуем концерты и мероприятия. Вносим вклад в развитие общества через креативные проекты.',
        },

        // Hero (hero.tsx) — no text-heavy strings, but kept for future use
        hero: {},

        // Projects gallery (projects-gallery.tsx)
        projects: {
            heading: 'Наши проекты',
            photos: 'Фотографии',
        },

        // Footer (footer.tsx)
        footer: {
            contactsHeading: 'Контакты',
            contactsBody:
                'Свяжитесь с нами по вопросам партнерства, продакшна и букинга артистов.',
            socialsHeading: 'Соц.сети',
            formName: 'Имя',
            formNamePlaceholder: 'Ваше имя',
            formEmail: 'E-Mail',
            formEmailPlaceholder: 'Ваша почта',
            formMessage: 'Сообщение',
            formMessagePlaceholder: 'Коротко опишите запрос',
            formSubmit: 'Отправить',
            copyright: 'барлық құқықтар қорғалған',
        },

        // BirAuyl page
        birauyl: {
            badge: 'Карточная игра · AKTOWN',
            description:
                'Настольная карточная игра, вдохновлённая духом единства. Объединяй, стратегируй, побеждай — вместе с аулом.',
            statPlayers: 'Игроков',
            statTime: 'Партия',
            statAge: 'Возраст',
            ctaPrimary: 'Заказать игру',
            ctaSecondary: 'Узнать больше',
        },
    },

    kz: {
        nav: {
            instagram: 'Instagram',
        },

        team: {
            heading: 'Біз кімбіз?',
            subheading: 'AKTOWN — Ақтау қаласының шығармашылық бірлестігі.',
            body: 'Біз — жастарды біріктіретін медиа-жоба. Контент жасаймыз, концерттер мен іс-шаралар ұйымдастырамыз. Шығармашылық жобалар арқылы қоғам дамуына үлес қосамыз.',
        },

        hero: {},

        projects: {
            heading: 'Біздің жобалар',
            photos: 'Фотосуреттер',
        },

        footer: {
            contactsHeading: 'Байланыс',
            contactsBody:
                'Серіктестік, продакшн және артистерді брондау мәселелері бойынша бізбен хабарласыңыз.',
            socialsHeading: 'Әлеум. желілер',
            formName: 'Аты',
            formNamePlaceholder: 'Сіздің атыңыз',
            formEmail: 'E-Mail',
            formEmailPlaceholder: 'Сіздің поштаңыз',
            formMessage: 'Хабарлама',
            formMessagePlaceholder: 'Сұранысты қысқаша сипаттаңыз',
            formSubmit: 'Жіберу',
            copyright: 'барлық құқықтар қорғалған',
        },

        birauyl: {
            badge: 'Карта ойыны · AKTOWN',
            description:
                'Бірлік рухынан шабыт алған үстел үсті карточкалық ойын. Біріктір, стратегия құр, жең — аулыңмен бірге.',
            statPlayers: 'Ойыншы',
            statTime: 'Партия',
            statAge: 'Жас',
            ctaPrimary: 'Ойын тапсырыс беру',
            ctaSecondary: 'Толығырақ',
        },
    },
};

// ─── Context ──────────────────────────────────────────────────────────────────

import {
    createContext,
    useContext,
    useState,
} from 'react';
import type { ReactNode } from 'react';

interface LangContextValue {
    lang: Lang;
    setLang: (l: Lang) => void;
    tr: typeof t.ru;
}

const LangContext = createContext<LangContextValue | null>(null);

const STORAGE_KEY = 'aktown-lang';

export function LangProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Lang>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored === 'ru' || stored === 'kz' ? stored : 'ru';
    });

    const setLang = (l: Lang) => {
        localStorage.setItem(STORAGE_KEY, l);
        setLangState(l);
    };

    return (
        <LangContext.Provider value={{ lang, setLang, tr: t[lang] }}>
            {children}
        </LangContext.Provider>
    );
}

export function useLang() {
    const ctx = useContext(LangContext);
    if (!ctx) throw new Error('useLang must be used inside LangProvider');
    return ctx;
}
