import * as actions from './actions';
import CONSTANTS from '../../core/utils/constants';
const store = {
    state: {
        activeFolderId: null,
        activeFileId: null
    },
    mutations: {
        CHANGE_ACTIVE_FOLDER: (state, payload) => {
            state.activeFolderId = payload;
        },
        CHANGE_ACTIVE_FILE: (state, payload) => {
            state.activeFileId = payload;
        }
    },
    actions,
    getters: {
        activeFolderId: state => state.activeFolderId,
        activeFileId: state => state.activeFileId
    }
};

export default store;