<template>
    <modalv2
        id="modal-dashbroad"
        :title="'Phân quyền doanh nghiệp: '+form.name"
        :width="1350"
        @close="closePopup()"
    >
        <div slot="body">
            <div class="sel-top d-flex align-items-center row">
                <div class="col-md-3 col-lg-2">
                    <label class="txt-tit">Danh sách chức năng</label>
                    <div class="form-check check-all-wrap">
                        <input
                            class="form-check-input"
                            v-model="selectAll"
                            type="checkbox"
                            ::checked="selectAll"
                        />
                        <label class="form-check-label text-danger">Chọn tất cả</label>
                    </div>
                </div>
               
            </div>
            <div class="sel-lst-wrap row">
                <template v-for="group in permissionList">
                    <div
                        class="col-3"
                        :key="'g1_' + group.id"
                        v-if="group.childGroup.length > 0 || group.permission.length > 0"
                    >
                        <div class="sel-lst-box">
                            <label class="tit-box">
                                {{ group.name }}
                                <label class="kt-checkbox pull-left mb-3">
                                    <input
                                        v-model="group.isChecked"
                                        type="checkbox"
                                        @change="changeGroup2(group, group.isChecked)"
                                    />
                                    <span />
                                </label>
                            </label>
                            
                            <ul
                                class="lst-check scroll"
                                v-if="group.permission && group.permission.length > 0"
                                :key="'g_' + group.id"
                            >
                                <template v-for="per in group.permission">
                                    <li class="form-check" :key="'p_' + per.code">
                                        <input
                                            class="form-check-input box-ipt"
                                            v-model="permissionSelected"
                                            type="checkbox"
                                            :value="per.code"
                                        />
                                        <label class="form-check-label txt-lbl">{{
                                            per.name
                                        }}</label>
                                    </li>
                                </template>
                                <template v-for="group2 in group.childGroup">
                                    <li
                                        class="sel-lst-box"
                                        :key="'g_' + group2.id"
                                        v-if="group2.permission && group2.permission.length > 0"
                                    >
                                        <label class="kt-checkbox">
                                            <input
                                                v-model="group2.isChecked"
                                                type="checkbox"
                                                @change="changeGroup2(group2, group2.isChecked)"
                                            />
                                            <b style="color:#c40404">{{ group2.name }}</b>
                                            <span />
                                        </label>
                                        <div class="kt-checkbox-list">
                                            <label
                                                v-for="per in group2.permission"
                                                :key="'p_' + per.code"
                                                class="kt-checkbox"
                                            >
                                                <input
                                                    v-model="permissionSelected"
                                                    type="checkbox"
                                                    :value="per.code"
                                                />
                                                {{ per.name }}
                                                <span />
                                            </label>
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
            <div class="row">
                <div class="col-sm-12">
                    <button class="btn btn-primary" @click="save()">
                        <span>Lưu lại</span>
                    </button>
                    <button class="btn btn-danger" @click="closePopup">
                        <span>Đóng</span>
                    </button>
                </div>
            </div>
        </div>
    </modalv2>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'CompanyEdit',
    props: ['id'],
    data() {
        return {
            form: {
                name: '',
                logo: '',
                description: '',
                typeId: 0,
                code: '',
                id: 0,
                domain: '',
                permissions: '',
                userName: '',
                status: 1,
            },
            selectedFile: null,
            showFileManager: false,
            isLoader: false,
            photoField: 'logo',
            permissionList: null,
            selectAll: false,
            permissionSelected: [],
            callTypeCount: 0,
        };
    },
    watch: {
        selectAll(val) {
            this.permissionSelected = [];
            if (val) {
                for (var group of this.permissionList) {
                    for (var per of group.permission) {
                        this.permissionSelected.push(per.code);
                    }
                }
            }
        },
        'form.typeId'() {
            if (this.callTypeCount > 0 && this.form.typeId > 0) this.getSystemType();
            this.callTypeCount = 1;
        },
    },
    computed: {
        ...mapGetters(['systemTypeList']),
    },
    methods: {
        ...mapActions(['getSystemTypeList']),
        changeGroup(id, checked) {
            var per = _.find(this.permissionList, ['id', id]).permission;
            if (checked) {
                for (let p of per) {
                    if (this.permissionSelected.indexOf(p.code) == -1)
                        this.permissionSelected.push(p.code);
                }
            } else {
                for (let p of per) {
                    if (this.permissionSelected.indexOf(p.code) !== -1)
                        this.permissionSelected.splice(this.permissionSelected.indexOf(p.code), 1);
                }
            }
        },

        changeGroup2(g, checked) {
            var per = g.permission;
            if (checked) {
                for (let p of per) {
                    if (this.permissionSelected.indexOf(p.code) == -1)
                        this.permissionSelected.push(p.code);
                }
            } else {
                for (let p of per) {
                    if (this.permissionSelected.indexOf(p.code) !== -1)
                        this.permissionSelected.splice(this.permissionSelected.indexOf(p.code), 1);
                }
            }
        },
        closePopup() {
            this.$emit('closePopup');
        },
        selectFile(val) {
            // this.form[this.photoField] = val[0].logo;
            this.form.logo = val[0].url;
        },
        getDetail() {
            let loading = this.$loading.show();
            this.$http({
                data: {
                    m: 'company',
                    fn: 'get-by-id',
                    id: this.id,
                },
            })
                .then((response) => {
                    loading.hide();
                    if (response.success) {
                        this.form = Object.assign(this.form, response.data);
                        this.isLoader = true;
                        if (!this.form.permissions) this.permissionSelected = [];
                        else this.permissionSelected = JSON.parse(this.form.permissions);
                    }
                })
                .catch((err) => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        },
        save() {
            if (this.form.name == '') {
                return this.$message('Bạn vui lòng nhập tên doanh nghiệp!', 'error');
            }
            this.form.permissions = JSON.stringify(this.permissionSelected);
            this.$http({
                data: {
                    m: 'company',
                    fn: 'save-permission',
                    ...this.form,
                },
            })
                .then(() => {
                    this.$message('Lưu thành công!');
                    this.$emit('closePopup');
                })
                .catch((err) => {
                    return this.$message(err.message, 'error');
                });
        },
        changePhoto(field) {
            this.photoField = field;
            this.showFileManager = true;
        },
        getSystemType() {
            this.$http({
                data: {
                    m: 'system',
                    fn: 'system-type-by-id',
                    id: this.form.typeId,
                },
            })
                .then((response) => {
                    if (response.success) {
                        if (!response.data.permissions) this.permissionSelected = [];
                        else this.permissionSelected = JSON.parse(response.data.permissions);
                    }
                })
                .catch((err) => {
                    return this.$message(err.message, 'error');
                });
        },
        getPermission() {
            this.$http({
                data: {
                    m: 'security',
                    fn: 'permission_get_list_all',
                },
            })
                .then((response) => {
                    this.permissionList = response.data;
                    this.permissionList = _.map(this.permissionList, (o) => {
                        o.isSelect = false;
                        return o;
                    });

                    console.log('permissionListRole', this.permissionList);
                })
                .catch((err) => {
                    return this.$message(err.message, 'error');
                });
        },
    },
    created() {
        this.getPermission();
        this.getSystemTypeList();
        this.form.id = this.id;
        if (this.form.id > 0) this.getDetail();
    },
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
