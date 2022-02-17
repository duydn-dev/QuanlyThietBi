import * as actions from './actions';
import CONSTANTS from '../../core/utils/constants';

const store = {
    state: {
        triggerState: {},
        openCompanyPopup: false,
        openChangePassPopup: false,
        openTutorialPopup: false,
        openSendErrorPopup: false,
    },
    mutations: {
        UPDATE_TRIGGER: (state, payload) => {
            if (payload == 'openCompanyPopup') state.openCompanyPopup = !state.openCompanyPopup;
            else if (payload == 'openChangePassPopup')
                state.openChangePassPopup = !state.openChangePassPopup;
            else if (payload == 'openTutorialPopup')
                state.openTutorialPopup = !state.openTutorialPopup;
            else if (payload == 'openSendErrorPopup') openErrorReport();
            // state.openSendErrorPopup = !state.openSendErrorPopup;
        },
    },
    actions,
    getters: {
        openCompanyPopup: (state) => state.openCompanyPopup,
        openChangePassPopup: (state) => state.openChangePassPopup,
        openTutorialPopup: (state) => state.openTutorialPopup,
        openSendErrorPopup: (state) => state.openSendErrorPopup,
    },
};

export default store;
