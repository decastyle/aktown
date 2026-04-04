import characterCardsBack from "../assets/character_cards/cards_back.png";

import albasty from "../assets/character_cards/albasty.png";
import aldarKose from "../assets/character_cards/aldar_kose.png";
import baqsy from "../assets/character_cards/baqsy.png";
import basSatqyn from "../assets/character_cards/bas_satqyn.png";
import batyr from "../assets/character_cards/batyr.png";
import bayanSulu from "../assets/character_cards/bayan_sulu.png";
import koshpendi from "../assets/character_cards/koshpendi.png";
import qaraHalyq1 from "../assets/character_cards/qara_halyq_1.png";
import qaraHalyq2 from "../assets/character_cards/qara_halyq_2.png";
import qaraHalyq3 from "../assets/character_cards/qara_halyq_3.png";
import satqyn1 from "../assets/character_cards/satqyn_1.png";
import satqyn2 from "../assets/character_cards/satqyn_2.png";
import satqyn3 from "../assets/character_cards/satqyn_3.png";
import zheztyrnaq from "../assets/character_cards/zheztyrnaq.png";

import aiTuarTuni from "../assets/datym_bar_cards/ai_tuar_tuni.png";
import aitysker from "../assets/datym_bar_cards/aitysker.png";
import alastau from "../assets/datym_bar_cards/alastau.png";
import aqiqatOrnasyn from "../assets/datym_bar_cards/aqiqat_ornasyn.png";
import aqsaqalBatasy from "../assets/datym_bar_cards/aqsaqal_batasy.png";
import aruaq from "../assets/datym_bar_cards/aruaq.png";
import ataqtyBoldyn from "../assets/datym_bar_cards/ataqty_boldyn.png";
import ayan from "../assets/datym_bar_cards/ayan.png";
import baqytQusyQondy from "../assets/datym_bar_cards/baqyt_qusy_qondy.png";
import biLauazymnynQuttyBolsyn from "../assets/datym_bar_cards/bi_lauazymnyn_qutty_bolsyn.png";
import datymBar from "../assets/datym_bar_cards/datym_bar.png";
import hanBuirygy1 from "../assets/datym_bar_cards/han_buirygy_1.png";
import hanBuirygy2 from "../assets/datym_bar_cards/han_buirygy_2.png";
import jalganOsek from "../assets/datym_bar_cards/jalgan_osek.png";
import nauryz from "../assets/datym_bar_cards/nauryz.png";
import qadyrTuni from "../assets/datym_bar_cards/qadyr_tuni.png";
import qaraBoran from "../assets/datym_bar_cards/qara_boran.png";
import qupiaKenes from "../assets/datym_bar_cards/qupia_kenes.png";
import quttyQonaq from "../assets/datym_bar_cards/qutty_qonaq.png";
import tungiKuzet from "../assets/datym_bar_cards/tungi_kuzet.png";
import zulymdyqTuni from "../assets/datym_bar_cards/zulymdyq_tuni.png";

import type { BirAuylCardSlug } from "../i18n/birauyl-cards";

const BACK = characterCardsBack;

export type GameCardSetId = "character" | "datym_bar";

export interface GameCard {
  id:    string;
  set:   GameCardSetId;
  slug:  BirAuylCardSlug;
  front: string;
  back:  string;
}

/** Персонажи и карты сюжета (character_cards), порядок — как в массиве */
export const CHARACTER_CARDS: readonly GameCard[] = [
  { id: "character:albasty",    set: "character", slug: "albasty",    front: albasty,    back: BACK },
  { id: "character:aldar_kose", set: "character", slug: "aldar_kose", front: aldarKose,  back: BACK },
  { id: "character:baqsy",      set: "character", slug: "baqsy",      front: baqsy,      back: BACK },
  { id: "character:bas_satqyn", set: "character", slug: "bas_satqyn", front: basSatqyn,  back: BACK },
  { id: "character:batyr",      set: "character", slug: "batyr",      front: batyr,      back: BACK },
  { id: "character:bayan_sulu", set: "character", slug: "bayan_sulu", front: bayanSulu,  back: BACK },
  { id: "character:koshpendi",  set: "character", slug: "koshpendi",  front: koshpendi,  back: BACK },
  { id: "character:qara_halyq_1", set: "character", slug: "qara_halyq_1", front: qaraHalyq1, back: BACK },
  { id: "character:qara_halyq_2", set: "character", slug: "qara_halyq_2", front: qaraHalyq2, back: BACK },
  { id: "character:qara_halyq_3", set: "character", slug: "qara_halyq_3", front: qaraHalyq3, back: BACK },
  { id: "character:satqyn_1",   set: "character", slug: "satqyn_1",   front: satqyn1,    back: BACK },
  { id: "character:satqyn_2",   set: "character", slug: "satqyn_2",   front: satqyn2,    back: BACK },
  { id: "character:satqyn_3",   set: "character", slug: "satqyn_3",   front: satqyn3,    back: BACK },
  { id: "character:zheztyrnaq", set: "character", slug: "zheztyrnaq", front: zheztyrnaq, back: BACK },
] as const;

