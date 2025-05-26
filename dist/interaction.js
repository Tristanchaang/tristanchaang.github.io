import { Coord } from './puzzle.js';
import { drawBoard } from './drawing.js';
import assert from 'node:assert';
const API_URL = `http://localhost:8789`;
/**
 * Requests a blank puzzle from the server  on port 8789
 *
 * @param filename name of the file in /puzzles directory to be requested,
 * without extension
 * @returns a representation of the puzzle stored in the file
 * @throws an error if the filename is invalid or contains an unparsable puzzle format
 */
export async function requestPuzzle(filename) {
    const res = await fetch(`${API_URL}/puzzle/${filename}.starb`);
    if (!res.ok) {
        throw new Error(`${res.status}`);
    }
    const puzzleStr = await res.text();
    return puzzleStr;
}
/**
 * Handles a click event made on the StarBattle game board. Adds
 * a star if the tile corresponding to the click is empty, otherwise
 * removes the star that was previously displayed at the tile
 *
 * @param canvas the drawing of the puzzle game board displayed to the client
 * @param grid the game board to add a remove a star from
 * @param x the location of the click on the x-axis
 * @param y the location of the click on the y-axis
 * @param client Client ADT that handles this click event, where the client's
 * list of placed stars is updated to reflect added or removed stars
 */
export function click(canvas, grid, x, y, client) {
    const n = grid.length;
    const boxWidth = canvas.width / n;
    const boxHeight = canvas.height / n;
    const col = Math.floor(x / boxWidth);
    const row = Math.floor(y / boxHeight);
    const clickedGridElement = grid[row]?.[col] ?? assert.fail('must be in range');
    const currCoord = new Coord(row, col, n);
    if (client.placedStars.has(currCoord)) {
        client.removeStar(currCoord);
    }
    else {
        client.placeStar(currCoord);
    }
    clickedGridElement.hasStar = !clickedGridElement.hasStar;
    drawBoard(canvas, grid);
}
//# sourceMappingURL=interaction.js.map