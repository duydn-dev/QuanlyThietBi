import { app, router, store } from './app';
export default context => {
    return new Promise((resolve, reject) => {
        router.push(context.url);
        router.onReady(() => {

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
                return reject({ code: 404 });
            }

            Promise.all(matchedComponents.map(Component => {
                if (Component.asyncData) {
                    return Component.asyncData({
                        store: store,
                        route: router.currentRoute,
                        context
                    });
                } else {
                    return Promise.resolve(false);
                }
            })).then((meta) => {
                meta.forEach(function (value) {
                    if (value && value.title) {
                        context.meta = value;
                    }
                });
                context.state = store.state;
                resolve(app);
            }).catch((err) => {
                return reject(err);
            });
        }, reject)
    });
};