<template>
    <modalv2 id="modal-dashbroad"
           :title="'Phân quyền người dùng: ' + form.name"
           :width="1350"
           :modalClass="popup-xxl"
           @close="closePopup()">
        <div slot="body">
            <div class="sel-top d-flex align-items-center row">
                <div class="col-md-3 col-lg-2">
                    <label class="txt-tit">Danh sách chức năng</label>
                    <div class="form-check check-all-wrap">
                        <input class="form-check-input" v-model="selectAll" type="checkbox" ::checked="selectAll" id="getAllChecked">
                        <label class="form-check-label" for="getAllChecked">Chọn tất cả</label>
                    </div>
                </div>
                <div class="col-md-5 col-lg-4">
                    <label class="txt-tit">Phân theo nhóm quyền</label>
                    <!-- [D] Thêm class "open" vào class "selbox" để mở selecbox -->
                    <select v-if="listRole && listRole.length > 0"
                            v-model="currentRoleId"
                            class="form-select"
                            @change="getRolePermission(currentRoleId)">
                        <option v-for="role in listRole" :key="'role_' + role.id" :value="role.id">
                            {{ role.roleName }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="sel-lst-wrap row">
                <template v-for="group in memberPermission">
                <div class="col-3" 
                :key="'g1_' + group.id" 
                v-if="group.childGroup.length > 0 || group.permission.length > 0">
                    <div class="sel-lst-box">
                        <label class="tit-box">{{ group.name }}</label>
                        <ul class="lst-check scroll" v-if="group.permission && group.permission.length > 0" :key="'g_' + group.id">
                            
                            <template v-for="per in group.permission">
                                <li class="form-check" :key="'p_' + per.code">
                                    <input class="form-check-input box-ipt" v-model="per.isSelect"
                                            type="checkbox"
                                            ::checked="per.isSelect">
                                    <label class="form-check-label txt-lbl">{{ per.name }}</label>
                                    <div class="kt-radio-list"
                                            style="margin-left: 30px"
                                            v-if="per.isLevel > 0 && per.isSelect">
                                        <label class="kt-radio" v-if="per.isLevel == 2">
                                            <input v-model="per.level"
                                                    :name="per.code"
                                                    type="radio"
                                                    :value="0" />
                                            Quản lý của tôi
                                            <span />
                                        </label>
                                        <label class="kt-radio" v-if="per.isLevel > 0">
                                            <input v-model="per.level"
                                                    :name="per.code"
                                                    type="radio"
                                                    :value="1" />
                                            Quản lý chi nhánh
                                            <span />
                                        </label>
                                        <label class="kt-radio">
                                            <input v-model="per.level"
                                                    :name="per.code"
                                                    type="radio"
                                                    :value="2" />
                                            Quản lý tất cả
                                            <span />
                                        </label>
                                    </div>
                                
                                <div :key="'pz_' + per.code" v-if="per.isSelect && per.isBaseZone && per.code == 'Document'">
                                    <div v-for="zone in zoneWiki" :key="zone.id">
                                        <label :key="'p_' + per.code"
                                                class="kt-checkbox ml-4">
                                            <input type="checkbox"
                                                    :value="zone.id"
                                                    :checked="(permissionZones.find(n => n.zoneId === zone.id && n.permissionCode === per.code))"
                                                    @change="changeParent(zone,per)" />
                                            {{ zone.label }}
                                            <span />
                                        </label>
                                        <template v-if="zone.children">
                                            <div v-for="z in zone.children" :key="z.id" class="ml-4">
                                                <label :key="'p_' + per.code"
                                                        class="kt-checkbox ml-4">
                                                    <input type="checkbox"
                                                            :value="z.id"
                                                            :checked="(permissionZones.find(n => n.zoneId === z.id && n.permissionCode === per.code))"
                                                            @change="changeParent(z,per)" />
                                                    {{ z.label }}
                                                    <span />
                                                </label>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                                <div :key="'pz_' + per.code" v-else-if="per.isSelect && per.isBaseZone && per.code != 'EditorialOfficeSecretary'">
                                    <div v-for="zone in zones" :key="zone.id">
                                        <label :key="'p_' + per.code"
                                                class="kt-checkbox ml-4">
                                            <input type="checkbox"
                                                    :value="zone.id"
                                                    :checked="(permissionZones.find(n => n.zoneId === zone.id && n.permissionCode === per.code))"
                                                    @change="setPermissionZone(zone,per)" />
                                            {{ zone.name }}
                                            <span />
                                        </label>
                                    </div>
                                </div>
                                </li>
                            </template>




                        </ul>
                    </div>
                </div>
                </template>
            </div>


           
        </div>
        <div slot="footer">
            <button class="btn btn-primary" @click="updatePermission()">
                <span>Lưu lại</span>
            </button>
            <button class="btn btn-secondary" @click="closePopup">
                <span>Đóng</span>
            </button>
        </div>
    </modalv2>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        name: 'UserEdit',
        props: ['memberId', 'name', 'roleId'],
        data() {
            return {
                form: {
                    name: '',
                    code: '',
                    id: 0,
                },
                currentRoleId: 0,
                memberPermission: null,
                selectAll: false,
                listRole: [],
                zones: [],
                zoneWiki: [],
                permissionZones: []
            };
        },
        watch: {
            selectAll(val) {
                for (var group of this.memberPermission) {
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
            },
            currentRoleId(val) {
                if (val > 0) {
                    this.selectAll = false;
                }
            },
        },
        methods: {
            ...mapActions(['getZoneDropdown', 'getZoneTree']),
            closePopup() {
                this.$emit('closePopup');
            },
            changeGroup2(g, checked) {
                var per = g.permission;
                for (let p of per) {
                    p.isSelect = checked;
                }
            },
            changeAll(g, checked) {
                if (checked)
                    g.zoneIds = _.map(this.appSettings.zones, 'id');
                else
                    g.zoneIds = [];
            },
            changeParent(o, p) {
                this.setPermissionZone(o, p);
                if (!o.children && o.children.length != 0) {
                    for (let z of o.children) {
                        this.setPermissionZone(z, p);
                    }
                }
            },
            getUserPermission() {
                this.$http({
                    data: {
                        m: 'security',
                        fn: 'userpermission_get_list_add',
                        UserId: this.memberId,
                    },
                })
                    .then((response) => {
                        if (response.success) {
                            this.memberPermission = response.data;
                        }
                    })
                    .catch((err) => {
                        return this.$message(err.message, 'error');
                    });
            },
            getRolePermission(id) {
                this.currentRoleId = id;
                this.$http({
                    data: {
                        m: 'security',
                        fn: 'rolepermission_get_list_add',
                        roleId: id,
                    },
                })
                    .then((response) => {
                        if (response.success) {
                            this.memberPermission = response.data;
                        }
                    })
                    .catch((err) => {
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
                        fn: 'user_permission_update',
                        UserId: this.memberId,
                        roleId: this.currentRoleId,
                        UserPermission: JSON.stringify(objPermission),
                        permissonZone: this.permissionZones
                    },
                })
                    .then(() => {
                        loading.hide();
                        this.$emit('closePopup');
                        this.$message(this.$t('Label.Successful'));
                    })
                    .catch((err) => {
                        loading.hide();
                        return this.$message(err.message, 'error');
                    });
            },
            getListRole() {
                this.$http({
                    data: {
                        m: 'security',
                        fn: 'role_get_list',
                    },
                })
                    .then((response) => {
                        if (response.success) {
                            this.listRole = response.data;
                        }
                    })
                    .catch((err) => {
                        return this.$message(err.message, 'error');
                    });
            },
            setPermissionZone(zone, per) {
                const i = _.findIndex(this.permissionZones, item => item.zoneId === zone.id && item.permissionCode === per.code);
                if (i === -1) {
                    this.permissionZones.push({
                        userId: this.memberId,
                        zoneId: zone.id,
                        permissionCode: per.code
                    })
                }
                else {
                    this.permissionZones.splice(i, 1);
                }
                
            },
            getPerZoneById() {
                this.$http({
                    data: {
                        m: 'security',
                        fn: 'zone_permission_get_by_user',
                        userId: this.memberId
                    }
                }).then(response => {
                    this.permissionZones = response.data;
                })

            }
        },
        created() {
            this.form.name = this.name;
            this.currentRoleId = this.roleId;
            this.getListRole();
            this.getUserPermission();
            this.getZoneDropdown({ type: 'NEWS' }).then((response) => {
                this.zones = response.data;
            });
            this.getZoneTree({type: 'WIKI'}).then((response) => {
                this.zoneWiki = response;
            });
            this.getPerZoneById();
        },
    };
</script>
<style>
    .group-permission{max-height:400px; overflow:auto;}
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
