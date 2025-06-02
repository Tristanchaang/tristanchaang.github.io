export const LANGS = ["en", "my", "zh", "hk", "fr", "jp"];
export function chooseLang(lang) {
    document.querySelectorAll('[lang]').forEach(el => {
        if (el.getAttribute('lang') !== lang) {
            el.remove();
        }
    });
}
//# sourceMappingURL=lang.js.map