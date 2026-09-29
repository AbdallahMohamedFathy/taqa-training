import { cookies } from "next/headers";
import { DEFAULT_LANG, getDict, isLang, LANG_COOKIE, type Lang } from "./i18n";

/** Reads the language the visitor picked. Server components only. */
export async function getLang(): Promise<Lang> {
  const value = (await cookies()).get(LANG_COOKIE)?.value;
  return isLang(value) ? value : DEFAULT_LANG;
}

export async function getT() {
  return getDict(await getLang());
}
