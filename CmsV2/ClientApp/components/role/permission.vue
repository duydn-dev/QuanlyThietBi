<template>
    <modalv2 id="modal-edit-class" :title="`Phân quyền vai trò`" @close="close" :width="1000">
        <div slot="body">
            <div class="col-lg-12">
                <div class="row">
                    <div :class="`${item.roles && item.roles.length > 0 ? 'col-lg-4': ''}`" v-for="item in listPermission" :key="item.groupRoleId">
                        <span class="d-flex align-items-center" v-if="item.roles && item.roles.length > 0">
                            <input type="checkbox" :checked="item.isChecked" :id="item.groupRoleId" @change="checkAllChild($event, item.groupRoleId)">&ensp;<label :for="item.groupRoleId" class="cursor-pointer"><b>{{item.groupRoleName}}</b></label>
                        </span>
                        <div class="ml-2" v-if="item.roles && item.roles.length > 0">
                            <span class="d-flex align-items-center" v-for="child in item.roles" :key="child.roleId">
                                <input type="checkbox" :checked="child.isChecked" :id="child.roleId" @change="checkPermission($event, child.roleId, item.groupRoleId)">&ensp;<label class="cursor-pointer" :for="child.roleId">{{child.roleName}}</label>
                                <br>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div slot="footer">
            <button class="btn btn-primary" @click="save">
                <span>Lưu</span>
            </button>
            <button class="btn btn-secondary" @click="close">Đóng</button>
        </div>
    </modalv2>
</template>

<script>
import axiosService from '../../core/utils/axiosService';
export default {
    props: {
        userPositionId: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            listPermission: [],
            selectedPermission: [],
        };
    },
    methods: {
        async getListPermission() {
            const { data } = await axiosService.get('api/Role');
            this.listPermission = data.responseData.map(n => ({
                groupRoleCode: n.groupRoleCode,
                groupRoleId: n.groupRoleId,
                groupRoleName: n.groupRoleName,
                isChecked: false,
                roles: n.roles ? n.roles.map(g => ({
                    roleCode: g.roleCode,
                    roleId: g.roleId,
                    roleName: g.roleName,
                    groupRoleId: g.groupRoleId,
                    isChecked: false
                })) : []
            }));
        },
        async getUserPermisson(){
            const {data} = await axiosService.get(`api/Role/get-user-role/${this.userId}`);
            this.selectedPermission = data.responseData.roles;
            if(this.selectedPermission.length > 0){
                this.setCheckedPermissions();
            }
        },
        setCheckedPermissions(){
            // disctinct group id
            const groupIds = [...new Set(this.selectedPermission.map(n => n.groupRoleId))];

            // lấy ra thằng group id đã được phân quyền trc đó
            const groups = this.listPermission.filter(n => groupIds.includes(n.groupRoleId)).map(n => n.groupRoleId);
            const roleIds = this.selectedPermission.map(n => n.roleId);

            // lặp thằng cha cho checked
            this.listPermission.filter(n => groups.includes(n.groupRoleId)).forEach(e => {
                e.isChecked = true;

                // nếu thằng con có trong list đã check thì cho checked = true
                if(e.roles && e.roles.length > 0){
                    e.roles.filter(n => roleIds.includes(n.roleId)).forEach(c => {
                        c.isChecked = true;
                    })
                }
            });
        },
        checkPermission(event, roleId, groupId){
            const group = this.listPermission.find(n => n.groupRoleId == groupId);
            const role = group.roles.find(n => n.roleId == roleId);
            role.isChecked = event.target.checked;
            const rolesChecked = group.roles.filter(n => n.isChecked);
            if(event.target.checked && rolesChecked.length == 1){
                group.isChecked = true;
            }
            else if(!event.target.checked && rolesChecked.length == 0){
                group.isChecked = false;
            }

            if(event.target.checked){
                this.selectedPermission.push(role);
            }
            else{
                const index = this.selectedPermission.findIndex(n => n.roleId == roleId);
                this.selectedPermission = this.selectedPermission.filter((n, i) => i !== index);
            }
        },
        checkAllChild(event, groupId){
            // check thằng cha thì tích tất thằng con
            const group = this.listPermission.find(n => n.groupRoleId == groupId);
            group.isChecked = event.target.checked;
            if(group.roles && group.roles.length > 0){
                group.roles.forEach(e => {
                    e.isChecked = event.target.checked;
                    if(event.target.checked){
                        this.selectedPermission.push(e);
                    }
                    else{
                        const index = this.selectedPermission.findIndex(n => n.roleId == e.roleId);
                        this.selectedPermission = this.selectedPermission.filter((n, i) => i !== index);
                    }
                });
            }
        },
        async save() {
            const request = {
                userId: this.userId,
                roleIds: this.selectedPermission.map(n => n.roleId)
            }
            const {data} = await axiosService.post('api/Role/update-user-role', request);
            if(data.success){
                this.$message('Cập nhật quyền cho người dùng thành công !');
                this.close();
            }
            else{
                this.$message('Cập nhật quyền cho người dùng thất bại !', 'error');
            }
        },
        close() {
            this.$emit('close', false);
        },
    },
    async created() {
        // await this.getListPermission();
        // await this.getUserPermisson();
    },
};
</script>

<style scoped>
</style>