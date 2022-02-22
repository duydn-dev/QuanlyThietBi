import * as actions from './actions'
import CONSTANTS from '../../core/utils/constants';

let initUser = null;
if (typeof (localStorage) !== 'undefined') {
    try {
        initUser = JSON.parse(localStorage.getItem(CONSTANTS.CURRENT_USER) || null);
    } catch (e) {

    }
}

const store = {
    state: {
        currentUser: initUser,
        isLoggedIn: false,
        listUserLessonLog: null,
        listUsers: null,
        listUserByShare: null,
        fullNameById: null,
        totalUserByShare: 0,
        listUserSelected: [],
        userStatus: [
            {id: 0, name: "Không hoạt động"},
            {id: 1, name: "Hoạt động"},
        ]
    },

    mutations: {
        LOGOUT: (state, payload) => {
            state.currentUser = null;
            state.isLoggedIn = false;
        },
        USER_INFO: (state, payload) => {
            state.currentUser = payload;
            state.isLoggedIn = payload != null;
        },
        LOGGEDIN: (state, payload) => {
            state.currentUser = payload;
            state.isLoggedIn = payload != null;
        },
        LOGGEDIN_ERROR: (state, payload) => {

        },
        USER_INFO_ERROR: (state, payload) => {
            state.currentUser = null;
            state.isLoggedIn = false;
        },
        GET_USER_LESSON_LOG: (state, payload) => {
            state.listUserLessonLog = payload;
        },
        CHANGE_PASS_USER: (state, payload) => {

        },
        GETLIST: (state, payload) => {
            state.listUsers = payload;
        },
        GETLISTBYSHARE: (state, payload) => {
            state.listUserByShare = payload;
        },
        TOTALBYSHARE: (state, payload) => {
            state.totalUserByShare = payload;
        },
        FULLNAME_BY_ID: (state, payload) => {
            state.fullNameById = payload;
        },
        LIST_USER_SELECTED: (state, payload) => {
            state.listUserSelected = payload;
        },
    },
    actions,
    getters: {
        currentUser: state => state.currentUser,
        isLoggedIn: state => state.isLoggedIn,
        listUsers: state => state.listUsers,
        listUserByShare: state => state.listUserByShare,
        totalUserByShare: state => state.totalUserByShare,
        fullNameById: state => state.fullNameById,
        listUserSelected: state => state.listUserSelected,
        userStatus: state => state.userStatus,
    }
};

export default store;