<template>
    <modal :title="form.id > 0 ? 'Sửa dịch vụ' : 'Thêm dịch vụ'" @close="closePopup()">
        <div slot="body">
            <div class="row">
                <div class="col-sm-12">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Tên dịch vụ</label>
                                <input
                                    v-model="form.name"
                                    type="text"
                                    placeholder="Nhập tên dịch vụ"
                                    class="form-control"
                                />
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Trạng thái</label>
                                <select v-model="form.status" class="form-control">
                                    <option :value="1">
                                        Đang sử dụng
                                    </option>
                                    <option :value="2">
                                        Ngừng sử dụng
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div slot="footer" class="row">
            <div class="col-sm-12">
                <button class="btn btn-cyan" @click="save()">
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
    name: 'CompanyEdit',
    props: ['id'],
    data() {
        return {
            form: {
                name: '',
                companyId: 1,
                detail: '',
                id: 0,
                status: 1
            },
            isLoader: false
        };
    },
    created() {
        this.form.id = this.id;
        if (this.form.id > 0) this.getDetail();
        else this.isLoader = true;
    },
    methods: {
        getDetail() {
            let loading = this.$loading.show();
            this.$http({
                data: {
                    m: 'company',
                    fn: 'service-by-id',
                    id: this.id
                }
            })
                .then(response => {
                    loading.hide();
                    if (response.success) {
                        this.form = Object.assign(this.form, response.data);
                        this.isLoader = true;
                    }
                })
                .catch(err => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        },
        save() {
            var me = this.form;
            if (me.name == '') {
                return this.$message('Bạn vui lòng nhập tên dịch vụ!', 'error');
            }
            this.$http({
                data: {
                    m: 'company',
                    fn: 'save-company-service',
                    ...this.form
                }
            })
                .then(res => {
                    if (res.success) {
                        this.$message('Lưu thành công!');
                        this.$emit('closePopup');
                    }
                })
                .catch(err => {
                    return this.$message(err.message, 'error');
                });
        },
        closePopup() {
            this.$emit('closePopup');
        },
        changePhoto(field) {
            this.photoField = field;
            this.showFileManager = true;
        }
    }
};
</script>
