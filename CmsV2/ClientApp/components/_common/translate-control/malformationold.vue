<template>
    <div class="row" v-if="lang=='vi'">
        <div class="col-lg-12">
            <div class="input-group">
                <div class="form-control m-0 p-0 border-0">
                    <!--<autocomplete-dict dataTypeName="malformation" :isDict="true" v-model="id" :allowAdd="false" :key="id" />-->
                    <v-select @search="fetchOptions" v-model="selectedData" :options="listData" label="vi" :filterable="false" placeholder="Chọn đặc điểm nhận dạng" @search:focus="onSearchFocus" v-b-tooltip.focus="'Nhập vào ô tìm kiếm để hiển thị thêm danh sách kết quả'">
                        <span slot="no-options" style="color:#a8a6a6">
                            Không có dữ liệu
                        </span>
                    </v-select>
                </div>
                <div class="input-group-append" v-if="$route.path.indexOf('translate') == -1">
                    <span class="input-group-text cursor-pointer" @click="openAdd= true">
                        <i class="fa fa-plus"></i>
                    </span>
                </div>
            </div>
        </div>
        <modal title="Thêm giá trị" @close="openAdd = false" v-if="openAdd && allowAdd">
            <div slot="body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label>Tiếng Việt</label>
                                    <input v-model="form.vi"
                                           placeholder="Nhập giá trị"
                                           class="form-control" />
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label>Tiếng Nhật</label>
                                    <input v-model="form.jp"
                                           placeholder="Nhập giá trị"
                                           class="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="footer" class="row">
                <div class="col-sm-12">
                    <button class="btn btn-cyan" @click="save()">
                        <span>Lưu lại</span>
                    </button>
                    <button class="btn btn-danger" @click="openAdd = false">
                        <span>Đóng</span>
                    </button>
                </div>
            </div>
        </modal>
    </div>
    <div class="row" v-else>
        <div class="col-lg-12">
            <div class="form-group">
                <input class="form-control" v-model="valueShow" />
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex';
    export default {
        props: {
            values: {
                type: null
            },
            lang: {
                type: null,
                default: 'vi'
            },
            allowAdd: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                value: null,
                id: null,
                valueShow: '',
                showInput: true,
                selectedData: null,
                listData: [],
                openAdd: false,
                form: {
                    vi: '',
                    jp: ''
                },
                key: 1
            };
        },
        watch: {
            selectedData() {
                this.$emit('input', {
                    id: this.selectedData.id,
                    value: this.selectedData.value
                });
            },
            valueShow() {
                if (this.lang != 'vi')
                    this.$emit('input', this.valueShow);
            }
        },
        methods: {
            ...mapActions(['getMalformationById', 'getListMalformation']),
            fetchOptions(keyword, loading) {
                loading(true);
                this.getListMalformation({
                    keyword: keyword
                }).then((data) => {
                    this.listData = data;
                    loading(false);
                }).catch(() => {
                    this.listData = [];
                    loading(false);
                });
            },
            onSearchFocus() {
                if (!this.listData || this.listData.length == 0)
                    this.getListMalformation(
                    ).then((data) => {
                        this.listData = data;
                    }).catch(() => {
                        this.listData = [];
                    });
            },
            save() {
                if (!this.form.vi) {
                    return this.$message('Bạn vui lòng nhập giá trị!', 'error');
                }
                this.$http({
                    data: {
                        m: 'Malformation',
                        fn: 'save-temp',
                        ...this.form
                    }
                })
                    .then(res => {
                        this.listData.unshift(res.data);
                        this.selectedData = res.data;
                        this.openAdd = false;
                        this.key++;
                        this.form.vi = '';
                        this.form.jp = '';
                    })
                    .catch(err => {
                        return this.$message(err.message, 'error');
                    });
            },
        },
        created() {
            if (this.values) {
                if (typeof (this.values) == 'string') {
                    this.valueShow = this.values;
                    return;
                }
                else if (typeof (this.values) == 'object') {
                    this.id = this.values.id || null;
                    this.value = this.values.value || null;
                }
                else
                    this.id = parseInt(this.values)
                
                if (this.id > 0)
                    this.getMalformationById(this.id).then((o) => {
                        if (o) {
                            if (this.lang == 'vi')
                                this.selectedData = o;
                            else {
                                if (o[this.lang])  
                                    this.valueShow = o[this.lang];
                                else
                                    this.valueShow = this.$dictAccents(o.vi);
                            }
                        }
                    });
            }
        }
    };
</script>
