<template>
    <div>
        <button class="btn btn-success pt-1 pb-1" type="button" @click="showFileManager=true">Chọn file âm thanh</button>
        <file-manager v-if="showFileManager" @close="showFileManager=false" @insert="selectFile" exts="mp3;wma;wav" :maxSelect="1" />
        <player v-if="soundUrl" :src="soundUrl"></player>
        <span @click="removeFile()" v-if="soundUrl" class="cursor-pointer text-danger" style="position: absolute;
        top: 72px;
        right: 22px;
        font-size: 18px;"><i class="fa fa-times" /></span>
    </div>
</template>
<script>
    import player from './aplayer';
    export default {
        name: "audio-select",
        components: { player },
        props: {
            value: {
                type: null,
                required: true
            }
        },
        data() {
            return {
                showFileManager: false,
                soundUrl: ''
            }
        },
        watch: {
            'value'() {
                if(this.value) {
                    this.soundUrl = this.value;
                    if (this.soundUrl && !this.soundUrl.startsWith('http'))
                        this.soundUrl = this.appSettings.configs.storageDomain + this.soundUrl;
                }
            }
        },
        created() {
            if (this.value) {
                this.soundUrl = this.value;
                if (this.soundUrl && !this.soundUrl.startsWith('http'))
                    this.soundUrl = this.appSettings.configs.storageDomain + this.soundUrl;
            }
        },
        methods: {
            removeFile() {
                this.soundUrl = "";
                this.$emit('input', this.soundUrl);
            },
            selectFile(data) {
                this.soundUrl = this.appSettings.configs.storageDomain + data[0].url;
                this.$emit('input', data[0].url);
            },
        }
    }
</script>