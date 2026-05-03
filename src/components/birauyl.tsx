'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useMemo, useRef, useState } from 'react';

import BirAuylLogo from '../assets/birauyl-logo.png';
import BirAuylBgVideo from '../assets/birauyl-bg-loop.webm';
import BoxVideo from '../assets/birauyl-box-loop.webm';
import KASPI_LOGO from '../assets/Kaspi_logo.png';

import Navbar from './navbar';
import { useLang } from '../i18n';
import BirAuylCards from './birauylcards';

const POSTER_BG = '/placeholders/birauyl-bg-poster.jpg';
const POSTER_BOX = '/placeholders/birauyl-box-poster.jpg';

// Fixed URLs with protocols to prevent router interception
// const PLACEHOLDER_PRIMARY_URL = 'https://clck.ru/3ReSWQ';
// const PLACEHOLDER_SECONDARY_URL = 'https://www.instagram.com/birauyl/';
// const PLACEHOLDER_KASPI_URL = 'https://l.kaspi.kz/shop/whCeM8CTjYv3zcY';

const ctaBaseClass =
    'inline-flex items-center gap-2 justify-center min-h-11 px-5 rounded-full text-sm font-medium tracking-wide transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76d00]/40 active:scale-95';

// const KASPI_RED = 'bg-[#f14635] hover:bg-[#d63a2c] text-white';

