/* Copyright (c) 2021-23 MIT 6.102/6.031 course staff, all rights reserved.
 * Redistribution of original or derived work requires permission of course staff.
 */
// This code is loaded into example-page.html, see the `npm watch-example` script.
// Remember that you will *not* be able to use Node APIs like `fs` in the web browser,
//   with the exception of node:assert.
import assert from 'node:assert';
const BOX_SIZE = 16;
// categorical colors from
// https://github.com/d3/d3-scale-chromatic/tree/v2.0.0#schemeCategory10
const COLORS = [
    '#1f77b4',
    '#ff7f0e',
    '#2ca02c',
    '#d62728',
    '#9467bd',
    '#8c564b',
    '#e377c2',
    '#7f7f7f',
    '#bcbd22',
    '#17becf',
];
// semitransparent versions of those colors
const BACKGROUNDS = COLORS.map((color) => color + '60');
/**
 * Draw a black square filled with a random color.
 *
 * Note: this function is designed to draw on a <canvas> element in the browser,
 *   but we can adjust its signature so that it can be tested with Mocha in Node.
 *   See "How to test: canvas drawing" on the *Testing* page of the project handout.
 *
 * @param canvas canvas to draw on
 * @param x x position of center of box
 * @param y y position of center of box
 */
function drawBox(canvas, x, y) {
    const context = canvas.getContext('2d');
    assert(context, 'unable to get canvas drawing context');
    // save original context settings before we translate and change colors
    context.save();
    // translate the coordinate system of the drawing context:
    //   the origin of `context` will now be (x,y)
    context.translate(x, y);
    // draw the outer outline box centered on the origin (which is now (x,y))
    context.strokeStyle = 'black';
    context.lineWidth = 2;
    context.strokeRect(-BOX_SIZE / 2, -BOX_SIZE / 2, BOX_SIZE, BOX_SIZE);
    // fill with a random semitransparent color
    context.fillStyle = BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)] ?? assert.fail();
    context.fillRect(-BOX_SIZE / 2, -BOX_SIZE / 2, BOX_SIZE, BOX_SIZE);
    // reset the origin and styles back to defaults
    context.restore();
}
/**
 * Print a message by appending it to an HTML element.
 *
 * @param outputArea HTML element that should display the message
 * @param message message to display
 */
function printOutput(outputArea, message) {
    // append the message to the output area
    outputArea.innerText += message + '\n';
    // scroll the output area so that what we just printed is visible
    outputArea.scrollTop = outputArea.scrollHeight;
}
/**
 * Set up the example page.
 */
function main() {
    // output area for printing
    const outputArea = document.getElementById('outputArea') ?? assert.fail('missing output area');
    // canvas for drawing
    const canvas = document.getElementById('canvas');
    if (!(canvas instanceof HTMLCanvasElement)) {
        assert.fail('missing drawing canvas');
    }
    // when the user clicks on the drawing canvas...
    canvas.addEventListener('click', (event) => {
        drawBox(canvas, event.offsetX, event.offsetY);
    });
    // add initial instructions to the output area
    printOutput(outputArea, `Click in the canvas above to draw a box centered at that point`);
}
main();
//# sourceMappingURL=example-page.js.map