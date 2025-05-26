import * as fs from "fs";
import assert from "assert";
import { HTMLize, read, write, parseJMD } from "./base.js";

async function parsePost(mdName: string) {
    const date = mdName.slice(0,10);
    const mdContent = await read("markdown/_posts/"+mdName);
    const { meta, interior } = parseJMD(mdContent);
    const content = HTMLize(meta.title, `
        <div style='${("font" in meta) ? `font-family: ${meta.font};` : ""} padding-left: 200px; padding-right: 200px'>
            <h1>${meta.title}</h1>
            ${interior}
        </div>
        `);

    const htmlName = mdName.replace(/\.md$/, ".html");
    write("posts/"+htmlName, content);
    return { date: new Date(date), content: content, title: meta.title, filename: htmlName };
}

const fileNames = (await fs.promises.readdir("markdown/_posts")).filter(f => f.endsWith(".md"));

const engMonth = (monthNum: number) => 
    ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][monthNum];

const postTitleHTMLs = (await Promise.all(fileNames.map(async (file) => parsePost(file))))
                    .sort((a,b) => (a.date < b.date) ? 1 : -1)   
                    .map(file => `
                        <a class="postThumbnail" href="/posts/${file.filename}">
                            <span style="font-size: 1.3rem; width:auto">${file.title}</span>
                            <span style="min-width:135px; text-align: right;">${engMonth(file.date.getMonth())} ${file.date.getDate()+1}, ${file.date.getFullYear()}</span>
                        </a>`.trim());

export const postIndexHTML = `
    <div id="posts">
        <h1>Posts</h1>
        <div id="postWindow">${postTitleHTMLs.join("")}</div>
    </div>
`;