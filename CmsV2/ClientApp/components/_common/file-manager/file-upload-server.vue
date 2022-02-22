<template>
    <div>
        <input
            type="file"
            name="file"
            :id="fileId"
            @change="onFileChange"
            class="inputfile"
            style="display: none"
        />
        <div class="input-group" v-if="!textOnly">
            <input type="text" class="form-control" disabled :value="fileName" />
            <div class="input-group-apepend">
                <label
                    class="btn btn-warning ml-2"
                    v-b-tooltip.hover
                    title="Upload file"
                    :for="fileId"
                    style="cursor:pointer"
                >
                    <i class="fas fa-file-upload"></i>
                </label>
            </div>
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
</style>