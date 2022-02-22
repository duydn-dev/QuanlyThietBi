import Vue from 'vue';
import axiosService from '../utils/axiosService';

Vue.mixin({
    methods: {
        _uploadFile(file) {
            return new Promise((resolve, reject) => {
                let formData = new FormData();
                formData.append('file', file);

                axiosService.get(`api/File/get_token?fname=${file.name.replace(/&/gi, '-')}`)
                .then((response) => {
                    let data = response.data;
                    formData.append('token', data);
                    return this.$http(
                        {
                            url: this.appSettings.storageApiUrl + '?fn=upload',
                            formData: true,
                            data: {
                                token: data,
                                file: file
                            },
                            checkResponse: false
                        },
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }
                    ).then((res) => {
                        return resolve(res.data);
                    }).catch(() => {
                        return reject('Không tải được file lên, vui lòng kiểm tra lại hoặc báo quản trị viên!');
                    });
                });
            });
        }
    }
});