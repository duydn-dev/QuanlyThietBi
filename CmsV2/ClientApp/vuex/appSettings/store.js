import * as actions from './actions';
import CONSTANTS from '../../core/utils/constants';

let appSettings = null;
if (typeof (window) !== 'undefined') {
    appSettings = window.appSettings;
}
const store = {
    state: {
        appSettings: appSettings,
        dictionaries: null
    },
    mutations: {
        UPDATE_APP_SETTINGS: (state, payload) => {
            payload.dictionarys = null;
            state.appSettings = payload;
            if (typeof (window) !== 'undefined') {
                window.appSettings = Object.assign(window.appSettings, payload);
            }
        },
        UPDATE_DICT: (state, payload) => {
            state.dictionaries = payload;
        },
        PUSH_DICT: (state, payload) => {
            if (state.dictionaries[payload.typeName])
                state.dictionaries[payload.typeName].push(payload);
            else
                state.dictionaries['dict'].push(payload);
        },
        PUSH_DICT_BYTYPE: (state, payload) => {
            if (state.dictionaries[payload.type])
                state.dictionaries[payload.type].push(payload.data);
            else
                state.dictionaries['dict'].push(payload);
        }
    },
    actions,
    getters: {
        appSettings: state => state.appSettings,
        dictionaries: state => state.dictionaries
    }
};

export default store;