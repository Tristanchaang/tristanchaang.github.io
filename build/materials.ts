import { HTMLize, read, write, parseJMD } from "./base.js";
import * as fs from "fs";

const MATERIALS = {
    "Random Fun Problems": "random",
    "Talks": "talks",
    "BIMO Handouts": "bimo",
    "Olympiads": "olympiads",
    "Non-Olympiads": "nonolympiads",
    "SPM Chemistry": "spmchemistry",
    "Latest CV/Resume": "resume",
    "MIT": "mitnotes"
}

const materialHTMLs = Object.entries(MATERIALS).map(([title, link]) => `
                        <a class="materialThumbnail" href="/materials/${link}.html">
                            <img src="/assets/folder-closed-solid.svg" alt="Folder Icon" class="materialIcon" style="width:2rem; height:2rem; margin-right:1rem; vertical-align:middle;" />
                            <span style="font-size: 1.3rem; width:auto">${title}</span>
                        </a>`.trim());

export const materialsIndexHTML = `
    <div id="materials" style="position: relative;">
        <h1>Materials</h1>
        <div class="thumbnailWindow">${materialHTMLs.join("")}</div>
        <img id="materialBg" src="/assets/folder-open-solid.svg" alt="Materials Icon">
    </div>
`;

function mitThumbnailize(md: string) {
    return md.replaceAll(
        
        /<li><a (?<att>.*)>(?<icon>.*)\|(?<title>[^(]*)\((?<code>[^()]*)\)<\/a><\/li>/g, 
    
        `<a class="mitThumbnail" $<att>>
            <img src="/assets/$<icon>.svg" alt="Folder Icon" class="materialIcon" style="width:2rem; height:2rem; margin-right:1rem; vertical-align:middle;" />
            <span style="font-size: 1.3rem; width:auto">$<title></span>
            <span style="font-size: 0.8rem; position: absolute; bottom: 5px; right: 5px; font-style: italic; color: gray;">$<code></span>
        </a>`
    
    ).replaceAll(/<ul>/g, `<div class="thumbnailWindow">`).replaceAll(/<\/ul>/g, `</div>`);
}

function thumbnailize(md: string) {
    return md.replaceAll(
        
        /<li><a (?<att>.*)>(?<title>[^\n]*)<\/a><\/li>/g, 
    
        `<a class="thumbnail" $<att>>
            <img src="/assets/file-arrow-down-solid.svg" alt="Folder Icon" class="materialIcon" style="width:2rem; height:2rem; margin-right:1rem; vertical-align:middle;" />
            <span style="font-size: 1.3rem; width:auto">$<title></span>
        </a>`
    
    ).replaceAll(/<ul>/g, `<div class="thumbnailWindow">`).replaceAll(/<\/ul>/g, `</div>`);
}

function talksThumbnailize(md: string) {
    return md.replaceAll(
        
        /<li><a (?<att>.*)>(?<title>[^\n]*)\((?<code>[^()]*)\)<\/a><\/li>/g, 
    
        `<a class="thumbnail" $<att>>
            <img src="/assets/file-solid.svg" alt="Folder Icon" class="materialIcon" style="width:2rem; height:2rem; margin-right:1rem; vertical-align:middle;" />
            <span style="font-size: 1.3rem; width:auto">$<title></span>
            <span style="font-size: 0.8rem; position: absolute; bottom: 5px; right: 5px; font-style: italic; color: gray;">$<code></span>
        </a>`
    
    ).replaceAll(/<ul>/g, `<div class="thumbnailWindow">`).replaceAll(/<\/ul>/g, `</div>`);
}

async function parseMaterial(mdName: string) {
    const date = mdName.slice(0,10);
    const mdContent = await read("markdown/_materials/"+mdName);
    const { meta, interior } = parseJMD(mdContent);
    
    let thumbnailed: string;
    if (meta.title === "MIT Notes") thumbnailed = mitThumbnailize(interior);
    else if (meta.title === "Talks") thumbnailed = talksThumbnailize(interior);
    else thumbnailed = thumbnailize(interior);

    const content = HTMLize(meta.title, `
        <div style='${("font" in meta) ? `font-family: ${meta.font};` : ""} padding-left: 200px; padding-right: 200px'>
            <h1>${meta.title}</h1>
            ${thumbnailed}
        </div>
        `);
    
    const htmlName = mdName.replace(/\.md$/, ".html");
    write("materials/"+htmlName, content);
    return { date: new Date(date), content: content, title: meta.title, filename: htmlName };
}

const fileNames = (await fs.promises.readdir("markdown/_materials")).filter(f => f.endsWith(".md"));

await Promise.all(fileNames.map(async (file) => parseMaterial(file)));