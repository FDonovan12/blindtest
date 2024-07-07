import { baliseClass } from './utils.js';

window.addEventListener('load', () => {
    console.log('element');
    addHeadContent();
    addHeader();
    addFooter();
});

const file_map = {
    '/': 'Accueil',
    '/fractal/': 'Fractal',
    '/game_of_life/': 'Jeu de la vie',
    '/minecraft_beacon/': 'Beacon Minecraft',
};

class pageInfos {
    constructor(url, infos) {
        this.url = url;
        this.infos = infos;
    }
}

class pageInfos2 {
    constructor(infos) {
        this.url = url;
        this.infos = infos;
    }
}

function addHeadContent() {
    const head = document.querySelector('head');

    const metaCharset = baliseClass('meta', '', head);
    metaCharset.setAttribute('charset', 'utf-8');

    const metaViewport = createMetaTag(head, 'viewport', 'width=device-width, initial-scale=1.0');
    const metaKeyword = createMetaTag(head, 'keywords', 'Musique, Blindtest');
    const metaAuthor = createMetaTag(head, 'author', 'Donovan Ferreira');
    const metaDescription = createMetaTag(
        head,
        'description',
        'Site pour organiser des Blindtest avec mon entourage'
    );

    setTitle();
    createLinkFontAwesome(head);
    createLinkBoostrapStyle(head);
    createLinkMainCSS(head);
    // createLinkMainScript(head);
    createLinkBoostrapScript(head);
    createLinkChartJsScript(head);
}

function createMetaTag(head, name, content) {
    const metaViewport = baliseClass('meta', '', head);
    metaViewport.name = name;
    metaViewport.content = content;
}
function getURlRoot() {
    const pathname = window.location.pathname.replace('/experimentation', '');
    const href = window.location.href;
    const regexName = new RegExp(pathname + '$');
    let urlRoot = href.replace(regexName, '');
    return urlRoot;
}
function setTitle() {
    const pathname = window.location.pathname;
    document.title = file_map[pathname];
}

function addFooter() {
    const footer = document.getElementsByTagName('footer')[0];
    let div = document.createElement('div');
    let span = document.createElement('span');
    span.innerHTML = 'Copyright © 2024 Donovan Ferreira. Tous droits réservés.';
    div.appendChild(span);
    footer.appendChild(div);
}
function createLink(head, href, rel, integrity, crossorigin) {
    let balise = document.createElement('script');
    balise.src = href;
    if (['stylesheet', 'preconnect'].includes(rel)) {
        balise = document.createElement('link');
        balise.rel = rel;
        balise.href = href;
    }
    if (integrity) {
        balise.integrity = integrity;
    }
    if (crossorigin) {
        balise.crossOrigin = crossorigin;
    }
    head.appendChild(balise);
}

function createLinkFontAwesome(head) {
    createLink(
        head,
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
        'stylesheet'
    );
}

function createLinkBoostrapStyle(head) {
    createLink(
        head,
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
        'stylesheet',
        'sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH',
        'anonymous'
    );
}

function createLinkMainCSS(head) {
    let nameFileCss = `${getURlRoot()}/style.css`;
    createLink(head, nameFileCss, 'stylesheet');
}

// function createLinkMainScript(head) {
//     if (document.title !== 'Accueil') {
//         createLink(head, './script.js', 'script');
//     }
// }

function createLinkBoostrapScript(head) {
    createLink(
        head,
        'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
        'script',
        'sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz',
        'anonymous'
    );
}

function createLinkChartJsScript(head) {
    createLink(head, 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js', 'script');
}
function addHeader() {
    const headers = document.querySelector('header');
    let h1 = baliseClass('h1', headers, null, 'Experimentation de Donovan Ferreira');
    let h2 = baliseClass('h2', headers, null, "Developpeur d'application");
    let nav = baliseClass('nav', headers, 'nav-bar row row-cols-2 row-cols-md-4');
    const urlRoot = getURlRoot();
    // Object.keys(file_map).forEach((key) => {
    //     createLinkNav(nav, `${urlRoot}${key}`, file_map[key]);
    // });
}
