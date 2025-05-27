import * as fs from "fs";
import MarkdownIt from "markdown-it";
import assert from "assert";
import { LangString, spanLang, componentLang, langPromise, langMap } from "./langtools.js";
import { headerHTML, footerHTML } from "./header-footer.js";

const mdParser = new MarkdownIt();

const PREPARSE_REPLACEMENTS: [string, string][] = [
    ["\\\\", "\\\\\\\\"], // change \\ to \\\\
    ["\\\\\\\\.", "\\\\"] // \\. is retained
]
const POSTPARSE_REPLACEMENTS: [string, string][] = [
    ["&lt;", "<"],
    ["&gt;", ">"],
    ["&quot;", "\""],
    ["&amp;", "&"]
]

/**
 * Parse a markdown string, implementing preparse and postparse requirements
 * @param md markdown string
 * @returns HTML string
 */
function parseMD(md: string) { 
    return POSTPARSE_REPLACEMENTS.reduce(
            (text,[from,to]) => text.replaceAll(from, to),
            mdParser.render(
                PREPARSE_REPLACEMENTS.reduce((text,[from,to]) => text.replaceAll(from, to), md)
        ))
}

/**
 * Parse a Jekyll-style markdown string, i.e.
 * ---
 * (meta stuff, such as layout: post)
 * ---
 * (markdowncontent)
 * @param md Jekyll-style markdown string
 * @returns {meta, interior} meta is the Object of metas, interior is the parsed HTML
 */
export function parseJMD(md: string) {
    const [, frontMatter, body] = md.split(/^---\s*$/m);
    const meta = Object.fromEntries(
            (frontMatter ?? assert.fail())
                .split('\n')
                .filter(line => line.trim() && line.includes(':'))
                .map(line => {
                    const [key, ...rest] = line.split(':');
                    return [key?.trim(), rest.join(':').trim()];
                })
        );
    return { meta: meta, title: meta.title, interior: parseMD(body ?? assert.fail()) };
}

/**
 * Writes a multi-language Jekyll-style markdown file as an HTML page.
 * 
 * Reads markdown files for each language, parses their front matter and content,
 * and generates a localized HTML page with language switching support.
 * 
 * @param mdName - The markdown filename (e.g., "2024-06-01-my-post.md").
 * @param folderName - The output folder name (used for both input and output paths).
 * @param callbackOnInterior - Optional callback to transform the parsed HTML content before insertion.
 * @returns An object containing the post date, output HTML filename, and a mapping of titles per language.
 */
export async function writeMultiLangJMD(mdName: string, folderName: string, callbackOnInterior: Map<string, (s:string)=>string>, defaultCallback: (s:string)=>string) {
    const date = mdName.slice(0,10);
    
    const mdContentLangs: LangString = await langPromise((lang: string) => read(`markdown/_${folderName}/${lang}/${mdName}`));
    
    const bundleLangs = langMap(mdContentLangs, (_, val) => parseJMD(val));

    const titleLangs = langMap(bundleLangs, (_, bundle) => bundle.title);

    const contentLangs = langMap(bundleLangs, (_, bundle) => `
            <div style='${("font" in bundle.meta) ? `font-family: ${bundle.meta.font};` : ``} padding-left: 200px; padding-right: 200px'>
                <h1>${bundle.title}</h1>
                ${(callbackOnInterior.get(bundle.meta.title) ?? defaultCallback)(bundle.interior)}
            </div>`
        );

    const content = buildPage(titleLangs, spanLang(contentLangs)+"</br></br>");

    const htmlName = mdName.replace(/\.md$/, (folderName === "mitnotes") ? "/index.html" : ".html");
    write(`${(folderName === "mitnotes") ? "materials" : folderName}/${htmlName}`, content);
    return { date: new Date(date), filename: htmlName, titleLangs: titleLangs };
}



export const read = async (filepath: string) => fs.promises.readFile(filepath, { encoding: "utf8" });
export const write = async (filepath: string, content: string) => fs.promises.writeFile(filepath, content, { encoding: "utf8" });


export const buildPage = (title: string | LangString, insert: string) =>
`
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta property="og:image" content="/assets/screenshot.png" />
    ${(title instanceof Object) ? componentLang(title, "title") : `<title>${title}</title>`}
    <link rel="stylesheet" href="/styles/index.css">
    <script src="/dist/client-bundle.js" defer></script>
    <script src="/dist/mathjax-config.js" defer></script>
    <script type="text/javascript" id="MathJax-script" defer
    src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-PH72KY1MTT"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-PH72KY1MTT');
    </script>
    <link rel="icon" href="/assets/circle-user-solid.svg" type="image/svg">
</head>
<body>
    ${headerHTML}<div>${insert}</div>${footerHTML}
</body>
</html>
`