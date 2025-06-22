import { gamesTitles } from "../games.js";
import { spanLang } from "../langtools.js";
import { graphTitleLangs } from "./graph.js";
const GAMES = {
    "graph": graphTitleLangs,
};
const gamesHTMLs = Object.entries(GAMES).map(([link, titles]) => `
                        <a class="materialThumbnail local" href="/games/${link}.html">
                            <img src="/assets/folder-closed-solid.svg" alt="Folder Icon" class="materialIcon" style="width:2rem; height:2rem; margin-right:1rem; vertical-align:middle;" />
                            <span style="font-size: 1.3rem; width:auto">${spanLang(titles)}</span>
                        </a>`.trim());
export const gamesPageIndexHTML = `
    <div id="materials" style="position: relative;">
        <h1>${spanLang(gamesTitles)}</h1>
        <div class="thumbnailWindow">${gamesHTMLs.join("")}</div>
    </div>
`;
//# sourceMappingURL=index.js.map