import { JSDOM } from 'jsdom';
const dom = new JSDOM();
const document = dom.window.document;
export function logoButton(logoName, size, attributes, styles, alt) {
    const a = document.createElement("a");
    // Set attributes from the attributes object
    Object.entries(attributes).forEach(([key, value]) => { a.setAttribute(key, value); });
    Object.entries(styles).forEach(([key, value]) => { a.style[key] = value; });
    const img = document.createElement('img');
    img.src = `/assets/${logoName}.svg`;
    img.alt = alt || '';
    img.style.width = size;
    a.appendChild(img);
    return a;
}
console.log(document.textContent);
//# sourceMappingURL=buttons.js.map