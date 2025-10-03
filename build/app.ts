import { writeDocument, buildPage, write, newDocument } from "./parsetools.js";

import { welcomeHTML } from "./welcome.js";
import { postIndexHTML } from "./posts.js";
import { aboutIndexHTML, aboutWebsiteIndexHTML } from "./about.js";
import { materialsIndexHTML } from "./materials.js"; 
import { gamesIndexHTML, gamesTitles } from "./games.js";

import { fileNames } from "./mitnotes.js"
import { TITLE_LANGS } from "./header-footer.js";

import assert from "node:assert"

fileNames;

write("index.html", buildPage(TITLE_LANGS, 
    `
    ${welcomeHTML}
    ${postIndexHTML}
    ${aboutIndexHTML}
    ${materialsIndexHTML}
    ${gamesIndexHTML}
    ${aboutWebsiteIndexHTML}
    <br><br>
    `
));

const testingDoc = newDocument(TITLE_LANGS)
writeDocument("testing.html", testingDoc)