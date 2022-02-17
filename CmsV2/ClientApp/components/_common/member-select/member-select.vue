<template>
    <modal title="Chọn học viên" :width="500" @close="closePopup()">
        <div slot="body">
            <div class="row">
                <div class="col-sm-12">
                    <!--<div class="form-group" v-if="isShowDepartment">
                        <select class="form-control" v-model="form.departmentId">
                            <option :value="0">Lọc theo phòng ban</option>
                            <option :value="item.id" v-for="item in departmentList">{{item.name}}</option>
                        </select>
                    </div>-->
                    <div class="form-group">
                        <div class="kt-checkbox-list">
                            <label
                                v-for="u in listUserByShare"
                                :key="'u_' + u.id"
                                class="kt-checkbox"
                            >
                                <!--<input :type="(maxSelected > 1 || maxSelected == 0) ? 'checkbox' : 'radio'" :value="u.id" v-model="selectedUser">-->
                                <input
                                    v-model="selectedUser"
                                    :type="
                                        maxSelected > 1 || maxSelected == 0 ? 'checkbox' : 'radio'
                                    "
                                    :value="u"
                                />
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
            default: 1
        },
        permissionCode: {
            type: String,
            default: ''
        },
        returnObject: {
            type: Boolean,
            default: true
        },
        id: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            form: {
                departmentId: 0,
                permissionCode: '',
                keyWord: '',
                pageIndex: 1,
                pageSize: 10
            },
            selectedUser: [],
            selectAll: false,
            listMemberByOrder: null
        };
    },
    watch: {
        'form.departmentId'() {
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
        }
    },
    created() {
        this.getListMemberByOrder();
    },
    methods: {
        save() {
            if (this.selectedUser.length == 0) {
                return this.$message('Vui lòng lựa chọn nhân viên!', 'error');
            }
            if (this.selectedUser.length > this.maxSelected)
                return this.$message(`Số lượng nhân viên lựa chọn không quá ${this.maxSelected}!`);
            if (this.returnObject) this.$emit('selected', this.selectedUser);
            else {
                if (this.maxSelected == 1 && this.selectedUser) {
                    let a = [];
                    a.push(this.selectedUser.id);
                    this.$emit('selected', a);
                } else this.$emit('selected', _.map(this.selectedUser, 'id'));
            }
        },
        getListMemberByOrder() {
            let loading = this.$loading.show();
            this.$http({
                data: {
                    m: 'laborincident',
                    fn: 'list-member-by-order',
                    id: this.form.laborOrderId
                }
            })
                .then(res => {
                    loading.hide();

                    this.listMemberByOrder = res.data;
                })
                .catch(err => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        },

        closePopup() {
            this.$emit('close');
        },
        pageChange(pageNum) {
            this.$set(this.form, 'pageIndex', pageNum);
            this.getListMemberByOrder();
        }
    }
};
</script>
