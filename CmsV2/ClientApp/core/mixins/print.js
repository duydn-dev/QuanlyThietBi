import Vue from 'vue';
function addStyles(win, styles) {
    styles.forEach(style => {
        let link = win.document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('media', 'print');
        link.setAttribute('href', style);
        win.document.getElementsByTagName('head')[0].appendChild(link);
    });
}
function addStyleInline(win, style) {
    let link = win.document.createElement('style');
    link.setAttribute('type', 'text/css');
    link.innerHTML = style;
    win.document.getElementsByTagName('head')[0].appendChild(link);
}
if (!process.env.VUE_ENV) {
    Vue.mixin({
        methods: {
            $print(el, opts, callBack) {
                let defaultOpts = {
                    name: '_blank',
                    specs: [
                        'fullscreen=yes',
                        'titlebar=no',
                        'scrollbars=no'
                    ],
                    styles: [
                    ],
                    inlineStyle: '',
                    callback() {
                        if (callBack)
                            callBack();
                        console.log('close or printed');
                    }
                };
                let options = { ...defaultOpts, ...opts }
                let {
                    name,
                    specs,
                    replace,
                    styles,
                    inlineStyle
                } = options;
                specs = !!specs.length ? specs.join(',') : '';
                specs += ',height=' + screen.height + ', width=' + screen.width;
                console.log(specs, styles);
                const element = document.getElementById(el);

                if (!element) {
                    alert(`Element to print #${el} not found!`);
                    return;
                }

                const url = '';
                const win = window.open(url, name, specs, replace);

                win.document.write(`
            <html>
              <head>
                <title>${document.title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
              </head>
              <body>
                ${element.innerHTML}
              </body>
            </html>
          `);

                addStyles(win, styles);
                addStyleInline(win, inlineStyle);
                setTimeout(() => {
                     win.document.close();
                     win.focus();
                    win.print();
                    win.close();
                    options.callback();
                }, 1000);
                return true;
            }
        }
    });
}