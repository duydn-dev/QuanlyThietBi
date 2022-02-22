<template>
    <div>
        <modal :title="`Import tài khoản`" v-if="isShowModalImport" @close="closeImport">
            <div slot="body">
                <div class="row">
                    <div class="col-12 form-group text-right"><a href="javascript:;"  @click="downloadTemplate" style="font-size: 18px;">Tải file mẫu</a></div>
                    <div class="col-12 form-group">
                        <label>Chi nhánh</label>
                        <branch-select v-model="form.branchId" placeholder="---Chi nhánh---" />
                    </div>
                    <!--<div class="col-12 form-group">
                        <label>Vai trò</label>
                        <select v-model="form.roleId" class="form-control">
                            <template v-if="listRole && listRole.length > 0">
                                <option v-for="role in listRole"
                                        :key="'role_' + role.id"
                                        :value="role.id">
                                    {{ role.roleName }}
                                </option>
                            </template>
                        </select>
                    </div>-->
                    <div class="col-12 form-group">
                        <label>File định dạng xlsx (mẫu: Tên/email/username) và bắt đầu từ dòng thứ 2</label>
                        <fileUploadServer id="fileImport" @change="changeFile" />
                    </div>
                </div>
            </div>
            <div slot="footer">
                <button class="btn btn-cyan" secondary @click="importAccount">
                    <span>Lưu lại</span>
                </button>

                <button class="btn btn-danger" @click="closeImport">
                    <span>Đóng</span>
                </button>
            </div>
        </modal>
        <modal :title="`Import tài khoản`" v-if="error" @close="closeImport">
            <div slot="body" v-html="error"></div>
        </modal>
    </div>
</template>

<script>
import fileUploadServer from '../_common/file-manager/file-upload-server';
export default {
    components: { fileUploadServer },
    data() {
        return {
            form: {
                branchId: 0,
                data: ''
            },
            isShowModalImport: false,
            error: '',
            listRole: []
        };
    },
    computed: {},
    methods: {
        changeFile(file) {
            this.form.data = file.data;
        },
        showModalImport() {
            this.getListRole();
            this.form = {
                branchId: 0,
                data: ''
            };
            this.isShowModalImport = true;
        },
        importAccount() {
            if (!this.form.data) {
                return this.$message('Nhập vào file excel định dạnh xlsx', 'error');
            }
            //if (!this.form.roleId) {
            //    return this.$message('Bắt buộc chọn vai trò', 'error');
            //}
            if (!this.form.branchId) {
                return this.$message('Bắt buộc chọn chi nhánh', 'error');
            }

            this.$http({
                data: {
                    m: 'user',
                    fn: 'import-account',
                    ...this.form
                }
            })
                .then(response => {
                    this.isShowModalImport = false;
                    if (response.data) {
                        this.error = response.data;
                    } else this.$message('Import thành công');
                    this.$emit('reloadData');
                })
                .catch(ex => {
                    this.$message(ex.message, 'error');
                });
        },
        closeImport() {
            this.isShowModalImport = false;
            this.error = null;
        },
        getListRole() {
            this.$http({
                data: {
                    m: 'security',
                    fn: 'role_get_list'
                }
            })
                .then(response => {
                    this.listRole = response.data;
                })
                .catch(err => {
                    return this.$message(err.message, 'error');
                });
        },
        downloadTemplate() {
              this.$http({
                data: {
                    m: 'user',
                    fn: 'export-template'
                }
            })
                .then(response => {
                    window.open(response.data);
                })
                .catch(err => {
                    return this.$message(err.message, 'error');
                });
        }
    },
    created() {}
};
</script>

<style>
</style>