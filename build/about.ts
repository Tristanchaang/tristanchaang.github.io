import { Lang, langMap, LangString, spanLang } from "./langtools.js"

const EDU: [string, LangString, LangString, string][] = [
    ["2016-2021", 
        { en: "Kuen Cheng High School", my: "Sekolah Menengah Kuen Cheng", zh: "坤成中学", hk: "坤成中學", fr: "Lycée Kuen Cheng", jp: "クアンチェん中学校" }, 
        { en: "SPM", my: "SPM", zh: "SPM", hk: "SPM", fr: "SPM", jp: "SPM" }, 
        "kcphoto.jpg"],
    ["2021-2022", 
        { en: "Sunway College KL", my: "Kolej Sunway KL", zh: "吉隆坡双威学院", hk: "吉隆坡雙威學院", fr: "Lycée Sunway KL", jp: "KLサンウェイ高学校" }, 
        { en: "A-level", my: "A-level", zh: "A水准", hk: "A水準", fr: "A-level", jp: "Aレベル" },
        "sunwayphoto.jpg"],
    ["2023-2027", 
        { en: "MIT", my: "MIT", zh: "麻省理工学院", hk: "麻省理工學院", fr: "MIT", jp: "MIT" }, 
        { en: "BSc: Math & CS", my: "BSc: Mat & CS", zh: "理学本科: 数学与CS", hk: "理學本科: 數學與CS", fr: "BSc: Maths & Info", jp: "学士: 数学とCS" },
        "mitphoto.jpg"]
]

