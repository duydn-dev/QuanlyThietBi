<template>
    <div class="avatar-select-wrapper">
        <div v-if="type != 'url'">
            <div v-for="(file, i) in displayFiles" :key="file.url" class="input-group mb-2">
                <div class="input-group-prepend" :title="file.name">
                    <span class="input-group-text basic-addon2" @click="processDownloadFile(file)">
                        <i class="fa fa-file" />
                    </span>
                </div>
                <div
                    class="form-control basic-addon2"
                    :title="file.name"
                    @click="processDownloadFile(file)"
                >
                    {{ file.name }}
                </div>
                <div class="input-group-append" v-if="!isView">
                    <button class="btn btn-danger" type="button" @click="$delete(sourceFiles, i)">
                        <i class="fa fa-times" />
                    </button>
                </div>
            </div>
        </div>
        <div v-if="showUploadButton && type == 'upload'">
            <uploadBtn
                :multiple="multiple"
                class="custom-file-upload"
                @uploaded="processUploadedFile"
            />
            <!-- :exts="exts" -->
        </div>
        <div v-if="showUploadButton && type == 'file-manager' && !isView">
            <button type="button" class="btn custom-file-upload" @click="showFileManager = true">
                <i class="icon-span-filestyle fas fa-folder-open" /> Chọn file
            </button>
        </div>
        <div v-if="type == 'url'">
            <input v-model="sourceFiles[0]" class="form-control" placeholder="Nhập đường dẫn ảnh" />
        </div>
        <file-manager
            v-if="showFileManager"
            :max-select="10"
            @close="showFileManager = false"
            @insert="processData" :exts="exts"
        />
        <!-- :exts="exts" -->
    </div>
</template>
<style scoped>
ul {
    display: flex;
    margin-left: 0;
    padding-left: 0;
}

ul li {
    list-style-type: none;
    position: relative;
    margin-right: 10px;
    margin-bottom: 5px;
}

ul li .remove-file {
    position: absolute;
    background: #fff;
    cursor: pointer;
    top: 1px;
    right: 1px;
    width: 20px;
    text-align: center;
    height: 20px;
    line-height: 20px;
}

ul li .remove-file:hover {
    background: red;
    color: #fff;
}

.file-select-image {
    width: 150px;
    max-height: 150px;
}

.file-select-image-plh {
    width: 120px;
    max-height: 150px;
}

input[type='file'] {
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
}

.custom-file-upload {
    display: inline-block;
    width: 120px;
    padding: 5px 0;
    cursor: pointer;
    position: relative;
    text-align: center;
    background: #2196f3;
    color: #fff;
    border: 0;
    overflow: hidden;
}

.basic-addon2 {
    cursor: pointer;
    background: #f7f8fa;
}
</style>
<script>
import uploadBtn from './upload-btn';

export default {
    name: 'FileSelect',
    components: { uploadBtn },
    props: {
        isView: {
            type: Boolean,
            default: false,
        },
        src: null,
        multiple: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: 'upload', //file-manager
        },
        exts: {
            type: String,
            default: 'png;jpg;jpeg;gif',
        },
        fieldSelect: {
            type: null,
        },
    },
    data() {
        return {
            sourceFiles: [],
            showFileManager: false,
        };
    },
    computed: {
        displayFiles() {
            let _files = [];
            this._.each(this.sourceFiles, (o) => {
                _files.push(this.getDisplayAvatar({ name: o.name, url: o.url }));
            });
            return _files;
        },
        showUploadButton() {
            if (!this.multiple && this.sourceFiles.length >= 1) return false;
            return true;
        },
    },
    watch: {
        sourceFiles() {
            this.$emit(
                'change',
                this.multiple
                    ? this.sourceFiles
                    : this.sourceFiles.length > 0
                    ? this.sourceFiles[0]
                    : ''
            );
            this.$emit('input', this.sourceFiles, this.fieldSelect);
        },
        src() {
            this.reloadSource();
        },
    },
    created() {
        this.reloadSource();
    },
    methods: {
        getDisplayAvatar(src) {
            if (!src) return '';
            else return src;
            //if (src.lastIndexOf('http') == -1 && src.lastIndexOf('data:image/') == -1)
            //    src = this.appSettings.configs.storageDomain + src;
            //return src;
        },
        processUploadedFile(file) {
            this.sourceFiles.push(file.url);
        },
        reloadSource() {
            this.sourceFiles = [];
            if (!this.multiple) {
                if (this.src) {
                    if (this.src instanceof Array) {
                        this.sourceFiles = this.src;
                    } else {
                        this.sourceFiles.push(this.src);
                    }
                }
            } else {
                this.sourceFiles = [];
                if (this.src) {
                    if (this.src instanceof Array) {
                        this.sourceFiles = this.src;
                    } else {
                        this.sourceFiles = JSON.parse(this.src);
                    }
                }
            }
        },
        processData(values) {
            let files = [];
            this._.each(values, (file) => {
                files.push({ name: file.name, url: file.url });
            });

            if (files && files.length > 0) {
                for (let o of files) {
                    if (!_.find(this.sourceFiles, ['url', o.url])) this.sourceFiles.push(o);
                }
            }
            //this._.each(values, file => {
            //    this.sourceFiles.push({ name: file.name, url: file.url });
            //});
        },
        forceFileDownload(response, file) {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', file.name);
            document.body.appendChild(link);
            link.click();
        },
        processDownloadFile(file) {
            window.open(this.appSettings.configs.storageDomain + file.url, '_blank');
            //var me = this;
            //this.$http({
            //    method: 'get',
            //    url: this.appSettings.configs.storageDomain + file.name,
            //    responseType: 'arraybuffer'
            //}).then(response => {
            //    me.forceFileDownload(response, file);
            //}).catch(err => {
            //     return this.$message('Không tải được file', 'error');
            //});
        },
    },
};
</script>
