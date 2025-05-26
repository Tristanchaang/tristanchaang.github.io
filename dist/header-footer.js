import { getElem, appendChild } from './html.js';
const NAVBAR_TABS = {
    About: "about",
    Materials: "materials",
    MIT: "mitnotes",
    Games: "games"
};
const SOCMED = {
    github: "https://github.com/Tristanchaang",
    youtube: "https://www.youtube.com/016tristan",
    linkedin: "https://www.linkedin.com/in/tchaang/"
};
export function toSection(tag) {
    getElem(tag).scrollIntoView({ behavior: 'smooth' });
}
export function createHeader() {
    const navElem = getElem("nav");
    appendChild("a", "Tristan Chaang's Page", navElem, { onclick: `toSection("body")`, style: "font-size: 1.5rem; cursor: pointer" });
    const navMenu = appendChild("div", "", navElem, { id: "navmenu", style: "display: flex; gap: 20px;" });
    for (const [tabname, link] of Object.entries(NAVBAR_TABS))
        appendChild("a", tabname, navMenu, { onclick: `toSection("#${link}")`, style: 'cursor: pointer' });
}
export function createFooter() {
    const socMedElem = appendChild("div", "", getElem("footer"), { id: "socmed" });
    for (const [platform, link] of Object.entries(SOCMED))
        appendChild("a", `<img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${platform}.svg" alt="${platform}" width="24" height="24">`, socMedElem, { href: link, target: "_blank" });
}
//# sourceMappingURL=header-footer.js.map