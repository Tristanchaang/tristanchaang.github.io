import { HTMLize, read, write, parseJMD } from "./base.js";
import * as fs from "fs";
const MATERIALS = {
    "random": {
        en: "Random Fun Problems",
        my: "Masalah Menarik",
        zh: "有趣的题目",
        hk: "得意嘅題目",
        fr: "Problèmes Intéressants",
        jp: "おもしろい問題"
    },
    "talks": {
        en: "Talks",
        my: "Ceramah",
        zh: "讲座",
        hk: "講座",
        fr: "Conférences",
        jp: "講演"
    },
    "bimo": {
        en: "BIMO Handouts",
        my: "Nota Edaran　BIMO",
        zh: "BIMO 讲义",
        hk: "BIMO 講義",
        fr: "Documents BIMO",
        jp: "BIMO 配布資料"
    },
    "olympiads": {
        en: "Olympiads",
        my: "Olimpiad",
        zh: "奥林匹克教材",
        hk: "奧林匹克教材",
        fr: "Olympiades",
        jp: "オリンピック"
    },
    "nonolympiads": {
        en: "Non-Olympiads",
        my: "Bukan Olimpiad",
        zh: "非奥林匹克教材",
        hk: "非奧林匹克教材",
        fr: "Non-Olympiades",
        jp: "オリンピックない"
    },
    "spmchemistry": {
        en: "SPM Chemistry",
        my: "Kimia SPM",
        zh: "SPM 化学",
        hk: "SPM 化學",
        fr: "Chimie SPM",
        jp: "SPM 化学"
    },
    "resume": {
        en: "Latest CV/Resume",
        my: "CV/Resume Terkini",
        zh: "最新履历/简历",
        hk: "最新履歷/簡歷",
        fr: "CV/Résumé Récent",
        jp: "最新職務経歴書/履歴書"
    },
    "mitnotes": {
        en: "MIT",
        my: "MIT",
        zh: "MIT",
        hk: "MIT",
        fr: "MIT",
        jp: "MIT"
    }
};
const materialHTMLs = Object.entries(MATERIALS).map(([link, titles]) => `
                        <a class="materialThumbnail" href="/materials/${link}.html">
                            <img src="/assets/folder-closed-solid.svg" alt="Folder Icon" class="materialIcon" style="width:2rem; height:2rem; margin-right:1rem; vertical-align:middle;" />
                            <span style="font-size: 1.3rem; width:auto">
                                <span lang="en">${titles.en}</span>
                                <span lang="my">${titles.my}</span>
                                <span lang="zh">${titles.zh}</span>
                                <span lang="hk">${titles.hk}</span>
                                <span lang="fr">${titles.fr}</span>
                                <span lang="jp">${titles.jp}</span>
                            </span>
                        </a>`.trim());
export const materialsIndexHTML = `
    <div id="materials" style="position: relative;">
        <h1 lang="en">Materials</h1>
        <h1 lang="my">Bahan-Bahan</h1>
        <h1 lang="zh">资料</h1>
        <h1 lang="hk">資料</h1>
        <h1 lang="fr">Matériaux</h1>
        <h1 lang="jp">資料</h1>
        <div class="thumbnailWindow">${materialHTMLs.join("")}</div>
        <img id="materialBg" src="/assets/folder-open-solid.svg" alt="Materials Icon">
    </div>
`;
function mitThumbnailize(md) {
    return md.replaceAll(/<li><a (?<att>.*)>(?<icon>.*)\|(?<title>[^(]*)\((?<code>[^()]*)\)<\/a><\/li>/g, `<a class="mitThumbnail" $<att>>
            <img src="/assets/$<icon>.svg" alt="Folder Icon" class="materialIcon" style="width:2rem; height:2rem; margin-right:1rem; vertical-align:middle;" />
            <span style="font-size: 1.3rem; width:auto">$<title></span>
            <span style="font-size: 0.8rem; position: absolute; bottom: 5px; right: 5px; font-style: italic; color: gray;">$<code></span>
        </a>`).replaceAll(/<ul>/g, `<div class="thumbnailWindow">`).replaceAll(/<\/ul>/g, `</div>`);
}
function thumbnailize(md) {
    return md.replaceAll(/<li><a (?<att>.*)>(?<title>[^\n]*)<\/a><\/li>/g, `<a class="thumbnail" $<att>>
            <img src="/assets/file-arrow-down-solid.svg" alt="Folder Icon" class="materialIcon" style="width:2rem; height:2rem; margin-right:1rem; vertical-align:middle;" />
            <span style="font-size: 1.3rem; width:auto">$<title></span>
        </a>`).replaceAll(/<ul>/g, `<div class="thumbnailWindow">`).replaceAll(/<\/ul>/g, `</div>`);
}
function talksThumbnailize(md) {
    return md.replaceAll(/<li><a (?<att>.*)>(?<title>[^\n]*)\((?<code>[^()]*)\)<\/a><\/li>/g, `<a class="thumbnail" $<att>>
            <img src="/assets/file-solid.svg" alt="Folder Icon" class="materialIcon" style="width:2rem; height:2rem; margin-right:1rem; vertical-align:middle;" />
            <span style="font-size: 1.3rem; width:auto">$<title></span>
            <span style="font-size: 0.8rem; position: absolute; bottom: 5px; right: 5px; font-style: italic; color: gray;">$<code></span>
        </a>`).replaceAll(/<ul>/g, `<div class="thumbnailWindow">`).replaceAll(/<\/ul>/g, `</div>`);
}
async function parseMaterial(mdName) {
    const date = mdName.slice(0, 10);
    const mdContent = await read("markdown/_materials/" + mdName);
    const { meta, interior } = parseJMD(mdContent);
    let thumbnailed;
    if (meta.title === "MIT Notes")
        thumbnailed = mitThumbnailize(interior);
    else if (meta.title === "Talks")
        thumbnailed = talksThumbnailize(interior);
    else
        thumbnailed = thumbnailize(interior);
    const content = HTMLize(meta.title, `
        <div style='${("font" in meta) ? `font-family: ${meta.font};` : ""} padding-left: 200px; padding-right: 200px'>
            <h1 lang="en">${meta.title}</h1>
            <h1 lang="my">${meta.titleMY ?? meta.title}</h1>
            <h1 lang="zh">${meta.titleZH ?? meta.title}</h1>
            <h1 lang="hk">${meta.titleHK ?? meta.title}</h1>
            <h1 lang="fr">${meta.titleFR ?? meta.title}</h1>
            <h1 lang="jp">${meta.titleJP ?? meta.title}</h1>
            ${thumbnailed}
        </div>
        `);
    const htmlName = mdName.replace(/\.md$/, ".html");
    write("materials/" + htmlName, content);
    return { date: new Date(date), content: content, title: meta.title, filename: htmlName };
}
const fileNames = (await fs.promises.readdir("markdown/_materials")).filter(f => f.endsWith(".md"));
await Promise.all(fileNames.map(async (file) => parseMaterial(file)));
//# sourceMappingURL=materials.js.map