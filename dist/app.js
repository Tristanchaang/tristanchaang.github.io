import MarkdownIt from "markdown-it";
import * as fs from "fs";
const mdParser = new MarkdownIt();
function parseMD(mdPath) { return mdParser.render(mdPath); }
async function postMD2HTML(mdName) {
    const mdContent = await fs.promises.readFile("_posts/" + mdName, { encoding: "utf8" });
    const result = parseMD(mdContent);
    const mdContentSplit = mdContent.split(/^---\s*$/m);
    const [, frontMatter, body] = mdContent.split(/^---\s*$/m).length === 3 ? mdContent.split(/^---\s*$/m) : [null, '', mdContent];
    console.log('Front matter:', frontMatter.trim());
    console.log('Body:', body.trim());
    await fs.promises.writeFile("posts/" + mdName.replace(/\.md$/, ".html"), result, { encoding: "utf8" });
}
postMD2HTML('2022-01-03-creating-this-page.md');
//# sourceMappingURL=app.js.map