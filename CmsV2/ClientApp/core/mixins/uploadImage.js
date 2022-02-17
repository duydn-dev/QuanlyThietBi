import Vue from 'vue';


Vue.mixin({
    methods: {
        _uploadFile(file) {
            return new Promise((resolve, reject) => {
                let formData = new FormData();
                formData.append('file', file);
                this.$http({
                    data: {
                        m: "file",
                        fn: "get_token",
                        filename: file.name.replace(/&/gi, '-')
                    }
                }).then((response) => {
                    let data = response.data;
                    formData.append('token', data);
                    return this.$http(
                        {
                            url: this.appSettings.configs.storageApiUrl + '?fn=upload',
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