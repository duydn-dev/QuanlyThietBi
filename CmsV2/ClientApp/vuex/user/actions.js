import axios from '../../core/plugins/http';
import CONSTANTS from '../../core/utils/constants';
import axiosService from '../../core/utils/axiosService';

const apiUrl = window.appSettings.ApiUrl;
export const SetTokenLocalstorage = ({ commit }, user) => {
    return new Promise((resolve, reject) => {
        if (user && user.token && typeof localStorage !== 'undefined') {
            localStorage.setItem(CONSTANTS.AUTH_TOKEN, user.token);
        }
        commit('LOGGEDIN', user);
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(CONSTANTS.CURRENT_USER, JSON.stringify(user));
        }
        return resolve();
    });
};
export const logOut = ({ commit }) => {
    return new Promise((resolve, reject) => {
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem(CONSTANTS.AUTH_TOKEN);
            localStorage.removeItem(CONSTANTS.CURRENT_USER);
        }
        commit('LOGOUT');
        resolve();
    });
};

export const logIn = ({ commit }, data) => {
    return axios({
        url: `${apiUrl}/api/User/login`,
        method: 'post',
        data: data
    }).then(response => {
        if (response.responseData && response.responseData.token && typeof localStorage !== 'undefined') {
            localStorage.setItem(CONSTANTS.AUTH_TOKEN, response.responseData.token);
        }
        commit('LOGGEDIN', response.responseData);
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(CONSTANTS.CURRENT_USER, JSON.stringify(response.responseData));
        }
    })
};

export const getUserInfo = ({ commit }) => {
    return axios({ url: '/User/Info' })
        .then(response => {
            commit('USER_INFO', response.data);
        })
        .catch(err => {
            if (err.status && err.status == 401 && typeof localStorage !== 'undefined') {
                localStorage.removeItem(CONSTANTS.AUTH_TOKEN);
                localStorage.removeItem(CONSTANTS.CURRENT_USER);
            }
            commit('USER_INFO_ERROR', err);
        });
};

export const resetPassUser = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                m: 'user',
                fn: 'reset_pass',
                ...data
            }
        })
            .then(response => {
                commit('CHANGE_PASS_USER', response);
                return resolve(response.data);
            })
            .catch(err => {
                commit('ERROR', err);
                return reject(err);
            });
    });
};
export const getListUsers = ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
        return axiosService.get(`api/User?request=${payload}`)
        .then(response => {
            commit('GETLIST', response.data.responseData.data);
            return resolve(response.data.responseData)
        })
        .catch(err => {
            commit('ERROR', err);
            return reject(err);
        });
    })
    
    // return axios({
    //     url: `${apiUrl}/api/User?request=${JSON.stringify(payload)}`,
    //     method: 'get'
    // }).then(res => {
    //     commit('GETLIST', res.responseData);
    //     return resolve(res.responseData);
    // })
    // .catch(err => {
    //     commit('ERROR', err);
    //     return reject(err);
    // });
    // const r = axios({
    //     url: `${apiUrl}/api/User?request={}`,
    //     method: 'get',
    //     headers: {
    //         'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI4NjdlZjY5Mi0zZDdjLTQzMTAtOGRkMS1mNDM4MjliOGM5NzciLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQWRtaW4iLCJqdGkiOiI3OTFjY2E4Yy02ZjAyLTQwMzctODBkMi1hZmZjMDQ1YTlmNjgiLCJleHAiOjE2NDUxODQ4MTMsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAwMSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJ9.DnBpmy68ZnxGywiFUcxJAtGFNHcOYb6bgYZNk2Lg-bA`
    //     }
    // });
    // r.then(response => {
    //     console.log(response);
    // })
};
export const getListUserByShare = ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                m: 'user',
                fn: 'get-list-by-share',
                ...payload
            }
        })
            .then(res => {
                commit('GETLISTBYSHARE', res.data);
                commit('TOTALBYSHARE', res.totalRow);
                return resolve(res.data);
            })
            .catch(err => {
                commit('GETLISTBYSHARE', null);
                return reject(err);
            });
    });
};

export const getNameById = ({ commit }, id) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                m: 'user',
                fn: 'get-name',
                id: id
            }
        })
            .then(response => {
                commit('FULLNAME_BY_ID', response);
                return resolve(response.data);
            })
            .catch(err => {
                commit('ERROR', err);
                return reject(err);
            });
    });
};

export const getListUserSelected = ({ commit }) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                m: 'user',
                fn: 'list-selected-no-pager'
            }
        })
            .then(response => {
                commit('LIST_USER_SELECTED', response.data);
                return resolve(response.data);
            })
            .catch(err => {
                commit('LIST_USER_SELECTED', null);
                return reject(err);
            });
    });
};

export const getListDepartmentOfUser = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        return axios({
            data: {
                m: 'user',
                fn: 'list-department-of-user',
                ...data
            }
        })
            .then(response => {
                return resolve(response.data);
            })
            .catch(err => {
                return reject(err);
            });
    });
};
