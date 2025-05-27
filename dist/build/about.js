const EDU = [
    ["2016-2021",
        {
            en: "Kuen Cheng High School",
            my: "Sekolah Menengah Kuen Cheng",
            zh: "坤成中学",
            hk: "坤成中學",
            fr: "Lycée Kuen Cheng",
            jp: "クアンチェん中学校"
        }, {
            en: "SPM",
            my: "SPM",
            zh: "SPM",
            hk: "SPM",
            fr: "SPM",
            jp: "SPM"
        }, "kcphoto.jpg"],
    ["2021-2022",
        {
            en: "Sunway College KL",
            my: "Kolej Sunway KL",
            zh: "吉隆坡双威学院",
            hk: "吉隆坡雙威學院",
            fr: "Lycée Sunway KL",
            jp: "KLサンウェイ高学校"
        }, {
            en: "A-level",
            my: "A-level",
            zh: "A水准",
            hk: "A水準",
            fr: "A-level",
            jp: "Aレベル"
        }, "sunwayphoto.jpg"],
    ["2023-2027",
        {
            en: "MIT",
            my: "MIT",
            zh: "麻省理工",
            hk: "麻省理工",
            fr: "MIT",
            jp: "MIT"
        }, {
            en: "BSc: Math & CS",
            my: "BSc: Mat & CS",
            zh: "理学本科: 数学与CS",
            hk: "理學本科: 數學與CS",
            fr: "BSc: Maths & Info",
            jp: "学士: 数学とCS"
        }, "mitphoto.jpg"]
];
export const aboutIndexHTML = `
<div id="about">
    <h1 lang="en">About</h1>
    <h1 lang="my">Tentang Saya</h1>
    <h1 lang="zh">关于我</h1>
    <h1 lang="hk">關於我</h1>
    <h1 lang="fr">Sur Moi</h1>
    <h1 lang="jp">僕について</h1>
    <div style="display:flex; align-items: center;">
        <div>
            <h3 lang="en">Tristan Chaang</h3>
            <h3 lang="my">Tristan Chaang</h3>
            <h3 lang="zh">曾子宸</h3>
            <h3 lang="hk">曾子宸</h3>
            <h3 lang="fr">Tristan Chaang</h3>
            <h3 lang="jp">トリスタン・チャーン / <ruby>曾<rt>そう</rt>子<rt>し</rt>宸<rt>しん</rt></ruby></h3>
            <p lang="en">Hello! I am a Malaysian undergraduate student at MIT majoring in Course 18 (Mathematics) and Course 6-3 (Computer Science and Engineering). I love problem solving, teaching, learning new languages, and acting (see <a href="https://lost.mit.edu" target="_blank">MIT LOST</a>). I speak English, Malay, Cantonese, Mandarin and a little Japanese and French.</p>
            <p lang="my">Helo! Saya seorang pelajar dari Malaysia yang sedang melanjut pelajaran di MIT. Bidang pelajaran saya adalah matematik, dan sains dan kejuruteraan komputer. Saya suka menyelesai masalah, mengajar, belajar bahasa-bahasa baru, dan berlakon (layari <a href="https://lost.mit.edu" target="_blank">MIT LOST</a>). Saya boleh bertutur dalam Bahasa Inggeris, Melayu, Kantonis, Mandarin, dan sedikit Bahasa Jepun dan Perancis.</p>
            <p lang="zh">你好！我是麻省理工学院的马来西亚本科生，主修数学和计算机科学与工程。我喜欢解题、教书、学习新语言和话剧演艺（请看<a href="https://lost.mit.edu" target="_blank">MIT LOST</a>）。我会说英语、马来语、粤语、华语，以及一点日语和法语。</p>
            <p lang="hk">你好！我係麻省理工學院嘅馬來西亞本科生，主修數學同電腦科學同工程。我鍾意解題、教書、學新嘅語言同埋話劇演技（睇 <a href="https://lost.mit.edu" target="_blank">MIT LOST </a>）。我識講英文、馬拉文、廣東話、普通話、同一啲日文同法文。</p>
            <p lang="fr">Bonjour ! Je suis un étudiant malaisien au MIT, spécialisé en mathématiques et en informatique et ingénierie. J'aime résoudre des problèmes, enseigner, apprendre des nouvelles langues et jouer au théâtre (voir <a href="https://lost.mit.edu" target="_blank">MIT LOST</a>). Je parle anglais, malais, cantonais, mandarin et un peu de japonais et de français.</p>
            <p lang="jp">こんにちは！僕はMITでマレーシア出身の大学生だって、専攻は数学と計算機の科学と工学です。問題解決、教えること、新しい言語を学ぶこと、そして演技が大好きです（<a href="https://lost.mit.edu" target="_blank">MIT LOST</a>をご覧ください）。英語、マレー語、広東語、中国語を話し、日本語とフランス語も少し話せます。</p>
        </div>
        <img src="/assets/ProfilePic.jpg" alt="Profile Picture" style="height: 180px; width: 180px; margin-left: 50px;"/>
    </div>
    <h4 lang="en">Education</h4>
    <h4 lang="my">Pelajaran</h4>
    <h4 lang="zh">教育</h4>
    <h4 lang="hk">教育</h4>
    <h4 lang="fr">Éducation</h4>
    <h4 lang="jp">教育</h4>
    <div id="education">
        ${EDU.map(([year, school, exam, pic]) => `
            <div>
                <div style="background-image: url('/assets/${pic}');"></div>
                <span style="position:absolute; top: 10px; left: 10px; font-size: 1rem">${year}</span>
                <span style="position:absolute; top: 0; bottom: 0; left: 0; right: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 0.5rem;">
                    <span lang="en">${school.en}</span>
                    <span lang="my">${school.my}</span>
                    <span lang="zh">${school.zh}</span>
                    <span lang="hk">${school.hk}</span>
                    <span lang="fr">${school.fr}</span>
                    <span lang="jp">${school.jp}</span>
                    <span lang="en">(${exam.en})</span>
                    <span lang="my">(${exam.my})</span>
                    <span lang="zh">(${exam.zh})</span>
                    <span lang="hk">(${exam.hk})</span>
                    <span lang="fr">(${exam.fr})</span>
                    <span lang="jp">(${exam.jp})</span>
                </span>
            </div>`).join("")}
    </div>
    <div class="thumbnailWindow">
        <a class="eduThumbnail local" href="/materials/resume.html">
            <img src="/assets/file-solid.svg" alt="Folder Icon" class="materialIcon" style="width:2rem; height:2rem; margin-right:1rem; vertical-align:middle;" />
            <span style="font-size: 1.3rem; width:auto">
                <span lang="en">Latest CV/Resume</span>
                <span lang="my">CV/Resume Terkini</span>
                <span lang="zh">最新履历/简历</span>
                <span lang="hk">最新履歷/簡歷</span>
                <span lang="fr">CV/Résumé Récent</span>
                <span lang="jp">最新職務経歴書/履歴書</span>
            </span>
        </a>
        <a class="eduThumbnail local" href="/posts/2022-05-19-my-book.html">
            <img src="/assets/book-solid.svg" alt="Folder Icon" class="materialIcon" style="width:2rem; height:2rem; margin-right:1rem; vertical-align:middle;" />
            <span style="font-size: 1.3rem; width:auto">
                <span lang="en">My Math Book</span>
                <span lang="my">Buku Matematik Saya</span>
                <span lang="zh">我的数学教科书</span>
                <span lang="hk">我嘅數學教科書</span>
                <span lang="fr">Mon livre de mathématiques</span>
                <span lang="jp">僕の数学の教科書</span>
            </span>
        </a>
    </div>
</div>
`;
//# sourceMappingURL=about.js.map