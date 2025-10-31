import * as fs from "fs";
import { dateLangs } from "./dist/build/langtools.js"

const API_KEY = "AIzaSyAJ69pY-vwBiQ8AiKbXmFYcLjiTLthRjXE";

let LANGS = ["en", "my", "zh", "hk", "fr", "jp"];

const MATERIALS = {
    "random": { en: "Random Fun Problems", my: "Masalah Menarik", zh: "有趣的题目", hk: "得意嘅題目", fr: "Problèmes Intéressants", jp: "おもしろい問題" },
    "talks": { en: "Talks", my: "Ceramah", zh: "讲座", hk: "講座", fr: "Conférences", jp: "講演" },
    "bimo": { en: "BIMO Handouts", my: "Nota Edaran BIMO", zh: "BIMO 讲义", hk: "BIMO 講義", fr: "Documents BIMO", jp: "BIMO 配布資料" },   
    "olympiads": { en: "Olympiads", my: "Olimpiad", zh: "奥林匹克教材", hk: "奧林匹克教材", fr: "Olympiades", jp: "オリンピック" },   
    "nonolympiads": { en: "Non-Olympiads", my: "Bukan Olimpiad", zh: "非奥林匹克教材", hk: "非奧林匹克教材", fr: "Non-Olympiades", jp: "非オリンピック" },   
    "spmchemistry": { en: "SPM Chemistry", my: "Kimia SPM", zh: "SPM 化学", hk: "SPM 化學", fr: "Chimie SPM", jp: "SPM 化学" },   
    "resume": { en: "Latest CV/Resume", my: "CV/Resume Terkini", zh: "最新履历/简历", hk: "最新履歷/簡歷", fr: "CV/Résumé Récent", jp: "最新職務経歴書/履歴書" },   
    "mitnotes": { en: "MIT", my: "MIT", zh: "MIT", hk: "MIT", fr: "MIT", jp: "MIT" }   
};

for (const lang of ["jp"]) {

    // for (const [filename, translations] of Object.entries(MATERIALS)) 
    
    {
        
        const filePath = `markdown/_materials/${lang}/talks.md`;

        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replaceAll(/\[(?<date>[^\n]*)\]/g, (match, p1) => {
            const date = p1;
            console.log(date);
            const x = dateLangs(new Date(date))[lang];
            console.log(x)
            return `[${x}]`;
        });
        fs.writeFileSync(filePath, content, 'utf8');
        // const match = content.match(/\[([^\n]*)\]/);
        // content.replace(/\[(?<date>[^\n]*)\]/, )
        // console.log(match.groups.date);
    }
    
}
