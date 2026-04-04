'use client';

import { motion } from 'framer-motion';
import { useNavigate } from '@tanstack/react-router';

import BirAuylLogo from '../assets/birauyl-logo.png';
import BirAuylBgVideo from '../assets/birauyl-bg-loop.webm';
import BoxVideo from '../assets/birauyl-box-loop.webm';

import Navbar from './navbar';
import { useLang } from '../i18n';
import BirAuylCards from './birauylcards';

const POSTER_BG  = '/placeholders/birauyl-bg-poster.jpg';
const POSTER_BOX = '/placeholders/birauyl-box-poster.jpg';

const PLACEHOLDER_PRIMARY_URL   = 'PLACEHOLDER_PRIMARY_URL';
const PLACEHOLDER_SECONDARY_URL = 'PLACEHOLDER_SECONDARY_URL';

const ctaBaseClass =
    'inline-flex items-center justify-center min-h-11 px-6 rounded-full text-sm font-medium tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e76d00]/40';

export default function BirAuyl() {
    const navigate = useNavigate();
    const { tr } = useLang();
    const T = tr.birauyl;

    return (
        <>
            <Navbar onLogoClick={() => navigate({ to: '/' })} />
            <div className="relative box-border flex min-h-screen w-full items-center justify-center overflow-x-hidden bg-[#2a1200] pt-20 pb-20 px-6">

                <video
                    autoPlay muted loop playsInline
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
                            autoPlay muted loop playsInline
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
                        <div className="
                            flex w-full flex-col items-center gap-6 rounded-3xl px-6 py-8 sm:px-8 sm:py-9
                            border border-[#e76d00]/15
                            bg-white/90
                            shadow-[0_12px_48px_rgba(140,60,0,0.16)]
                            backdrop-blur-sm
                            dark:border-white/10
                            dark:bg-black/[0.30]
                            dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)]
                            dark:backdrop-blur-xl
                        ">
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

                            <p className="aktown-readable mx-auto max-w-[90%] text-pretty text-base leading-[1.65] text-[#1c0d00]/88 sm:text-base lg:mx-0 lg:max-w-full dark:text-[#ffe4c0]/85">
                                {T.description}
                            </p>

                            <div className="grid w-full grid-cols-3 gap-3 border-y border-[#e76d00]/15 py-6 sm:gap-4 sm:py-7 dark:border-white/12">
                                {[
                                    { value: '6–20', label: T.statPlayers },
                                    { value: '20м',  label: T.statTime    },
                                    { value: '12+',  label: T.statAge     },
                                ].map((s, i) => (
                                    <div
                                        key={s.label}
                                        className={`flex min-w-0 flex-col gap-1 text-center lg:text-left ${
                                            i > 0 ? 'border-l border-[#e76d00]/15 pl-3 sm:pl-4 dark:border-white/12' : ''
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

                            <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                                <a
                                    href={PLACEHOLDER_PRIMARY_URL}
                                    className={`${ctaBaseClass} bg-[#e76d00] text-white hover:bg-[#c85e00]`}
                                >
                                    {T.ctaPrimary}
                                </a>
                                <a
                                    href={PLACEHOLDER_SECONDARY_URL}
                                    className={`${ctaBaseClass} border border-[#1c0d00]/20 bg-transparent text-[#1c0d00] hover:bg-[#1c0d00]/05 dark:border-white/20 dark:bg-white/5 dark:text-[#ffe4c0] dark:hover:bg-white/10`}
                                >
                                    {T.ctaSecondary}
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <BirAuylCards />
        </>
    );
}