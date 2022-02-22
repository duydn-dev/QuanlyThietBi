<template>
    <div class="avatar-select-wrapper">
        <ul v-if="type != 'url'">
            <li v-for="(img, i) in displayPhotos" :key="i" class="kt-avatar kt-avatar--outline">
                <label class="kt-checkbox" v-if="selectAvatar">
                    <input
                        v-model="img.isAvatar"
                        type="checkbox"
                        class="kt-checkbox kt-checkbox--success"
                    />
                    Ảnh đại diện
                    <span />
                </label>
                <br />
                <!-- <img
                    :src="!isShowDescription ? img : img.url"
                    class="photo-select-image cursor-pointer"
                    @click="openGallery(i)"
                />-->
                <div @click="openGallery(i)">
                    <photo :src="!isShowDescription ? img : img.url" :width="200" :height="200" />
                </div>
                <span
                    data-toggle="kt-tooltip"
                    @click="$delete(sourcePhotos, i)"
                    title="Xóa ảnh"
                    data-original-title="Cancel avatar"
                    class="kt-avatar__cancel remove-avatar"
                >
                    <i class="fa fa-times"></i>
                </span>
                <input
                    v-if="isShowDescription"
                    v-model="img.description"
                    type="text"
                    class="form-control mt-2"
                    placeholder="Mô tả"
                />
            </li>
        </ul>
        <img
            v-if="sourcePhotos.length == 0 && type != 'url'"
            src="/img/img-plh.png"
            style="width: 200px"
            class="photo-select-image-plh"
        />
        <div v-if="showUploadButton && type == 'upload' && !isView">
            <uploadBtn
                :multiple="multiple"
                class="custom-file-upload"
                :exts="exts"
                @uploaded="processUploadedFile"
            />
        </div>
        <div v-if="showUploadButton && type == 'photo-manager' && !isView" class="mt-2">
            <button type="button" class="btn custom-file-upload" @click="showFileManager = true">
                <i class="icon-span-filestyle fas fa-folder-open" /> Chọn ảnh
            </button>
        </div>
        <div v-if="type == 'url'">
            <input v-model="sourcePhotos[0]" class="form-control" placeholder="Nhập đường dẫn ảnh" />
        </div>
        <file-manager
            v-if="showFileManager"
            :maxSelect="maxSelect"
            @close="showFileManager = false"
            @insert="processData"
        />

        <LightBox
            ref="lightbox"
            :media="lstImageLightBox"
            :show-caption="true"
            :show-light-box="false"
            v-if="isLoader"
        />
    </div>
</template>
<style scoped>
ul {
    display: flex;
    margin-left: 0;
    padding-left: 0;
    flex-wrap: wrap;
}

ul li {
    list-style-type: none;
    position: relative;
    margin-right: 10px;
    margin-bottom: 5px;
}

ul li .remove-photo {
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

ul li .remove-photo:hover {
    background: red;
    color: #fff;
}

.photo-select-image {
    width: 150px;
    max-height: 150px;
}

.photo-select-image-plh {
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
</style>
<script>
import LightBox from '../light-box-image/LightBox';
import { getOrientation, resetOrientation } from '../../../core/utils/index';
import uploadBtn from './upload-btn';

export default {
    name: 'PhotoSelect',
    components: { uploadBtn, LightBox },
    props: {
        src: null,

        multiple: {
            type: Boolean,
            default: false,
        },
        isView: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: 'upload', //photo-manager
        },
        maxSelect: {
            type: Number,
            default: 1,
        },
        fieldSelect: {
            type: null,
        },
        isShowDescription: {
            type: Boolean,
            default: false,
        },
        selectAvatar: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            sourcePhotos: [],
            showFileManager: false,
            exts: 'png;jpg;jpeg;gif',
            isLoader: false,
            lstImageLightBox: [],
        };
    },
    computed: {
        displayPhotos() {
            let _photos = [];
            if (!this.isShowDescription) {
                this._.each(this.sourcePhotos, (o) => {
                    _photos.push(this.getDisplayAvatar(o.url));
                });
            } else {
                this._.each(this.sourcePhotos, (o) => {
                    if (!this.selectAvatar)
                        _photos.push({
                            url: this.getDisplayAvatar(o.url),
                            description: o.description,
                        });
                    else {
                        _photos.push({
                            url: this.getDisplayAvatar(o.url),
                            description: o.description,
                            isAvatar: o.isAvatar,
                        });
                    }
                });
            }
            return _photos;
        },
        showUploadButton() {
            if (this.maxSelect > 1) return true;
            if (!this.multiple && this.sourcePhotos.length >= 1) return false;
            return true;
        },
    },
    watch: {
        sourcePhotos() {
            if (!this.isShowDescription) {
                this.$emit(
                    'change',
                    this.multiple
                        ? this.sourcePhotos
                        : this.sourcePhotos.length > 0
                        ? this.sourcePhotos[0]
                        : ''
                );
                this.$emit('input', this.sourcePhotos, this.fieldSelect);
            } else {
                this.$emit(
                    'change',
                    this.multiple
                        ? this.displayPhotos
                        : this.displayPhotos.length > 0
                        ? this.displayPhotos[0]
                        : ''
                );
                this.$emit('input', this.displayPhotos, this.fieldSelect);
            }
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
            if (!src) return '/img/img-plh.png';
            if (src.lastIndexOf('http') == -1 && src.lastIndexOf('data:image/') == -1)
                src = this.appSettings.configs.storageDomain + src;
            return src;
        },
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                if (file) {
                    //let loading = this.$loading.show();
                    var reader = new FileReader();
                    reader.onload = (e) => {
                        try {
                            getOrientation(file, (orientation) => {
                                if (orientation != -1 && orientation != -2 && orientation != 1) {
                                    resetOrientation(e.target.result, orientation, (newBase64) => {
                                        this.sourcePhotos.push(newBase64);
                                        //loading.hide();
                                    });
                                } else {
                                    this.sourcePhotos.push(e.target.result);
                                    //loading.hide();
                                }
                            });
                        } catch (e) {
                            //loading.hide();
                            this.sourcePhotos.push(e.target.result);
                        }
                    };
                    reader.readAsDataURL(file);
                }
            }
        },
        openGallery(index) {
            this.lstImageLightBox = this.displayPhotos.map((c) => {
                return {
                    thumb: c.url,
                    src: c.url,
                    caption: c.description,
                };
            });
            this.isLoader = true;
            setTimeout(() => {
                this.$refs.lightbox.showImage(index);
            }, 100);
        },
        processUploadedFile(file) {
            this.sourcePhotos.push(file.url);
        },
        reloadSource() {
            this.sourcePhotos = [];
            if (!this.multiple) {
                if (this.src) {
                    if (this.src instanceof Array) {
                        this.sourcePhotos = this.src;
                    } else {
                        this.sourcePhotos.push(this.src);
                    }
                }
            } else {
                this.sourcePhotos = [];
                if (this.src) {
                    if (this.src instanceof Array) {
                        this.sourcePhotos = this.src;
                    } else {
                        this.sourcePhotos = JSON.parse(this.src);
                    }
                }
            }
        },
        processData(values) {
            this._.each(values, (file) => {
                this.sourcePhotos.push({ url: file.url, description: '', isAvatar: file.isAvatar });
            });
        },
    },
};
</script>
