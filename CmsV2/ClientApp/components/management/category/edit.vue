<template>
    <modalv2 :title="form.id > 0 ? 'Sửa danh mục' : 'Thêm danh mục'" @close="closePopup()">
        <div slot="body">
            <div class="row">
                <div class="col-sm-12">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Tên danh mục</label>
                                <input v-model="form.name"
                                       type="text"
                                       placeholder="Nhập tên"
                                       class="form-control" />
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Code</label>
                                <input v-model="form.code"
                                       type="text"
                                       placeholder="Nhập mã"
                                       class="form-control" />
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label class="kt-checkbox">
                                    <input v-model="form.isSetPriority"
                                           type="checkbox"
                                           ::checked="form.isSetPriority" />Cho sắp xếp thứ tự
                                    <span />
                                </label>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label class="kt-checkbox">
                                    <input v-model="form.isBadge"
                                           type="checkbox"
                                           ::checked="form.isBadge" />Cho chọn nhãn
                                    <span />
                                </label>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label class="kt-checkbox">
                                    <input v-model="form.isHierarchy"
                                           type="checkbox"
                                           ::checked="form.isHierarchy" />Cho phép phân cấp cha con
                                    <span />
                                </label>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Loại</label>
                                <select v-model="form.type" class="form-select">
                                    <option :value="1">
                                        Không rẽ nhánh
                                    </option>
                                    <option :value="2">
                                        Có rẽ nhánh
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div v-if="form.type == 2" class="col-sm-12">
                            <div class="form-group">
                                <label>Đối tượng áp dụng</label>
                                <select v-model="form.objectType" class="form-select">
                                    <option value="">
                                        Chọn đối tượng
                                    </option>
                                    <option v-for="o in appSettings.customFieldObjects"
                                            :key="o.name"
                                            :value="o.name">
                                        {{ o.displayName }}
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
                <button class="btn btn-primary" @click="save()">
                    <span>Lưu lại</span>
                </button>
                <button class="btn btn-danger" @click="closePopup()">
                    <span>Hủy</span>
                </button>
            </div>
        </div>
    </modalv2>
</template>

<script>
export default {
    name: 'SourceEdit',
    props: ['id'],
    data() {
        return {
            form: {
                name: '',
                isSetPriority: false,
                isHierarchy: false,
                isBadge: false,
                objectType: '',
                type: 1,
                id: 0,
                code:''
            }
        };
    },
    computed: {},
    created() {
        if (this.id > 0) this.getDetail();
    },
    methods: {
        save() {
            var me = this.form;
            if (me.name == '') {
                return this.$message('Bạn vui lòng nhập tên danh mục!', 'error');
            }
            this.$http({
                data: {
                    m: 'category',
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
                    m: 'category',
                    fn: 'detail',
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
