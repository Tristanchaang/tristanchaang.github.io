import { LangString, componentLang } from "../langtools.js";

export const buildGamePage = (title: string | LangString, insert: string) =>
`
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta property="og:image" content="/assets/screenshot.png" />
    ${(title instanceof Object) ? componentLang(title, "title", "<title lang='xx'> / </title>") : `<title>${title}</title>`}

    <script src="/dist/client-bundle.js" defer></script>
    

    <script type="text/javascript" id="MathJax-script" defer
    src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-PH72KY1MTT"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-PH72KY1MTT');
    </script>
    <link rel="icon" type="image/x-icon" href="/assets/circle-user-solid.ico">
</head>
<body>
    <div>${insert}</div>
</body>
</html>
`