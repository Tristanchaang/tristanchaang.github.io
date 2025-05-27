import * as fs from "fs";
import MarkdownIt from "markdown-it";
import assert from "assert";
import { componentLang } from "./langtools.js";
import { headerHTML, footerHTML } from "./header-footer.js";
const mdParser = new MarkdownIt();
const PREPARSE_REPLACEMENTS = [
    ["\\\\", "\\\\\\\\"], // change \\ to \\\\
    ["\\\\\\\\.", "\\\\"] // \\. is retained
];
const POSTPARSE_REPLACEMENTS = [
    ["&lt;", "<"],
    ["&gt;", ">"],
    ["&quot;", "\""],
    ["&amp;", "&"]
];
/**
 * Parse a markdown string, implementing preparse and postparse requirements
 * @param md markdown string
 * @returns HTML string
 */
function parseMD(md) {
    return POSTPARSE_REPLACEMENTS.reduce((text, [from, to]) => text.replaceAll(from, to), mdParser.render(PREPARSE_REPLACEMENTS.reduce((text, [from, to]) => text.replaceAll(from, to), md)));
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
export function parseJMD(md) {
    const [, frontMatter, body] = md.split(/^---\s*$/m);
    const meta = Object.fromEntries((frontMatter ?? assert.fail())
        .split('\n')
        .filter(line => line.trim() && line.includes(':'))
        .map(line => {
        const [key, ...rest] = line.split(':');
        return [key?.trim(), rest.join(':').trim()];
    }));
    const titleLangs = {
        en: meta.title,
        my: meta.titleMY ?? meta.title,
        zh: meta.titleZH ?? meta.title,
        hk: meta.titleHK ?? meta.title,
        fr: meta.titleFR ?? meta.title,
        jp: meta.titleJP ?? meta.title,
    };
    return { meta: meta, titleLangs: titleLangs, interior: parseMD(body ?? assert.fail()) };
}
export const read = async (filepath) => fs.promises.readFile(filepath, { encoding: "utf8" });
export const write = async (filepath, content) => fs.promises.writeFile(filepath, content, { encoding: "utf8" });
export const buildPage = (title, insert) => `
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
    ${headerHTML}
    <div>
        ${insert}
    </div>
    ${footerHTML}
</body>
</html>
`;
//# sourceMappingURL=parsetools.js.map