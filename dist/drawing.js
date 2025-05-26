import assert from 'node:assert';
const FULL_TURN = 360;
/**
 * Generates a semitransparent hashed color based on the region number. We use
 * HSLA scheme for a more asthetic group of colors.
 *
 * @param regionNumber The number representing the region
 * @param numRegions The number of regions
 * @returns A semitransparent color string in hexadecimal format
 */
function hashedColor(regionNumber, numRegions) {
    const hue = (regionNumber / numRegions) * FULL_TURN;
    const saturation = 70;
    const lightness = 50;
    const alpha = 1;
    return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
}
// Fraction of the box width that the mine should take
const MINE_FRACTION = 0.7;
// Color to draw the mines as
const MINE_COLOR1 = "#000000";
// Width of border in pixels
const BORDER_WIDTH = 4;
// Number of spikes in star
const NUM_SPIKES = 10;
/**
 * Draws the game grid onto the canvas
 * @param canvas The canvas element to draw onto
 * @param grid The valid grid to draw onto the canvas
 */
export function drawBoard(canvas, grid) {
    const n = grid.length;
    for (let row = 0; row < n; row++)
        for (let col = 0; col < n; col++)
            fillSquare(canvas, n, row, col, grid); // fill colors first
    for (let row = 0; row < n; row++)
        for (let col = 0; col < n; col++)
            drawInteriorBorder(canvas, n, row, col, grid); // then overlay
    drawExteriorBorder(canvas);
}
/**
 * Fill the color of a grid element at the given location
 * @param canvas The canvas to draw on
 * @param n The quantity n for the grid size
 * @param row The row (0 indexed) from the top of the element
 * @param col The column (0 indexed) from the left of the element.
 * @param grid The grid of gridElements that we draw from
 */
function fillSquare(canvas, n, row, col, grid) {
    const context = canvas.getContext('2d');
    assert(context, 'unable to get canvas drawing context');
    // save original context settings before we translate and change colors
    context.save();
    // get the correct region
    const { x, y, width, height } = getBounds(canvas, n, row, col);
    // clear this location
    context.clearRect(x, y, width, height);
    // unpack data
    const { region, hasStar } = grid[row]?.[col] ?? assert.fail();
    // set the fill color to represent the region correctly
    const numRegions = new Set(grid.flat().map(cell => cell.region)).size;
    context.fillStyle = hashedColor(region, numRegions);
    context.fillRect(x, y, width, height);
    if (hasStar) {
        // draw star
        context.beginPath();
        const [cx, cy] = [x + width / 2, y + height / 2];
        const [rx, ry] = [width * MINE_FRACTION / 2, height * MINE_FRACTION / 2];
        const step = Math.PI / NUM_SPIKES;
        for (let i = 0; i < 2 * NUM_SPIKES; i++) {
            const angle = i * step;
            const r = i % 2 === 0 ? rx : rx / 2;
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle);
            if (i === 0) {
                context.moveTo(x, y);
            }
            else {
                context.lineTo(x, y);
            }
        }
        context.closePath();
        context.fillStyle = MINE_COLOR1;
        context.fill();
    }
    // restore context settings
    context.restore();
}
/**
 * Draw the interior borders of a square in the grid
 * @param canvas The canvas to draw on
 * @param n The quantity n for the grid size
 * @param row The row (0 indexed) from the top of the element
 * @param col The column (0 indexed) from the left of the element.
 * @param grid The grid of gridElements that we draw from
 */
function drawInteriorBorder(canvas, n, row, col, grid) {
    const context = canvas.getContext('2d');
    assert(context, 'unable to get canvas drawing context');
    // save original context settings before we translate and change colors
    context.save();
    // get the correct region
    const { x, y, width, height } = getBounds(canvas, n, row, col);
    // unpack data
    const { region, hasStar } = grid[row]?.[col] ?? assert.fail();
    // Draw thick borders
    context.beginPath();
    if (col < n - 1 && grid[row]?.[col + 1]?.region !== region) {
        context.moveTo((col + 1) * width, row * height - BORDER_WIDTH / 2);
        context.lineTo((col + 1) * width, (row + 1) * height + BORDER_WIDTH / 2);
    }
    if (row < n - 1 && grid[row + 1]?.[col]?.region !== region) {
        context.moveTo(col * width - BORDER_WIDTH / 2, (row + 1) * height);
        context.lineTo((col + 1) * width + BORDER_WIDTH / 2, (row + 1) * height);
    }
    context.lineWidth = BORDER_WIDTH; // Set the thickness of the line
    context.strokeStyle = '#000000'; // Set the color to black
    context.stroke();
    context.closePath();
    // Draw thin borders
    context.beginPath();
    context.moveTo((col + 1) * width, row * height - BORDER_WIDTH / 2);
    context.lineTo((col + 1) * width, (row + 1) * height + BORDER_WIDTH / 2);
    context.moveTo(col * width - BORDER_WIDTH / 2, (row + 1) * height);
    context.lineTo((col + 1) * width + BORDER_WIDTH / 2, (row + 1) * height);
    context.lineWidth = 1; // Set the thickness of the line
    context.strokeStyle = '#000000'; // Set the color to black
    context.stroke();
    context.closePath();
    // restore context settings
    context.restore();
}
/**
 * Draw the exterior border of the entire board
 * @param canvas The canvas of the board
 */
function drawExteriorBorder(canvas) {
    const context = canvas.getContext('2d');
    assert(context, 'unable to get canvas drawing context');
    // save original context settings before we translate and change colors
    context.save();
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(0, canvas.height);
    context.lineTo(canvas.width, canvas.height);
    context.lineTo(canvas.width, 0);
    context.lineTo(0, 0);
    context.lineWidth = BORDER_WIDTH; // Set the thickness of the line
    context.strokeStyle = '#000000'; // Set the color to black
    context.stroke();
    context.closePath();
    // restore context settings
    context.restore();
}
/**
 * Returns the bounding box of a grid cell on the canvas, relative to the canvas element
 * @param canvas The canvas element itself
 * @param n The grid size
 * @param row The row number
 * @param col The column number
 * @returns The top left x and y coordinates, the width and the height
 */
function getBounds(canvas, n, row, col) {
    const boxWidth = canvas.width / n, boxHeight = canvas.height / n;
    return { x: boxWidth * col, y: boxHeight * row, width: boxWidth, height: boxHeight };
}
//# sourceMappingURL=drawing.js.map