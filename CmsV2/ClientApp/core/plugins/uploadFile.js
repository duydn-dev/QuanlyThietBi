import Vue from 'vue';
import axios from 'axios';
import { getCookie } from '../utils';
import CONSTANTS from '../utils/constants';

var BASE_URL = 'http://localhost:1999/uploadFile';

if (process.env.BASE_URL) {
    BASE_URL = process.env.ApiUrl;
} else {
    BASE_URL = window.appSettings.ApiUrl;
}
if (BASE_URL[BASE_URL.length - 1] != '/')
    BASE_URL += "/";
BASE_URL += "UploadFile.ashx";

const client = axios.create({
    baseURL: BASE_URL
});

const upload = function (file) {

    const formData = new FormData();
    formData.append('audio', file)

    let _opts = {
        method: 'post',
        data: formData
    };


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

Vue.prototype.$uploadFile = upload;

export default upload;