import assert from "node:assert";
import { JSDOM } from 'jsdom';

const dom = new JSDOM();
const document = dom.window.document;

export function logoButton(logoName: string, size: string, attributes: Record<string, string>, styles: Record<string, string>, alt?: string): HTMLElement {
    const a = document.createElement("a");
    // Set attributes from the attributes object
    Object.entries(attributes).forEach(([key, value]) => { a.setAttribute(key, value); });
    Object.entries(styles).forEach(([key, value]) => { (a.style as any)[key] = value; });

    const img = document.createElement('img');
    img.src = `/assets/${logoName}.svg`;
    img.alt = alt || '';
    img.style.width = size;
    a.appendChild(img);
    return a;
}

console.log(document.textContent)