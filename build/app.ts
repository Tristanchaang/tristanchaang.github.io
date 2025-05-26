import { HTMLize, write } from "./base.js";

import { welcomeHTML } from "./welcome.js";
import { postIndexHTML } from "./posts.js";
import { aboutIndexHTML } from "./about.js";
import { materialsIndexHTML } from "./materials.js"; 

import { fileNames } from "./mitnotes.js"

fileNames;

write("index.html", HTMLize("Tristan Chaang's Page", 
    `
    ${welcomeHTML}
    ${postIndexHTML}
    ${aboutIndexHTML}
    ${materialsIndexHTML}
    <div id="games">
        <h1>Games</h1>
        <div class="thumbnailWindow">
            <a class="thumbnail" style="background: linear-gradient(to right, rgb(218, 255, 150), rgb(236, 255, 226)); width: 300px;" href="/webpage/">
                <img src="/assets/arrow-right-solid.svg" alt="Folder Icon" class="materialIcon" style="width:2rem; height:2rem; margin-right:1rem; vertical-align:middle;" />
                <span style="font-size: 1.3rem; width:auto">Sandbox</span>
            </a>
        </div>
    </div>
    <div id="aboutwebsite">
        <h2>About This Website</h2>
        <p>This webpage is built completely with HTML, CSS, and (npm) Typescript. No advanced frameworks were used. This site is run on Github Pages (<a href="https://docs.github.com/en/github/site-policy/github-privacy-statement">Privacy Statement</a>) and uses <a href="https://analytics.google.com/">Google Analytics</a> (<a href="https://policies.google.com/privacy">Privacy Statement</a>). This webpage is merely a personal project, and I think it is kind of fun. I am also using this website to practice coding, and typing in different languages.</p>
    </div>
    <br><br>
    `
));

