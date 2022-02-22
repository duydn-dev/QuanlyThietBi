<template>
    <div>
        <div class="form-group">
            <select v-if="listRole && listRole.length > 0"
                    v-model="currentRoleId"
                    class="form-control"
                    @change="getRolePermission(currentRoleId)">
                <option v-for="role in listRole" :key="'role_' + role.id" :value="role.id">
                    {{ role.roleName }}
                </option>
            </select>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <label class="kt-checkbox">
                    <input v-model="selectAll" type="checkbox" ::checked="selectAll" />Chọn tất cả
                    <span />
                </label>
            </div>
            <template v-for="group in memberPermission">
                <div v-if="group.permission && group.permission.length > 0"
                     :key="'g_' + group.id"
                     class="col-sm-6 rolePermission">
                    <h4 class="pt-2 pb-1">
                        {{ group.name }}
                    </h4>
                    <div class="kt-checkbox-list">
                        <template v-for="per in group.permission">
                            <div v-if="per.isLevel > 0" :key="'p_' + per.code">
                                <label class="kt-checkbox">
                                    <input v-model="per.isSelect"
                                           type="checkbox"
                                           ::checked="per.isSelect" />
                                    {{ per.name }}
                                    <span />
                                </label>
                                <div class="kt-radio-list" style="margin-left:30px" v-if="per.isSelect">
                                    <label class="kt-radio" v-if="per.isLevel == 2">
                                        <input v-model="per.level" :name="per.code"
                                               type="radio"
                                               :value="0" />
                                        Quản lý của tôi
                                        <span />
                                    </label>
                                    <label class="kt-radio" v-if="per.isLevel > 0">
                                        <input v-model="per.level" :name="per.code"
                                               type="radio"
                                               :value="1" />
                                        Quản lý chi nhánh
                                        <span />
                                    </label>
                                    <label class="kt-radio">
                                        <input v-model="per.level" :name="per.code"
                                               type="radio"
                                               :value="2" />
                                        Quản lý tất cả
                                        <span />
                                    </label>
                                </div>
                            </div>
                            <label v-else :key="'p_' + per.code"
                                   class="kt-checkbox">
                                <input v-model="per.isSelect"
                                       type="checkbox"
                                       ::checked="per.isSelect" />
                                {{ per.name }}
                                <span />
                            </label>
                        </template>

                    </div>
                </div>
            </template>
        </div>
        <div class="form-group">
            <button class="btn btn-success" @click="updatePermission()">
                <span>{{ $t('Label.Save') }}</span>
            </button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Permission',
        props: ['memberId', 'roleId'],
        data() {
            return {
                memberPermission: [],
                listRole: [],
                selectAll: false,
                currentRoleId: 0
            };
        },
        watch: {
            selectAll(val) {
                if (val) {
                    for (var group of this.memberPermission) {
                        for (var per of group.permission) {
                            per.isSelect = true;
                        }
                    }
                } else {
                    for (var group1 of this.memberPermission) {
                        for (var per1 of group1.permission) {
                            per1.isSelect = false;
                        }
                    }
                }
            },
            currentRoleId(val) {
                if (val > 0) {
                    this.selectAll = false;
                }
            }
        },
        created() {
            this.currentRoleId = this.roleId;
            this.getListRole();
            this.getUserPermission();
        },
        methods: {
            getUserPermission() {
                this.$http({
                    data: {
                        m: 'security',
                        fn: 'userpermission_get_list_add',
                        UserId: this.memberId
                    }
                })
                    .then(response => {
                        if (response.success) {
                            this.memberPermission = response.data;
                        }
                    })
                    .catch(err => {
                        return this.$message(err.message, 'error');
                    });
            },
            getRolePermission(id) {
                this.currentRoleId = id;
                this.$http({
                    data: {
                        m: 'security',
                        fn: 'rolepermission_get_list_add',
                        roleId: id
                    }
                })
                    .then(response => {
                        if (response.success) {
                            this.memberPermission = response.data;
                        }
                    })
                    .catch(err => {
                        return this.$message(err.message, 'error');
                    });
            },
            updatePermission() {
                if (this.currentRoleId <= 0) {
                    return this.$message(this.$t('Label.RequiredRole'), 'error');
                }
                let objPermission = [];
                for (var group of this.memberPermission) {
                    for (var per of group.permission) {
                        if (per.isSelect) objPermission.push(per);
                    }
                }
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'security',
                        fn: 'user_permission_update',
                        UserId: this.memberId,
                        roleId: this.currentRoleId,
                        UserPermission: JSON.stringify(objPermission)
                    }
                })
                    .then(() => {
                        loading.hide();
                        this.$emit('closePopup');
                        this.$message(this.$t('Label.Successful'));
                    })
                    .catch(err => {
                        loading.hide();
                        return this.$message(err.message, 'error');
                    });
            },
            getListRole() {
                this.$http({
                    data: {
                        m: 'security',
                        fn: 'role_get_list'
                    }
                })
                    .then(response => {
                        if (response.success) {
                            this.listRole = response.data;
                        }
                    })
                    .catch(err => {
                        return this.$message(err.message, 'error');
                    });
            }
        }
    };
</script>

<style scoped>
    .mu-checkbox {
        display: table;
    }

    .rolePermission {
        margin-bottom: 15px;
    }

        .rolePermission h3 {
            margin-bottom: 8px;
        }
</style>
