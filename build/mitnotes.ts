import * as fs from "fs";
import { buildPage, read, write, parseJMD } from "./parsetools.js";

async function parseNotes(mdName: string) {
    const date = mdName.slice(0,10);
    const mdContent = await read("markdown/_mitnotes/"+mdName);
    const { meta, interior } = parseJMD(mdContent);
    const content = buildPage(meta.title, `
        <div style='${("font" in meta) ? `font-family: ${meta.font};` : ""} padding-left: 200px; padding-right: 200px'>
            <h1>${meta.title}</h1>
            ${interior}
        </div>
        `);

    const folderName = mdName.replace(/\.md$/, "");
    write("materials/"+folderName+"/index.html", content);
    return { date: new Date(date), content: content, title: meta.title, filename: "index.html"};
}

export const fileNames = (await fs.promises.readdir("markdown/_mitnotes")).filter(f => f.endsWith(".md"));

await Promise.all(fileNames.map(async (file) => parseNotes(file)));