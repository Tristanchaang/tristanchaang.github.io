// Classes for the puzzle implementation
import assert from 'node:assert';
/**
 * An immutable ADT representing a coordinate. This contains a row
 * (0-indexed from the top), a column (0-indexed from the left),
 * and a size, indicating the size of the board that this is
 * made on.
 */
export class Coord {
    row;
    col;
    n;
    constructor(row, col, n) {
        this.row = row;
        this.col = col;
        this.n = n;
        this.checkRep();
    }
    // Abstraction function
    //    AF(row, col, n) = A coordinate of a cell on an nxn grid, where
    //      the cell is in the (0-indexed) row from the top given by row
    //      the cell is in the (0-indexed) column from the left given by col
    // Rep invariant
    //    n is a positive integer
    //    row is an integer in the set [0, n)
    //    col is an integer in the set [0, n)
    // Safety from rep exposure
    //    all fields are immutable and unreassignable
    /**
     * checkRep
     * Throws an error if the ADT instance does not meet the rep invariants
     */
    checkRep() {
        assert(Number.isInteger(this.n), "board size is not an integer");
        assert(Number.isInteger(this.col), "col num is not an integer");
        assert(Number.isInteger(this.row), "row num is not an integer");
        assert(this.n > 0, "n not positive integer");
        assert(0 <= this.row && this.row < this.n, "row num out of board range");
        assert(0 <= this.col && this.col < this.n, "col num out of board range");
    }
    /**
     * hash: returns an integer that uniquely identifies this Coord
     * on a board of this size.
     * This is defined as row * size + col.
     * @returns Hashed value, as defined above
     */
    hash() {
        const hash = this.row * this.n + this.col;
        this.checkRep();
        return hash;
    }
    /**
     * Constructs an instance of the Coord, from a hash and a board
     * size n.
     * @param hash The hash to be converted into a Coord
     * @param n The size of the board grid
     * @returns a Coord instance from converting the hash into a Coord
     */
    static fromHash(hash, n) {
        const col = hash % n;
        const row = (hash - col) / n;
        return new Coord(row, col, n);
    }
    /**
     * neighbours
     * @returns A list of neighbours of the coordinate on a grid of
     * size of n. Neighbours can be vertically, horizontally or
     * diagonally adjacent
     */
    neighbours() {
        const neighbourSet = new CoordSet(this.n);
        for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
            for (let colOffset = -1; colOffset <= 1; colOffset++) {
                if (rowOffset === 0 && colOffset === 0) {
                    continue;
                }
                const newRow = rowOffset + this.row;
                const newCol = colOffset + this.col;
                if (0 <= newRow && newRow < this.n && 0 <= newCol && newCol < this.n) {
                    neighbourSet.add(new Coord(newRow, newCol, this.n));
                }
            }
        }
        this.checkRep();
        return neighbourSet;
    }
}
/**
 * A mutable ADT representing a set of coordinates on an nxn board.
 * Implements add, has, delete, forEach, length
 */
