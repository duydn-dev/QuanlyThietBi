<template>
    <modal id="modal-dashbroad"
           :title="id > 0 ? 'Cập nhật nhóm quyền' : 'Thêm nhóm quyền'"
           size="small"
           @close="closePopup()">
        <div slot="body">
            <div class="row">
                <div class="col-12">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Tên nhóm</label>
                                <input v-model="form.name"
                                       type="text"
                                       placeholder="Nhập tên nhóm"
                                       class="form-control" />
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Nhóm cha</label>
                                <select v-if="listGroup"
                                        v-model="form.parentId"
                                        class="form-control">
                                    <option :value="0">-- Không có cấp cha --</option>
                                    <template v-for="b in listGroup">
                                        <option :value="b.id" v-if="b.id!=form.id" :key="'bran_' + b.id">
                                            {{ b.name }}
                                        </option>
                                    </template>
                                </select>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label>Thứ tự</label>
                                <input v-model="form.priority"
                                       type="text"
                                       placeholder="Nhập thứ tự"
                                       class="form-control" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div slot="footer">
            <div class="row">
                <div class="col-sm-12">
                    <button class="btn btn-primary" secondary @click="save()">
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
        name: 'PermissionGroupEdit',
        props: ['id', 'name', 'parentId', 'priority'],
        data() {
            return {
                form: {
                    id: 0,
                    name: '',
                    parentId: 0,
                    priority: 0
                },
                isLoader: false,
                listGroup: null
            };
        },
        methods: {
            closePopup() {
                this.$emit('closePopup');
            },
            save() {
                if (this.form.name == '') {
                    return this.$message('Hãy nhập tên nhóm!', 'error');
                }
                this.$http({
                    data: {
                        m: 'security',
                        fn: 'save-group',
                        ...this.form
                    }
                })
                    .then(() => {
                        this.$message('Lưu thành công!');
                        this.$emit('closePopup');
                    })
                    .catch(err => {
                        return this.$message(err.message, 'error');
                    });
            },
            getPermissionGroup() {
                this.$http({
                    data: {
                        m: 'security',
                        fn: 'list-group',
                        getRoot: true
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
            this.form.name = this.name;
            this.form.parentId = this.parentId;
            this.form.priority = this.priority;
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
