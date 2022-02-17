<template>
    <modal
        :title="form.id > 0 ? 'Sửa phòng ban' : 'Thêm phòng ban'"
        :width="800"
        @close="closePopup()"
    >
        <div slot="body">
            <div class="row">
                <div class="col-sm-12">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Tên loại hệ thống</label>
                                <input
                                    v-model="form.name"
                                    type="text"
                                    placeholder="Nhập tên"
                                    class="form-control"
                                />
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Mô tả</label>
                                <textarea
                                    v-model="form.description"
                                    placeholder="Mô tả"
                                    class="form-control"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group mb-1">
                                <label>Danh sách chức năng</label>
                            </div>
                            <label class="kt-checkbox mb-3 text-danger">
                                <input
                                    v-model="selectAll"
                                    type="checkbox"
                                    ::checked="selectAll"
                                />Chọn tất cả
                                <span />
                            </label>
                        </div>
                        <template v-if="group.permission && group.permission.length > 0">
                            <div
                                v-for="group in permissionList"
                                :key="'g_' + group.id"
                                class="col-sm-4"
                            >
                                <label class="kt-checkbox">
                                    <input
                                        v-model="group.isChecked"
                                        type="checkbox"
                                        @change="changeGroup(group.id, group.isChecked)"
                                    />
                                    <h5>{{ group.name }}</h5>
                                    <span />
                                </label>
                                <div class="kt-checkbox-list">
                                    <label
                                        v-for="per in group.permission"
                                        :key="'p_' + per.code"
                                        class="kt-checkbox"
                                    >
                                        <input
                                            v-model="permissionSelected"
                                            type="checkbox"
                                            :value="per.code"
                                        />
                                        {{ per.name }}
                                        <span />
                                    </label>
                                </div>
                            </div>
                        </template>
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
import { mapActions } from 'vuex';
export default {
    name: 'SystemtypeEdit',
    props: ['id'],
    data() {
        return {
            form: {
                name: '',
                description: '',
                id: 0,
                permissions: ''
            },
            permissionList: null,
            isLoader: false,
            selectAll: false,
            permissionSelected: []
        };
    },
    watch: {
        selectAll(val) {
            this.permissionSelected = [];
            if (val) {
                for (var group of this.permissionList) {
                    for (var per of group.permission) {
                        this.permissionSelected.push(per.code);
                    }
                }
            }
        }
    },
    methods: {
        ...mapActions(['getListUsers']),
        changeGroup(id, checked) {
            var per = _.find(this.permissionList, ['id', id]).permission;
            if (checked) {
                for (let p of per) {
                    if (this.permissionSelected.indexOf(p.code) == -1)
                        this.permissionSelected.push(p.code);
                }
            } else {
                for (let p of per) {
                    if (this.permissionSelected.indexOf(p.code) !== -1)
                        this.permissionSelected.splice(this.permissionSelected.indexOf(p.code), 1);
                }
            }
        },
        save() {
            if (this.form.name == '') {
                return this.$message('Bạn vui lòng nhập tên loại!', 'error');
            }
            this.form.permissions = JSON.stringify(this.permissionSelected);
            this.$http({
                data: {
                    m: 'system',
                    fn: 'system-type-save',
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
                    m: 'system',
                    fn: 'system-type-by-id',
                    id: this.id
                }
            })
                .then(response => {
                    loading.hide();
                    if (response.success) {
                        this.form = Object.assign(this.form, response.data);
                        if (!this.form.permissions) this.permissionSelected = [];
                        else this.permissionSelected = JSON.parse(this.form.permissions);
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
        },
        getPermission() {
            this.$http({
                data: {
                    m: 'security',
                    fn: 'permission-list'
                }
            })
                .then(response => {
                    this.permissionList = response.data;
                    this.permissionList = _.map(this.permissionList, o => {
                        o.isChecked = false;
                        return o;
                    });
                })
                .catch(err => {
                    return this.$message(err.message, 'error');
                });
        }
    },
    created() {
        this.getPermission();
        if (this.id > 0) this.getDetail();
    }
};
</script>
