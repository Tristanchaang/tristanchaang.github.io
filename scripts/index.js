var _a, _b;
var params = new URLSearchParams(window.location.search);
var lang = (_a = params.get("lang")) !== null && _a !== void 0 ? _a : "en";
function toggleLangMenu() {
    var _a;
    var menu = (_a = document.getElementById('langSelect')) !== null && _a !== void 0 ? _a : assert.fail();
    menu.style.display = (menu.style.display === 'none') ? 'grid' : 'none';
}
/**
 * filter lang
 */
document.querySelectorAll('[lang]').forEach(function (el) {
    if (el.getAttribute('lang') !== lang) {
        el.remove();
    }
});
/**
 * If local, append ?lang=lang to href
 */
document.querySelectorAll('a').forEach(function (el) {
    if (el.classList.contains('local') && el.hasAttribute('href')) {
        el.setAttribute('href', el.getAttribute('href') + "?lang=".concat(lang));
    }
});
/**
 * enable view after processing
 */
((_b = document.getElementById('root')) !== null && _b !== void 0 ? _b : assert.fail()).style.display = 'block';
