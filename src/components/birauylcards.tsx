'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

import {
    ALL_GAME_CARDS,
    GAME_CARDS_BY_ID,
    GAME_CARD_SETS,
    type GameCard,
    type GameCardSetId,
} from '../data/birauyl-game-cards';
import { t, useLang } from '../i18n';

export type { GameCard, GameCardSetId };
export { ALL_GAME_CARDS, GAME_CARDS_BY_ID, GAME_CARD_SETS };
export { CHARACTER_CARDS, DATYM_BAR_CARDS } from '../data/birauyl-game-cards';

const THUMB_MAX_W = 140;
const THUMB_MAX_H = 210;
const DETAIL_W = 260;
const DETAIL_H = 390;

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type CardDisplay = {
    name: string;
    type: string;
    description: string;
    effect: string;
};

function cardDisplay(card: GameCard, tr: typeof t.ru): CardDisplay {
    const row = tr.birauyl.cards[card.slug];
    const type =
        card.set === 'character'
            ? tr.birauyl.cardTypes.character
            : tr.birauyl.cardTypes.datymBar;
    return {
        name: row.name,
        type,
        description: row.description,
        effect: row.effect,
    };
}

const CardSlot = ({
    card,
    copy,
    isSelected,
    onClick,
}: {
    card: GameCard;
    copy: CardDisplay;
    isSelected: boolean;
    onClick: () => void;
}) => (
    <div
        className="embla__slide shrink-0 flex items-center justify-center cursor-pointer"
        style={{ width: THUMB_MAX_W + 12 }}
        onClick={onClick}
    >
        <img
            src={card.front}
            alt={copy.name}
            draggable={false}
            style={{
                maxWidth: THUMB_MAX_W,
                maxHeight: THUMB_MAX_H,
                width: 'auto',
                height: 'auto',
                display: 'block',
                borderRadius: 6,
                opacity: isSelected ? 0.4 : 1,
                transition: 'opacity 0.2s ease',
            }}
        />
    </div>
);

const FlipCard = ({
    card,
    copy,
    flipHint,
    backAltSuffix,
}: {
    card: GameCard;
    copy: CardDisplay;
    flipHint: string;
    backAltSuffix: string;
}) => {
    const [flipped, setFlipped] = useState(false);
    const [size, setSize] = useState<{ w: number; h: number } | null>(null);

    useEffect(() => {
        setFlipped(false);
        setSize(null);
    }, [card.id]);

    const onFrontLoad = useCallback(
        (e: React.SyntheticEvent<HTMLImageElement>) => {
            const img = e.currentTarget;
            setSize({ w: img.offsetWidth, h: img.offsetHeight });
        },
        []
    );

    const w = size?.w ?? DETAIL_W;
    const h = size?.h ?? DETAIL_H;

    return (
        <div className="flex flex-col items-center gap-3 shrink-0">
            <div style={{ perspective: 1000, width: w, height: h }}>
                <motion.div
                    style={{
                        width: w,
                        height: h,
                        position: 'relative',
                        transformStyle: 'preserve-3d',
                    }}
                    animate={{ rotateY: flipped ? 180 : 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    onClick={() => setFlipped((f) => !f)}
                    className="cursor-pointer"
                >
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                        }}
                    >
                        <img
                            src={card.front}
                            alt={copy.name}
                            draggable={false}
                            onLoad={onFrontLoad}
                            style={{
                                maxWidth: DETAIL_W,
                                maxHeight: DETAIL_H,
                                width: 'auto',
                                height: 'auto',
                                display: 'block',
                                borderRadius: 8,
                            }}
                        />
                    </div>

                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                        }}
                    >
                        <img
                            src={card.back}
                            alt={`${copy.name} — ${backAltSuffix}`}
                            draggable={false}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                display: 'block',
                                borderRadius: 8,
                            }}
                        />
                    </div>
                </motion.div>
            </div>

            <p className="text-[9px] uppercase leading-tight tracking-[0.12em] text-[#1c0d00]/50 dark:text-[#ffe4c0]/45">
                {flipHint}
            </p>
        </div>
    );
};

