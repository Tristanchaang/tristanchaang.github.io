import assert from 'node:assert';
import { getElem, getAllElems, appendChild } from './html.js'
import { toIndexSection } from './header-footer.js';

(window as any).directIndexSection = (tag: string): void => {
    if (window.location.pathname === "/") toIndexSection(tag);
    else window.location.href = (tag==="body") ? `/` : `/?scroll=${tag.slice(1)}`;
}

/**
 * Set up the page.
 */
async function main(): Promise<void> {

    document.addEventListener("DOMContentLoaded", () => {
        const params = new URLSearchParams(window.location.search);
        const scrollTarget = params.get("scroll");
        if (scrollTarget) toIndexSection("#"+scrollTarget);
    });

}

void main();