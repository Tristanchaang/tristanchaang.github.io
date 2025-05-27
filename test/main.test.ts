import assert from "assert";
const x = `
<li>
<p><a href="https://tristanchaang.github.io/notes/real_analysis">code|Real Analysis (18.100B)</a></p>
</li>
`
console.log(x.replaceAll(
        
        /<li>\n<p><a (?<att>.*)>(?<icon>.*)\|(?<title>.*)<\/a>\<\/p>\n<\/li>/g, 
    
        `<a class="mitThumbnail" $<att>>
            <img src="/assets/$<icon>.svg" alt="Folder Icon" class="materialIcon" style="width:2rem; height:2rem; margin-right:1rem; vertical-align:middle;" />
            <span style="font-size: 1.3rem; width:auto">$<title></span>
        </a>`
    
    )
);

const y = {a: "asas"};

assert(("a" in y) && !("b" in y));