export default function BirAuylCards() {
    const { tr } = useLang();
    const B = tr.birauyl;

    const totalCards = ALL_GAME_CARDS.length;
    const firstId = ALL_GAME_CARDS[0]?.id ?? '';

    const [selectedId, setSelectedId] = useState<string>(firstId);
    const [centeredIdx, setCenteredIdx] = useState(0);

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'center',
        skipSnaps: true,
        containScroll: false,
        duration: 22,
    });

    useEffect(() => {
        if (!emblaApi || totalCards === 0) return;
        const onSelect = () => {
            const idx = emblaApi.selectedScrollSnap();
            setCenteredIdx(idx);
            const c = ALL_GAME_CARDS[idx];
            if (c) setSelectedId(c.id);
        };
        emblaApi.on('select', onSelect);
        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi, totalCards]);

    const handleCardClick = useCallback(
        (card: GameCard, idx: number) => {
            if (centeredIdx === idx) {
                setSelectedId(card.id);
            } else {
                emblaApi?.scrollTo(idx);
            }
        },
        [centeredIdx, emblaApi]
    );

    const selectedCard = useMemo(
        () => GAME_CARDS_BY_ID.get(selectedId) ?? ALL_GAME_CARDS[0],
        [selectedId]
    );

    if (totalCards === 0 || !selectedCard) {
        return (
            <section className="w-full py-16 lg:py-24 overflow-hidden">
                <div className="aktown-readable mx-auto px-6 text-center text-base leading-[1.65] text-[#1c0d00]/70 dark:text-[#ffe4c0]/65">
                    {B.emptyCards}{' '}
                    <code className="text-xs">
                        {B.emptyCardsHint} src/data/birauyl-game-cards.ts
                    </code>
                    .
                </div>
            </section>
        );
    }

    const selectedCopy = cardDisplay(selectedCard, tr);

    return (
        <section className="w-full py-16 lg:py-24 overflow-hidden">
            <div className="flex flex-col gap-10 md:gap-12">
                <header className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 text-center sm:px-6 md:gap-6 lg:px-8">
                    <h2 className="text-4xl font-medium tracking-tight text-balance text-[#1c0d00] dark:text-[#ffe4c0] md:text-6xl lg:text-7xl">
                        {B.cardsHeading}
                    </h2>
                </header>

                <div ref={emblaRef} className="overflow-hidden">
                    <div className="embla__container flex items-center">
                        {ALL_GAME_CARDS.map((card, idx) => (
                            <CardSlot
                                key={card.id}
                                card={card}
                                copy={cardDisplay(card, tr)}
                                isSelected={selectedId === card.id}
                                onClick={() => handleCardClick(card, idx)}
                            />
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={selectedCard.id}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25, ease: EASE }}
                        className="mx-auto flex w-full max-w-[min(100%,1200px)] flex-col items-center gap-10 px-6 lg:flex-row lg:items-start lg:gap-[clamp(32px,6vw,80px)]"
                    >
                        <FlipCard
                            card={selectedCard}
                            copy={selectedCopy}
                            flipHint={B.flipHint}
                            backAltSuffix={B.backAltSuffix}
                        />
                        <div className="flex w-full min-w-0 max-w-[min(100%,36rem)] flex-col gap-6 text-center lg:max-w-[520px] lg:text-left">
                            <div className="flex flex-col gap-5 items-center lg:items-start">
                                <span className="rounded-full border border-[#e76d00]/20 bg-[#e76d00]/06 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-[#7a3800]/80 dark:border-white/15 dark:bg-white/5 dark:text-[#ffe4c0]/55">
                                    {selectedCopy.type}
                                </span>
                                <h3 className="text-[clamp(1.25rem,2.2vw,1.65rem)] font-semibold tracking-tight text-balance text-[#1c0d00] dark:text-[#ffe4c0]">
                                    {selectedCopy.name}
                                </h3>
                            </div>
                            <p className="aktown-readable mx-auto max-w-[90%] text-pretty text-base leading-[1.65] text-[#1c0d00]/88 sm:text-base lg:mx-0 lg:max-w-full dark:text-[#ffe4c0]/85">
                                {selectedCopy.description}
                            </p>
                            <div className="aktown-readable mx-auto max-w-[90%] rounded-xl border border-[#e76d00]/15 bg-[#e76d00]/05 px-4 py-4 text-left sm:px-5 sm:py-4 lg:mx-0 lg:max-w-full dark:border-[#e76d00]/20 dark:bg-[#e76d00]/08">
                                <p className="text-base leading-[1.65] text-[#1c0d00]/88 dark:text-[#ffe4c0]/85">
                                    {selectedCopy.effect}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
