<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-6">
                <input class="form-control" type="text" placeholder="Tìm kiếm..." />
            </div>
            <div class="col-6">
                <button class="btn btn-primary" @click="updateGroup(0,'',0,0)"><i class="fa fa-plus"></i> Thêm nhóm quyền</button>
                <button class="btn btn-success" @click="updatePermission(0)"><i class="fa fa-plus"></i> Thêm quyền</button>
            </div>
        </div>
        <div class="row mt-4">
            <template v-for="group in memberPermission">
                <div :key="'g_' + group.id"
                     class="rolePermission permissonGroupLv1" :class="(!group.childGroup || group.childGroup.length == 0) ? 'col-sm-3' : 'col-12'">
                    <h4 class="pt-2 pb-1">
                        {{ group.name }} <i class="fa fa-edit edit-per-group" @click="updateGroup(group.id,group.name, group.parentId, group.priority)"></i>
                    </h4>
                    <div v-if="group.childGroup && group.childGroup.length>0" class="row">
                        <div class="col-sm-2" v-for="group1 in group.childGroup" :key="'g_' + group1.id">
                            <div v-if="group1.permission && group1.permission.length > 0"
                                 class="permissonGroupLv2 mb-3">
                                <h5 class="pt-2 pb-1">
                                    {{ group1.name }}<i class="fa fa-edit edit-per-group" @click="updateGroup(group1.id,group1.name, group1.parentId, group1.priority)"></i>
                                </h5>
                                <div v-if="group1.childGroup && group1.childGroup.length>0">

                                </div>
                                <div>
                                    <ol>
                                        <li v-for="per in group1.permission" :key="per.code">
                                            <p>
                                                {{ per.name }}
                                                <span class="permission-action">
                                                    <i class="fa fa-edit" @click="updatePermission(per.id)"></i>
                                                    <i class="fa fa-trash" @click="removePermission(per.id)"></i>
                                                </span>
                                            </p>
                                            <p style="color:#999">{{ per.code }}</p>
                                        </li>
                                    </ol>
                                </div>
                                <div class="p-2">
                                    <button class="btn btn-default" @click="updatePermission(0)"><i class="fa fa-plus"></i> Thêm quyền</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="group.permission && group.permission.length > 0" class="permisson-border">
                        <ol>
                            <li v-for="per in group.permission" :key="per.code" class="permisson-li">
                                <p>
                                    {{ per.name }}
                                    <span class="permission-action">
                                        <i class="fa fa-edit" @click="updatePermission(per.id)"></i>
                                        <i class="fa fa-trash" @click="removePermission(per.id)"></i>
                                    </span>
                                </p>
                                <p style="color:#999">{{ per.code }}</p>
                            </li>
                        </ol>
                    </div>
                </div>
            </template>
        </div>
        <groupUpdate :id="groupId" :name="groupName" :parentId="groupParentId" :priority="groupPriority" v-if="showUpdateGroup" @closePopup="closePopup" />
        <permissionUpdate :id="permissionId" @closePopup="closePopupUpdatePermission" v-if="showUpdatePermission" />
    </div>
</template>
<style>
    .permissonGroupLv1 h4 {
        background: #eaeaea;
        padding: 8px 10px;
        color:#1f1f1f;
        text-transform:uppercase;
        font-size:15px;
        font-weight:bold;
    }
    .permissonGroupLv2 { border: solid 1px #ddd; }
    .permisson-border {
        border: solid 1px #ddd;
        margin-top: -37px;
        padding-top: 40px;
    }
        .permissonGroupLv2 h5 { background: #f7f7f7; padding: 0 8px;color:#a50707 }
    .rolePermission ol {
        padding-left: 30px;
        list-style: decimal-leading-zero;
    }
    .rolePermission p {
        word-break: break-word;
    }
</style>
<script>
    import groupUpdate from './common-permission-update-group';
    import permissionUpdate from './common-permission-update-permission';

    export default {
        name: 'Permission',
        props: ['memberId', 'roleId'],
        components: { groupUpdate, permissionUpdate },
        data() {
            return {
                memberPermission: [],
                selectAll: false,
                showUpdateGroup: false,
                groupId: 0,
                groupName: '',
                groupParentId: 0,
                groupPriority: 0,
                permissionId: 0,
                showUpdatePermission: false
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
            }
        },
        created() {
            this.getAllPermission();
        },
        methods: {
            getAllPermission() {
                this.$http({
                    data: {
                        m: 'security',
                        fn: 'permission_get_list_all'
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
            updateGroup(id, name, parentId, priority) {
                this.groupId = id;
                this.groupName = name;
                this.groupParentId = parentId;
                this.groupPriority = priority;
                this.showUpdateGroup = true;
            },
            updatePermission(id) {
                this.permissionId = id;
                this.showUpdatePermission = true;
            },
            closePopup() {
                this.showUpdateGroup = false;
                this.getAllPermission();
            },
            closePopupUpdatePermission() {
                this.showUpdatePermission = false;
                this.getAllPermission();
            },
            removePermission(id) {
                console.log(id);
            }
        }
    };
</script>

<style scoped>
    .mu-checkbox { display: table; }
    .rolePermission { margin-bottom: 15px; }
        .rolePermission h3 { margin-bottom: 8px; }
    .edit-per-group { cursor: pointer; float: right; }
    .permission-action { float: right; margin-right: 10px; display: none; }
        .permission-action i { cursor: pointer; }
            .permission-action i:hover { color: red; }
    .permissonGroupLv2 li:hover .permission-action, .permisson-li :hover .permission-action {
        display: block;
    }
</style>
