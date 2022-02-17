<template>
    <div v-if="form">
        <div class="form-group">
            <label>{{ $t('Label.Username') }}</label>
            <template>
                <input
                    v-if="memberId > 0"
                    v-model="form.userName"
                    type="text"
                    class="form-control"
                    :label="$t('Label.Username')"
                    :placeholder="$t('Label.Username')"
                    disabled
                />
                <input
                    v-else
                    v-model="form.userName"
                    type="text"
                    class="form-control"
                    :label="$t('Label.Username')"
                    :placeholder="$t('Label.Username')"
                />
            </template>
        </div>
        <div v-if="memberId <= 0" class="form-group">
            <label>{{ $t('Label.Password') }}</label>
            <input
                v-model="form.password"
                class="form-control"
                type="password"
                :label="$t('Label.Password')"
                :placeholder="$t('Label.Password')"
            />
        </div>
        <div class="form-group">
            <label>{{ $t('Label.FullName') }}</label>
            <input
                v-model="form.fullName"
                type="text"
                class="form-control"
                :label="$t('Label.FullName')"
                :placeholder="$t('Label.FullName')"
            />
        </div>
        <div class="row">
            <div class="col-sm-6">
                <div class="form-group">
                    <label>Điện thoại</label>
                    <input
                        v-model="form.mobile"
                        type="text"
                        class="form-control"
                        placeholder="Nhập số điện thoại"
                    />
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <label>Email</label>
                    <input
                        v-model="form.email"
                        type="text"
                        class="form-control"
                        placeholder="Nhập email"
                    />
                </div>
            </div>
        </div>

        <div class="row">
            <!-- <div class="col-sm-6">
                <div class="form-group">
                     <label>Chi nhánh</label>
                    <branch-select v-model="form.companyBranchId" v-if="isLoader" />
                </div>
            </div> -->
            <div class="col-sm-6">
                <div class="form-group">
                    <label>Phòng ban/nhóm</label>
                    <fselect
                        v-if="departmentList && isLoader"
                        v-model="form.departmentId"
                        :options="departmentList"
                        placeholder="Chọn phòng ban/nhóm"
                    />
                </div>
            </div>
            <div class="form-group col-md-12" v-if="appSettings.abroadMemberType">
                <label>Loại hình Du học</label>
                <fselect
                    v-model="form.abroadMemberTypeIds"
                    :multiple="true"
                    :options="appSettings.abroadMemberType"
                    v-if="appSettings.abroadMemberType && isLoader"
                />
            </div>
            <div class="form-group col-md-12" v-if="appSettings.laborMemberType && isLoader">
                <label>Loại hình XKLĐ</label>
                <fselect
                    v-model="form.laborMemberTypeIds"
                    :multiple="true"
                    :options="appSettings.laborMemberType"
                    v-if="appSettings.laborMemberType && isLoader"
                />
            </div>
            <!--<template v-if="memberId <= 0 && form.departmentId > 0 && appSettings.CompanyId == 12">
            <div class="col-sm-6">
                <div class="form-group">
                    <label class="kt-checkbox">
                        <input v-model="form.isBranch" type="checkbox" />Là cán bộ xử lý
                        <span />
                    </label>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <label class="kt-checkbox">
                        <input v-model="form.isStaff" type="checkbox" />Là cán bộ chi nhánh
                        <span />
                    </label>
                </div>
            </div>
                </template>-->
            <div class="col-sm-6">
                <div class="form-group">
                    <label>Chọn vai trò</label>
                    <select v-model="form.role" class="form-control">
                        <option :value="0">Chọn vai trò</option>
                        <template v-if="listRole && listRole.length > 0">
                            <option
                                v-for="role in listRole"
                                :key="'role_' + role.id"
                                :value="role.id"
                            >
                                {{ role.roleName }}
                            </option>
                        </template>
                    </select>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <label>{{ $t('Label.Status') }}</label>
                    <select v-model="form.status" class="form-control">
                        <option :value="1">{{ $t('Label.Active') }}</option>
                        <option :value="0">{{ $t('Label.Locked') }}</option>
                    </select>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="form-group">
                    <label>Chức danh</label>
                    <!-- <input
                        v-model="form.position"
                        type="text"
                        class="form-control"
                        placeholder="Chức danh"
                    /> -->
                    <select-category
                        type="position"
                        v-model="form.positionId"
                        placeholder="Chức danh"
                        v-if="isLoader"
                    />
                </div>
            </div>
        </div>
        <div class="form-group">
            <button class="btn btn-primary" @click="submitMember()">
                <span v-if="memberId > 0">{{ $t('Label.Update') }}</span>
                <span v-else>{{ $t('Label.Add') }}</span>
            </button>
        </div>

        <change-member-mananger
            v-if="objChangeMemberMananger"
            :countMemberMananger="objChangeMemberMananger"
            :userId="memberId"
            @close="closePopup"
        />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import changeMemberMananger from './change-member-mananger';
