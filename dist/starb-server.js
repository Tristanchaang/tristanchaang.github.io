/* Copyright (c) 2021-23 MIT 6.102/6.031 course staff, all rights reserved.
 * Redistribution of original or derived work requires permission of course staff.
 */
// This file runs in Node.js, see the `npm server` script.
// Remember that you will *not* be able to use DOM APIs in Node, only in the web browser.
import { StarBattleServer } from './server.js';
const PORT = 8789;
/**
 * Start a server that serves puzzles from the `puzzles` directory
 * on localhost:8789.
 */
async function main() {
    const app = new StarBattleServer(PORT);
    await app.start();
}
await main();
//# sourceMappingURL=starb-server.js.map