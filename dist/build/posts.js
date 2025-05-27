import * as fs from "fs";
import { HTMLize, read, write, parseJMD } from "./base.js";
async function parsePost(mdName) {
    const date = mdName.slice(0, 10);
    const mdContent = await read("markdown/_posts/" + mdName);
    const { meta, interior } = parseJMD(mdContent);
    const content = HTMLize(meta.title, `
        <div style='${("font" in meta) ? `font-family: ${meta.font};` : ""} padding-left: 200px; padding-right: 200px'>
            <h1 lang="en">${meta.title}</h1>
            <h1 lang="my">${meta.titleMY ?? meta.title}</h1>
            <h1 lang="zh">${meta.titleZH ?? meta.title}</h1>
            <h1 lang="hk">${meta.titleHK ?? meta.title}</h1>
            <h1 lang="fr">${meta.titleFR ?? meta.title}</h1>
            <h1 lang="jp">${meta.titleJP ?? meta.title}</h1>
            ${interior}
        </div>
        `);
    const htmlName = mdName.replace(/\.md$/, ".html");
    write("posts/" + htmlName, content);
    return { date: new Date(date), content: content, filename: htmlName,
        title: meta.title,
        titleMY: meta.titleMY ?? meta.title,
        titleZH: meta.titleZH ?? meta.title,
        titleHK: meta.titleHK ?? meta.title,
        titleFR: meta.titleFR ?? meta.title,
        titleJP: meta.titleJP ?? meta.title,
    };
}
const fileNames = (await fs.promises.readdir("markdown/_posts")).filter(f => f.endsWith(".md"));
const engMonth = (monthNum) => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][monthNum];
const postTitleHTMLs = (await Promise.all(fileNames.map(async (file) => parsePost(file))))
    .sort((a, b) => (a.date < b.date) ? 1 : -1)
    .map(file => `
                        <a class="postThumbnail" href="/posts/${file.filename}">
                            <span style="font-size: 1.3rem; width:auto">
                                <span lang="en">${file.title}</span>
                                <span lang="my">${file.titleMY}</span>
                                <span lang="zh">${file.titleZH}</span>
                                <span lang="hk">${file.titleHK}</span>
                                <span lang="fr">${file.titleFR}</span>
                                <span lang="jp">${file.titleJP}</span>
                            </span>
                            <span style="min-width:135px; text-align: right;">${engMonth(file.date.getMonth())} ${file.date.getDate() + 1}, ${file.date.getFullYear()}</span>
                        </a>`.trim());
export const postIndexHTML = `
    <div id="posts" style="position: relative">
        <h1 lang="en">Posts</h1>
        <h1 lang="my">Siaran-Siaran</h1>
        <h1 lang="zh">贴文</h1>
        <h1 lang="hk">貼文</h1>
        <h1 lang="fr">Publications</h1>
        <h1 lang="jp">投稿</h1>
        <div id="postWindow">${postTitleHTMLs.join("")}</div>
        <img id="postBg" src="/assets/file-pen-solid.svg" alt="Posts Icon">
    </div>
`;
//# sourceMappingURL=posts.js.map