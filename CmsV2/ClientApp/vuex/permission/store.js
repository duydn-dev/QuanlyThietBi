import * as actions from './actions';
import CONSTANTS from '../../core/utils/constants';

let initPermissions = null;
let initUserPermissions = null;
if (typeof (localStorage) !== 'undefined') {
    try {
        initPermissions = JSON.parse(localStorage.getItem(CONSTANTS.PERMISSIONS) || null); 
        initUserPermissions = JSON.parse(localStorage.getItem(CONSTANTS.USER_PERMISSIONS) || null);
    } catch (e) {

    }
}

const store = {
    state: {
        //permissions: initPermissions,
        //userPermissions: initUserPermissions
    },
    mutations: {
        GET_PERMISSION: (state, payload) => {
            //state.permissions = payload.allPermission;
            //state.userPermissions = payload.userPermissions;
        }
    },
    actions,
    getters: {
        //permissions: state => state.permissions,
        //userPermissions: state => state.userPermissions
    }
};

export default store;