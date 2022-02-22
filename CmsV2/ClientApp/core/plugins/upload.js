import Vue from 'vue';
import axios from 'axios';
import { getCookie } from '../utils';
import CONSTANTS from '../utils/constants';

var BASE_URL = '';

if (!process.env.VUE_ENV) {
    BASE_URL = window.appSettings.storageApiUrl;
}

const client = axios.create({
    baseURL: BASE_URL
});

const upload = function (file) {

    const formData = new FormData();
    formData.append('file', file);
    formData.append('token', file.token || '');
    formData.append('fn', 'upload');
    let _opts = {
        method: 'post',
        formData: true,
        checkResponse: false,
        data: formData
    };
    console.log(_opts);

    return new Promise((resolve, reject) => {
        client(_opts)
            .then(response => {
                return resolve(response);
            })
            .catch(error => {
                if (error.response && error.response.status == 401) {
                    error.unAuthorized = true;
                    if (typeof (localStorage) !== 'undefined') {
                        localStorage.removeItem(CONSTANTS.AUTH_TOKEN);
                    }
                }
                if (error.response && error.response.data && error.response.data.messages)
                    error.response.data.messages = error.response.data.messages.join('<br/>');
                return reject(error.response || error.messages);
            });
    });
};

Vue.prototype.$upload = upload;

export default upload;