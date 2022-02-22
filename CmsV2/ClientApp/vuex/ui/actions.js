
export const toggleDoExamNow = ({ commit }) => {
    commit("TOGGLE_DO_EXAM_NOW");
}
export const hideMainMenu = ({ commit }) => {
    commit("SHOW_HIDE_MAIN_MENU", false);
}
export const showMainMenu = ({ commit }) => {
    commit("SHOW_HIDE_MAIN_MENU", true);
}

export const showSetMenuByBlock = ({ commit }, payload) => {
    commit("MENU_DATA_BY_BLOCK", payload);
}
export const toggleSidebar = ({ commit }, payload) => {
    commit("SIDEBAR_TOGGLE", payload);
}
export const setSidebarMode = ({ commit }, payload) => {
    commit("SIDEBAR_SET_MODE", payload);
}
