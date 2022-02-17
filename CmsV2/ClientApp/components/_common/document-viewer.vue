<template>
    <div style="width:100%">
        <object :data="docSrc" :type="`application/${type}`" style="width:100%; min-height:calc(100vh - 80px)" :height="height" v-if="isPdf">
            <iframe :src='`https://docs.google.com/viewer?url=${docSrc}&embedded=true`' width="100%" height="100%" frameborder="0" />
        </object>
        <div style="width:100%; min-height:calc(100vh - 80px); overflow:auto; height:600px; border:solid 1px #ddd;"><img style="max-width:100%;" :src="docSrc" v-if="isImage" /></div>
    </div>
</template>

<script>
    export default {
        props: {
            src: {
                type: String,
                default() {
                    return '';
                },
                required: true
            },
            type: {
                type: String,
                default() {
                    return 'pdf';
                }
            },
            width: {
                type: Number,
                default() {
                    return 800;
                }
            },
            height: {
                type: Number,
                default() {
                    return 600;
                }
            }
        },
        computed: {
            docSrc() {
                let url = '';
                if (this.src.lastIndexOf(this.appSettings.configs.storageDomain) == -1) {
                    url = this.appSettings.configs.storageDomain + this.src;
                } else {
                    url = this.src;
                }
                return url;
            },
            isPdf() {
                let src = this.src.toLowerCase();
                return src.endsWith('pdf');
            },
            isImage() {
                let src = this.src.toLowerCase();
                return src.endsWith('png') || src.endsWith('jpg') || src.endsWith('jpeg') || src.endsWith('gif');
            }
        }
    }
</script>