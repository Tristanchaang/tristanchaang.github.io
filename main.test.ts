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


const y = `
<ul>
<a class="mitThumbnail" href="https://tristanchaang.github.io/notes/real_analysis">
            <img src="/assets/square-root-variable-solid.svg" alt="Folder Icon" class="materialIcon" style="width:2rem; height:2rem; margin-right:1rem; vertical-align:middle;" />
            <span style="font-size: 1.3rem; width:auto">Real Analysis (18.100B)</span>
        </a>
<a class="mitThumbnail" href="https://tristanchaang.github.io/notes/topology">
            <img src="/assets/square-root-variable-solid.svg" alt="Folder Icon" class="materialIcon" style="width:2rem; height:2rem; margin-right:1rem; vertical-align:middle;" />
            <span style="font-size: 1.3rem; width:auto">Topology (18.901)</span>
        </a>
<a class="mitThumbnail" href="https://tristanchaang.github.io/notes/lie_algebras">
            <img src="/assets/square-root-variable-solid.svg" alt="Folder Icon" class="materialIcon" style="width:2rem; height:2rem; margin-right:1rem; vertical-align:middle;" />
            <span style="font-size: 1.3rem; width:auto">Lie Algebra (Official Lecture Notes)</span>
        </a>
</ul>
`

console.log("asdadsadas\n\n\n");

console.log(
    y.replaceAll(

        /<ul>(?<list>((?!<ul>).)*)<\/ul>/g,

        `<div class="thumbnailWindow">$<list></div>`

    )
)