export class CoordSet {
    n;
    coords = new Set();
    constructor(n) {
        this.n = n;
        this.checkRep();
    }
    // Abstraction function
    //    AF(coords, n) = A set of coordinates, where each coordHash in coords
    //      corresponds the coordinate given by Coord.fromHash(coordHash, n)
    // Rep invariant
    //    n is a positive integer
    //    each coordHash in coords can be converted into a valid coordinate on
    //    an nxn grid by using Coord.fromHash(coordHash, n)
    // Safety from rep exposure
    //    the coords set is private and readonly, and can only be modified through
    //    member methods.
    //    the size n is readonly.
    //    all member methods return immutable values (e.g. number, bool)
    //    forEach operates on Coords, which are immutable
    /**
     * checkRep
     * Throws an error if the ADT instance does not meet the rep invariants
     */
    checkRep() {
        assert(Number.isInteger(this.n), "board size is not an integer");
        assert(this.n > 0, "n not positive integer");
        // check that no fromHash calls fail
        this.coords.forEach((coordHash) => Coord.fromHash(coordHash, this.n));
    }
    /**
     * add: Add a Coord to this set.
     * @param coord The coord to be added
     * @throws Error if n for the Coord does not match n
     * for this set.
     */
    add(coord) {
        assert(coord.n === this.n);
        this.coords.add(coord.hash());
        this.checkRep();
    }
    /**
     * delete: Deletes a coord, if it was present in this set.
     * @param coord The coord to be deleted
     * @throws Error if n for the Coord does not match n
     * for this set.
     * @returns Returns true if an element in the Set existed
     * and has been removed, or false if the element does not exist.
     */
    delete(coord) {
        assert(coord.n === this.n);
        const res = this.coords.delete(coord.hash());
        this.checkRep();
        return res;
    }
    /**
     * has: Returns true if and only if the coord is within this
     * set.
     * @throws Error if n for the Coord does not match n
     * for this set.
     * @param coord The coordinate to check for membership
     * @returns true iff the coordinate is in the set.
     */
    has(coord) {
        assert(coord.n === this.n);
        const res = this.coords.has(coord.hash());
        this.checkRep();
        return res;
    }
    /**
     * Gets the number of elements in this set.
     * @returns The number of elements in the set
     */
    getLength() {
        const res = this.coords.size;
        this.checkRep();
        return res;
    }
    /**
     * forEach: Allows iteration over the elements of this
     * set.
     * @param callback Callback to run on each element of the set
     */
    forEach(callback) {
        this.coords.forEach(val => {
            const coord = Coord.fromHash(val, this.n);
            callback(coord);
        });
        this.checkRep();
    }
    /**
     * copy
     * Creates a copy of this CoordSet
     * @returns A copy of this coord set
     */
    copy() {
        const copySet = new CoordSet(this.n);
        this.coords.forEach(c => copySet.add(Coord.fromHash(c, this.n)));
        this.checkRep();
        return copySet;
    }
    /**
     * Returns a new CoordSet containing all cells in the intersection
     * of this CoordSet and another CoordSet, for two CoordSets on the same
     * grid size.
     * @param other The other CoordSet to intersect with.
     * @returns The intersected CoordSet
     */
    intersect(other) {
        const intersection = new CoordSet(this.n);
        this.forEach((coord) => {
            if (other.has(coord)) {
                intersection.add(coord);
            }
        });
        this.checkRep();
        return intersection;
    }
    /**
     * row_set
     * Returns a CoordSet with all coordinates in a certain row
     * of an nxn grid.
     * @param row Integer indicating the 0-indexed row from the top to
     *  return the CoordSet for, where row is in [0, n)
     * @param n The positive integer grid size to get this row from
     * @returns A CoordSet with all coordinates in the given row
     */
    static rowSet(row, n) {
        const result = new CoordSet(n);
        for (let i = 0; i < n; i++) {
            result.add(new Coord(row, i, n));
        }
        return result;
    }
    /**
     * col_set
     * Returns a CoordSet with all coordinates in a certain column
     * of an nxn grid.
     * @param column Integer indicating the 0-indexed column from the left to
     *  return the CoordSet for, where column is in [0, n)
     * @param n The positive integer grid size to get this row from
     * @returns A CoordSet with all coordinates in the given column
     */
    static colSet(column, n) {
        const result = new CoordSet(n);
        for (let i = 0; i < n; i++) {
            result.add(new Coord(i, column, n));
        }
        return result;
    }
}
// Glue code functions to ease testing
/**
 * Creates a CoordSet from a list of coords
 * @param coords The coordinates to put in the coordSet, as a list
 *  of row, column tuples
 * @param n The board size for this coord set
 * @returns The CoordSet
 */
export function setFromCoords(coords, n) {
    const res = new CoordSet(n);
    for (const [row, col] of coords) {
        res.add(new Coord(row, col, n));
    }
    return res;
}
/**
 * Creates a CoordSet from a list of coords, all of which are 1 indexed
 * @param coords The coordinates to put in the coordSet, as a list
 *  of row, column tuples for 1 indexed rows and columns
 * @param n The board size for this coord set
 * @returns The CoordSet
 */
export function setFromOffsetCoords(coords, n) {
    return setFromCoords(coords.map(([row, col]) => [row - 1, col - 1]), n);
}
/**
 * An enum that incorporates the full state of the game.
 */
export var GameState;
(function (GameState) {
    GameState["NoPuzzle"] = "no puzzle";
    // instance
    GameState["Empty"] = "empty";
    GameState["Incomplete"] = "incomplete";
    // mines are in positions that violate rules.
    GameState["Illegal"] = "illegal";
    // that violates the rules
    GameState["Correct"] = "correct"; // The puzzle is correctly completed.
})(GameState || (GameState = {}));
/**
 * An immutable ADT representing a Star Battle puzzle.
 * Contains observer functions that can get information about regions in the puzzle
 * Also contains an observer function to check some externally provided placement
 * of stars for validity in the current puzzle.
 */
