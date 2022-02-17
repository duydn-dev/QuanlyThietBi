import axios from '../../core/plugins/http';
import CONSTANTS from '../../core/utils/constants';

export const getPermissions = ({ commit }) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                m: 'security',
                fn: 'user_permission_get_list'
            }
        }).then(response => {
            commit("GET_PERMISSION", response.data);
            if (typeof (localStorage) !== 'undefined') {
                localStorage.setItem(CONSTANTS.PERMISSIONS, JSON.stringify(response.data.allPermission));
                localStorage.setItem(CONSTANTS.USER_PERMISSIONS, JSON.stringify(response.data.userPermission));
            }
            return resolve(response.data);
        }).catch(err => {
            commit("ERROR", err);
            return reject(err);
        });
    })
}