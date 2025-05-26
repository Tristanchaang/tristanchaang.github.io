import { toIndexSection } from './header-footer.js';
window.directIndexSection = (tag) => {
    if (window.location.pathname === "/")
        toIndexSection(tag);
    else
        window.location.href = (tag === "body") ? `/` : `/?scroll=${tag.slice(1)}`;
};
/**
 * Set up the page.
 */
async function main() {
    document.addEventListener("DOMContentLoaded", () => {
        const params = new URLSearchParams(window.location.search);
        const scrollTarget = params.get("scroll");
        if (scrollTarget)
            toIndexSection("#" + scrollTarget);
    });
}
void main();
//# sourceMappingURL=index.js.map