export const aboutIndexHTML = `
<div id="about">
    <h1>${spanLang({ en: "About", my: "Tentang Saya", zh: "关于我", hk: "關於我", fr: "Sur Moi", jp: "僕について" })}</h1>
    <div style="display:flex; align-items: center;">
        <div>
            <h3>${spanLang({ en: "Tristan Chaang", my: "Tristan Chaang", zh: "曾子宸", hk: "曾子宸", fr: "Tristan Chaang", jp: "トリスタン・チャーン / <ruby>曾<rt>そう</rt>子<rt>し</rt>宸<rt>しん</rt></ruby>" })}</h3>
            <p>${spanLang({
                en: `Hello! I am a Malaysian undergraduate student at MIT majoring in Course 18 (Mathematics) and Course 6-3 (Computer Science and Engineering). I love problem solving, teaching, learning new languages, and acting (see <a href="https://lost.mit.edu" target="_blank">MIT LOST</a>). I speak English, Malay, Cantonese, Mandarin and a little Japanese and French.`,
                my: `Helo! Saya seorang pelajar dari Malaysia yang sedang melanjut pelajaran di MIT. Bidang pelajaran saya adalah matematik, dan sains dan kejuruteraan komputer. Saya suka menyelesai masalah, mengajar, belajar bahasa-bahasa baru, dan berlakon (layari <a href="https://lost.mit.edu" target="_blank">MIT LOST</a>). Saya boleh bertutur dalam Bahasa Inggeris, Melayu, Kantonis, Mandarin, dan sedikit Bahasa Jepun dan Perancis.`,
                zh: `你好！我是麻省理工学院的马来西亚本科生，主修数学和计算机科学与工程。我喜欢解题、教书、学习新语言和话剧演艺（请看<a href="https://lost.mit.edu" target="_blank">MIT LOST</a>）。我会说英语、马来语、粤语、华语，以及一点日语和法语。`,
                hk: `你好！我係麻省理工學院嘅馬來西亞本科生，主修數學同電腦科學同工程。我鍾意解題、教書、學新嘅語言同埋話劇演技（睇 <a href="https://lost.mit.edu" target="_blank">MIT LOST </a>）。我識講英文、馬拉文、廣東話、普通話、同一啲日文同法文。`,
                fr: `Bonjour ! Je suis un étudiant malaisien au MIT, spécialisé en mathématiques et en informatique et ingénierie. J'aime résoudre des problèmes, enseigner, apprendre des nouvelles langues et jouer au théâtre (voir <a href="https://lost.mit.edu" target="_blank">MIT LOST</a>). Je parle anglais, malais, cantonais, mandarin et un peu de japonais et de français.`,
                jp: `こんにちは！僕はMITでマレーシア出身の大学生だって、専攻は数学と計算機の科学と工学です。問題解決、教えること、新しい言語を学ぶこと、そして演技が大好きです（<a href="https://lost.mit.edu" target="_blank">MIT LOST</a>をご覧ください）。英語、マレー語、広東語、中国語を話し、日本語とフランス語も少し話せます。`
            })}</p>
        </div>
        <img src="/assets/ProfilePic.jpg" alt="Profile Picture" style="height: 180px; width: 180px; margin-left: 50px;"/>
    </div>
    <h4>${spanLang({ en: "Education", my: "Pelajaran", zh: "教育", hk: "教育", fr: "Éducation", jp: "教育" })}</h4>
    <div id="education">
        ${EDU.map(([year,school,exam,pic]) =>`
            <div>
                <div style="background-image: url('/assets/${pic}');"></div>
                <span style="position:absolute; top: 10px; left: 10px; font-size: 1rem">${year}</span>
                <span style="position:absolute; top: 0; bottom: 0; left: 0; right: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 0.5rem;">
                    ${spanLang(school)}
                    <span>(${spanLang(exam)})</span>
                </span>
            </div>`).join("")}
    </div>
    <div class="thumbnailWindow">
        <a class="eduThumbnail local" href="/materials/resume.html">
            <img src="/assets/file-solid.svg" alt="Folder Icon" class="materialIcon" style="width:2rem; height:2rem; margin-right:1rem; vertical-align:middle;" />
            <span style="font-size: 1.3rem; width:auto">
                ${spanLang({ en: "Latest CV/Resume", my: "CV/Resume Terkini", zh: "最新履历/简历", hk: "最新履歷/簡歷", fr: "CV/Résumé Récent", jp: "最新職務経歴書/履歴書" })}
            </span>
        </a>
        <a class="eduThumbnail local" href="/posts/2022-05-19-my-book.html">
            <img src="/assets/book-solid.svg" alt="Folder Icon" class="materialIcon" style="width:2rem; height:2rem; margin-right:1rem; vertical-align:middle;" />
            <span style="font-size: 1.3rem; width:auto">
                ${spanLang({ en: "My Math Book", my: "Buku Matematik Saya", zh: "我的数学教科书", hk: "我嘅數學教科書", fr: "Mon livre de mathématiques", jp: "僕の数学の教科書" })}
            </span>
        </a>
    </div>
