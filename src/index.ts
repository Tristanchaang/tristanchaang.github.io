import assert from 'node:assert';
import { getElem, getAllElems, appendChild } from './html.js'
import { toIndexSection } from './header-footer.js';
import { chooseLang } from './lang.js';


/**
 * Set up the page.
 */
async function main(): Promise<void> {

    (window as any).directIndexSection = (tag: string): void => {
        if (window.location.pathname === "/") toIndexSection(tag);
        else window.location.href = (tag==="body") ? `/` : `/?scroll=${tag.slice(1)}`;
    }

    const params = new URLSearchParams(window.location.search);
    const lang = params.get("lang") ?? "en";

    chooseLang(lang);

    document.addEventListener("DOMContentLoaded", () => {
        const scrollTarget = params.get("scroll");
        if (scrollTarget) toIndexSection("#"+scrollTarget);
    });

    setTimeout(()=>{
        const theWholeThing: HTMLElement = document.querySelector("body") ?? assert.fail();
        theWholeThing.style.visibility = "visible";
    }, 0)

}

void main();