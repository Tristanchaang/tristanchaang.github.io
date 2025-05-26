import { getElem } from './html.js';
export function toIndexSection(tag) {
    const element = getElem(tag);
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - 80;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
}
//# sourceMappingURL=header-footer.js.map