import axios from '../../core/plugins/http';
import CONSTANTS from '../../core/utils/constants';

export const getListFiles = ({ commit }, opts) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                m: 'file',
                fn: 'list',
                ...opts
            }
        }).then(response => {
            commit("GET_FILES", response);
            return resolve(response);
        }).catch(err => {
            commit("GET_FILES", null);
            return reject(err);
        });
    })
}
