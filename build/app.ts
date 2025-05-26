import { HTMLize, write } from "./base.js";

import { postIndexHTML } from "./posts.js";
import { aboutIndexHTML } from "./about.js";
import { materialsIndexHTML } from "./materials.js"; 

import { fileNames } from "./mitnotes.js"
fileNames;

write("index.html", HTMLize("Tristan Chaang's Page", 
    `
    <div id="welcome" lang="en">
        Welcome to my personal page! Here I write about myself and all kinds of stuff I want to share. This is a new version of my website, and may have bugs.
    </div>
    <div id="welcome" lang="my">
        Selamat datang ke laman web saya! Di sini saya menulis tentang saya dan berkongsi apa-apa perkara yang menarik. Versi laman web ini adalah terbaharu, jadi ia mungkin ada kerosakan.
    </div>
    <div id="welcome" lang="zh">
        欢迎来到我的网站！我在这里写一些关于自己的东西和我想分享的事物。这是网站的最新版本，所以可能会有漏洞。
    </div>
    <div id="welcome" lang="hk">
        歡迎嚟到我嘅網站！我係呢度寫關於我嘅嘢同埋我想分享嘅事。呢個係最新嘅版本，所以可能有漏洞。
    </div>
    ${postIndexHTML}
    ${aboutIndexHTML}
    ${materialsIndexHTML}
    <div id="games">
        <h1>Games</h1>
        <div class="thumbnailWindow">
            <a class="thumbnail" style="background: linear-gradient(to right, rgb(218, 255, 150), rgb(236, 255, 226)); width: 300px;" href="/webpage/">
                <img src="/assets/arrow-right-solid.svg" alt="Folder Icon" class="materialIcon" style="width:2rem; height:2rem; margin-right:1rem; vertical-align:middle;" />
                <span style="font-size: 1.3rem; width:auto">Sandbox</span>
            </a>
        </div>
    </div>
    <div id="aboutwebsite">
        <h2>About This Website</h2>
        This webpage is built completely with HTML, CSS, and (npm) Typescript. No advanced frameworks were used. This site is run on Github Pages (<a href="https://docs.github.com/en/github/site-policy/github-privacy-statement">Privacy Statement</a>) and uses <a href="https://analytics.google.com/">Google Analytics</a> (<a href="https://policies.google.com/privacy">Privacy Statement</a>). This webpage is merely a personal project, and I think it is kind of fun. I am also using this website to practice writing different languages.
    </div>
    <br><br>
    `
));

