import { LangString, spanLang } from "./langtools.js"

const welcomeText: LangString = {
    en: "Welcome to my personal page! Here I write about myself and all kinds of stuff I want to share. This is a new version of my website, and may have bugs.",
    my: "Selamat datang ke laman web saya! Di sini saya menulis tentang saya dan berkongsi apa-apa perkara yang menarik. Versi laman web ini adalah terbaru, jadi ia mungkin ada kerosakan.",
    zh: "欢迎来到我的网站！我在这里写一些关于自己的东西和我想分享的事物。这是网站的最新版本，所以可能会有漏洞。",
    hk: "歡迎嚟到我嘅網站！我係呢度寫關於我嘅嘢同埋我想分享嘅事。呢個網站係最新嘅版本，所以可能有漏洞。",
    fr: "Bienvenue sur mon site ! Ici, j'écris sur moi, et sur tout ce que je souhaite partager. Cette page-ci est une nouvelle version de mon site web, donc elle peut avoir des bugs.",
    jp: "僕のウェブサイトへようこそ！ここで、自身のこととみんなさんにシェアしたい色々なことについてか書いています。このページは、新しいバージョンなので、バグがある可能性があります。"
}

export const welcomeHTML = `
    <div id="welcome">
        <p>${spanLang(welcomeText)}</p>
    </div>
`