export default function BirAuyl() {
    const navigate = useNavigate();
    const { tr } = useLang();
    const T = tr.birauyl;

    const slugify = (s: string) =>
        s
            .toLowerCase()
            .trim()
            .replace(/[^\p{L}\p{N}]+/gu, '-')
            .replace(/^-+|-+$/g, '')
            .slice(0, 48);

    const rulesText = T.rulesBody.replace(/\r\n/g, '\n').trim();
    const rulesSections = rulesText
        ? rulesText.split(/\n{2,}/).map((block) => {
              const lines = block.split('\n');
              const first = (lines[0] ?? '').trim();
              const rest = lines.slice(1).join('\n').trim();
              const looksLikeHeading =
                  rest.length > 0 &&
                  first.length > 0 &&
                  first.length <= 72 &&
                  !/^[•\-\u2013\u2014]/.test(first);
              return looksLikeHeading
                  ? { title: first, body: rest }
                  : { title: '', body: block.trim() };
          })
        : [];

    const landingRef = useRef<HTMLElement | null>(null);
    const rulesRef = useRef<HTMLElement | null>(null);
    const cardsRef = useRef<HTMLElement | null>(null);

    const rulesSubsections = useMemo(() => {
        return rulesSections
            .map((s, idx) => {
                if (!s.title) return null;
                const id = `birauyl-rules-${slugify(s.title) || 'section'}-${idx}`;
                return { id, title: s.title };
            })
            .filter(Boolean) as Array<{ id: string; title: string }>;
    }, [rulesSections]);

    const toc = useMemo(() => {
        return [
            { id: 'birauyl-landing', label: T.tocLanding, kind: 'chapter' as const },
            {
                id: 'birauyl-rules',
                label: T.tocRules,
                kind: 'chapter' as const,
                children: rulesSubsections.map((s) => ({
                    id: s.id,
                    label: s.title,
                    kind: 'subsection' as const,
                })),
            },
            { id: 'birauyl-cards', label: T.tocCards, kind: 'chapter' as const },
        ];
    }, [T.tocCards, T.tocLanding, T.tocRules, rulesSubsections]);

    const flatIds = useMemo(() => {
        const out: string[] = [];
        for (const item of toc) {
            out.push(item.id);
            if ('children' in item && item.children) {
                out.push(...item.children.map((c) => c.id));
            }
        }
        return out;
    }, [toc]);

    const [activeId, setActiveId] = useState<string>('birauyl-rules');
    const [showScrollCue, setShowScrollCue] = useState(true);
    const [cueEverShown, setCueEverShown] = useState(false);

    useEffect(() => {
        const els = flatIds
            .map((id) => ({ id, el: document.getElementById(id) }))
            .filter((x): x is { id: string; el: HTMLElement } => Boolean(x.el));
        if (els.length === 0) return;

        const spy = new IntersectionObserver(
            (entries) => {
                const best = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
                if (!best) return;
                const match = els.find((s) => s.el === best.target);
                if (match) setActiveId(match.id);
            },
            {
                threshold: [0.15, 0.25, 0.4, 0.6],
                rootMargin: '-20% 0px -70% 0px',
            }
        );

        els.forEach((s) => spy.observe(s.el));
        return () => spy.disconnect();
    }, [flatIds]);

    useEffect(() => {
        let raf = 0;
        const SHOW_ONLY_AT_TOP_PX = 2;

        const update = () => {
            const y = window.scrollY || 0;
            setShowScrollCue(y <= SHOW_ONLY_AT_TOP_PX);
        };

        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = window.requestAnimationFrame(update);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        update();

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    useEffect(() => {
        if (showScrollCue) setCueEverShown(true);
    }, [showScrollCue]);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <>
            <Navbar onLogoClick={() => navigate({ to: '/' })} />

            <section
                id="birauyl-landing"
                ref={(n) => {
                    landingRef.current = n;
                }}
                className="relative z-40 box-border flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-[#2a1200] pt-20 pb-20 px-6"
            >
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={POSTER_BG}
                    className="absolute inset-0 z-0 h-full w-full object-cover opacity-[0.94] brightness-[0.88] contrast-[1.02] dark:opacity-[0.92] dark:brightness-[0.85] dark:contrast-100"
                >
                    <source src={BirAuylBgVideo} type="video/webm" />
                </video>

                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_115%_90%_at_50%_42%,rgba(255,252,248,0.62)_0%,rgba(255,245,235,0.22)_42%,rgba(55,40,32,0.42)_100%)] dark:bg-[radial-gradient(ellipse_130%_100%_at_50%_50%,transparent_22%,rgba(7,16,30,0.68)_100%)]"
                />

                <div className="relative z-10 flex w-full max-w-[1200px] flex-col items-center justify-center gap-12 lg:flex-row lg:items-center lg:gap-[clamp(32px,6vw,80px)]">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-[clamp(230px,34vw,460px)] shrink-0 overflow-visible"
                    >
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="none"
                            poster={POSTER_BOX}
                            className="h-auto w-full origin-center scale-[2] object-contain translate-x-[30px] -translate-y-[15px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] lg:scale-150"
                        >
                            <source src={BoxVideo} type="video/webm" />
                        </video>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.2 }}
                        className="flex w-full max-w-[min(100%,36rem)] flex-col items-center text-center lg:max-w-[520px] lg:items-start lg:text-left"
                    >
                        <div
                            className="
                            flex w-full flex-col items-center gap-6 rounded-3xl px-6 py-8 sm:px-8 sm:py-9
                            border border-[#e76d00]/15
                            bg-white/90
                            shadow-[0_12px_48px_rgba(140,60,0,0.16)]
                            backdrop-blur-sm
                            dark:border-white/10
                            dark:bg-black/[0.30]
                            dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)]
                            dark:backdrop-blur-xl
                        "
                        >
                            <div className="flex w-full flex-col items-center gap-5 lg:items-start">
                                <motion.img
                                    src={BirAuylLogo}
                                    alt="Bir Auyl"
                                    className="w-[clamp(180px,25vw,300px)] drop-shadow-[0_2px_14px_rgba(140,60,0,0.18)] dark:drop-shadow-[0_10px_28px_rgba(0,0,0,0.45)]"
                                />
                                <span className="rounded-full border border-[#e76d00]/20 bg-[#e76d00]/06 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-[#7a3800]/80 dark:border-white/15 dark:bg-white/5 dark:text-[#ffe4c0]/55">
                                    {T.badge}
                                </span>
                            </div>

                            <p className="aktown-readable mx-auto max-w-[90%] text-pretty text-lg leading-[1.7] text-[#1c0d00]/88 lg:mx-0 lg:max-w-full dark:text-[#ffe4c0]/85">
                                {T.description}
                            </p>

                            <div className="grid w-full grid-cols-3 gap-3 border-y border-[#e76d00]/15 py-6 sm:gap-4 sm:py-7 dark:border-white/12">
                                {[
                                    { value: '6–20', label: T.statPlayers },
                                    { value: '20м', label: T.statTime },
                                    { value: '12+', label: T.statAge },
                                ].map((s, i) => (
                                    <div
                                        key={s.label}
                                        className={`flex min-w-0 flex-col gap-1 text-center lg:text-left ${
                                            i > 0
                                                ? 'border-l border-[#e76d00]/15 pl-3 sm:pl-4 dark:border-white/12'
                                                : ''
                                        }`}
                                    >
                                        <span className="text-[clamp(1.25rem,2.2vw,1.65rem)] font-semibold tabular-nums tracking-tight text-[#1c0d00] dark:text-[#ffe4c0]">
                                            {s.value}
                                        </span>
                                        <span className="text-[9px] uppercase leading-tight tracking-[0.12em] text-[#1c0d00]/50 dark:text-[#ffe4c0]/45">
                                            {s.label}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex w-full flex-wrap gap-2 justify-center lg:justify-start">
                                <a
                                    href="https://clck.ru/3ReSWQ"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${ctaBaseClass} bg-[#e76d00] text-white flex-1 sm:flex-none`}
                                >
                                    {T.ctaPrimary}
                                </a>

                                <a
                                    href="https://l.kaspi.kz/shop/whCeM8CTjYv3zcY"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${ctaBaseClass} bg-[#f14635] text-white hover:bg-[#d63a2c] flex-1 sm:flex-none`}
                                >
                                    <img
                                        src={KASPI_LOGO}
                                        alt="Kaspi"
                                        className="h-5 w-auto brightness-0 invert"
                                    />
                                    Kaspi.kz
                                </a>

                                <a
                                    href="https://www.instagram.com/birauyl/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${ctaBaseClass} border border-current text-[#1c0d00] dark:text-[#ffe4c0] flex-1 sm:flex-none`}
                                >
                                    {T.ctaSecondary}
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <AnimatePresence initial={false}>
                    {showScrollCue ? (
                        <motion.button
                            key="scroll-cue"
                            type="button"
                            aria-label={T.scrollAria}
                            onClick={() => scrollTo('birauyl-rules')}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.6, delay: cueEverShown ? 0 : 0.9 }}
                            className="absolute bottom-16 left-1/2 z-20 flex flex-col items-center -translate-x-1/2 rounded-full px-4 py-2 text-[#ffe4c0]/85 transition-colors hover:text-[#ffe4c0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffe4c0]/40"
                        >
                            <motion.span
                                aria-hidden
                                className="block text-[10px] font-medium uppercase tracking-[0.22em]"
                                animate={{ y: [0, 6, 0] }}
                                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                {T.scrollCta}
                            </motion.span>
                            <motion.span
                                aria-hidden
                                className="mt-1 flex items-center justify-center"
                                animate={{ y: [0, 6, 0] }}
                                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0.08 }}
                            >
                                <span className="block h-2 w-2 rotate-45 border-b-2 border-r-2 border-current" />
                            </motion.span>
                        </motion.button>
                    ) : null}
                </AnimatePresence>
            </section>

            <section
                id="birauyl-rules"
                ref={(n) => {
                    rulesRef.current = n;
                }}
                className="relative z-20 w-full py-16 lg:py-24"
            >
                <div className="flex flex-col gap-10 md:gap-12">
                    <header className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 text-center sm:px-6 md:gap-6 lg:px-8">
                        <h2 className="text-4xl font-medium tracking-tight text-balance text-[#1c0d00] dark:text-[#ffe4c0] md:text-6xl lg:text-7xl">
                            {T.rulesHeading}
                        </h2>
                    </header>

                    <div className="mx-auto w-full max-w-[min(100%,1100px)] px-6">
                        <div className="mx-auto flex w-full max-w-[1100px] items-start gap-10">
                            <div className="mx-auto flex w-full max-w-[65ch] flex-col gap-8 text-left">
                                {rulesSections.map((s, idx) => {
                                    const id = s.title
                                        ? `birauyl-rules-${slugify(s.title) || 'section'}-${idx}`
                                        : undefined;
                                    return (
                                        <div
                                            key={`${idx}-${s.title}`}
                                            id={id}
                                            className="scroll-mt-28 flex flex-col gap-3"
                                        >
                                            {s.title ? (
                                                <h3 className="text-xl font-semibold tracking-tight text-balance text-[#1c0d00] dark:text-[#ffe4c0] sm:text-2xl">
                                                    {s.title}
                                                </h3>
                                            ) : null}
                                            <div className="aktown-readable mx-auto whitespace-pre-line text-justify hyphens-auto text-pretty text-base leading-[1.9] text-[#1c0d00]/88 dark:text-[#ffe4c0]/85">
                                                {s.body}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <aside className="sticky top-44 hidden w-[220px] shrink-0 self-start lg:block">
                                <nav aria-label="Rules chapters">
                                    <div className="flex flex-col gap-4 text-left">
                                        {toc.map((chapter) => (
                                            <div key={chapter.id} className="flex flex-col gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => scrollTo(chapter.id)}
                                                    className={`text-left text-base font-medium tracking-tight transition-colors ${
                                                        activeId === chapter.id
                                                            ? 'text-[#1c0d00] dark:text-[#ffe4c0]'
                                                            : 'text-[#1c0d00]/55 hover:text-[#1c0d00]/85 dark:text-[#ffe4c0]/55 dark:hover:text-[#ffe4c0]/85'
                                                    }`}
                                                >
                                                    {chapter.label}
                                                </button>

                                                {'children' in chapter && chapter.children?.length ? (
                                                    <div className="ml-3 flex flex-col gap-1 border-l border-black/10 pl-3 dark:border-white/10">
                                                        {chapter.children.map((sub) => (
                                                            <button
                                                                key={sub.id}
                                                                type="button"
                                                                onClick={() => scrollTo(sub.id)}
                                                                className={`text-left text-sm leading-snug transition-colors ${
                                                                    activeId === sub.id
                                                                        ? 'text-[#1c0d00] dark:text-[#ffe4c0]'
                                                                        : 'text-[#1c0d00]/50 hover:text-[#1c0d00]/80 dark:text-[#ffe4c0]/50 dark:hover:text-[#ffe4c0]/80'
                                                                }`}
                                                            >
                                                                {sub.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                ) : null}
                                            </div>
                                        ))}
                                    </div>
                                </nav>
                            </aside>
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="birauyl-cards"
                ref={(n) => {
                    cardsRef.current = n;
                }}
                className="relative z-40"
            >
                <BirAuylCards />
            </section>
        </>
    );
}
