<template>
    <modal
        :title="form.id > 0 ? 'Sửa cộng tác viên' : 'Thêm mới cộng tác viên'"
        @close="closePopup()"
    >
        <div slot="body">
            <div class="row">
                <div class="col-sm-12">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Họ tên</label>
                                <input
                                    v-model="form.fullName"
                                    type="text"
                                    placeholder="Nhập tên"
                                    class="form-control"
                                />
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Số điện thoại</label>
                                <input
                                    v-model="form.phone"
                                    type="text"
                                    placeholder="Nhập số điện thoại"
                                    class="form-control"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div slot="footer" class="row">
            <div class="col-sm-12">
                <button class="btn btn-cyan" secondary @click="save()">
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
    name: 'CollaborateEdit',
    props: ['id','userOwnedId'],
    data() {
        return {
            form: {
                fullName: '',
                phone: null,
                userOwnedId: 0
            }
        };
    },
    computed: {},
    created() {
        if (this.id > 0) this.getDetail();
        this.form.userOwnedId = this.userOwnedId;
    },
    methods: {
        save() {
            var me = this.form;
            if (me.fullName == '') {
                return this.$message('Bạn vui lòng nhập họ tên!', 'error');
            }
            this.$http({
                data: {
                    m: 'collaborator',
                    fn: 'save',
                    ...this.form
                }
            })
                .then(res => {
                    if (res.success) {
                        this.$message('Lưu thành công!');
                        this.closePopup();
                    }
                })
                .catch(err => {
                    return this.$message(err.message, 'error');
                });
        },
        getDetail() {
            let loading = this.$loading.show();
            this.$http({
                data: {
                    m: 'collaborator',
                    fn: 'get-by-id',
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
        closePopup() {
            this.$emit('closePopup');
        }
    }
};
</script>
