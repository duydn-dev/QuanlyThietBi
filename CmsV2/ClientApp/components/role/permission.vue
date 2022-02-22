<template>
    <modal id="modal-dashbroad"
           :title="'Phân quyền vai trò: '+form.name"
           :width="1350"
           @close="closePopup()">
        <div slot="body">
            <div class="row">
                <div class="col-sm-12">
                    <div class="form-group mb-1">
                        <label>Danh sách chức năng</label>
                    </div>
                    <label class="kt-checkbox mb-3 text-danger">
                        <input v-model="selectAll" type="checkbox" ::checked="selectAll" />Chọn tất cả
                        <span />
                    </label>
                    <label class="kt-checkbox text-danger ml-5">
                        <input v-model="isUpdateUser"
                               type="checkbox"
                               ::checked="isUpdateUser" />Cập nhật lại quyền người dùng
                        <span />
                    </label>
                </div>
                <template v-for="group in permissionList">
                    <div :class="(!group.childGroup || group.childGroup.length == 0) ? 'col-sm-2' : 'col-12 row'" :key="'g1_' + group.id" v-if="group.childGroup.length > 0 || group.permission.length > 0">
                        <h5 style="background:#e9e7e7; padding:8px 10px; width:100%; color:#000000;text-transform: uppercase; font-weight: bold; font-size: 14px;">
                            {{ group.name }}
                        </h5>
                        <div v-if="group.permission && group.permission.length > 0"
                             :key="'g_' + group.id"
                             class="mb-4" :class="{'col-sm-2': group.childGroup && group.childGroup.length != 0}">
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
                                               :value="per.code" />
                                        {{ per.name }}
                                        <span />
                                    </label>
                                </template>
                            </div>
                        </div>
                        <template v-for="group2 in group.childGroup">
                            <div v-if="group2.permission && group2.permission.length > 0"
                                 :key="'g_' + group2.id"
                                 class="col-sm-2 mb-4">
                                <label class="kt-checkbox">
                                    <input v-model="group2.isSelect"
                                           type="checkbox"
                                           @change="changeGroup2(group2, group2.isSelect)" />
                                    <b style="color:#c40404">{{ group2.name }}</b>
                                    <span />
                                </label>
                                <div class="kt-checkbox-list">
                                    <template v-for="per in group2.permission">
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
                                                   :value="per.code" />
                                            {{ per.name }}
                                            <span />
                                        </label>
                                    </template>
                                </div>
                            </div>
                        </template>
                    </div>
                </template>
            </div>
        </div>
        <div slot="footer">
            <div class="row">
                <div class="col-sm-12">
                    <button class="btn btn-cyan" @click="updatePermission()">
                        <span>Lưu lại</span>
                    </button>
                    <button class="btn btn-danger" @click="closePopup">
                        <span>Đóng</span>
                    </button>
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
    export default {
        name: 'RoleEdit',
        props: ['id', 'name'],
        data() {
            return {
                form: {
                    name: '',
                    code: '',
                    id: 0,
                },
                permissionList: null,
                selectAll: false,
                isUpdateUser: false,
            };
        },
        watch: {
            selectAll(val) {
                for (var group of this.permissionList) {
                    for (var per of group.permission) {
                        per.isSelect = val;
                    }

                    var childGroup = group.childGroup;
                    if (childGroup && childGroup.length > 0) {
                        for (var chil of childGroup) {
                            for (var per2 of chil.permission) {
                                per2.isSelect = val;
                            }
                        }
                    }
                }
            }
        },
        computed: {
        },
        methods: {
            closePopup() {
                this.$emit('closePopup');
            },
            changeGroup2(g, checked) {
                var per = g.permission;
                for (let p of per) {
                    p.isSelect = checked;
                }
            },
            getRolePermission() {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'security',
                        fn: 'rolepermission_get_list_add',
                        roleId: this.id
                    }
                })
                    .then(response => {
                        loading.hide();
                        if (response.success) {
                            this.permissionList = response.data;
                        }
                    })
                    .catch(err => {
                        loading.hide();
                        return this.$message(err.message, 'error');
                    });
            },
            updatePermission() {
                let objPermission = [];
                for (var group of this.permissionList) {
                    for (var per of group.permission) {
                        if (per.isSelect) objPermission.push(per);
                    }
                    var childGroup = group.childGroup;
                    if (childGroup && childGroup.length > 0) {
                        for (var chil of childGroup) {
                            for (var per2 of chil.permission) {
                                if (per2.isSelect) objPermission.push(per2);
                            }
                        }
                    }
                }
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'security',
                        fn: 'role_update_permission',
                        isUpdateUser: this.isUpdateUser,
                        roleId: this.id,
                        rolePermission: JSON.stringify(objPermission)
                    }
                })
                    .then(() => {
                        loading.hide();
                        this.closePopup();
                        this.$message(this.$t('Label.Successful'));
                    })
                    .catch(err => {
                        loading.hide();
                        return this.$message(err.message, 'error');
                    });
            },
        },
        created() {
            this.getRolePermission();
            this.form.name = this.name;
        }
    };
</script>
<style>
    .deadlineClass {
        color: #ff0000;
    }

    #editor .ql-tooltip[data-mode='video'] {
        left: 25% !important;
        top: 35% !important;
    }

        #editor .ql-tooltip[data-mode='video'] input {
            height: 80px !important;
            width: 400px !important;
        }

    #editor {
        height: 600px;
    }

    #news-avatar {
        width: 100px;
        height: 100px;
    }

    #news-wrapper .mu-text-field-label,
    #news-wrapper .common-label {
        font-weight: bold;
        color: #000;
    }

    #related-course ul {
        margin: 10px 0;
    }

    #related-course {
        margin: 20px 0;
    }

        #related-course > button {
            height: 25px !important;
        }

        #related-course li button {
            height: 18px !important;
            width: 20px !important;
            position: absolute;
            top: 8px;
            left: 8px;
        }

            #related-course li button > div {
                padding: 0px !important;
            }

        #related-course li {
            position: relative;
            padding-left: 40px;
            padding: 8px 0 8px 50px;
            background: #f1f1f1;
            margin-bottom: 2px;
        }
</style>
