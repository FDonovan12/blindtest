window.addEventListener('load', () => {});

function addHeadContent() {
    const head = document.querySelector('head');

    const metaCharset = baliseClass('meta', '', head);
    metaCharset.setAttribute('charset', 'utf-8');

    const metaViewport = createMetaTag(head, 'viewport', 'width=device-width, initial-scale=1.0');
    const metaKeyword = createMetaTag(head, 'keywords', 'HTML, CSS, JavaScript');
    const metaAuthor = createMetaTag(head, 'author', 'Donovan Ferreira');
    const metaDescription = createMetaTag(
        head,
        'description',
        'Experimentation de Donovan Ferreira'
    );

    setTitle();
    createLinkFontAwesome(head);
    createLinkBoostrapStyle(head);
    createLinkMainCSS(head);
    // createLinkMainScript(head);
    createLinkBoostrapScript(head);
    createLinkChartJsScript(head);
}

function addHeader() {
    const headers = document.querySelector('header');

    let h1 = baliseClass('h1', '', headers, 'Experimentation de Donovan Ferreira');
    let h2 = baliseClass('h2', '', headers, "Developpeur d'application");
    let nav = baliseClass('nav', 'nav-bar row row-cols-2 row-cols-md-4', headers);
    const urlRoot = getURlRoot();
    Object.keys(file_map).forEach((key) => {
        createLinkNav(nav, `${urlRoot}${key}`, file_map[key]);
    });
}
