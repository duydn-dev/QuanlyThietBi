<template>
    <div>
        <div class="ipt-file-area" v-if="!textOnly">
            <input
                type="file"
                name="file"
                :id="fileId"
                @change="onFileChange"
                class="inputfile"
                style="display: none"
                />
            <div class="d-flex flex-column">
                <label class="txt-tit">File định dạng xlsx</label>
                <input class="txt-ipt" disabled :value="fileName">
            </div>
            <label title="Tải tệp" type="button" :for="fileId" class="btn-upfile-calendar" style="cursor:pointer"><i class="bi bi-file-earmark-arrow-up"></i> Tải file </label>
        </div>
        <label :for="fileId" v-else>{{textOnly}}</label>
    </div>
</template>

<script>
export default {
    props: ['oldFile', 'id', 'textOnly', 'itemId'],
    data() {
        return { file: null, fileId: null };
    },
    computed: {
        fileName() {
            if (this.file) return this.file.name;
            else if (this.oldFile) return this.oldFile.name;
            return '';
        },
    },
    methods: {
        onFileChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            let file = files[0];
            var reader = new FileReader();
            reader.onload = (e) => {
                let data = e.target.result;
                this.file = { name: file.name, data: data };
                this.$emit('input', this.file);
                this.$emit('change', this.file, this.id, this.itemId);
            };
            reader.readAsDataURL(file);
        },
        getFileId() {
            var d = new Date();
            var n = d.getTime();

            return `file_${n}_${this.id}`;
        },
    },
    created() {
        this.fileId = this.getFileId();
    },
};
</script>

<style>
.btn-upfile-calendar{
    position: absolute;
    bottom: 0;
    right: 0;
    height: 41px;
    margin-left: 13px;
    padding: 0 14px;
    background: linear-gradient(198.26deg, #F9F9F9 13.92%, #FFFFFF 49.04%, #E5E5E5 87.59%);
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-size: 14px;
    line-height: 35px;
    color: #666;
    margin-bottom: 0;
}
</style>