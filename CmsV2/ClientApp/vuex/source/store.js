import * as actions from './actions';
import CONSTANTS from '../../core/utils/constants';

const store = {
    state: {
        sourceList: null
    },
    mutations: {
        LIST_SOURCE: (state, payload) => {
            state.sourceList = payload;
        }
    },
    actions,
    getters: {
        sourceList: state => state.sourceList
    }
};

export default store;