</div>
`

export const aboutIndexHTMLLangs = 
langMap({ en: "About", my: "Tentang Saya", zh: "关于我", hk: "關於我", fr: "Sur Moi", jp: "僕について" }, (lang, title) => `
<div id="about">
    <h1>${title}</h1>
    <div style="display:flex; align-items: center;">
        <div>
            <h3>${{ 
                en: "Tristan Chaang", my: "Tristan Chaang", zh: "曾子宸", hk: "曾子宸", fr: "Tristan Chaang", jp: "トリスタン・チャーン / <ruby>曾<rt>そう</rt>子<rt>し</rt>宸<rt>しん</rt></ruby>" 
            }[lang]}</h3>
            <p>${{
                en: `Hello! I am a Malaysian undergraduate student at MIT majoring in Course 18 (Mathematics) and Course 6-3 (Computer Science and Engineering). I love problem solving, teaching, learning new languages, and acting (see <a href="https://lost.mit.edu" target="_blank">MIT LOST</a>). I speak English, Malay, Cantonese, Mandarin and a little Japanese and French.`,
                my: `Helo! Saya seorang pelajar dari Malaysia yang sedang melanjut pelajaran di MIT. Bidang pelajaran saya adalah matematik, dan sains dan kejuruteraan komputer. Saya suka menyelesai masalah, mengajar, belajar bahasa-bahasa baru, dan berlakon (layari <a href="https://lost.mit.edu" target="_blank">MIT LOST</a>). Saya boleh bertutur dalam Bahasa Inggeris, Melayu, Kantonis, Mandarin, dan sedikit Bahasa Jepun dan Perancis.`,
                zh: `你好！我是麻省理工学院的马来西亚本科生，主修数学和计算机科学与工程。我喜欢解题、教书、学习新语言和话剧演艺（请看<a href="https://lost.mit.edu" target="_blank">MIT LOST</a>）。我会说英语、马来语、粤语、华语，以及一点日语和法语。`,
                hk: `你好！我係麻省理工學院嘅馬來西亞本科生，主修數學同電腦科學同工程。我鍾意解題、教書、學新嘅語言同埋話劇演技（睇 <a href="https://lost.mit.edu" target="_blank">MIT LOST </a>）。我識講英文、馬拉文、廣東話、普通話、同一啲日文同法文。`,
                fr: `Bonjour ! Je suis un étudiant malaisien au MIT, spécialisé en mathématiques et en informatique et ingénierie. J'aime résoudre des problèmes, enseigner, apprendre des nouvelles langues et jouer au théâtre (voir <a href="https://lost.mit.edu" target="_blank">MIT LOST</a>). Je parle anglais, malais, cantonais, mandarin et un peu de japonais et de français.`,
                jp: `こんにちは！僕はMITでマレーシア出身の大学生だって、専攻は数学と計算機の科学と工学です。問題解決、教えること、新しい言語を学ぶこと、そして演技が大好きです（<a href="https://lost.mit.edu" target="_blank">MIT LOST</a>をご覧ください）。英語、マレー語、広東語、中国語を話し、日本語とフランス語も少し話せます。`
            }[lang]}</p>
        </div>
        <img src="/assets/ProfilePic.jpg" alt="Profile Picture" style="height: 180px; width: 180px; margin-left: 50px;"/>
    </div>
    <h4>${{ 
        en: "Education", my: "Pelajaran", zh: "教育", hk: "教育", fr: "Éducation", jp: "教育" 
    }[lang]}</h4>
    <div id="education">
        ${EDU.map(([year,school,exam,pic]) =>`
            <div>
                <div style="background-image: url('/assets/${pic}');"></div>
                <span style="position:absolute; top: 10px; left: 10px; font-size: 1rem">${year}</span>
                <span style="position:absolute; top: 0; bottom: 0; left: 0; right: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 0.5rem;">
                    ${school[lang as keyof LangString]}
                    <span>(${exam[lang as keyof LangString]})</span>
                </span>
            </div>`).join("")}
    </div>
    <div class="thumbnailWindow">
        <a class="eduThumbnail local" href="/materials/resume.html">
            <img src="/assets/file-solid.svg" alt="Folder Icon" class="materialIcon" style="width:2rem; height:2rem; margin-right:1rem; vertical-align:middle;" />
            <span style="font-size: 1.3rem; width:auto">
                ${{ 
                    en: "Latest CV/Resume", my: "CV/Resume Terkini", zh: "最新履历/简历", hk: "最新履歷/簡歷", fr: "CV/Résumé Récent", jp: "最新職務経歴書/履歴書"
                }[lang]}
            </span>
        </a>
        <a class="eduThumbnail local" href="/posts/2022-05-19-my-book.html">
            <img src="/assets/book-solid.svg" alt="Folder Icon" class="materialIcon" style="width:2rem; height:2rem; margin-right:1rem; vertical-align:middle;" />
            <span style="font-size: 1.3rem; width:auto">
                ${{ 
                    en: "My Math Book", my: "Buku Matematik Saya", zh: "我的数学教科书", hk: "我嘅數學教科書", fr: "Mon livre de mathématiques", jp: "僕の数学の教科書" 
                }[lang]}
            </span>
        </a>
    </div>
