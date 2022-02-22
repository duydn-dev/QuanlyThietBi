import axios from '../../core/plugins/http';
import CONSTANTS from '../../core/utils/constants';

export const initSystem = ({ commit }, payload) => {
    commit("INIT_SYSTEM", payload);
}


export const getSystemTypeList = ({ commit }) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                m: 'system',
                fn: 'system-type-list',
            }
        }).then(response => {
            commit("SYSTEMTYPE_LIST", response.data);
            return resolve(response.data);
        }).catch(err => {
            commit("SYSTEMTYPE_LIST", null);
            return reject(err);
        });
    })
}


export const setSystemHubProxy = ({ commit }, data) => {
    commit("SYSTEMHUB_PROXY", data);
}

export const setShowProcess = ({ commit }, data) => {
    commit("SHOW_PROCESS", data);
}


