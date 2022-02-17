import * as actions from './actions';
import CONSTANTS from '../../core/utils/constants';
const store = {
    state: {
        files: null,
        fileCount: 0,
        profileActive: 0
    },
    mutations: {
        GET_FILES: (state, payload) => {
            state.files = payload.data;
            state.fileCount = payload.totalRow;
        },
        GET_PROFILEACTIVE: (state, payload) => {
            state.profileActive = payload;
        }
    },
    actions,
    getters: {
        files: state => state.files,
        fileCount: state => state.fileCount,
        profileActive: state => state.profileActive,
    }
};

export default store;