</div>
`)

export const aboutWebsiteIndexHTML = `
<div id="aboutwebsite">
    ${spanLang({
        en: `<h2>About This Website</h2>
            <p>This webpage is built completely with HTML, CSS, and (npm) Typescript. No advanced frameworks were used. This site is run on Github Pages (<a href="https://docs.github.com/en/github/site-policy/github-privacy-statement">Privacy Statement</a>) and uses <a href="https://developers.google.com/analytics">Google Analytics</a> (<a href="https://policies.google.com/privacy">Privacy Statement</a>). This webpage is merely a personal project, and I think it is kind of fun. I am also using this website to practice coding, and typing in different languages.</p>`,
        my: `<h2>Tentang Laman Web Ini</h2>
            <p>Laman web ini dibina sepenuhnya dengan HTML, CSS, dan (npm) Typescript. Tiada rangka kerja lanjutan digunakan. Laman ini dijalankan pada Github Pages (<a href="https://docs.github.com/en/github/site-policy/github-privacy-statement">Pernyataan Privasi</a>) dan menggunakan <a href="https://developers.google.com/analytics">Google Analytics</a> (<a href="https://policies.google.com/privacy">Pernyataan Privasi</a>). Laman web ini hanyalah projek peribadi, dan saya rasa ia agak menyeronokkan. Saya juga guna laman web ini untuk berlatih coding dan berlatih menaip dalam pelbagai bahasa.</p>`,
        zh: `<h2>关于此网站</h2>
            <p>本网页完全使用 HTML、CSS 和（npm）Typescript 构建，没使用任何高级框架。本网站在 Github Pages（<a href="https://docs.github.com/en/github/site-policy/github-privacy-statement">隐私声明</a>）运行，并使用 <a href="https://developers.google.com/analytics">Google Analytics</a>（<a href="https://policies.google.com/privacy">隐私声明</a>）。这个网页只是一个我觉得很有趣的个人项目。我也用这个机会练习编程和用不同的语言打字。</p>`,
        hk: `<h2>關於此網站</h2>
            <p>此網站完全用 HTML、CSS 同（npm）Typescript 建構，冇使用任何高級框架。網站喺 Github Pages（<a href="https://docs.github.com/en/github/site-policy/github-privacy-statement">私隱聲明</a>）運行，並使用 <a href="https://developers.google.com/analytics">Google Analytics</a>（<a href="https://policies.google.com/privacy">私隱聲明</a>）。呢個網站只係一個我覺得很有趣嘅個人項目，我亦都用呢個機會練習編程同用唔同嘅語言打字。</p>`,
        fr: `<h2>À propos de ce site Web</h2>
            <p>Cette page web est entièrement construite avec HTML, CSS et (npm) Typescript. Aucun framework avancé n'a été utilisé. Ce site fonctionne sur Github Pages (<a href="https://docs.github.com/en/github/site-policy/github-privacy-statement">Déclaration de confidentialité</a>) et utilise <a href="https://developers.google.com/analytics">Google Analytics</a> (<a href="https://policies.google.com/privacy">Déclaration de confidentialité</a>). Cette page web est simplement un projet personnel, et je trouve cela plutôt amusant. J'utilise également ce site pour m'entraîner à coder et à taper dans différentes langues.</p>`,
        jp: `<h2>このウェブサイトについて</h2>
            <p>このウェブページは HTML、CSS、と（npm）Typescript だけで作成されています。高度なフレームワークは使用していません。このサイトは Github Pages（<a href="https://docs.github.com/en/github/site-policy/github-privacy-statement">プライバシーステートメント</a>）で運用され、<a href="https://developers.google.com/analytics">Google Analytics</a>（<a href="https://policies.google.com/privacy">プライバシーステートメント</a>）を使用しています。このウェブページは個人的なプロジェクトであり、僕はとても楽しいと思っています。また、このサイトを使ってコーディングを練習して、様々な言語でのタイピングを練習しています。</p>`
    })}
