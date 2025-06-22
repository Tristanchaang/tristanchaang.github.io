import { spanLang, LangString } from "./langtools.js"
import { graphTitleLangs } from "./games/graph.js";

export const gamesTitles: LangString = { en: "Games", my: "Permainan", zh: "游戏", hk: "遊戲", fr: "Jeux", jp: "ゲーム" }

const GAMES: {[s: string]: LangString} = {
    "graph": graphTitleLangs,
};

const gamesHTMLs = Object.entries(GAMES).map(([link, titles]) => `
                        <a class="thumbnail local" href="/games/${link}.html" style="background: linear-gradient(to right, rgb(218, 255, 150), rgb(236, 255, 226)); width: 300px;">
                            <img src="/assets/arrow-right-solid.svg" alt="Folder Icon" class="materialIcon" style="width:2rem; height:2rem; margin-right:1rem; vertical-align:middle;" />
                            <span style="font-size: 1.3rem; width:auto">${spanLang(titles)}</span>
                        </a>`.trim());

export const gamesIndexHTML = `
<div id="games">
    <h1>${spanLang(gamesTitles)}</h1>
    <div class="thumbnailWindow">
        <a class="thumbnail" style="background: linear-gradient(to right, rgb(218, 255, 150), rgb(236, 255, 226)); width: 300px;" href="/webpage/">
            <img src="/assets/arrow-right-solid.svg" alt="Folder Icon" class="materialIcon" style="width:2rem; height:2rem; margin-right:1rem; vertical-align:middle;" />
            <span style="font-size: 1.3rem; width:auto">
                ${spanLang({ en: "Sandbox", my: "Sandbox", zh: "沙盒", hk: "沙盒", fr: "Sandbox", jp: "サンドボックス" })}
            </span>
        </a>
        ${gamesHTMLs.join("")}
    </div>
</div>
`