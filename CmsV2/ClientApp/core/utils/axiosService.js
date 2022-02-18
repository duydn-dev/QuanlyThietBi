import axios from "axios";
import CONSTANTS from './constants';
const token = localStorage.getItem(CONSTANTS.AUTH_TOKEN)
export default {
    get(url) {
        if (token) {
            return axios.get(`${window.appSettings.ApiUrl}/${url}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
        }
        return axios.get(`${window.appSettings.ApiUrl}/${url}`)

    },
    post(url, body) {
        if (token) {
            return axios.post(`${window.appSettings.ApiUrl}/${url}`, body,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
        }
        return axios.post(`${window.appSettings.ApiUrl}/${url}`, body);
    },
    put(url, body) {
        if (token) {
            return axios.put(`${window.appSettings.ApiUrl}/${url}`, body,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
        }
        return axios.put(`${window.appSettings.ApiUrl}/${url}`, body);
    },
    delete(url) {
        if (token) {
            return axios.delete(`${window.appSettings.ApiUrl}/${url}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
        }
        return axios.delete(`${window.appSettings.ApiUrl}/${url}`);
    },
    uploadFile(url, file){
        const formData = new FormData();
        if(file){
            formData.append('file', file);
        }
        if (token) {
            axios.post(`${window.appSettings.ApiUrl}/${url}`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${token}`
                }
            })
        }
        return axios.post(`${window.appSettings.ApiUrl}/${url}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
    },
    uploadFiles(url, files){
        const formData = new FormData();
        if(files && files.length > 0){
            files.forEach(file => {
                formData.append('file', file);
            });
        }
        if (token) {
            axios.post(`${window.appSettings.ApiUrl}/${url}`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: `Bearer ${token}`
                }
            })
        }
        return axios.post(`${window.appSettings.ApiUrl}/${url}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
    }
}