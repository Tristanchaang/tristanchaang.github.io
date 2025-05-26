const EDU = [
    ["2016-2021", "Kuen Cheng High School", "SPM", "kcphoto.jpg"],
    ["2021-2022", "Sunway College KL", "A-Levels", "sunwayphoto.jpg"],
    ["2023-2027", "MIT", "BSc, Math & CS", "mitphoto.jpg"]
]

export const aboutIndexHTML = `
<div id="about">
    <h1>About</h1>
    <div style="display:flex; align-items: center;">
        <div>
            <h3>Tristan Chaang</h3>
            <p>Hello! I am a Malaysian undergraduate student at MIT majoring in Course 18 (Mathematics) and Course 6-3 (Computer Science and Engineering). I love problem solving, teaching, learning new languages, and acting (see <a href="https://lost.mit.edu" target="_blank">MIT LOST</a>). I speak English, Malay, Cantonese, Mandarin and a little Japanese and French.</p>
        </div>
        <img src="/assets/ProfilePic.jpg" alt="Profile Picture" style="height: 180px; width: 180px; margin-left: 50px;"/>
    </div>
    <h4>Education</h4>
    <div id="education">
        ${EDU.map(([year,school,exam,pic]) =>`
            <div>
                <div style="background-image: url('/assets/${pic}');"></div>
                <span style="position:absolute; top: 10px; left: 10px; font-size: 1rem">${year}</span>
                <span style="position:absolute; top: 0; bottom: 0; left: 0; right: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 0.5rem;">
                    <span>${school}</span>
                    <span>(${exam})</span>
                </span>
            </div>`).join("")}
    </div>
    <div class="thumbnailWindow">
        <a class="eduThumbnail" href="/posts/2025-05-26-resume.html">
            <img src="/assets/file-solid.svg" alt="Folder Icon" class="materialIcon" style="width:2rem; height:2rem; margin-right:1rem; vertical-align:middle;" />
            <span style="font-size: 1.3rem; width:auto">Latest CV/Resume</span>
        </a>
        <a class="eduThumbnail" href="/posts/2022-05-19-my-book.html">
            <img src="/assets/book-solid.svg" alt="Folder Icon" class="materialIcon" style="width:2rem; height:2rem; margin-right:1rem; vertical-align:middle;" />
            <span style="font-size: 1.3rem; width:auto">My Math Book</span>
        </a>
    </div>
</div>
`