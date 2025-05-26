const NAVBAR_TABS = {
    About: `onclick="directIndexSection('#about')"`,
    Materials: `onclick="directIndexSection('#materials')"`,
    MIT: `href="/materials/mitnotes.html"`,
    Games: `href="/webpage/"`
};
const SOCMED = {
    github: "https://github.com/Tristanchaang",
    youtube: "https://www.youtube.com/016tristan",
    linkedin: "https://www.linkedin.com/in/tchaang/"
};
export const headerHTML = `
    <nav>
        <a onclick="directIndexSection('body')" style="font-size: 1.5rem; cursor: pointer">Tristan Chaang's Page</a>
        <div id=navmenu style="display: flex; gap: 20px; align-items: center; gap: 2rem;" >
            ${Object.entries(NAVBAR_TABS).map(([tabname, link]) => `<a ${link} style="cursor: pointer">${tabname}</a>`).join("")}
            <div id=langselect>
            <span>&bullet;</span>
            <span>&bullet;</span>
            <span>&bullet;</span>
            <span>&bullet;</span>
            <span>&bullet;</span>
            <span>&bullet;</span>
        </div>
        </div> 
        
    </nav>
`;
export const footerHTML = `
    <footer>
        <div id="socmed">
            ${Object.entries(SOCMED).map(([platform, link]) => `<a href="${link}" target="_blank">
                <img src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${platform}.svg" alt="${platform}" width="24" height="24">
                </a>`).join("")}
        </div>
    </footer>
`;
//# sourceMappingURL=header-footer.js.map