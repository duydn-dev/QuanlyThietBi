import axios from '../../core/plugins/http';
import CONSTANTS from '../../core/utils/constants';

export const updateAppSettings = ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
        commit("UPDATE_APP_SETTINGS", payload);
        return resolve(payload);
    })
}
export const updateDict = ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
        commit("UPDATE_DICT", payload);
        return resolve(payload);
    })
}
export const pushDict = ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
        commit("PUSH_DICT", payload);
        return resolve(payload);
    })
}
export const pushDictByType = ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
        commit("PUSH_DICT_BYTYPE", payload);
        return resolve(payload);
    })
}