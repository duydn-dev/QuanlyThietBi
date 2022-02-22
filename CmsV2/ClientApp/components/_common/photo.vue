<template>
    <img :src="displayAvatar" v-show="load" @load="loaded"
         :class="[width == 0 ? 'photo-image-100' : 'photo-image', addClass ? '' : cssClass]" />
</template>
<style scoped>
    .photo-image {
        max-width: 100%;
    }

    .photo-image-100 {
        width: 100%;
    }
</style>
<script>
    export default {
        name: 'Photo',
        props: {
            width: {
                type: Number,
                default: 300
            },
            height: {
                type: Number,
                default: 0
            },
            src: {
                type: String
            },
            isLoaded: {
                type: Boolean,
                default: true
            },
            cssClass: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                load: false,
            }
        },

        computed: {
            displayAvatar() {
                let _src = '';
                if (this.src) _src = this.src;
                else return '/img/no-image.png';
                if (_src.lastIndexOf('http') == -1 && _src.lastIndexOf('data:image/') == -1)
                    _src = this.appSettings.configs.storageDomain + this.src;
                if (
                    (_src.lastIndexOf(this.appSettings.configs.storageDomain) != -1 ||
                        _src.lastIndexOf('dekiru.vn') != -1) &&
                    _src.lastIndexOf('?') == -1
                ) {
                    if (this.height == 0 && this.width > 0) _src += '?w=' + this.width + '&mode=crop';
                    else if (this.width == 0 && this.height > 0)
                        _src += '?h=' + this.height + '&mode=crop';
                    else if (this.width > 0 && this.height > 0)
                        _src += '?w=' + this.width + '&h=' + this.height + '&mode=crop';
                }
                return _src;
            },
            addClass() {
                return this.cssClass == '';
            }
        },
        methods: {
            loaded() {
                this.load = true
            }
        }
    };
</script>
