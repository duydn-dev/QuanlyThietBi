<template>
    <modal title="Chọn nhân viên" :width="500" @close="closePopup()">
        <div slot="body">
            <div class="row">
                <div class="col-sm-12">
                    <div class="row">
                        <div
                            :class="(isShowBranch && isShowDepartment) ? 'form-group col-12' : 'form-group col-6'"
                            style="margin-bottom: 1rem;"
                        >
                            <input
                                class="form-control"
                                placeholder="Tìm nhân viên"
                                v-model="form.keyWord"
                            />
                        </div>
                        <div class="form-group col-6" v-if="isShowBranch">
                            <!-- <fselect v-model="form.companyBranchId"
                                     placeholder="---Lọc theo chi nhánh---"
                            :options="branchList" />-->

                            <branch-select
                                v-model="form.companyBranchId"
                                placeholder="---Lọc theo chi nhánh---"
                            />
                        </div>
                        <div v-if="isShowDepartment" class="form-group col-6">
                            <fselect
                                v-model="form.departmentId"
                                placeholder="---Lọc theo phòng ban---"
                                :options="departmentList"
                            />
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="kt-checkbox-list">
                            <label v-if="isSelectAll && maxSelected != 1" class="kt-checkbox">
                                <input v-model="selectAll" type="checkbox" ::checked="selectAll" />
                                Tất cả nhân viên
                                <span />
                            </label>
                            <label
                                v-for="u in listUserByShare"
                                :key="'u_' + u.id"
                                class="kt-checkbox"
                            >
                                <!--<input :type="(maxSelected > 1 || maxSelected == 0) ? 'checkbox' : 'radio'" :value="u.id" v-model="selectedUser">-->
                                <input
                                    v-if="returnObject"
                                    v-model="selectedUser"
                                    :type="type"
                                    :value="u"
                                />
                                <input v-else v-model="selectedUser" :type="type" :value="u.id" />
                                {{ u.name }}
                                <span />
                            </label>
                        </div>
                    </div>
                    <div class="pr-4 pl-4">
                        <pager
                            :total="totalUserByShare"
                            :page-index="form.pageIndex"
                            @change="pageChange"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div slot="footer" class="row">
            <div class="col-sm-12">
                <button class="btn btn-primary" secondary @click="save()">
                    <span>Xác nhận</span>
                </button>
                <button class="btn btn-danger" @click="closePopup()">
                    <span>Đóng</span>
                </button>
            </div>
        </div>
    </modal>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'UserSelect',
    props: {
        isSelectAll: {
            type: Boolean,
            default: true
        },
        departmentId: {
            type: Number,
            default: 0
        },
        isShowDepartment: {
            type: Boolean,
            default: true
        },
        maxSelected: {
            type: Number,
            default: 10000
        },
        permissionCode: {
            type: String,
            default: ''
        },
        returnObject: {
            type: Boolean,
            default: true
        },
        isShowBranch: {
            type: Boolean,
            default: false
        },
        typeUser: {
            type: Number,
            default: 0
        },
        ids: {}
    },
    data() {
        return {
            form: {
                departmentId: 0,
                companyBranchId: 0,
                permissionCode: '',
                keyWord: '',
                pageIndex: 1,
                pageSize: 10,
                type: this.typeUser
            },
            type: 'radio',
            selectedUser: [],
            selectAll: false
        };
    },
    watch: {
        'form.departmentId'() {
            this.form.pageIndex = 1;
            this.getListUserByShare(this.form);
            this.selectAll = false;
        },
        'form.companyBranchId'() {
            this.form.pageIndex = 1;
            this.getListUserByShare(this.form);
            this.selectAll = false;
        },
        selectAll() {
            if (this.selectAll) {
                if (this.returnObject) this.selectedUser = _.map(this.listUserByShare);
                else this.selectedUser = _.map(this.listUserByShare, 'id');
            } else {
                this.selectedUser = [];
            }
        },
        'form.keyWord'(val) {
            this.$set(this.form, 'keyWord', val);
            this.getListUserByShare(this.form);
        }
    },
    computed: {
        ...mapGetters(['departmentList', 'listUserByShare', 'totalUserByShare', 'branchList'])
    },
    methods: {
        ...mapActions(['getDepartmentList', 'getListUserByShare']),
        save() {
            if (this.selectedUser.length == 0) {
                return this.$message('Vui lòng lựa chọn nhân viên!', 'error');
            }
            if (this.selectedUser.length > this.maxSelected)
                return this.$message(`Số lượng nhân viên lựa chọn không quá ${this.maxSelected}!`);
            if (this.returnObject) {
                this.$emit('input', this.selectedUser);
                this.$emit('selected', this.selectedUser);
            } else {
                if (this.maxSelected == 1 && this.selectedUser) {
                    let a = [];
                    a.push(this.selectedUser);
                    this.$emit('input', a);
                    this.$emit('selected', a);
                } else {
                    this.$emit('input', this.selectedUser);
                    this.$emit('selected', this.selectedUser);
                }
            }
            this.closePopup();
        },
        closePopup() {
            this.$emit('close');
        },
        pageChange(pageNum) {
            this.$set(this.form, 'pageIndex', pageNum);
            this.getListUserByShare(this.form);
        }
    },
    created() {
        this.form.departmentId = this.departmentId || 0;
        if (this.permissionCode && this.permissionCode != '')
            this.form.permissionCode = this.permissionCode;
        this.getDepartmentList();

        if (this.maxSelected != 1) this.type = 'checkbox';

        this.getListUserByShare(this.form).then(() => {
            if (this.ids) {
                if (this.type == 'radio') this.selectedUser = this.ids[0];
                else this.selectedUser = this.ids;
            }
        });
    }
};
</script>
