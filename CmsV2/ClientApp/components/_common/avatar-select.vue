<template>
    <div class="avatar-select-wrapper text-center">
        <img :src="displayAvatar" class="avatar-select-image" :style="{ width: width + 'px' }" />
        <div class="mt-2">
            <a class="custom-file-upload" @click="showFileManager = true">
                <!-- <input type="file" @change="onFileChange" /> -->
                {{ $t('Label.Upload') }}
            </a>
        </div>

        <file-manager
            v-if="showFileManager"
            :max-select="10"
            @close="showFileManager = false"
            @insert="processData"
        />
    </div>
</template>
<style scoped>
input[type='file'] {
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
}
.custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 5px 8px;
    cursor: pointer;
    position: relative;
    text-align: center;
    background: #f1f1f1;
}
</style>
<script>
import { getOrientation, resetOrientation } from '../../core/utils/index';
export default {
    name: 'AvatarSelect',
    props: ['src', 'value', 'width'],
    data() {
        return {
            srcUpload: '',
            showFileManager: false,
        };
    },
    computed: {
        displayAvatar() {
            let _src = '';
            if (this.srcUpload) _src = this.srcUpload;
            else if (this.src) _src = this.src;
            else return '/img/avatar.png';
            if (_src.lastIndexOf('http') == -1 && _src.lastIndexOf('data:image/') == -1)
                _src = this.appSettings.configs.storageDomain + _src;
            return _src;
        },
    },
    watch: {
        srcUpload() {
            this.$emit('change', this.srcUpload);
            this.$emit('input', this.srcUpload);
        },
    },
    methods: {
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            let file = files[0];
            if (file) {
                let loading = this.$loading.show();
                var reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        getOrientation(file, (orientation) => {
                            if (orientation != -1 && orientation != -2 && orientation != 1) {
                                resetOrientation(e.target.result, orientation, (newBase64) => {
                                    this.srcUpload = newBase64;
                                    loading.hide();
                                });
                            } else {
                                this.srcUpload = e.target.result;
                                loading.hide();
                            }
                        });
                    } catch (e) {
                        loading.hide();
                        this.srcUpload = e.target.result;
                    }
                };
                reader.readAsDataURL(file);
            }
        },
        processData(values) {
            console.log(values);
            this.srcUpload = values[0].url;
        },
    },
    created() {
        this.srcUpload = this.value;
    },
};
</script>
