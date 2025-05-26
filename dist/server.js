import assert from 'node:assert';
import fs from 'node:fs';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { parse } from './parser.js';
/**
 * HTTP Star Battle game server
 *
 * Credit to staff code in ps4 for reference
 * https://github.mit.edu/6102-sp25/ps4/blob/main/src/server.ts
 */
export class StarBattleServer {
    requestedPort;
    app;
    server;
    // AF(app, server, requestedPort) =
    //  Star Battle game server that uses an express application <app>
    //  that will start up a HTTP server <server> (or not yet if
    //  <server> is undefined) that will attempt to listen to port 
    //  <requestedPort> if possible (if it is 0 then an arbitrary port
    //  is chosen)
    //
    // Rep Invariant: 
    //  - true
    //
    // Rep exposure safety:
    //  - All fields are private
    //  - All methods return immutable objects
    /**
     * Make a server listening to given port.
     *
     * @param requestedPort server port number
     */
    constructor(requestedPort) {
        this.requestedPort = requestedPort;
        this.app = express();
        this.app.use((request, response, next) => {
            response.set('Access-Control-Allow-Origin', '*');
            next();
        });
        /*
        * GET /puzzle/<filePath>
        * fileName must be the name of a file in puzzle directory
        * containing a parsable representation of a puzzle
        *
        * Response is a string representation of puzzle parsed from the file
        */
        this.app.get('/puzzle/:fileName', async (request, response) => {
            const filename = request.params['fileName'] ?? assert.fail();
            try {
                const puzzleString = await fs.promises.readFile(`puzzles/${filename}`, { encoding: 'utf-8' });
                const emptyPuzzle = parse(puzzleString).emptyString;
                parse(emptyPuzzle); // check valid puzzle
                response
                    .status(StatusCodes.OK)
                    .type('text')
                    .send(emptyPuzzle);
            }
            catch (e) {
                response
                    .status(StatusCodes.NOT_FOUND)
                    .type('text')
                    .send('Invalid Puzzle');
            }
        });
    }
    /**
     * Start this server.
     *
     * @returns (a promise that) resolves when the server is listening
     */
    start() {
        const { promise, resolve } = Promise.withResolvers();
        this.server = this.app.listen(this.requestedPort);
        this.server.on('listening', () => {
            console.log(`server now listening at http://localhost:${this.port}`);
            resolve();
        });
        return promise;
    }
    /**
     * @returns the actual port that server is listening at. (May be different
     *          than the requestedPort used in the constructor, since if
     *          requestedPort = 0 then an arbitrary available port is chosen.)
     *          Requires that start() has already been called and completed.
     */
    get port() {
        const address = this.server?.address() ?? 'not connected';
        if (typeof (address) === 'string') {
            throw new Error('server is not listening at a port');
        }
        return address.port;
    }
    /**
     * Stop this server. Once stopped, this server cannot be restarted.
     */
    stop() {
        this.server?.close();
        console.log('server stopped');
    }
}
//# sourceMappingURL=server.js.map