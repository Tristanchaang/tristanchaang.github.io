import { buildPage, buildPageLangs, write, writeMultiLang } from "./parsetools.js";
import { langMap, LangString, spanLang } from "./langtools.js";

import { welcomeHTML, welcomeHTMLLangs } from "./welcome.js";
import { postIndexHTML, postIndexHTMLLangs } from "./posts.js";
import { aboutIndexHTML, aboutIndexHTMLLangs, aboutWebsiteIndexHTML, aboutWebsiteIndexHTMLLangs } from "./about.js";
import { materialsIndexHTML, materialsIndexHTMLLangs } from "./materials.js"; 
import { gamesIndexHTML, gamesIndexHTMLLangs } from "./games.js";

import { fileNames } from "./mitnotes.js"
import { TITLE_LANGS } from "./header-footer.js";

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

writeMultiLang("index.html", buildPageLangs(TITLE_LANGS, 
    langMap(TITLE_LANGS, (lang, title) => `
    ${welcomeHTMLLangs[lang as keyof LangString]}
    ${postIndexHTMLLangs[lang as keyof LangString]}
    ${aboutIndexHTMLLangs[lang as keyof LangString]}
    ${materialsIndexHTMLLangs[lang as keyof LangString]}
    ${gamesIndexHTMLLangs[lang as keyof LangString]}
    ${aboutWebsiteIndexHTMLLangs[lang as keyof LangString]}
    <br><br>
    `
)));

