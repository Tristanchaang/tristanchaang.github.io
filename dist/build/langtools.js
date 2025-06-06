import assert from "assert";
export const LANGS = ["en", "my", "zh", "hk", "fr", "jp"];
/**
 * Generates an HTML string containing each translation wrapped in a <comp> with the appropriate language attribute.
 *
 * @param langs - An object containing translations for each supported language.
 * @param comp - HTML component name.
 * @returns A string of HTML with each translation wrapped in a <comp lang="..."> element.
 */
export function componentLang(langs, comp, delimiter) {
    return Object.entries(langs).map(([lang, next]) => `<${comp} lang="${lang}">${next}</${comp}>`).join(delimiter ?? "");
}
/**
 * Generates an HTML string containing each translation wrapped in a <span> with the appropriate language attribute.
 *
 * @param langs - An object containing translations for each supported language.
 * @returns A string of HTML with each translation wrapped in a <span lang="..."> element.
 */
export function spanLang(langs) {
    return componentLang(langs, "span");
}
/**
 * Returns a formatted date string into all 6 languages.
 *
 * Supported languages:
 * - "en": English (e.g., "Jan 1, 2024")
 * - "my": Malay (e.g., "1 Januari 2024")
 * - "zh": Simplified Chinese (e.g., "2024年1月1日")
 * - "hk": Traditional Chinese (e.g., "2024年1月1日")
 * - "fr": French (e.g., "1 janv. 2024")
 * - "jp": Japanese (e.g., "2024年1月1日")
 *
 * @param date - The date to format.
 * @param lang - The language code for formatting.
 * @returns LangString of the formatted date string in all 6 languages.
 */
export function dateLangs(date) {
    const engMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const malayMonths = ["Januari", "Februari", "Mac", "April", "Mei", "Jun", "Julai", "Ogos", "September", "Oktober", "November", "Disember"];
    const frenchMonths = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
    return {
        en: `${engMonths[date.getMonth()]} ${date.getDate() + 1}, ${date.getFullYear()}`,
        my: `${date.getDate() + 1} ${malayMonths[date.getMonth()]} ${date.getFullYear()}`,
        zh: `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate() + 1}日`,
        hk: `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate() + 1}日`,
        fr: `${date.getDate() + 1} ${frenchMonths[date.getMonth()]} ${date.getFullYear()}`,
        jp: `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate() + 1}日`
    };
}
/**
 * @param ls Original LangString
 * @param func function for mapping
 * @returns LangString {en: func("en", ls.en), ...}
 */
export function langMap(ls, func) {
    return {
        en: func("en", ls.en),
        my: func("my", ls.my),
        zh: func("zh", ls.zh),
        hk: func("hk", ls.hk),
        fr: func("fr", ls.fr),
        jp: func("jp", ls.jp),
    };
}
/**
 * Promise to return {en: func("en"), ...} where each func is asynchronous and run concurrently
 * @param func
 * @returns Promise({en: func("en"), ...})
 */
export async function langPromise(func) {
    const returnedStrings = { en: "", my: "", zh: "", hk: "", fr: "", jp: "" };
    const mdContentList = await Promise.all(LANGS.map(func));
    LANGS.forEach((lang, i) => {
        returnedStrings[lang] = mdContentList[i] ?? assert.fail();
    });
    return returnedStrings;
}
//# sourceMappingURL=langtools.js.map