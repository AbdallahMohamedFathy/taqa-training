/**
 * Cleans a name typed on a phone before it is stored.
 *
 * Arabic keyboards put tashkeel on the shifted letter keys, so a stray fatha or
 * tatweel rides along without the typist seeing it. Those marks then surface as
 * specks over the printed attendance sheet, and an invisible bidi control can
 * reorder a mixed Arabic/Latin department so it reads backwards.
 *
 * Only combining marks and invisible controls are removed. The hamza letters
 * (أ إ آ ؤ ئ ء) are real letters and are left alone — NFC first folds any
 * decomposed form back into them so they survive the strip.
 */
export function cleanText(input: string): string {
  return input
    .normalize("NFC")
    // zero-width joiners/spaces and explicit bidi overrides
    .replace(/[​-‏‪-‮⁦-⁩﻿]/g, "")
    // tashkeel: fathatan … sukun, plus superscript alef
    .replace(/[ً-ْٰ]/g, "")
    // tatweel — decorative letter stretching, never part of a name
    .replace(/ـ/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
