import { buildPage, write } from "./parsetools.js";
import { spanLang } from "./langtools.js";

import { welcomeHTML } from "./welcome.js";
import { postIndexHTML } from "./posts.js";
import { aboutIndexHTML, aboutWebsiteIndexHTML } from "./about.js";
import { materialsIndexHTML } from "./materials.js"; 
import { gamesIndexHTML } from "./games.js";

import { fileNames } from "./mitnotes.js"
import { TITLE_LANGS } from "./header-footer.js";

fileNames;

write("compiled/index.html", buildPage(TITLE_LANGS, 
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

