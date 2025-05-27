import { writeMultiLangJMD } from "./parsetools.js";
import { spanLang, LangString } from "./langtools.js";
import * as fs from "fs";

const MATERIALS: {[s: string]: LangString} = {
    "random": { en: "Random Fun Problems", my: "Masalah Menarik", zh: "有趣的题目", hk: "得意嘅題目", fr: "Problèmes Intéressants", jp: "おもしろい問題" },
    "talks": { en: "Talks", my: "Ceramah", zh: "讲座", hk: "講座", fr: "Conférences", jp: "講演" },
    "bimo": { en: "BIMO Handouts", my: "Nota Edaran BIMO", zh: "BIMO 讲义", hk: "BIMO 講義", fr: "Documents BIMO", jp: "BIMO 配布資料" },   
    "olympiads": { en: "Olympiads", my: "Olimpiad", zh: "奥林匹克教材", hk: "奧林匹克教材", fr: "Olympiades", jp: "オリンピック" },   
    "nonolympiads": { en: "Non-Olympiads", my: "Bukan Olimpiad", zh: "非奥林匹克教材", hk: "非奧林匹克教材", fr: "Non-Olympiades", jp: "非オリンピック" },   
    "spmchemistry": { en: "SPM Chemistry", my: "Kimia SPM", zh: "SPM 化学", hk: "SPM 化學", fr: "Chimie SPM", jp: "SPM 化学" },   
    "resume": { en: "Latest CV/Resume", my: "CV/Resume Terkini", zh: "最新履历/简历", hk: "最新履歷/簡歷", fr: "CV/Résumé Récent", jp: "最新職務経歴書/履歴書" },   
    "mitnotes": { en: "MIT", my: "MIT", zh: "MIT", hk: "MIT", fr: "MIT", jp: "MIT" }   
};

const materialHTMLs = Object.entries(MATERIALS).map(([link, titles]) => `
                        <a class="materialThumbnail local" href="/materials/${link}.html">
                            <img src="/assets/folder-closed-solid.svg" alt="Folder Icon" class="materialIcon" style="width:2rem; height:2rem; margin-right:1rem; vertical-align:middle;" />
                            <span style="font-size: 1.3rem; width:auto">${spanLang(titles)}</span>
                        </a>`.trim());

export const materialsIndexHTML = `
    <div id="materials" style="position: relative;">
        <h1>${spanLang({ en: "Materials", my: "Bahan-Bahan", zh: "资料", hk: "資料", fr: "Matériaux", jp: "資料" })}</h1>
        <div class="thumbnailWindow">${materialHTMLs.join("")}</div>
        <img id="materialBg" src="/assets/folder-open-solid.svg" alt="Materials Icon">
    </div>
`;

function thumbnailize(className: string) {
    return (md: string) => md.replaceAll(
        
            /<li><a (?<att>.*)>((?<icon>.*)\|)?(?<title>[^\n\[\]\|]*)(\[(?<subtitle>[^\[\]]*)\])?<\/a><\/li>/g, 
        
            `<a class="${className} local" $<att>>
                <insertNTG $<icon>>
                <span style="font-size: 1.3rem; width:auto">$<title></span>
                <span style="font-size: 0.8rem; position: absolute; bottom: 5px; right: 5px; font-style: italic; color: gray;">$<subtitle></span>
            </a>`
        
        )
        .replaceAll(/<insertNTG >/g, `<insertNTG file-arrow-down-solid>`)
        .replaceAll(/<insertNTG (?<icon>.*)>/g, `<img src="/assets/$<icon>.svg" alt="Folder Icon" class="materialIcon" style="width:2rem; height:2rem; margin-right:1rem; vertical-align:middle;" />`)
        .replaceAll(/<ul>/g, `<div class="thumbnailWindow">`).replaceAll(/<\/ul>/g, `</div>`);
}

const fileNames = (await fs.promises.readdir("markdown/_materials/en")).filter(f => f.endsWith(".md"));

await Promise.all(fileNames.map(async (file) => 
    writeMultiLangJMD(file, "materials", 
        new Map([
            ["MIT", thumbnailize("mitThumbnail")],
        ]), thumbnailize("thumbnail")
    )));