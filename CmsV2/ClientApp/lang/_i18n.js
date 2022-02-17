import Vue from 'vue';
import VueI18n from 'vue-i18n';
import config from '../lang/config.json';
import { getLang } from '../lang/utils';

Vue.use(VueI18n);

let messages = {};

var context = require.context(".", true, /\.json$/);
context.keys().forEach(function (key) {
    var m = key.replace('./', '').replace('.json', '');
    messages[m] = context(key);
});

const i18n = new VueI18n({
    locale: getLang(),
    messages,
    fallbackLocale: process.env.LANG || config.fallbackLocale,
    missing: (locale, key, vm) => {
        console.log('%cmissing locale:', "color: red", locale, key);
    }
});

export default i18n;