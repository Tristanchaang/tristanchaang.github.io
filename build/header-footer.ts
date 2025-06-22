import { LangString, spanLang } from "./langtools.js";

const NAVBAR_TABS: [LangString, string][] = [
    [{ en: "About", zh: "关于我", hk: "關於我", my: "Tentang Saya", fr: "Sur Moi", jp: "私について" },
        `onclick="directIndexSection('#about')"`],
    [{ en: "Materials", zh: "资料", hk: "資料", my: "Bahan", fr: "Matériaux", jp: "資料" },
        `onclick="directIndexSection('#materials')"`],
    [{ en: "MIT", zh: "MIT", hk: "MIT", my: "MIT", fr: "MIT", jp: "MIT" },
        `href="/materials/mitnotes.html"`],
    [{ en: "Games", zh: "游戏", hk: "遊戲", my: "Permainan", fr: "Jeux", jp: "ゲーム" },
        `onclick="directIndexSection('#games')"`]
];

const SOCMED = {
    github: "https://github.com/Tristanchaang",
    youtube: "https://www.youtube.com/016tristan",
    linkedin: "https://www.linkedin.com/in/tchaang/"
};

export const TITLE_LANGS: LangString = { 
    en: "Tristan Chaang's Page", 
    my: "Laman Tristan Chaang", 
    zh: "曾子宸的网站", 
    hk: "曾子宸嘅網站", 
    fr: "La page de Tristan Chaang", 
    jp: "トリ・チャーンのペイジ" 
}

export const headerHTML = `
    <nav>
        <a class="local" onclick="directIndexSection('body')" style="font-size: 1.5rem; cursor: pointer">
            ${spanLang(TITLE_LANGS)}
        </a>
        <div id=navmenu style="display: flex; gap: 20px; align-items: center; gap: 2rem;" >
            ${NAVBAR_TABS.map(
                ([tabname, link]) => `<a class="local" ${link} style="cursor: pointer">${spanLang(tabname)}</a>`
            ).join("")}
            <div id=langSelect>
                <a class="langButton" href="?lang=en"><img src="/assets/gb.svg" alt="en" width="24" height="16" style="vertical-align: middle;" /></a>
                <a class="langButton" href="?lang=my"><img src="/assets/my.svg" alt="my" width="24" height="16" style="vertical-align: middle;" /></a>
                <a class="langButton" href="?lang=zh"><img src="/assets/cn.svg" alt="zh" width="24" height="16" style="vertical-align: middle;" /></a>
                <a class="langButton" href="?lang=hk"><img src="/assets/hk.svg" alt="hk" width="24" height="16" style="vertical-align: middle;" /></a>
                <a class="langButton" href="?lang=fr"><img src="/assets/fr.svg" alt="fr" width="24" height="16" style="vertical-align: middle;" /></a>
                <a class="langButton" href="?lang=jp"><img src="/assets/jp.svg" alt="jp" width="24" height="16" style="vertical-align: middle;" /></a>
            </div>
        </div> 
        
    </nav>
`;

export const footerHTML = `
    <footer>
        <div id="socmed">
            ${Object.entries(SOCMED).map(
                ([platform, link]) => `<a href="${link}" target="_blank">
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${platform}.svg" alt="${platform}" width="24" height="24">
                </a>`).join("")}
        </div>
    </footer>
`;