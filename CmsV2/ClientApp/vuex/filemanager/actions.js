import axios from '../../core/plugins/http';
import CONSTANTS from '../../core/utils/constants';

export const changeActiveFolder = ({ commit }, id) => {
    return new Promise((resolve, reject) => {
        commit("CHANGE_ACTIVE_FOLDER", id);
        return resolve(id);
    })
}

export const changeActiveFile = ({ commit }, id) => {
    return new Promise((resolve, reject) => {
        commit("CHANGE_ACTIVE_FILE", id);
        return resolve(id);
    })
}
