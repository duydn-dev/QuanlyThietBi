<template>
    <modal
        :title="formName ? formName : 'Xem trước'"
        :width="1200"
        :height="80"
        @close="closePopup"
    >
        <div slot="body">
            <iframe :src="urlPreview" width="100%" style="min-height:75vh" class="office-frame"></iframe>
        </div>
        <div slot="footer" class="row">
            <div class="col-sm-12">
                <button class="btn btn-primary" secondary @click="downloadFile()">
                    <i class="fa fa-download" aria-hidden="true"></i>
                    <span>Tải file</span>
                </button>
                <button class="btn btn-danger" @click="closePopup()">
                    <span>Thoát</span>
                </button>
            </div>
        </div>
    </modal>
</template>

<script>
export default {
    props: ['id', 'formName', 'urlDownload'],
    data() {
        return {
            urlPreview: ''
        };
    },
    computed: {},
    methods: {
        closePopup() {
            this.$emit('closePopup');
        },
        downloadFile() {
            if (this.urlDownload) {
                window.open(this.urlDownload + '?download=1');
            } else {
                this.getLinkDownload();
            }
        },
        getLinkPreview() {
            let loading = this.$loading.show();
            this.$http({
                data: {
                    m: 'MemberSoftFile',
                    fn: 'link-preview-office-by-id',
                    id: this.id
                }
            })
                .then(response => {
                    loading.hide();
                    this.urlPreview = response.data;
                })
                .catch(err => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        },
        getLinkDownload() {
            let loading = this.$loading.show();
            this.$http({
                data: {
                    m: 'MemberSoftFile',
                    fn: 'link-download-office-by-id',
                    id: this.id
                }
            })
                .then(response => {
                    loading.hide();
                    window.open(response.data);
                })
                .catch(err => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        }
    },
    created() {
        console.log(this.urlDownload);
        this.getLinkPreview();
    }
};
</script>

<style>
</style>