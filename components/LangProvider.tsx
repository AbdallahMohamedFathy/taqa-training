"use client";

import { createContext, useContext } from "react";
import { DEFAULT_LANG, getDict, type Dict, type Lang } from "@/lib/i18n";

const LangContext = createContext<{ lang: Lang; t: Dict }>({
  lang: DEFAULT_LANG,
  t: getDict(DEFAULT_LANG),
});

export function LangProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  return (
    <LangContext.Provider value={{ lang, t: getDict(lang) }}>
      {children}
    </LangContext.Provider>
  );
}

/** Translations for client components. Server components use `getT()`. */
export function useLang() {
  return useContext(LangContext);
}