export class Puzzle {
    n;
    regions;
    _placedStars;
    constructor(n, regions, _placedStars) {
        this.n = n;
        this.regions = regions;
        this._placedStars = _placedStars;
    }
    // Abstraction function
    //    AF(n, regions, placedMines) = A Star Battle puzzle on a grid of size n,
    //      where each member of the regions list is a set of Coordinates in region
    //      of the puzzle, and there are stars on the puzzle in the grid cells
    //      corresponding to placedStars
    // Rep invariant
    //    n is a positive integer
    //    there are n regions, which are CoordSets on grid of size n
    //    all coordinates within an nxn grid are within exactly one of the the region sets
    // Safety from rep exposure
    //    the placedStars set and the regions sets are private and readonly
    //    the size n is readonly.
    //    all member methods return immutable values (e.g. number, bool)
    //    methods which return CoordSets (placedStars getter, cellsInRegion) return
    //    defensive copies of these items.
    /**
     * checkRep
     * Throws an error if the ADT instance does not meet the rep invariants
     */
    checkRep() {
        assert(Number.isInteger(this.n), "board size is not an integer");
        assert(this.n > 0, "n not positive integer");
        assert.equal(this.n, this.regions.length, "regions length is not n");
        this.regions.forEach((set) => assert.equal(set.n, this.n));
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                const coord = new Coord(i, j, this.n);
                let inNumRegions = 0;
                for (const region of this.regions) {
                    if (region.has(coord)) {
                        inNumRegions += 1;
                    }
                }
                assert.equal(inNumRegions, 1, "coord found in not exactly 1 region!");
            }
        }
        assert.equal(this.n, this._placedStars.n, "placedStars coordset is the wrong shape!");
    }
    get placedStars() {
        return this._placedStars.copy();
    }
    /**
     * cellsInRegion
     * Returns the cells within the region given by the given
     * region numbers. The region number is the index in the initial
     * regions list that contains this coordinate.
     * @param region The region to return cells from. Integer in [0, n)
     * @returns The cells within the given region
     */
    cellsInRegion(region) {
        if (region >= this.n) {
            assert.fail('region out of range');
        }
        const regionSet = this.regions[region] ?? assert.fail('must have n regions');
        return regionSet.copy();
    }
    /**
     * validatePlacement
     * This function verifies the placement of a set of stars onto
     * a board. Its argument is the stars on the board as a set of coordinates,
     * and it returns one of the following GameStates based on the coordinate
     * set passed in.
     *  - Empty: if no stars are placed
     *  - Incomplete: if the puzzle is not complete but none of the stars
     *      are in positions that violate rules.
     *  - Illegal: The puzzle contains at least one star in a position that
     *      violates rules
     *  - Complete: The assignment of stars is correct.
     *
     * Note again that the stars stored in this puzzle instance are ignored
     * when calling this function! Only the stars in starsToValidate are treated
     * as being on the board
     * @param starsToValidate A CoordSet of stars to validate the placement of
     *  on the board, for a set with the same board size as this board.
     * @returns The GameState corresponding to this star placement as described.
     */
    validatePlacement(starsToValidate) {
        assert.equal(starsToValidate.n, this.n, "stars to validate is for a different board size!");
        if (starsToValidate.getLength() === 0) {
            return GameState.Empty;
        }
        // otherwise start checking rules
        // no more than 2 in each row
        for (let row = 0; row < this.n; row++) {
            const rowSet = CoordSet.rowSet(row, this.n);
            const intersection = starsToValidate.intersect(rowSet);
            if (intersection.getLength() > 2) {
                return GameState.Illegal;
            }
        }
        // no more than 2 in each column
        for (let col = 0; col < this.n; col++) {
            const colSet = CoordSet.colSet(col, this.n);
            const intersection = starsToValidate.intersect(colSet);
            if (intersection.getLength() > 2) {
                return GameState.Illegal;
            }
        }
        // no more than 2 in each region
        for (let region = 0; region < this.n; region++) {
            const regionSet = this.cellsInRegion(region);
            const intersection = starsToValidate.intersect(regionSet);
            if (intersection.getLength() > 2) {
                return GameState.Illegal;
            }
        }
        // no adjacent stars
        let isIllegal = false;
        starsToValidate.forEach((star) => {
            const neighbours = star.neighbours();
            const intersection = starsToValidate.intersect(neighbours);
            if (intersection.getLength() > 0) {
                isIllegal = true;
            }
        });
        if (isIllegal) {
            return GameState.Illegal;
        }
        // if we've made it here, check the number of mines to check completeness
        if (starsToValidate.getLength() < this.n * 2) {
            return GameState.Incomplete;
        }
        else if (starsToValidate.getLength() === this.n * 2) {
            return GameState.Correct;
        }
        else {
            assert.fail("Should not be able to fail the previous cases and reach here!");
        }
    }
    /**
     * Returns a string representing the empty version of puzzle
     * @returns string representing emptied puzzle (1-indexed), with
     *          no comments, and every line starts with |, followed by
     *          a blankspace and a list of coords x,y separated by spaces
     *          and finally a \n.
     */
    get emptyString() {
        let puzzleString = `${this.n}x${this.n}\n`;
        for (let regionNum = 0; regionNum < this.n; regionNum++) {
            let newLine = `|`;
            this.cellsInRegion(regionNum)
                .forEach((coord) => {
                newLine += ` ${coord.row + 1},${coord.col + 1}`;
            });
            puzzleString += newLine;
            puzzleString += ' \n';
        }
        return puzzleString;
    }
}
//# sourceMappingURL=puzzle.js.map