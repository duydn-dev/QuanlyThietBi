<template>
    <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor">
        <div id="kt_subheader" class="kt-subheader kt-grid__item">
            <div class="kt-subheader__main">
                <h3
                    class="kt-subheader__title"
                >{{ form.id > 0 ? 'Chi tiết trang tĩnh' : 'Thêm trang tĩnh' }}</h3>
            </div>
            <div class="kt-subheader__toolbar">
                <router-link to="/static-page" class="btn btn-label-dark">
                    <i class="fa fa-arrow-circle-left" />
                    Quay lại danh sách
                </router-link>
            </div>
        </div>
        <div id="kt_content" class="kt-content kt-grid__item kt-grid__item--fluid">
            <!--begin::Portlet-->
            <div class="kt-portlet kt-portlet--mobile">
                <div class="kt-portlet__body kt-portlet__body--fit">
                    <div class="kt-form kt-form--label-right">
                        <div class="kt-portlet__body">
                            <div class="row" v-if="form">
                                <div class="col-md-3 form-group">
                                    <label>Loại</label>
                                    <select class="form-control" v-model="form.type">
                                        <option
                                            v-for="(item,index) in listType"
                                            :key="index"
                                            :value="item.code"
                                            v-validate="'required'"
                                            name="Loại"
                                        >{{item.name}}</option>
                                    </select>
                                    <span
                                        v-show="errors.has('Loại')"
                                        class="text-danger"
                                    >{{errors.first('Loại')}}</span>
                                </div>
                                <div class="col-md-9 form-group">
                                    <label>Tiêu đề</label>
                                    <input
                                        class="form-control"
                                        v-model="form.title"
                                        v-validate="'required'"
                                        name="Tiêu đề"
                                    />
                                    <span
                                        v-show="errors.has('Tiêu đề')"
                                        class="text-danger"
                                    >{{errors.first('Tiêu đề')}}</span>
                                </div>

                                <div class="col-sm-12 form-group">
                                    <div class="form-group">
                                        <label>Nội dung</label>
                                        <editor
                                            v-if="isLoaded"
                                            id="data"
                                            ref="data"
                                            toolbar="basic"
                                            :content="form.data"
                                            :height="1000"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="kt-portlet__foot">
                            <div class="row">
                                <div class="col-sm-12">
                                    <button class="btn btn-cyan" @click="save()">
                                        <i class="fa fa-save" /> Lưu lại
                                    </button>
                                    <router-link to="/static-page">
                                        <button class="btn btn-back">
                                            <i class="fa fa-arrow-circle-left" /> Quay lại
                                        </button>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import editor from '../_common/editor';
export default {
    name: 'Edit-static-page',
    components: { editor },
    data() {
        return {
            form: {
                id: 0,
                type: null,
                title: '',
                data: '',
            },
            isLoaded: false,
        };
    },
    computed: {
        listType() {
            if (this.appSettings.configs.staticPageType)
                return this.appSettings.configs.staticPageType;

            return [];
        },
    },
    watch: {},
    created() {
        this.form.id = parseInt(this.$route.params.id);
        if (this.form.id > 0) {
            this.getDetail();
        } else {
            this.isLoaded = true;
        }
    },
    methods: {
        selectFile(val) {
            this.form.image = val[0].url;
        },
        changeAvatar() {
            this.showFileManager = true;
        },
        getDetail() {
            let loading = this.$loading.show();
            this.$http({
                data: {
                    m: 'staticpage',
                    fn: 'detail',
                    id: this.form.id,
                },
            })
                .then((res) => {
                    this.form = res.data;
                    loading.hide();
                    this.isLoaded = true;
                })
                .catch((err) => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        },
        save() {
            this.$validator.validate().then((valid) => {
                if (valid) {
                    this.form.data = encodeURIComponent(this.$refs.data.getData());
                    let loading = this.$loading.show();
                    this.$http({
                        data: {
                            m: 'staticpage',
                            fn: 'save',
                            ...this.form,
                        },
                    })
                        .then((response) => {
                            loading.hide();
                            this.$message('Lưu thành công !');
                            this.$router.push(`/static-page/${response.data.id}`);
                        })
                        .catch((ex) => {
                            loading.hide();
                            this.$message(ex.message, 'error');
                        });
                }
            });
        },
    },
};
</script>
<style scoped></style>
