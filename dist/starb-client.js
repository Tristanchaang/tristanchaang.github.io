/* Copyright (c) 2021-23 MIT 6.102/6.031 course staff, all rights reserved.
 * Redistribution of original or derived work requires permission of course staff.
 */
// This code is loaded into starb-client.html, see the `npm compile` and
//   `npm watch-client` scripts.
// Remember that you will *not* be able to use Node APIs like `fs` in the web browser,
//   with the exception of node:assert.
import assert from 'node:assert';
import { drawBoard } from './drawing.js';
import { click, requestPuzzle } from './interaction.js';
import { GameState } from './puzzle.js';
import { Client } from './client.js';
import { parse } from './parser.js';
/**
 * Puzzle to request and play.
 * Project instructions: this constant is a [for now] requirement in the project spec.
 */
const PUZZLE = "kd-1-1-1";
// see example-page.ts for an example of an interactive web page
/**
 * Set up the example page.
 */
async function main() {
    // output area for printing
    let GRID;
    const client = new Client();
    const outputArea = document.getElementById('outputArea') ?? assert.fail('missing output area');
    // canvas for drawing
    const canvas = document.getElementById('canvas');
    if (!(canvas instanceof HTMLCanvasElement)) {
        assert.fail('missing drawing canvas');
    }
    //when the user clicks on the drawing canvas...
    document.getElementById('newPuzzleButton')?.addEventListener('click', (event) => {
        const inputBox = document.getElementById("puzzleChoice");
        assert(inputBox instanceof HTMLInputElement);
        void requestPuzzle(inputBox.value).then(
        // on fulfilled
        (puzzleData) => {
            const puzzle = parse(puzzleData);
            outputArea.textContent = `Puzzle (${inputBox.value}) fetched!\n`;
            client.setPuzzle(puzzle);
            GRID = client.toGrid();
            drawBoard(canvas, GRID);
        }, 
        // on rejected
        (e) => {
            outputArea.textContent = `Error: Failed to fetch puzzle (${e})\n`;
        });
    });
    canvas.addEventListener('click', (event) => {
        if (GRID !== undefined) {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            const x = (event.clientX - rect.left) * scaleX;
            const y = (event.clientY - rect.top) * scaleY;
            // this function mutates the client and so will trigger state updates
            click(canvas, GRID, x, y, client);
            if (client.state === GameState.Illegal) {
                canvas.style.borderColor = "red";
            }
            else if (client.state === GameState.Correct) {
                canvas.style.borderColor = "green";
                outputArea.textContent = `Puzzle solved!\n`;
            }
            else {
                canvas.style.borderColor = "black";
            }
        }
    });
}
void main();
//# sourceMappingURL=starb-client.js.map