export const DATYM_BAR_CARDS: readonly GameCard[] = [
  { id: "datym_bar:ai_tuar_tuni", set: "datym_bar", slug: "ai_tuar_tuni", front: aiTuarTuni, back: BACK },
  { id: "datym_bar:aitysker",     set: "datym_bar", slug: "aitysker",     front: aitysker,     back: BACK },
  { id: "datym_bar:alastau",      set: "datym_bar", slug: "alastau",      front: alastau,      back: BACK },
  { id: "datym_bar:aqiqat_ornasyn", set: "datym_bar", slug: "aqiqat_ornasyn", front: aqiqatOrnasyn, back: BACK },
  { id: "datym_bar:aqsaqal_batasy", set: "datym_bar", slug: "aqsaqal_batasy", front: aqsaqalBatasy, back: BACK },
  { id: "datym_bar:aruaq",        set: "datym_bar", slug: "aruaq",        front: aruaq,        back: BACK },
  { id: "datym_bar:ataqty_boldyn", set: "datym_bar", slug: "ataqty_boldyn", front: ataqtyBoldyn, back: BACK },
  { id: "datym_bar:ayan",         set: "datym_bar", slug: "ayan",         front: ayan,         back: BACK },
  { id: "datym_bar:baqyt_qusy_qondy", set: "datym_bar", slug: "baqyt_qusy_qondy", front: baqytQusyQondy, back: BACK },
  {
    id:   "datym_bar:bi_lauazymnyn_qutty_bolsyn",
    set:  "datym_bar",
    slug: "bi_lauazymnyn_qutty_bolsyn",
    front: biLauazymnynQuttyBolsyn,
    back:  BACK,
  },
  { id: "datym_bar:datym_bar",    set: "datym_bar", slug: "datym_bar",    front: datymBar,    back: BACK },
  { id: "datym_bar:han_buirygy_1", set: "datym_bar", slug: "han_buirygy_1", front: hanBuirygy1, back: BACK },
  { id: "datym_bar:han_buirygy_2", set: "datym_bar", slug: "han_buirygy_2", front: hanBuirygy2, back: BACK },
  { id: "datym_bar:jalgan_osek",  set: "datym_bar", slug: "jalgan_osek",  front: jalganOsek,  back: BACK },
  { id: "datym_bar:nauryz",       set: "datym_bar", slug: "nauryz",       front: nauryz,       back: BACK },
  { id: "datym_bar:qadyr_tuni",   set: "datym_bar", slug: "qadyr_tuni",   front: qadyrTuni,   back: BACK },
  { id: "datym_bar:qara_boran",   set: "datym_bar", slug: "qara_boran",   front: qaraBoran,   back: BACK },
  { id: "datym_bar:qupia_kenes",  set: "datym_bar", slug: "qupia_kenes",  front: qupiaKenes,  back: BACK },
  { id: "datym_bar:qutty_qonaq",  set: "datym_bar", slug: "qutty_qonaq",  front: quttyQonaq,  back: BACK },
  { id: "datym_bar:tungi_kuzet",  set: "datym_bar", slug: "tungi_kuzet",  front: tungiKuzet,  back: BACK },
  { id: "datym_bar:zulymdyq_tuni", set: "datym_bar", slug: "zulymdyq_tuni", front: zulymdyqTuni, back: BACK },
] as const;

export const GAME_CARD_SETS: Readonly<Record<GameCardSetId, readonly GameCard[]>> = {
  character: CHARACTER_CARDS,
  datym_bar: DATYM_BAR_CARDS,
};

export const ALL_GAME_CARDS: readonly GameCard[] = [
  ...CHARACTER_CARDS,
  ...DATYM_BAR_CARDS,
];

export const GAME_CARDS_BY_ID: ReadonlyMap<string, GameCard> = new Map(
  ALL_GAME_CARDS.map(c => [c.id, c]),
);
