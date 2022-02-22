import Vue from 'vue';
import axios from 'axios';
import { getCookie } from '../utils';
import CONSTANTS from '../utils/constants';
import moment from 'moment'

var BASE_URL = '';
var BASE_URLAPI = '';
var NAMESPACE = '';
var CompanyId = window.appSettings.CompanyId;

if (process.env.BASE_URL) {
    BASE_URLAPI = BASE_URL = process.env.ApiUrl;
} else {
    BASE_URLAPI = BASE_URL = window.appSettings.ApiUrl;
}

if (process.env.NAMESPACE) {
    NAMESPACE = process.env.Namespace;
} else {
    NAMESPACE = window.appSettings.Namespace;
}




function processData(response) {
    return response.data;
}
function isSuccess(response) {
    return response.data.success;
}

const request = function (options) {

    BASE_URL = BASE_URLAPI;
    if (options.data.isBasic)
        BASE_URL = BASE_URL + "/basic";
    const client = axios.create({
        baseURL: BASE_URL
    });
    var token = null;
    if (!process.env.VUE_ENV)
        token = localStorage.getItem(CONSTANTS.AUTH_TOKEN);
    if (window.appSettings.token)
        token = window.appSettings.token;
    if (token)
        client.defaults.headers.common['Authorization'] = token;
    client.defaults.headers.common['Namespace'] = NAMESPACE;
    CompanyId = window.appSettings.CompanyId;
    client.defaults.headers.common['CompanyId'] = CompanyId;
    let _opts = {
        method: 'post',
        formData: false
    };

    var dt = options.data;
    if (dt) {
        var keys = Object.keys(dt);
        _.forEach(keys, (k) => {
            var o = dt[k];
            if (o instanceof Date && !isNaN(o.valueOf())) {
                o = moment(o).format();
            }
            dt[k] = o;
        });
    }
    options.data = dt;

    Object.assign(_opts, options);
    if (_opts.formData) {
        var form_data = new FormData();

        for (var key in _opts.data) {
            form_data.append(key, _opts.data[key]);
        }
        _opts.data = form_data;

    }
    //let offset = new Date().getTimeZoneOffset();

    //_opts.data.clientTimeZoneOffset = offset;

    return new Promise((resolve, reject) => {
        client(_opts)
            .then(response => {
                return isSuccess(response) ? resolve(processData(response)) : reject(processData(response));
            })
            .catch(error => {
                if (error.response && error.response.status == 401) {
                    error.unAuthorized = true;
                    if (typeof (localStorage) !== 'undefined') {
                        localStorage.removeItem(CONSTANTS.AUTH_TOKEN);
                        window.location.reload();
                    }
                }
                //if (error.response && error.response.status == 404) {
                //    error.unAuthorized = true;
                //    window.location.href = '/_shared/404';
                //}
                return reject(error.response || error.message);
            });
    });
};

Vue.prototype.$http = request;

if (!process.env.VUE_ENV) {
    window.$http = request;
}
export default request;