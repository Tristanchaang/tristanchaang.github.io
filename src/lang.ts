


export function chooseLang(lang: string): void {
    document.querySelectorAll<HTMLElement>('[lang]').forEach(el => {
        if (el.getAttribute('lang') !== lang) {
            el.remove();
        }
    });
}