export default {
    name: 'Edit',
    components: { changeMemberMananger },
    props: ['memberId'],
    data() {
        return {
            form: {
                userName: '',
                password: '',
                fullName: '',
                email: '',
                status: 1,
                gender: 1,
                role: '',
                mobile: '',
                level: 0,
                note: '',
                avatar: '',
                CompanyIds: '',
                companyBranchId: 0,
                departmentId: 0,
                isBranch: false,
                isStaff: false,
                abroadMemberTypeIds: [],
                laborMemberTypeIds: [],
            },
            isLoader: false,
            listRole: [],
            selectedChannel: null,
            objChangeMemberMananger: null,
        };
    },
    computed: {
        ...mapGetters(['departmentList']),
    },
    methods: {
        ...mapActions(['getDepartmentList']),
        submitMember() {
            var me = this;
            if (!this.form.fullName) {
                return this.$message(this.$t('Label.RequiredFullname'), 'error');
            }
            if (!this.form.userName) {
                return this.$message(this.$t('Label.RequiredUsername'), 'error');
            }
            if (!this.form.password && this.memberId == 0) {
                return this.$message(this.$t('Label.RequiredPasword'), 'error');
            }
            if (this.form.role == 0) {
                return this.$message(this.$t('Label.RequiredRole'), 'error');
            }
            // if (!this.form.companyBranchId) {
            //     return this.$message('Bắt buộc chọn chi nhánh', 'error');
            // }

            this.form.abroadMemberTypeIds = JSON.stringify(this.form.abroadMemberTypeIds);
            this.form.laborMemberTypeIds = JSON.stringify(this.form.laborMemberTypeIds);
            this.$http({
                data: {
                    m: 'user',
                    fn: 'save',
                    id: me.memberId,
                    ...this.form,
                },
            })
                .then((response) => {
                    if (response.success) {
                        let data = response.data;
                        if (data && this.objectValid(data)) {
                            this.$confirm(
                                'Có một số học viên đang được quản lý bởi người dùng, vui lòng chọn người quản lý mới'
                            ).then(() => {
                                this.objChangeMemberMananger = data;
                            });
                            this.form.abroadMemberTypeIds = JSON.parse(
                                this.form.abroadMemberTypeIds
                            );
                            this.form.laborMemberTypeIds = JSON.parse(this.form.laborMemberTypeIds);
                        } else {
                            this.$message(this.$t('Label.Successful'));
                            me.$emit('closePopup');
                        }
                    }
                })
                .catch((ex) => {
                    this.form.abroadMemberTypeIds = JSON.parse(this.form.abroadMemberTypeIds);
                    this.form.laborMemberTypeIds = JSON.parse(this.form.laborMemberTypeIds);
                    return this.$message(ex.message, 'error');
                });
        },
        closePopup() {
            this.$emit('closePopup');
        },
        objectValid(obj) {
            if (!obj) return false;
            let valid = false;
            for (var value in obj) {
                if (obj[value]) {
                    valid = true;
                    break;
                }
            }

            return valid;
        },
        onAvatarChange(val) {
            this.form.avatar = val;
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
        getUser() {
            this.$http({
                data: {
                    m: 'user',
                    fn: 'get_detail',
                    id: this.memberId,
                },
            })
                .then((response) => {
                    if (response.success) {
                        this.form = response.data;
                        if (
                            this.form.abroadMemberTypeIds &&
                            typeof this.form.abroadMemberTypeIds == 'string'
                        )
                            this.form.abroadMemberTypeIds = JSON.parse(
                                this.form.abroadMemberTypeIds
                            );
                        if (
                            this.form.laborMemberTypeIds &&
                            typeof this.form.laborMemberTypeIds == 'string'
                        )
                            this.form.laborMemberTypeIds = JSON.parse(this.form.laborMemberTypeIds);
                    }
                    this.isLoader = true;
                })
                .catch((err) => {
                    return this.$message(err.message, 'error');
                });
        },
    },
    created() {
        this.getDepartmentList({ pageSize: 100 });
        this.getListRole();
        if (this.memberId > 0) this.getUser();
        else this.isLoader = true;
    },
};
</script>
<style scoped>
.dn-content-left {
    max-width: 800px;
    margin: 0 auto;
}

.student-avatar {
    width: 90px;
    height: 135px;
}

input[type='file'] {
    display: none;
}

.custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 5px 8px;
    cursor: pointer;
}

@media (max-width: 767px) {
    .md-layout {
        flex-direction: column;
    }
}

.ai-info-member {
    display: flex;
    align-items: center;
    margin-bottom: 25px;
}

.ai-info-member .info {
    margin-left: 20px;
}
</style>
