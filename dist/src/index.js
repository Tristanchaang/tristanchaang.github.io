import assert from 'node:assert';
import { toIndexSection } from './header-footer.js';
import { LANGS } from './lang.js';
/**
 * Set up the page.
 */
async function main() {
    window.directIndexSection = (tag, lang = "en") => {
        if (LANGS.includes(window.location.pathname.split('/')[1] ?? assert.fail())) {
            toIndexSection(tag);
        }
        else
            window.location.href = (lang === "en" ? `/` : `/${lang}/`) + (tag === "body") ? `` : `&scroll=${tag.slice(1)}`;
    };
    const params = new URLSearchParams(window.location.search);
    const pathLang = window.location.pathname.split('/')[1] ?? "";
    const lang = pathLang && LANGS.includes(pathLang) ? pathLang : "en";
    // chooseLang(lang);
    document.addEventListener("DOMContentLoaded", () => {
        const scrollTarget = params.get("scroll");
        if (scrollTarget)
            toIndexSection("#" + scrollTarget);
        document.querySelectorAll('.local').forEach(a => {
            const href = a.getAttribute('href');
            if (href && !href.startsWith('javascript:') && !href.startsWith('#')) {
                // const url = new URL(href, window.location.origin);
                // url.searchParams.set('lang', lang);
                a.setAttribute('href', (lang === "en" ? `` : `/${lang}`) + href);
            }
            if (a.hasAttribute('onclick')) {
                const onclick = a.getAttribute('onclick');
                if (onclick && onclick.trim().startsWith('directIndexSection(')) {
                    // Replace directIndexSection('tag') with directIndexSection('tag', 'lang')
                    const updatedOnclick = onclick.replace(/directIndexSection\(([^,)]*)\)/, `directIndexSection($1, '${lang}')`);
                    a.setAttribute('onclick', updatedOnclick);
                }
            }
        });
        document.querySelectorAll('.langButton').forEach(a => {
            const dLang = a.getAttribute('href') ?? assert.fail();
            if (LANGS.includes(pathLang))
                a.setAttribute('href', (dLang === "en" ? `` : `/${dLang}`) + window.location.pathname.slice(3));
            else
                a.setAttribute('href', (dLang === "en" ? `` : `/${dLang}`) + window.location.pathname);
        });
    });
    setTimeout(() => {
        const theWholeThing = document.querySelector("body") ?? assert.fail();
        theWholeThing.style.visibility = "visible";
    }, 0);
}
void main();
//# sourceMappingURL=index.js.map