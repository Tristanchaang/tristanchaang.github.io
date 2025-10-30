const params = new URLSearchParams(window.location.search);
const lang = params.get("lang") ?? "en";

/**
 * filter lang
 */
document.querySelectorAll('[lang]').forEach(el => {
    if (el.getAttribute('lang') !== lang) {
        el.remove();
    }
});

/**
 * If local, append ?lang=lang to href
 */
document.querySelectorAll('a').forEach(el => {
    if (el.classList.contains('local') && el.hasAttribute('href')) {
        el.setAttribute('href', el.getAttribute('href') + `?lang=${lang}`)
    }
})

/**
 * enable view after processing
 */
document.getElementById('root').style.display = 'block';