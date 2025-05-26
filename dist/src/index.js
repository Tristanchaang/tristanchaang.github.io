import assert from 'node:assert';
import { toIndexSection } from './header-footer.js';
import { chooseLang } from './lang.js';
/**
 * Set up the page.
 */
async function main() {
    window.directIndexSection = (tag) => {
        if (window.location.pathname === "/")
            toIndexSection(tag);
        else
            window.location.href = (tag === "body") ? `/` : `/?scroll=${tag.slice(1)}`;
    };
    const params = new URLSearchParams(window.location.search);
    const lang = params.get("lang") ?? "en";
    chooseLang(lang);
    document.addEventListener("DOMContentLoaded", () => {
        const scrollTarget = params.get("scroll");
        if (scrollTarget)
            toIndexSection("#" + scrollTarget);
    });
    setTimeout(() => {
        const theWholeThing = document.querySelector("body") ?? assert.fail();
        theWholeThing.style.visibility = "visible";
    }, 0);
}
void main();
//# sourceMappingURL=index.js.map