import { langMap, spanLang } from "./langtools.js";
const welcomeTextLangs = {
    en: "Welcome to my personal page! Here I write about myself and all kinds of stuff I want to share. This is a new version of my website, and may have bugs. Feel free to switch to different languages (English, Malay, Mandarin, Cantonese, French, Japanese) on the top-right corner!",
    my: "Selamat datang ke laman web saya! Di sini saya menulis tentang saya dan berkongsi apa-apa perkara yang menarik. Versi laman web ini adalah terbaru, jadi ia mungkin ada kerosakan. Beralih kepada bahasa-bahasa berbeza (Inggeris, Melayu, Mandarin, Kantonis, Perancis, Jepun) pada penjuru kanan sebelah atas!",
    zh: "欢迎来到我的网站！我在这里写一些关于自己的东西和我想分享的事物。这是网站的最新版本，所以可能会有漏洞。您可以在右上角随意切换到不同的语言（英语、马来语、普通话、粤语、法语、日语）！",
    hk: "歡迎嚟到我嘅網站！我係呢度寫關於我嘅嘢同埋我想分享嘅事。呢個網站係最新嘅版本，所以可能有漏洞。你可以喺右邊上面隨意換唔同嘅語言（英文、馬拉文、普通話、廣東話、法文、日文）！",
    fr: "Bienvenue sur mon site ! Ici, j'écris sur moi, et sur tout ce que je souhaite partager. Cette page-ci est une nouvelle version de mon site web, donc elle peut avoir des bugs. Passez à différentes langues (anglais, malais, mandarin, cantonais, français, japonais) dans le coin supérieur droit !",
    jp: "僕のウェブサイトへようこそ！ここで、自身のこととみんなさんにシェアしたい色々なことについてか書いています。このページは、新しいバージョンなので、バグがある可能性があります。右上隅でさまざまな言語（英語、マレー語、北京語、広東語、フランス語、日本語）に自由に切り替えてください。"
};
export const welcomeHTML = `
    <div id="welcome">
        <p>${spanLang(welcomeTextLangs)}</p>
    </div>
`;
export const welcomeHTMLLangs = langMap(welcomeTextLangs, (lang, welcomeText) => `<div id="welcome">
        <p>${welcomeText}</p>
    </div>
`);
//# sourceMappingURL=welcome.js.map