</div>
`

export const aboutWebsiteIndexHTMLLangs = 
langMap({
        en: `<h2>About This Website</h2>
            <p>This webpage is built completely with HTML, CSS, and (npm) Typescript. No advanced frameworks were used. This site is run on Github Pages (<a href="https://docs.github.com/en/github/site-policy/github-privacy-statement">Privacy Statement</a>) and uses <a href="https://developers.google.com/analytics">Google Analytics</a> (<a href="https://policies.google.com/privacy">Privacy Statement</a>). This webpage is merely a personal project, and I think it is kind of fun. I am also using this website to practice coding, and typing in different languages.</p>`,
        my: `<h2>Tentang Laman Web Ini</h2>
            <p>Laman web ini dibina sepenuhnya dengan HTML, CSS, dan (npm) Typescript. Tiada rangka kerja lanjutan digunakan. Laman ini dijalankan pada Github Pages (<a href="https://docs.github.com/en/github/site-policy/github-privacy-statement">Pernyataan Privasi</a>) dan menggunakan <a href="https://developers.google.com/analytics">Google Analytics</a> (<a href="https://policies.google.com/privacy">Pernyataan Privasi</a>). Laman web ini hanyalah projek peribadi, dan saya rasa ia agak menyeronokkan. Saya juga guna laman web ini untuk berlatih coding dan berlatih menaip dalam pelbagai bahasa.</p>`,
        zh: `<h2>关于此网站</h2>
            <p>本网页完全使用 HTML、CSS 和（npm）Typescript 构建，没使用任何高级框架。本网站在 Github Pages（<a href="https://docs.github.com/en/github/site-policy/github-privacy-statement">隐私声明</a>）运行，并使用 <a href="https://developers.google.com/analytics">Google Analytics</a>（<a href="https://policies.google.com/privacy">隐私声明</a>）。这个网页只是一个我觉得很有趣的个人项目。我也用这个机会练习编程和用不同的语言打字。</p>`,
        hk: `<h2>關於此網站</h2>
            <p>此網站完全用 HTML、CSS 同（npm）Typescript 建構，冇使用任何高級框架。網站喺 Github Pages（<a href="https://docs.github.com/en/github/site-policy/github-privacy-statement">私隱聲明</a>）運行，並使用 <a href="https://developers.google.com/analytics">Google Analytics</a>（<a href="https://policies.google.com/privacy">私隱聲明</a>）。呢個網站只係一個我覺得很有趣嘅個人項目，我亦都用呢個機會練習編程同用唔同嘅語言打字。</p>`,
        fr: `<h2>À propos de ce site Web</h2>
            <p>Cette page web est entièrement construite avec HTML, CSS et (npm) Typescript. Aucun framework avancé n'a été utilisé. Ce site fonctionne sur Github Pages (<a href="https://docs.github.com/en/github/site-policy/github-privacy-statement">Déclaration de confidentialité</a>) et utilise <a href="https://developers.google.com/analytics">Google Analytics</a> (<a href="https://policies.google.com/privacy">Déclaration de confidentialité</a>). Cette page web est simplement un projet personnel, et je trouve cela plutôt amusant. J'utilise également ce site pour m'entraîner à coder et à taper dans différentes langues.</p>`,
        jp: `<h2>このウェブサイトについて</h2>
            <p>このウェブページは HTML、CSS、と（npm）Typescript だけで作成されています。高度なフレームワークは使用していません。このサイトは Github Pages（<a href="https://docs.github.com/en/github/site-policy/github-privacy-statement">プライバシーステートメント</a>）で運用され、<a href="https://developers.google.com/analytics">Google Analytics</a>（<a href="https://policies.google.com/privacy">プライバシーステートメント</a>）を使用しています。このウェブページは個人的なプロジェクトであり、僕はとても楽しいと思っています。また、このサイトを使ってコーディングを練習して、様々な言語でのタイピングを練習しています。</p>`
    }, (lang, aboutWebsite) => `
<div id="aboutwebsite">
    ${aboutWebsite}
</div>
`)