<template>
    <modal title="Chọn nhân viên" :width="600" @close="closePopup()">
        <div slot="body">
            <div class="row">
                <div class="col-sm-12">
                    <div class="row">
                        <div :class="(isShowBranch && isShowDepartment) ? 'form-group col-12' : 'form-group col-6'"
                             style="margin-bottom: 1rem;">
                            <input class="form-control"
                                   placeholder="Tìm nhân viên"
                                   v-model="form.keyWord" />
                        </div>
                        <div class="form-group col-6" v-if="isShowBranch">
                            <branch-select v-model="form.companyBranchId"
                                           placeholder="---Lọc theo chi nhánh---" />
                        </div>
                        <div v-if="isShowDepartment" class="form-group col-6">
                            <fselect v-model="form.departmentId"
                                     placeholder="---Lọc theo phòng ban---"
                                     :options="departmentList" />
                        </div>
                        <div class="form-group col-6" v-if="listMember.length>0">
                            <label v-if="isSelectAll && maxSelected != 1" class="kt-checkbox">
                                <input v-model="modeSuggest" type="checkbox" />
                                Gợi ý
                                <span />
                            </label>
                        </div>

                    </div>
                    <div class="form-group" :key="modeSuggest">
                        <div class="kt-checkbox-list">
                            <label v-if="isSelectAll && maxSelected != 1" class="kt-checkbox" v-show="listUser.length>0">
                                <input v-model="selectAll" type="checkbox" ::checked="selectAll" />
                                Tất cả nhân viên
                                <span />
                            </label>
                            <label v-for="u in listUser"
                                   :key="'u_' + u.id"
                                   class="kt-checkbox">
                                <!--<input :type="(maxSelected > 1 || maxSelected == 0) ? 'checkbox' : 'radio'" :value="u.id" v-model="selectedUser">-->
                                <input v-if="returnObject"
                                       v-model="selectedUser"
                                       :type="type"
                                       :value="u" />
                                <input v-else v-model="selectedUser" :type="type" :value="u.id" />
                                {{ u.name }}
                                <span />
                            </label>
                        </div>
                    </div>
                    <div class="pr-4 pl-4">
                        <pager :total="total"
                               :page-index="form.pageIndex"
                               @change="pageChange" />
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
            ids: {},
            listMember: {
                type: Array
            }
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
                    type: this.typeUser,
                    listMemberids:'[]'
                },
                type: 'radio',
                selectedUser: [],
                selectAll: false,
                modeSuggest: this.listMember.length > 0 ? true : false,
                listUserSuggestIds: [],
                listUser: [],
                total: 0,
            };
        },
        watch: {
            'form.departmentId'() {
                this.form.pageIndex = 1;
                this.listUser(this.form);
                this.selectAll = false;
            },
            'form.companyBranchId'() {
                this.form.pageIndex = 1;
                this.listUser(this.form);
                this.selectAll = false;
            },
            selectAll() {
                if (this.selectAll) {
                    if (this.returnObject) this.selectedUser = _.map(this.listUser);
                    else this.selectedUser = _.map(this.listUser, 'id');
                } else {
                    this.selectedUser = [];
                }
            },
            'form.keyWord'(val) {
                this.$set(this.form, 'keyWord', val);
                this.getListUser();
            },
            'modeSuggest'(val) {
                if (!val) {
                    this.form.listMemberids = '[]';
                    this.getListUser();
                }
            }
        },
        computed: {
            ...mapGetters(['departmentList', 'branchList']),
            listUserByMode() {
                let temp = [];
                if (this.modeSuggest) {
                    temp = _.filter(this.listUser, o => {
                        return this.listUserSuggestIds.includes(o.id)
                    });
                }
                else {
                    temp = this.listUser;
                }
                return temp;
            }
        },
        methods: {
            ...mapActions(['getDepartmentList']),
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
                this.getListUser();
            },
            getListUser() {
                this.$http({
                    data: {
                        m: 'user',
                        fn: 'get-list-for-select',
                        ...this.form
                    }
                })
                    .then(response => {
                        this.listUser = response.data;
                        this.total = response.totalRow;
                        if (this.type == 'radio') this.selectedUser = this.ids[0];
                        else this.selectedUser = this.ids;
                    })
                    .catch(err => {
                        return this.$message(err.message, 'error');
                    });
            }
        },
        created() {
            this.form.listMemberids = _.map(this.listMember, 'id');
            this.form.departmentId = this.departmentId || 0;
            if (this.permissionCode && this.permissionCode != '')
                this.form.permissionCode = this.permissionCode;
            this.getDepartmentList();

            if (this.maxSelected != 1) this.type = 'checkbox';
            this.getListUser();
        }
    };
</script>
