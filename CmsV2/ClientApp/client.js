import { app, router, store } from './app';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';


function isServerRender() {
    try {
        return __INITIAL_STATE__;
    } catch (e) {
        return false;
    }
}
try {
    store.replaceState(__INITIAL_STATE__);
} catch (e) {
    //console.log('Not using server render', e);
}

function getMeta2(component) {
    let meta = component.meta;
    if (meta) {
        return typeof meta === "function"
            ? component.meta.call(component)
            : meta;
    } else {
        return null
    }
}

router.onReady(() => {
    router.beforeResolve((to, from, next) => {
        let lang = 'en';
        if (to.params.lang) {
            lang = to.params.lang;
        }
        let meta = require('./meta/' + lang + '.json');

        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)

        let diffed = false
        //const activated = matched.filter((c, i) => {
        //    return diffed || (diffed = (prevMatched[i] !== c))
        //})

        //if (!activated.length) {
        //    return next()
        //}

        const activated = matched;

        NProgress.start();        

        Promise.all(activated.map(c => {
            if (c.asyncData) {
                return c.asyncData({ store, route: to });
            }
        })).then(() => {
            if (meta.allPage)
                document.title = meta.allPage.Title;
            NProgress.done();
            next();
        }).catch(next)
    });
    if (!isServerRender()) {
        var matchedComponents = [];
        function asyncDataProcess(component) {
            if (component) {
                matchedComponents.push(component);
                if (component.components) {
                    Object.keys(component.components).map(c => {
                        asyncDataProcess(component.components[c]);
                    });
                }
            }
        }
        router.getMatchedComponents().map(c => {
            asyncDataProcess(c);
        });

        if (!matchedComponents.length) {
            return;
        }
        Promise.all(matchedComponents.map(Component => {
            if (Component.asyncData) {
                return Component.asyncData({
                    store: store,
                    route: router.currentRoute
                });
            }
        })).then((metaa) => {
        })
    }
    app.$mount('#app');
});