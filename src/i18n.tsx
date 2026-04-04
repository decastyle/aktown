import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import type { ReactNode } from 'react';

import {
    birauylCardsKz,
    birauylCardsRu,
    type BirAuylCardSlug,
} from './i18n/birauyl-cards';

export type Lang = 'ru' | 'kz';

export type BirAuylCardCopy = {
    name: string;
    description: string;
    effect: string;
};

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
        cardsHeading: string;
        flipHint: string;
        backAltSuffix: string;
        emptyCards: string;
        emptyCardsHint: string;
        cardTypes: { character: string; datymBar: string };
        cards: Record<BirAuylCardSlug, BirAuylCardCopy>;
    };
    seo: {
        description: string;
    };
};

export const t: Record<Lang, TranslationShape> = {
    ru: {
        nav: {
            instagram: 'Instagram',
        },

        team: {
            heading: 'Кто мы?',
            subheading: 'AKTOWN — это творческое объединение города Актау.',
            body: 'Мы — медиа-проект, объединяющий молодёжь. Создаём контент, организуем концерты и мероприятия. Вносим вклад в развитие общества через креативные проекты.',
        },

        hero: {},

        projects: {
            heading: 'Наши проекты',
            photos: 'Фотографии',
        },

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

        birauyl: {
            badge: 'Карточная игра · AKTOWN',
            description:
                'Настольная карточная игра, вдохновлённая духом единства. Объединяй, стратегируй, побеждай — вместе с аулом.',
            statPlayers: 'Игроков',
            statTime: 'Партия',
            statAge: 'Возраст',
            ctaPrimary: 'Заказать игру',
            ctaSecondary: 'Узнать больше',
            cardsHeading: 'Карты',
            flipHint: 'Нажми, чтобы перевернуть',
            backAltSuffix: 'оборот',
            emptyCards: 'Список карт пуст.',
            emptyCardsHint: 'Добавь записи в',
            cardTypes: {
                character: 'Персонаж',
                datymBar:  'Датым бар',
            },
            cards: birauylCardsRu,
        },

        seo: {
            description:
                'AKTOWN — Bir Auyl: настольная карточная игра о единстве и стратегии от творческого объединения Актау. Заказать игру, узнать правила и новости проекта.',
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
            cardsHeading: 'Карталар',
            flipHint: 'Айналдыру үшін басыңыз',
            backAltSuffix: 'артқы жағы',
            emptyCards: 'Карталар тізімі бос.',
            emptyCardsHint: 'Жазбаларды қосыңыз:',
            cardTypes: {
                character: 'Кейіпкер',
                datymBar:  'Датым бар',
            },
            cards: birauylCardsKz,
        },

        seo: {
            description:
                'AKTOWN — Bir Auyl: Ақтау шығармашылық бірлестігінің бірлік пен стратегия туралы үстел карта ойыны. Ойын тапсырыс беру, ережелер мен жоба жаңалықтары.',
        },
    },
};

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

    useEffect(() => {
        document.documentElement.lang = lang === 'kz' ? 'kk' : 'ru';
        const meta = document.querySelector('meta[name="description"]');
        if (meta) {
            meta.setAttribute('content', t[lang].seo.description);
        }
    }, [lang]);

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
