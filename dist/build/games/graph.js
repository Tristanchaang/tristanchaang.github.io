import { write } from "../parsetools.js";
import { buildGamePage } from "./gametools.js";
import { logoButton } from "../buttons.js";
export const graphTitleLangs = {
    en: "Graph Playground",
    my: "Perisian Graf",
    zh: "图论游乐区",
    hk: "圖論遊樂區",
    fr: "Jardin des graphes",
    jp: "グラフの遊び場"
};
write("games/graph.html", buildGamePage(graphTitleLangs, `
${logoButton("house-solid", "40px", { class: 'local', href: '/' }, { position: "fixed", margin: "10px", left: "0", top: "0" }, "Home").outerHTML}   

`));
//# sourceMappingURL=graph.js.map