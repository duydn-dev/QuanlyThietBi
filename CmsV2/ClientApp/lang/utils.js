import config from '../lang/config.json';
import { getCookie } from '../core/utils/index';
import CONSTANTS from '../core/utils/constants';

export function getLang() {
    let defaultLang = process.env.LANG;
    if (!defaultLang) {
        if (typeof (window) !== 'undefined')
            defaultLang = window.lang || getCookie(CONSTANTS.LANG);
        if (!defaultLang)
            defaultLang = config.def;
    }
    return defaultLang;
}