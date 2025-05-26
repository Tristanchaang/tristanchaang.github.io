// Classes for the client implementation
import assert from 'node:assert';
import { CoordSet, GameState } from './puzzle.js';
/**
 * The mutable Client ADT exposes the full current state of the client. This
 * includes information such as:
 *  - information on the progress of the game (see ClientState)
 *  - An empty puzzle, which the user is placing mines onto
 *  - The set of mines currently placed onto the puzzle
 */
export class Client {
    // RI: puzzle.placedMines is empty
    _state = GameState.NoPuzzle;
    _placedStars = undefined;
    _puzzle = undefined;
    // Abstraction function
    //    AF(_state, _placedMines, _puzzle) = If puzzle is undefined, the client
    //      currently has no puzzle. Otherwise, the client is playing the puzzle
    //      given by puzzle. The stars on the puzzle are given by the placedStars
    //      CoordSet.
    // Rep invariant
    //    if puzzle is undefined:
    //      _placedStars is undefined
    //      state is GameState.NoPuzzle
    //    otherwise:
    //      placedStars is a CoordSet for gridsize n, where n is the size of the puzzle.
    //      state is not GameState.NoPuzzle, but rather the result of
    //      puzzle.validatePlacement(placedStars)
    // Safety from rep exposure
    //    all fields are private
    //    placedStars getter returns a defensive copy
    //    toGrid constructs a new array of GridElements each time to return
    /**
     * checkRep
     * Throws an error if the ADT instance does not meet the rep invariants
     */
    checkRep() {
        if (this._puzzle === undefined) {
            assert.equal(this._placedStars, undefined);
            assert.equal(this._state, GameState.NoPuzzle);
        }
        else {
            assert.equal(this._placedStars?.n, this._puzzle?.n);
            assert.equal(this._puzzle.validatePlacement(this._placedStars ?? assert.fail()), this._state);
        }
    }
    /**
     * placedStars
     * Returns a CoordSet copy containing the locations of all
     * placed mines
     * @throws Error if there is no puzzle currently active
     * @returns A copy of the currently placed mines.
     */
    get placedStars() {
        if (this._placedStars == undefined)
            throw new Error("no puzzle!");
        const res = this._placedStars.copy();
        this.checkRep();
        return res;
    }
    /**
     * Getter for the current puzzle. Undefined if the client does
     * not currently have a puzzle
     * @returns puzzle in this client if it has a puzzle, otherwise undefined
     */
    get puzzle() {
        this.checkRep();
        return this._puzzle;
    }
    /**
     * Getter for the current state of the client.
     * @returns The current game state
     */
    get state() {
        this.checkRep();
        return this._state;
    }
    /**
     * Constructs a new instance of the client ADT, with no puzzle
     * present.
     */
    constructor() {
    }
    /**
     * setPuzzle
     * Sets this client ADT to use a puzzle instance.
     * Puzzle instance must be empty
     * @param puzzle The puzzle to set for this client
     */
    setPuzzle(puzzle) {
        // assert(puzzle.placedStars.getLength() === 0);
        this._placedStars = new CoordSet(puzzle.n);
        this._puzzle = puzzle;
        this._state = this._puzzle.validatePlacement(this._placedStars);
        this.checkRep();
    }
    /**
     * placeMine
     * Places a mine on this grid. This method updates
     * the GameState to indicate the new state of the game.
     * @param star Location of the star to place
     * @throws error if there is no board in this client
     */
    placeStar(star) {
        (this._placedStars ?? assert.fail("no board!")).add(star);
        assert(this._puzzle !== undefined);
        assert(this._placedStars !== undefined);
        this._state = this._puzzle.validatePlacement(this._placedStars);
        this.checkRep();
    }
    /**
     * removeMine
     * Removes a mine from this grid. This method updates
     * the GameState to indicate the new state of the game.
     * @param star Location of the star to remove
     * @throws error if there is no board in this client
     */
    removeStar(star) {
        (this._placedStars ?? assert.fail("no board!")).delete(star);
        assert(this._puzzle !== undefined);
        assert(this._placedStars !== undefined);
        this._state = this._puzzle.validatePlacement(this._placedStars);
        this.checkRep();
    }
    /**
     * toGrid
     * Returns the board as a list of lists of GridElements, where
     * each GridElement contains information on the region of every cell
     * and whether or not every cell has a star.
     * @returns An nxn grid in row-major order containing the GridElement s
     *  for each cell of the puzzle.
     * @throws error if there is no board in this client
     */
    toGrid() {
        // console.log('made into toGrid');
        assert(this._puzzle !== undefined);
        const outGrid = new Array();
        for (let row = 0; row < this._puzzle.n; row++) {
            outGrid[row] = new Array();
        }
        const stars = this._placedStars;
        assert(stars !== undefined);
        for (let i = 0; i < this._puzzle.n; i++) {
            const regionCells = this._puzzle.cellsInRegion(i);
            regionCells.forEach((c) => {
                const elem = {
                    region: i,
                    hasStar: stars.has(c),
                };
                const rowArr = outGrid.at(c.row) ?? assert.fail();
                rowArr[c.col] = elem;
            });
        }
        this.checkRep();
        return outGrid;
    }
}
//# sourceMappingURL=client.js.map