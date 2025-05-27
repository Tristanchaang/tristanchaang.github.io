import assert from 'node:assert';
import { getElem, getAllElems, appendChild } from './html.js'
import { toIndexSection } from './header-footer.js';
import { chooseLang } from './lang.js';


/**
 * Set up the page.
 */
async function main(): Promise<void> {

    (window as any).directIndexSection = (tag: string, lang: string = "en"): void => {
        if (window.location.pathname === "/") toIndexSection(tag);
        else window.location.href = (tag==="body") ? `/?lang=${lang}` : `/?lang=${lang}&scroll=${tag.slice(1)}`;
    }

    const params = new URLSearchParams(window.location.search);
    const lang = params.get("lang") ?? "en";

    chooseLang(lang);

    document.addEventListener("DOMContentLoaded", () => {
        const scrollTarget = params.get("scroll");
        if (scrollTarget) toIndexSection("#"+scrollTarget);

        document.querySelectorAll<HTMLAnchorElement>('a:not(.langButton)').forEach(a => {
            const href = a.getAttribute('href');
            if (href && !href.startsWith('javascript:') && !href.startsWith('#')) {
                const url = new URL(href, window.location.origin);
                url.searchParams.set('lang', lang);
                a.setAttribute('href', url.pathname + url.search + url.hash);
            }
            if (a.hasAttribute('onclick')) {
                const onclick = a.getAttribute('onclick');
                if (onclick && onclick.trim().startsWith('directIndexSection(')) {
                    // Replace directIndexSection('tag') with directIndexSection('tag', 'lang')
                    const updatedOnclick = onclick.replace(
                        /directIndexSection\(([^,)]*)\)/,
                        `directIndexSection($1, '${lang}')`
                    );
                    a.setAttribute('onclick', updatedOnclick);
                }
            }
        });
    });

    setTimeout(()=>{
        const theWholeThing: HTMLElement = document.querySelector("body") ?? assert.fail();
        theWholeThing.style.visibility = "visible";
    }, 0)

}

void main();