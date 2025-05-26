import * as fs from "fs";
import MarkdownIt from "markdown-it";
const mdParser = new MarkdownIt();
export function parseMD(md) { return mdParser.render(md); }
export const read = async (filepath) => fs.promises.readFile(filepath, { encoding: "utf8" });
export const write = async (filepath, content) => fs.promises.writeFile(filepath, content, { encoding: "utf8" });
export const HTMLize = (title, insert) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>${title}</title>
    <link rel="stylesheet" href="styles/index.css">
    <script src="dist/client-bundle.js" defer></script>
    <script src="dist/mathjax-config.js" defer></script>
    <script type="text/javascript" id="MathJax-script" defer
    src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>
    <link rel="icon" href="assets/circle-user-solid.svg" type="image/svg">
</head>

<body>
    <nav></nav>
    ${insert}
    <footer></footer>
</body>
</html>
`;
//# sourceMappingURL=tools.js.map