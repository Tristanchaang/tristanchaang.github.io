import { HTMLize, write } from "./base.js";

import { postIndexHTML } from "./posts.js";
import { aboutIndexHTML } from "./about.js";
import { materialsIndexHTML } from "./materials.js"; 

import { fileNames } from "./mitnotes.js"
fileNames;

write("index.html", HTMLize("Tristan Chaang's Page", 
    `
    <div id="welcome">
        Welcome to my personal page! Here I write about myself and all kinds of stuff I want to share. This is a new version of my website, and may have bugs.
    </div>
    ${postIndexHTML}
    ${aboutIndexHTML}
    ${materialsIndexHTML}
    <div id="aboutwebsite">
        <h2>About This Website</h2>
        This webpage is built completely with HTML, CSS, and (npm) Typescript. No advanced frameworks were used. This site is run on Github Pages (<a href="https://docs.github.com/en/github/site-policy/github-privacy-statement">Privacy Statement</a>) and uses <a href="https://analytics.google.com/">Google Analytics</a> (<a href="https://policies.google.com/privacy">Privacy Statement</a>).
    </div>
    `
));

