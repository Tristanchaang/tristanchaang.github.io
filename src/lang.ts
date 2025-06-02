
export const LANGS = ["en", "my", "zh", "hk", "fr", "jp"];

export function chooseLang(lang: string): void {
    document.querySelectorAll<HTMLElement>('[lang]').forEach(el => {
        if (el.getAttribute('lang') !== lang) {
            el.remove();
        }
    });
}