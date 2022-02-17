<template>
    <div>
        <modal
            v-if="popupSetting"
            id="modal-edit-class"
            :width="750"
            title="Chọn quyền"
            @close="popupSetting = false"
        >
            <div slot="body">
                <div class="row">
                    <template v-for="group in rolePermission">
                        <div
                            v-if="group.permission && group.permission.length > 0"
                            :key="'g_' + group.id"
                            class="col-sm-6 rolePermission"
                        >
                            <h4 class="pt-2 pb-1">{{ group.name }}</h4>
                            <div class="kt-checkbox-list">
                                <template v-for="per in group.permission">
                                    <label :key="'p_' + per.code" class="kt-checkbox">
                                        <input
                                            v-model="lstPermissionSelect"
                                            :value="per.code"
                                            type="checkbox"
                                        />
                                        {{ per.name }}
                                        <span />
                                    </label>
                                </template>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
            <div slot="footer">
                <button class="btn btn-success" secondary @click="choicePermission()">
                    <span>Chọn</span>
                </button>
            </div>
        </modal>
        <div class="input-group mb-3">
            <input
                class="form-control"
                type="text"
                v-model="groupNames"
                disabled
                v-b-tooltip.hover
                :title="groupNames"
            />
            <div class="input-group-append">
                <button
                    class="input-group-text"
                    style="padding: 0 1rem;"
                    id="basic-addon2"
                    @click="selectPermission"
                >Chọn</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {},
        type: {
            type: String,
            default: 'string'
        }
    },
    data() {
        return {
            groupNames: '',
            lstPermissionSelect: [],
            rolePermission: [],
            popupSetting: false
        };
    },
    methods: {
        selectPermission() {
            this.getRolePermission();
            this.popupSetting = true;
        },
        getRolePermission() {
            let loading = this.$loading.show();
            this.$http({
                data: {
                    m: 'security',
                    fn: 'rolepermission_get_list_add',
                    roleId: this.roleId
                }
            })
                .then(response => {
                    loading.hide();
                    if (response.success) {
                        this.rolePermission = response.data;
                    }
                })
                .catch(err => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        },
        choicePermission() {
            if (this.lstPermissionSelect && this.lstPermissionSelect.length > 0) {
                let temps = _.filter(this.appSettings.permissionWithNames, o => {
                    return this.lstPermissionSelect.indexOf(o.code) > -1;
                });
                temps = _.map(temps, 'name');
                if (temps) this.groupNames = temps.join();
                else this.groupNames = '';
            } else this.groupNames = '';

            if (this.type == 'string') {
                this.$emit('input', JSON.stringify(this.lstPermissionSelect));
            } else this.$emit('input', this.lstPermissionSelect);
            this.popupSetting = false;
        }
    },
    created() {
        if (this.value) {
            if (typeof this.value == 'string') this.lstPermissionSelect = JSON.parse(this.value);
            else this.lstPermissionSelect = this.value;
            this.choicePermission();
        }
    }
};
</script>

<style>
</style>