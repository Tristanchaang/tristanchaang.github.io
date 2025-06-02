import { spanLang } from "./langtools.js"

export const gamesIndexHTML = `
<div id="games">
    <h1>${spanLang({ en: "Games", my: "Permainan", zh: "游戏", hk: "遊戲", fr: "Jeux", jp: "ゲーム" })}</h1>
    <div class="thumbnailWindow">
        <a class="thumbnail" style="background: linear-gradient(to right, rgb(218, 255, 150), rgb(236, 255, 226)); width: 300px;" href="/webpage/">
            <img src="/assets/arrow-right-solid.svg" alt="Folder Icon" class="materialIcon" style="width:2rem; height:2rem; margin-right:1rem; vertical-align:middle;" />
            <span style="font-size: 1.3rem; width:auto">
                ${spanLang({ en: "Sandbox", my: "Sandbox", zh: "沙盒", hk: "沙盒", fr: "Sandbox", jp: "サンドボックス" })}
            </span>
        </a>
    </div>
</div>
`