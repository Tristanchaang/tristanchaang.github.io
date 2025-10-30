import assert from 'node:assert';
import { getElem, getAllElems, appendChild } from './html.js'

export function toIndexSection(tag: string): void {
    const element = getElem(tag);
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - 80;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
}