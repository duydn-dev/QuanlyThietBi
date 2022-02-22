<template>
    <modal :title="`Cập nhật thông tin phiên bản app: ${objError.appName}`"  @close="closePopup()">
        <div slot="body">
            <div class="row">
                <div class="col-lg-12">
                    <div class="form-group">
                        <label>Tên phiên bản</label>
                        <input v-model="objError.name" type="text" class="form-control" />
                    </div>
                    <div class="form-group">
                        <label>Cho hệ điều hành</label>
                        <input v-model="objError.type" type="text" class="form-control" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="form-group">
                        <label>Yêu cầu Update</label>
                        <select type="text" v-model="objError.requireUpdate" class="form-control">
                            <option value="1">Yêu cầu bắt buộc</option>
                            <option value="2">Không yêu cầu bắt buộc</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div slot="footer" class="row">
            <div class="col-sm-12">
                <button class="btn btn-primary" secondary @click="save()">
                    <span>Lưu lại</span>
                </button>
                <button class="btn btn-danger" @click="closePopup()">
                    <span>Hủy</span>
                </button>
            </div>
        </div>
    </modal>
</template>

<script>
export default {
    name: 'error-report-edit',
    props: ['id'],
    data() {
        return {
            objError: {
                id: 0,
                type: '',
                requireUpdate: 2,
                name: '',
            },
        };
    },
    computed: {},
    created() {
        this.getDetail();
    },
    methods: {
        save() {
            this.$http({
                data: {
                    m: 'VersionApp',
                    fn: 'update',
                    ...this.objError,
                },
            })
                .then((res) => {
                    if (res.success) {
                        this.$message('Cập nhật thành công');
                        this.closePopup();
                    }
                })
                .catch((err) => {
                    return this.$message(err.message, 'error');
                });
        },
        getDetail() {
            if (this.id > 0) {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'VersionApp',
                        fn: 'detail',
                        id: this.id,
                    },
                })
                    .then((response) => {
                        loading.hide();
                        if (response.success) {
                            this.objError = Object.assign(this.objError, response.data);
                            this.isLoader = true;
                        }
                    })
                    .catch((err) => {
                        loading.hide();
                        return this.$message(err.message, 'error');
                    });
            }
        },
        closePopup() {
            this.$emit('closePopup');
        },
        linkPage() {
            window.open(`${this.objError.url}`, '_blank');
        },
    },
};
</script>
