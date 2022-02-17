<template>
    <div class="file-detail-wrapper">
        <!--<div class="row">
            <div class="col-sm-12 text-center">
                <b>Thông tin chi tiết</b>
            </div>
        </div>-->
        <div class="row">
            <div class="col-sm-4">
                <label>Tên file</label>
            </div>
            <div class="col-sm-8">
                <div>
                    {{fileSelected.name}}<b-link v-if="currentUser.id == fileSelected.createdBy"
                                                 class="text-danger"
                                                 @click="clickEditName()">
                        &emsp;&emsp;Sửa
                    </b-link>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-4">
                <label>Người tạo</label>
            </div>
            <div class="col-sm-8">
                {{ userName }}
            </div>
        </div>
        <div class="row">
            <div class="col-sm-4">
                <label>Ngày tạo</label>
            </div>
            <div class="col-sm-8">
                {{ fileSelected.createdDate | moment('HH:mm DD/MM/YYYY') }}
            </div>
        </div>
        <div class="row">
            <div class="col-sm-4">
                <label>Loại file</label>
            </div>
            <div class="col-sm-8">.{{ fileSelected.ext }}</div>
        </div>
        <div class="row">
            <div class="col-sm-4">
                <label>Size</label>
            </div>
            <div class="col-sm-8">
                {{ fileSize }}
            </div>
        </div>
        <modal v-if="popupEdit" :title="'Thay đổi tên file'" @close="popupEdit = false">
            <div slot="body">
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Tên file</span>
                            </div>
                            <input ref="editFileName"
                                   :value="fileSelected.name"
                                   type="text"
                                   class="form-control"
                                   placeholder="Nhập tên file" />
                        </div>
                    </div>
                </div>
            </div>
            <div slot="footer" class="row">
                <div class="col-sm-12">
                    <button class="btn btn-primary waves-effect waves-light" @click="editName()">
                        Lưu
                    </button>
                    <button class="btn btn-danger waves-effect waves-light" @click="cancelEdit()">
                        Hủy
                    </button>
                </div>
            </div>
        </modal>
    </div>
</template>
<style>
    .file-detail-wrapper {
        padding: 10px;
        background: #f7f7f7;
        border: solid 1px #f1f1f1;
    }

    .file-name b {
        display: block;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .file-box.selected .corner {
        border-right: 0.6em solid #4caf50;
        border-bottom: 0.6em solid #4caf50;
    }

    .file-box.selected .file {
        border: 1px solid #4caf50;
    }
</style>
<script>
    export default {
        name: 'FileDetail',
        props: {
            fileSelected: {},
            userName: {}
        },
        data() {
            return {
                fileDetail: true,
                fileSize: '',
                popupEdit: false
            };
        },
        created() {
            this.fileSize = (this.fileSelected.size / Math.pow(1024, 2)).toPrecision(2) + ' Mb';
        },
        methods: {
            clickEditName() {
                this.popupEdit = true;
                this.$nextTick(() => this.$refs.editFileName.focus());
            },
            cancelEdit() {
                this.popupEdit = false;
            },
            editName() {
                if (!this.$refs.editFileName.value) {
                    this.$message('Không được để trống tên !', 'error');
                    setTimeout(() => {
                        this.$nextTick(() => this.$refs.editFileName.focus());
                    }, 1500);
                } else {
                    this.updateFileName();
                }
            },
            updateFileName() {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'file',
                        fn: 'update-file-name',
                        id: this.fileSelected.id,
                        name: this.$refs.editFileName.value
                    }
                })
                    .then(response => {
                        loading.hide();
                        if (response.success) {
                            this.$emit('reloadList');
                            this.fileSelected.name = this.$refs.editFileName.value;
                            this.$message('Sửa thành công !');
                            this.popupEdit = false;
                        }
                    })
                    .catch(err => {
                        loading.hide();
                        this.$nextTick(() => this.$refs.editFileName.focus());
                        return this.$message(err.message, 'error');
                    });
            }
        }
    };
</script>
