<template>
    <div class="text-center">
        <input ref="file"
               type="file"
               multiple="multiple"
               :accept="accepts"
               @change="handleFileUpload()"
               class="d-none"
               id="wiki-upload"
                />
        <label for="wiki-upload" class="wiki-upfile cursor-pointer">
            <i class="bi bi-file-earmark-arrow-up"></i> Tải file
        </label>
    </div>
</template>
<style scoped>
.wiki-upfile{
    width: 100%;
    background: #F8F8F8;
    border: 1px solid #E0E0E0;
    border-radius: 5px;
    font-size: 14px;
    line-height: 22px;
    color: #666;
    padding: 10px;
}
.wiki-upfile:hover{
    background: #eeeded;
}
</style>
<style scoped>
    .btn {
        position: relative;
    }

    input {
        position: absolute;
        width: 100%;
        height: 100%;
        bottom: 0;
        right: 0;
        opacity: 0;
    }
</style>
<script>
    export default {
        name: 'UploadBtn',
        props: ['exts', 'folderId'],
        data() {
            return { accepts: '' };
        },
        created() {
            this.accepts = this._.map(this.exts.split(';'), o => {
                return '.' + o;
            }).join(',');
        },
        methods: {
            add(file) {
                this.$http({
                    data: {
                        m: 'file',
                        fn: 'add',
                        name: file.name,
                        url: file.path,
                        size: file.size,
                        ext: this.getExtentionOnly(file.name).toLowerCase(),
                        width: file.width || 0,
                        height: file.height || 0,
                        folderId: parseInt(this.folderId)
                    }
                }).then(response => {
                    if (response.success) {
                        this.files = response.data;
                    }
                    this.$emit('uploaded', response.data);
                });
            },
            handleFileUpload() {
                this._.forEach(this.$refs.file.files, (o, i) => {
                    let file = this.$refs.file.files[i];
                    if (file) {
                        let fname = file.name;
                        let ext = this.getExtentionOnly(fname).toLowerCase();
                        let allowsExt = this.exts.split(';');
                        if (allowsExt.length > 0) {
                            if (this._.indexOf(allowsExt, ext) == -1) {
                                return this.$error(
                                    'Chỉ cho phép upload các định dạng: ' +
                                    this.exts.replace(/\|/g, ';')
                                );
                            }
                        }
                        this.upload(file);
                    }
                });
            },
            upload(file) {
                this.$emit('startloadingfile');
                this._uploadFile(file, {
                    onUploadProgress: progressEvent => {
                        let percentCompleted = Math.floor(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        this.$emit('percentCompleted', percentCompleted);
                    }
                })
                    .then(res => {
                        var data = res;
                        file.path = data.path;
                        file.width = data.width;
                        file.height = data.height;
                        this.add(file);
                        this.$notify({
                            type: 'success',
                            group: 'foo',
                            title: 'Thành công',
                            text: file.name + ' đã tải lên thành công!'
                        });
                        this.$emit('endloadingfile');
                    })
                    .catch(err => {
                        this.$notify({
                            type: 'error',
                            group: 'foo',
                            title: 'Lỗi',
                            text: err
                        });
                        this.$emit('endloadingfile');
                    });
            },
            getExtentionOnly(fileext) {
                return fileext.split('.').pop();
            }
        }
    };
</script>