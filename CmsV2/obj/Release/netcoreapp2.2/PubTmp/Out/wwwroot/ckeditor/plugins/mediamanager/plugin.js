(function () {
    //Chức năng khi ấn vào nút    
    var a = {
        exec: function (editor) {
            a = document.createElement('input')
            a.setAttribute('type', 'file')
            a.setAttribute('accept', '.jpg,.jpeg,.png,.tif,.gif,.svg')
            a.click()
            a.onchange = function () {
                file = a.files[0];
                curr = CKEDITOR.currentInstance
                if (file.size > 5000000) {
                    b = document.createElement('div')
                    b.className = 'message alert alert-danger'
                    m = document.createElement('span')
                    m.innerHTML = "Image size exceeded! Please upload image of less than 5 MB."
                    b.appendChild(m)
                    c = document.createElement('span')
                    c.className = 'close'
                    c.innerHTML = 'X'
                    b.appendChild(c)
                    e = document.querySelector('.error-space')
                    e.appendChild(b)
                    setTimeout(function () {
                        alert = document.querySelector('.alert-danger')
                        alert.parentNode.removeChild(alert)
                    }, 20000)
                    c.onclick = function () {
                        b = document.querySelector('.alert-danger')
                        b.parentNode.removeChild(b)
                    }
                    return
                } else if (['jpeg', 'jpg', 'png', 'svg', 'gif', 'tif', 'svg+xml'].indexOf(file.type.split('/')[1]) === -1) {
                    b = document.createElement('div')
                    b.className = 'message alert alert-danger'
                    m = document.createElement('span')
                    m.innerHTML = "The uploaded image format is not of acceptible format! Please upload an image!"
                    b.appendChild(m)
                    c = document.createElement('span')
                    c.className = 'close'
                    c.innerHTML = 'X'
                    b.appendChild(c)
                    e = document.querySelector('.error-space')
                    e.appendChild(b)
                    setTimeout(function () {
                        alert = document.querySelector('.alert-danger')
                        alert.parentNode.removeChild(alert)
                    }, 20000)
                    c.onclick = function () {
                        b = document.querySelector('.alert-danger')
                        b.parentNode.removeChild(b)
                    }
                    return
                }

                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {

                window.$http({
                        data: {
                            m: "file",
                            fn: "get_token",
                            filename: file.name
                        }
                    }).then((response) => {
                        let data = response.data;

                        window.$http({
                            url: window.appSettings.storageApiUrl + '?fn=upload',
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
                        }).then((response) => {
                            editor.insertHtml('<img src="' +window.appSettings.configs.storageDomain+ response.data.path + '">');
                        
                        });

                    }).catch(err => {
                        console.log(err);
                    });
                    //window.$http({
                    //    data: {
                    //        m: 'file',
                    //        fn: 'upload_base64',
                    //        base64: reader.result
                    //    }
                    //}).then((response) => {
                    //    if (response.success) {
                    //        editor.insertHtml('<img src="' + response.data + '">');
                    //    }
                    //}).catch(error => {
                    //    alert(error.message);
                    //});
                };

            }

        }
    }
    CKEDITOR.plugins.add('mediamanager', {
        init: function (editor) {
            editor.addCommand('mediamanager', a);
            editor.ui.addButton('mediamanager', {
                label: 'Quản lý ảnh',
                icon: this.path + 'mediamanager.png',
                command: 'mediamanager'
            });
        }
    });

})();
