<template>
    <modal id="modal-dashbroad"
           :title="id > 0 ? 'Cập nhật quyền' : 'Thêm quyền'"
           size="small"
           @close="closePopup()">
        <div slot="body">
            <div class="row">
                <div class="col-12">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Tên quyền</label>
                                <input v-model="form.name"
                                       type="text"
                                       placeholder="Nhập tên nhóm"
                                       class="form-control" />
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Mã quyền</label>
                                <input v-model="form.code"
                                       type="text"
                                       placeholder="Nhập tên nhóm"
                                       class="form-control" />
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Nhóm</label>
                                <select v-if="listGroup"
                                        v-model="form.groupId"
                                        class="form-control">
                                    <template v-for="b in _.filter(listGroup,(item)=>{return item.parentId==0 || item.parentId==null;})">
                                        <option :value="b.id" :key="'bran_' + b.id">
                                            {{ b.name }}
                                        </option>
                                        <template v-for="c in _.filter(listGroup,(item)=>{return item.parentId==b.id;})">
                                            <option :value="c.id" :key="'bran_' + c.id">
                                                ------ {{ c.name }}
                                            </option>
                                        </template>
                                    </template>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>IsLevel</label>
                                <input v-model="form.isLevel"
                                       type="text"
                                       placeholder="Nhập is Level"
                                       class="form-control" />
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label class="kt-checkbox mb-3">
                                    <input v-model="form.isSystem" type="checkbox" ::checked="form.isSystem" /> Is System
                                    <span />
                                </label>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Mô tả</label>
                                <div>
                                    <editor v-if="isLoader"
                                            id="bodyEditor1"
                                            ref="editorGhiChu"
                                            toolbar="basic"
                                            :content="form.description"
                                            :height="300" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div slot="footer">
            <div class="row">
                <div class="col-sm-12">
                    <button class="btn btn-cyan" @click="save()">
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
    import editor from '../../_common/editor';
    export default {
        components: { editor },
        name: 'PermissionGroupEdit',
        props: ['id'],
        data() {
            return {
                form: {
                    id: 0,
                    name: '',
                    groupId: 0,
                    code: '',
                    isLevel: 0,
                    isSystem: 0,
                    description:''
                },

                isLoader: false,
                listGroup: null
            };
        },
        methods: {
            closePopup() {
                this.$emit('closePopup');
            },
            getDetailPermission() {
                this.isLoader = false;
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'security',
                        fn: 'detail-permission',
                        id: this.form.id
                    }
                }).then((response) => {
                    if (response.success) {
                        this.form = response.data;
                    }
                    this.isLoader = true;
                    loading.hide();
                }).catch(err => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
            },
            save() {
                if (this.form.name == '') {
                    return this.$message('Hãy nhập tên quyền!', 'error');
                }
                if (this.form.code == '') {
                    return this.$message('Hãy nhập mã quyền!', 'error');
                }
                this.form.description = encodeURIComponent(this.$refs.editorGhiChu.getData());
                this.$http({
                    data: {
                        m: 'security',
                        fn: 'save-permission',
                        ...this.form
                    }
                }).then(() => {
                    this.$message('Lưu thành công!');
                    this.$emit('closePopup');
                }).catch(err => {
                    return this.$message(err.message, 'error');
                });
            },
            getPermissionGroup() {
                this.$http({
                    data: {
                        m: 'security',
                        fn: 'list-group',
                        getRoot: false
                    }
                }).then(response => {
                    if (response.success) {
                        this.listGroup = response.data;
                    }
                }).catch(err => {
                    return this.$message(err.message, 'error');
                });
            }
        },
        created() {
            this.getPermissionGroup();
            this.form.id = this.id;
            if (this.form.id > 0) {
                this.isLoader = false;
                this.getDetailPermission();
            } else {
                this.isLoader = true;
            }
        }
    };
</script>
<style>
    .deadlineClass { color: #ff0000; }

    #editor .ql-tooltip[data-mode='video'] { left: 25% !important; top: 35% !important; }

        #editor .ql-tooltip[data-mode='video'] input { height: 80px !important; width: 400px !important; }

    #editor { height: 600px; }

    #news-avatar { width: 100px; height: 100px; }

    #news-wrapper .mu-text-field-label,
    #news-wrapper .common-label { font-weight: bold; color: #000; }

    #related-course ul { margin: 10px 0; }

    #related-course { margin: 20px 0; }

        #related-course > button { height: 25px !important; }

        #related-course li button { height: 18px !important; width: 20px !important; position: absolute; top: 8px; left: 8px; }

            #related-course li button > div { padding: 0px !important; }

        #related-course li { position: relative; padding-left: 40px; padding: 8px 0 8px 50px; background: #f1f1f1; margin-bottom: 2px; }
</style>
