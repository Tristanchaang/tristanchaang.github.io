import * as fs from "fs";
import assert from "assert";
import { HTMLize, read, write, parseJMD } from "./base.js";

async function parsePost(mdName: string) {
    const date = mdName.slice(0,10);
    const mdContent = await read("markdown/_posts/"+mdName);
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
    write("posts/"+htmlName, content);
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

const engMonth = (monthNum: number) => 
    ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][monthNum];

const datify = (date: Date, lang: string) => {
    switch (lang) {
        case "en":
            return `${engMonth(date.getMonth())} ${date.getDate() + 1}, ${date.getFullYear()}`;
        case "my":
            // Malay: "1 Januari 2024"
            const malayMonths = ["Januari", "Februari", "Mac", "April", "Mei", "Jun", "Julai", "Ogos", "September", "Oktober", "November", "Disember"];
            return `${date.getDate() + 1} ${malayMonths[date.getMonth()]} ${date.getFullYear()}`;
        case "zh":
            // Chinese: "2024年1月1日"
            return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate() + 1}日`;
        case "hk":
            // Traditional Chinese (HK): "2024年1月1日"
            return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate() + 1}日`;
        case "fr":
            // French: "1 Jan 2024"
            const frenchMonths = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
            return `${date.getDate() + 1} ${frenchMonths[date.getMonth()]} ${date.getFullYear()}`;
        case "jp":
            // Japanese: "2024年1月1日"
            return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate() + 1}日`;
        default:
            return date.toDateString();
    }
}

const postTitleHTMLs = (await Promise.all(fileNames.map(async (file) => parsePost(file))))
                    .sort((a,b) => (a.date < b.date) ? 1 : -1)   
                    .map(file => `
                        <a class="postThumbnail local" href="/posts/${file.filename}">
                            <span style="font-size: 1.3rem; width:auto">
                                <span lang="en">${file.title}</span>
                                <span lang="my">${file.titleMY}</span>
                                <span lang="zh">${file.titleZH}</span>
                                <span lang="hk">${file.titleHK}</span>
                                <span lang="fr">${file.titleFR}</span>
                                <span lang="jp">${file.titleJP}</span>
                            </span>
                            <span style="min-width:135px; text-align: right;">
                                <span lang="en">${datify(file.date,"en")}</span>
                                <span lang="my">${datify(file.date,"my")}</span>
                                <span lang="zh">${datify(file.date,"zh")}</span>
                                <span lang="hk">${datify(file.date,"hk")}</span>
                                <span lang="fr">${datify(file.date,"fr")}</span>
                                <span lang="jp">${datify(file.date,"jp")}</span>
                            </span>
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