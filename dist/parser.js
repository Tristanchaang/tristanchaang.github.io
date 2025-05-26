import assert from 'assert';
import { Puzzle, Coord, CoordSet } from './puzzle.js';
import { compile, ParseError } from 'parserlib';
/**
 * Syntax for empty puzzle is as follows:
 *
 * puzzle ::= (comment '\\n')* dims '\\n' ('|' tile{2, } '\\n')*;
 */
const grammar = `
@skip whitespace {
    puzzle ::= (comment '\\n')* dims '\\n' (dottedset '\\n')*;
    comment ::= '#' [^\\n]*;
    dims ::= constant 'x' constant;
    dottedset ::= stars '|' tile*;
    stars ::= tile{0,2};
}
tile ::= constant ',' constant;
constant ::= [0-9]+;
whitespace ::= [ \\t\\r]+;  // <-- note that backslashes must be escaped
`;
// the nonterminals of the grammar
export var PuzzleGrammar;
(function (PuzzleGrammar) {
    PuzzleGrammar[PuzzleGrammar["Puzzle"] = 0] = "Puzzle";
    PuzzleGrammar[PuzzleGrammar["Comment"] = 1] = "Comment";
    PuzzleGrammar[PuzzleGrammar["Dims"] = 2] = "Dims";
    PuzzleGrammar[PuzzleGrammar["Stars"] = 3] = "Stars";
    PuzzleGrammar[PuzzleGrammar["DottedSet"] = 4] = "DottedSet";
    PuzzleGrammar[PuzzleGrammar["Tile"] = 5] = "Tile";
    PuzzleGrammar[PuzzleGrammar["Constant"] = 6] = "Constant";
    PuzzleGrammar[PuzzleGrammar["Whitespace"] = 7] = "Whitespace";
})(PuzzleGrammar || (PuzzleGrammar = {}));
// compile the grammar into a parser
export const parser = compile(grammar, PuzzleGrammar, PuzzleGrammar.Puzzle);
/**
 * Parse a string into an expression.
 *
 * @param input string to parse
 * @returns Expression parsed from the string
 * @throws ParseError if the string doesn't match the Expression grammar
 */
export function parse(input) {
    try {
        const parseTree = parser.parse(input);
        const puzzle = makeAbstractSyntaxTree(parseTree);
        return puzzle;
    }
    catch (e) {
        throw new ParseError(`Error: ${e}`);
    }
}
/**
 * Produces an abstract syntax tree from a parsed puzzle ParseTree
 *
 * @param parseTree ParseTree with PuzzleGrammar grammar to build AST from
 * @returns a new puzzle, either completely solved or empty
 * @throws an error if the puzzle is invalid, where as puzzle is defined to be invalid if:
 * - the puzzle dimensions described in widthxheight format does not have width === height
 * - either the width or height of the full puzzle is unspecified
 * - there are not exactly n regions in the puzzle
 * - any coordinates have row or column less than 1 or greater than n (out of puzzle range)
 * - any coordinate is missing a row or column location
 * - there are not exacty n*n coordinates in the puzzle
 * - there are fewer than 2 coordinates in any regions
 * - there are duplicate (repeated) coordinates in the puzzle
 */
function makeAbstractSyntaxTree(parseTree) {
    const regions = new Array();
    const dims = parseTree.childrenByName(PuzzleGrammar.Dims)[0] ?? assert.fail('should have dimensions');
    const widthStr = dims.text.split('x')[0];
    const heightStr = dims.text.split('x')[1];
    const width = widthStr !== undefined ? parseInt(widthStr.trim()) : assert.fail('expected width dim');
    const height = heightStr !== undefined ? parseInt(heightStr.trim()) : assert.fail('must have second dim');
    const n = width;
    //must be a square grid
    if (width !== height) {
        assert.fail('invalid dimensions!');
    }
    const isValid = (c) => {
        return c.row >= 0 && c.row < n && c.col >= 0 && c.col < n;
    };
    const regionSets = parseTree.childrenByName(PuzzleGrammar.DottedSet);
    //must have exactly n regions
    assert(regionSets.length === n);
    const placedStars = new CoordSet(n);
    for (const regionSet of regionSets) {
        const regionStars = regionSet.childrenByName(PuzzleGrammar.Stars)[0];
        const currentRegion = new CoordSet(n);
        if (regionStars) {
            const starTiles = regionStars.childrenByName(PuzzleGrammar.Tile);
            for (const starTile of starTiles) {
                const coordStr = starTile.text.split(",").map(d => d.trim());
                const row = coordStr[0] ?? assert.fail('invalid coordinate');
                const col = coordStr[1] ?? assert.fail('invalid coordinate');
                const currCoord = new Coord(parseInt(row) - 1, parseInt(col) - 1, n);
                if (!isValid(currCoord)) {
                    assert.fail('out of range coordinate');
                }
                //add each star to placed stars and the current region
                placedStars.add(currCoord);
                currentRegion.add(currCoord);
            }
        }
        const coords = regionSet.childrenByName(PuzzleGrammar.Tile);
        coords.forEach(c => {
            const coordStr = c.text.split(",").map(d => d.trim());
            //each coordinate must have a corresponding row and column
            const row = coordStr[0] ?? assert.fail('invalid coordinates ');
            const col = coordStr[1] ?? assert.fail('invalid coordinates ');
            const currCoord = new Coord(parseInt(row) - 1, parseInt(col) - 1, n);
            if (!isValid(currCoord)) {
                //each coordinate must be in range [0, n)
                assert.fail('out of range coordinate');
            }
            //add each coordinate to the current region
            currentRegion.add(currCoord);
        });
        //each region should have at least two coordinates
        if (currentRegion.getLength() < 2) {
            assert.fail('too few coordinates in region');
        }
        regions.push(currentRegion);
    }
    //checking for duplicate coordinates
    const seen = new CoordSet(n);
    regions.forEach(r => {
        r.forEach(c => {
            assert(!seen.has(c));
            seen.add(c);
        });
    });
    //should have exactly n times n tiles
    const totalTiles = regions.reduce((total, cSet) => total + cSet.getLength(), 0);
    assert(totalTiles === n * n);
    return new Puzzle(n, regions, placedStars);
}
//# sourceMappingURL=parser.js.map