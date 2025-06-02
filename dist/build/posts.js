import * as fs from "fs";
import { writeMultiLangJMD } from "./parsetools.js";
import { spanLang, dateLangs, langMap } from "./langtools.js";
const fileNames = (await fs.promises.readdir("markdown/_posts/en")).filter(f => f.endsWith(".md"));
const postTitleHTMLs = (await Promise.all(fileNames.map(async (file) => writeMultiLangJMD(file, "posts", new Map(), ((s) => s)))))
    .sort((a, b) => (a.date < b.date) ? 1 : -1)
    .map(file => `
                        <a class="postThumbnail local" href="/posts/${file.filename}">
                            <span style="font-size: 1.3rem; width:auto">
                                ${spanLang(file.titleLangs)}
                            </span>
                            <span style="min-width:150px; text-align: right;">
                                ${spanLang(dateLangs(file.date))}
                            </span>
                        </a>`)
    .join(``).trim();
export const postIndexHTML = `
    <div id="posts" style="position: relative">
        <h1>${spanLang({ en: "Posts", my: "Siaran-Siaran", zh: "贴文", hk: "貼文", fr: "Publications", jp: "投稿" })}</h1>
        <div id="postWindow">
            ${postTitleHTMLs}
        </div>
        <img id="postBg" src="/assets/file-pen-solid.svg" alt="Posts Icon">
    </div>
`;
const x = (await Promise.all(fileNames.map(async (file) => writeMultiLangJMD(file, "posts", new Map(), ((s) => s)))))
    .sort((a, b) => (a.date < b.date) ? 1 : -1);
const postTitleHTMLLangs = langMap({ en: "", my: "", zh: "", hk: "", fr: "", jp: "" }, (lang, title) => x.map(file => `<a class="postThumbnail local" href="/posts/${file.filename}">
                            <span style="font-size: 1.3rem; width:auto">
                                ${file.titleLangs[lang]}
                            </span>
                            <span style="min-width:150px; text-align: right;">
                                ${dateLangs(file.date)[lang]}
                            </span>
                        </a>`).join(""));
;
export const postIndexHTMLLangs = langMap({ en: "Posts", my: "Siaran-Siaran", zh: "贴文", hk: "貼文", fr: "Publications", jp: "投稿" }, (lang, title) => `
    <div id="posts" style="position: relative">
        <h1>${title}</h1>
        <div id="postWindow">
            ${postTitleHTMLLangs[lang]}
        </div>
        <img id="postBg" src="/assets/file-pen-solid.svg" alt="Posts Icon">
    </div>
`);
//# sourceMappingURL=posts.js.map