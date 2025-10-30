import assert from 'node:assert';

export function getElem(tag: string, parent: Document | HTMLElement = document): HTMLElement {
    return parent.querySelector(tag) ?? assert.fail("No element found");
}

export function getAllElems(tag: string, parent: Document | HTMLElement = document): NodeListOf<HTMLElement> {
    return parent.querySelectorAll(tag) ?? assert.fail("No elements found");
}

/**
 * Creates an element with the specified tag, sets its inner HTML, applies optional attributes,
 * and appends it as a child to the given parent element or document.
 * @param tag The tag name for the new element.
 * @param html The HTML string to set as the element's inner content.
 * @param parent The parent element or document to append the new element to. Defaults to document.
 * @param attributes Optional attributes to set on the new element.
 * @returns The appended child element.
 */
export function appendChild(tag: string, html: string, 
    parent: HTMLElement | Document = document, 
    attributes?: {[key:string]: string}
): HTMLElement {
    const child = document.createElement(tag);
    child.innerHTML = html.trim();
    if (attributes !== undefined) {
        for (const [key, value] of Object.entries(attributes)) { 
            child.setAttribute(key, value); 
        }
    }
    parent.appendChild(child);
    return child;
}