import * as fs from "fs";
import assert from "assert";
import { writeMultiLangJMD } from "./parsetools.js";
import { spanLang, dateLangs } from "./langtools.js";

async function parsePost(mdName: string) {
    return writeMultiLangJMD(mdName, "posts", new Map(), ((s: string)=>s))
}

const fileNames = (await fs.promises.readdir("markdown/_posts/en")).filter(f => f.endsWith(".md"));

const postTitleHTMLs = (await Promise.all(fileNames.map(async (file) => parsePost(file))))
                    .sort((a,b) => (a.date < b.date) ? 1 : -1)   
                    .map(file => `
                        <a class="postThumbnail local" href="/posts/${file.filename}">
                            <span style="font-size: 1.3rem; width:auto">
                                ${spanLang(file.titleLangs)}
                            </span>
                            <span style="min-width:135px; text-align: right;">
                                ${spanLang(dateLangs(file.date))}
                            </span>
                        </a>`.trim());

export const postIndexHTML = `
    <div id="posts" style="position: relative">
        <h1>${spanLang({ en: "Posts", my: "Siaran-Siaran", zh: "贴文", hk: "貼文", fr: "Publications", jp: "投稿" })}</h1>
        <div id="postWindow">${postTitleHTMLs.join("")}</div>
        <img id="postBg" src="/assets/file-pen-solid.svg" alt="Posts Icon">
    </div>
`;