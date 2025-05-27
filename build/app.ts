import { HTMLize, write } from "./base.js";

import { welcomeHTML } from "./welcome.js";
import { postIndexHTML } from "./posts.js";
import { aboutIndexHTML } from "./about.js";
import { materialsIndexHTML } from "./materials.js"; 

import { fileNames } from "./mitnotes.js"
import { TITLE_LANGS } from "./header-footer.js";

fileNames;

write("index.html", HTMLize(TITLE_LANGS, 
    `
    ${welcomeHTML}
    ${postIndexHTML}
    ${aboutIndexHTML}
    ${materialsIndexHTML}
    <div id="games">
        <h1 lang="en">Games</h1>
        <h1 lang="my">Permainan</h1>
        <h1 lang="zh">游戏</h1>
        <h1 lang="hk">遊戲</h1>
        <h1 lang="fr">Jeux</h1>
        <h1 lang="jp">ゲーム</h1>
        <div class="thumbnailWindow">
            <a class="thumbnail" style="background: linear-gradient(to right, rgb(218, 255, 150), rgb(236, 255, 226)); width: 300px;" href="/webpage/">
                <img src="/assets/arrow-right-solid.svg" alt="Folder Icon" class="materialIcon" style="width:2rem; height:2rem; margin-right:1rem; vertical-align:middle;" />
                <span style="font-size: 1.3rem; width:auto">
                    <span lang="en">Sandbox</span>
                    <span lang="my">Sandbox</span>
                    <span lang="zh">沙盒</span>
                    <span lang="hk">沙盒</span>
                    <span lang="fr">Sandbox</span>
                    <span lang="jp">サンドボックス</span>
                </span>
            </a>
        </div>
    </div>
    <div id="aboutwebsite">
        <h2 lang="en">About This Website</h2>
        <h2 lang="my">Tentang Laman Web Ini</h2>
        <h2 lang="zh">关于本网站</h2>
        <h2 lang="hk">關於本網站</h2>
        <h2 lang="fr">À propos de ce site Web</h2>
        <h2 lang="jp">このウェブサイトについて</h2>
        <p lang="en">This webpage is built completely with HTML, CSS, and (npm) Typescript. No advanced frameworks were used. This site is run on Github Pages (<a href="https://docs.github.com/en/github/site-policy/github-privacy-statement">Privacy Statement</a>) and uses <a href="https://analytics.google.com/">Google Analytics</a> (<a href="https://policies.google.com/privacy">Privacy Statement</a>). This webpage is merely a personal project, and I think it is kind of fun. I am also using this website to practice coding, and typing in different languages.</p>
        <p lang="my">Laman web ini dibina sepenuhnya dengan HTML, CSS, dan (npm) Typescript. Tiada rangka kerja lanjutan digunakan. Laman ini dijalankan pada Github Pages (<a href="https://docs.github.com/en/github/site-policy/github-privacy-statement">Pernyataan Privasi</a>) dan menggunakan <a href="https://analytics.google.com/">Google Analytics</a> (<a href="https://policies.google.com/privacy">Pernyataan Privasi</a>). Laman web ini hanyalah projek peribadi, dan saya rasa ia agak menyeronokkan. Saya juga guna laman web ini untuk berlatih coding dan berlatih menaip dalam pelbagai bahasa.</p>
        <p lang="zh">本网页完全使用 HTML、CSS 和（npm）Typescript 构建，没使用任何高级框架。本网站在 Github Pages（<a href="https://docs.github.com/en/github/site-policy/github-privacy-statement">隐私声明</a>）运行，并使用 <a href="https://analytics.google.com/">Google Analytics</a>（<a href="https://policies.google.com/privacy">隐私声明</a>）。本网页只是一个我觉得很有趣的个人项目。我也用这个网站练习编程和用不同的语言打字。</p>
        <p lang="hk">本網站完全用 HTML、CSS 及（npm）Typescript 建構，冇使用任何高級框架。本網站 Github Pages（<a href="https://docs.github.com/en/github/site-policy/github-privacy-statement">私隱聲明</a>）運行，並使用 <a href="https://analytics.google.com/">Google Analytics</a>（<a href="https://policies.google.com/privacy">私隱聲明</a>）。本網站只係一個我覺得很有趣嘅個人項目，。我亦都用這個網站練習編程同用唔同嘅語言打字。</p>
        <p lang="fr">Cette page web est entièrement construite avec HTML, CSS et (npm) Typescript. Aucun framework avancé n'a été utilisé. Ce site fonctionne sur Github Pages (<a href="https://docs.github.com/en/github/site-policy/github-privacy-statement">Déclaration de confidentialité</a>) et utilise <a href="https://analytics.google.com/">Google Analytics</a> (<a href="https://policies.google.com/privacy">Déclaration de confidentialité</a>). Cette page web est simplement un projet personnel, et je trouve cela plutôt amusant. J'utilise également ce site pour m'entraîner à coder et à taper dans différentes langues.</p>
        <p lang="jp">このウェブページは HTML、CSS、と（npm）Typescript だけで作成されています。高度なフレームワークは使用していません。このサイトは Github Pages（<a href="https://docs.github.com/en/github/site-policy/github-privacy-statement">プライバシーステートメント</a>）で運用され、<a href="https://analytics.google.com/">Google Analytics</a>（<a href="https://policies.google.com/privacy">プライバシーステートメント</a>）を使用しています。このウェブページは個人的なプロジェクトであり、私はとても楽しいと思っています。また、このサイトを使ってコーディングを練習して、様々な言語でのタイピングを練習しています。</p>
    </div>
    <br><br>
    `
));

