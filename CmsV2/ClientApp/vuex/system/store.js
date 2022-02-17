import * as actions from './actions';
import CONSTANTS from '../../core/utils/constants';

const store = {
    state: {
        system: null,
        permissions: null,
        userPermissions: null,
        permissionZones: null,
        systemTypeList: null,
        systemHubProxy: null,
        showProcessData: false
    },
    mutations: {
        INIT_SYSTEM: (state, payload) => {
            if (payload) {
                state.system = payload;
                state.userPermissions = payload.userPermission;
                state.permissionZones = payload.permissionZones;
                state.permissions = payload.allPermission;
            }
        },
        SYSTEMTYPE_LIST: (state, payload) => {
            state.systemTypeList = payload;
        },
        SYSTEMHUB_PROXY: (state, payload) => {
            state.systemHubProxy = payload;
        },
        SHOW_PROCESS: (state, payload) => {
            state.showProcessData = payload;
        },
    },
    actions,
    getters: {
        system: state => state.system,
        permissions: state => state.permissions,
        userPermissions: state => state.userPermissions,
        permissionZones: state => state.permissionZones,
        systemTypeList: state => state.systemTypeList,
        systemHubProxy: state => state.systemHubProxy,
        showProcessData: state => state.showProcessData,
    }
};

export default store;
