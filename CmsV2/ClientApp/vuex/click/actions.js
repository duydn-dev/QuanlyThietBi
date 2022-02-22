import axios from '../../core/plugins/http';
import CONSTANTS from '../../core/utils/constants';

export const updateTrigger = ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
        commit("UPDATE_TRIGGER", payload);
        return resolve(payload);
    })
}