import * as actions from './actions';

const store = {
    state: {
        system: null,
        permissions: null,
        userPermissions: null,
        systemTypeList: null,
        systemHubProxy: null,
        showProcessData: false
    },
    mutations: {
        INIT_SYSTEM: (state, payload) => {
            if (payload) {
                state.system = payload;
                state.userPermissions = payload.userPermission;
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
        systemTypeList: state => state.systemTypeList,
        systemHubProxy: state => state.systemHubProxy,
        showProcessData: state => state.showProcessData,
    }
};

export default store;
