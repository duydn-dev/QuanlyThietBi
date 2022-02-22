let config = require('../appsettings.json');
let envConfig = require('../appsettings.' + process.env.NODE_ENV + '.json');
if (envConfig) {
    Object.assign(config, envConfig);
}
process.env.VUE_ENV = 'server';
process.env.BASE_URL = config.AppSettings.Domain;
process.env.ApiUrl = config.AppSettings.ApiUrl;
process.env.Namespace = config.AppSettings.Namespace;
process.env.CompanyId = config.AppSettings.CompanyId;
process.env.LANG = 'vi';

const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../wwwroot/dist/js/main-server.js');
const code = fs.readFileSync(filePath, 'utf8');
const bundleRenderer = require('vue-server-renderer').createBundleRenderer(code);
let prerendering = require('aspnet-prerendering');
let cookieParser = require('cookie-parser');

let version = config.AppSettings.Version;
let header = fs.readFileSync(path.join(__dirname, '../Views/Home/head.cshtml'), 'utf8').trim();
header = header.replace(/@AppSettings.Version/gi, version);

module.exports = prerendering.createServerRenderer(function (params) {
    return new Promise(function (resolve, reject) {
        process.env.LANG = params.data.lang || 'en';
        let { allPage } = require('./meta/' + process.env.LANG + '.json');

        const context = {
            url: params.url,
            data: params.data
        };
        bundleRenderer.renderToString(context, (err, resultHtml) => {
            if (err) {
                return reject(err);
            }
            let metaTag = `
            <title>${metaTitle}</title>`;
            
            let contentHtml = `<head>
                                    ${metaTag}\r\n${header}
                                </head>
                                <body>
                                    <div id="app">${resultHtml}</div>
                                    <script>window.__INITIAL_STATE__=${JSON.stringify(context.state)}</script>
                                    <script src="/dist/js/main-client.js?v=${version}"></script>
                                </body>`;
           
            resolve({
                html: contentHtml
            });
        });
    });
});
