import axios from '../../core/plugins/http';
import CONSTANTS from '../../core/utils/constants';

export const getSourceList = ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                m: 'source',
                fn: 'list',
                ...payload
            }
        }).then(response => {
            commit("LIST_SOURCE", response.data);
            return resolve(response);
        }).catch(err => {
            commit("LIST_SOURCE", null);
            return reject(err);
        });
    })
}