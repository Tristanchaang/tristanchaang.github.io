import * as fs from "fs";
import { writeMultiLangJMD } from "./parsetools.js";
export const fileNames = (await fs.promises.readdir("markdown/_mitnotes/en")).filter(f => f.endsWith(".md"));
await Promise.all(fileNames.map(async (file) => writeMultiLangJMD(file, "mitnotes", new Map(), ((s) => s))));
//# sourceMappingURL=mitnotes.js.map