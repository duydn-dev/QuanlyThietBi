<template>
    <modal
        id="modal-dashbroad"
        :title="id > 0 ? 'Cập nhật chi nhánh' : 'Thêm chi nhánh'"
        @close="closePopup()"
    >
        <div slot="body">
            <div class="row">
                <div class="col-sm-12">
                    <div class="form-group">
                        <label>Tên Chi Nhánh</label>
                        <input
                            v-model="form.name"
                            type="text"
                            placeholder="Nhập tên chi nhánh"
                            class="form-control"
                        />
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group">
                        <label>Chi nhánh cha</label>
                        <branch-select v-model="form.parentId" v-if="isLoader" />
                    </div>
                </div>

                <div class="col-sm-12">
                    <div class="form-group">
                        <label>Giám đốc đại diện</label>
                        <input
                            v-model="form.representativeDirector"
                            type="text"
                            placeholder="Nhập tên giám đốc đại diện"
                            class="form-control"
                        />
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label>Quốc gia</label>
                        <select-dict
                            data-type-name="nationality"
                            :onlyDataByAdmin="true"
                            :allowAdd="false"
                            v-model="form.countryId"
                            placeholder="Chọn quốc gia"
                            :multiple="false"
                        />
                    </div>
                </div>
                <!--<div class="col-sm-6">
                    <div class="form-group">
                        <label>Tỉnh thành</label>
                        <select-dict dataTypeName="province"
                                     :onlyDataByAdmin="true"
                                     :allowAdd="false"
                                     v-model="form.provinceId"
                                     placeholder="Chọn tỉnh"
                                     :multiple="false" />
                    </div>
                </div>-->
                <div class="col-sm-12">
                    <div class="form-group">
                        <label>Địa chỉ</label>
                        <input
                            v-model="form.address"
                            type="text"
                            placeholder="Nhập địa chỉ"
                            class="form-control"
                        />
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group">
                        <label>Ngày thành lập</label>
                        <datetimepicker
                            v-model="form.foundingDate"
                            v-if="isLoader"
                            :multiple="false"
                            :placeholder="'Chọn ngày thành lập'"
                        ></datetimepicker>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group">
                        <label>Mô tả ngắn</label>
                        <textarea
                            v-model="form.description"
                            class="form-control"
                            placeholder="Nhập giới thiệu.."
                        />
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group">
                        <label>Trạng thái</label>
                        <select class="form-control" v-model="form.status">
                            <option value="1">Đang hoạt động</option>
                            <option value="2">Ngừng hoạt động</option>
                        </select>
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
export default {
    name: 'CompanyEdit',
    props: ['id', 'companyId'],
    data() {
        return {
            form: {
                name: '',
                companyId: this.companyId,
                description: '',
                representativeDirector: '',
                foundingDate: null,
                countryId: null,
                provinceId: null,
                address: '',
                status: 1,
                id: 0,
                company: this.companyId
            },
            popupAdd: false,
            isLoader: false
        };
    },
    created() {
        this.form.id = this.id;
        if (this.form.id > 0) this.getDetail();
        else this.isLoader = true;
    },
    methods: {
        selectFile(val) {
            this.form[this.photoField] = val[0].logo;
        },
        getDetail() {
            let loading = this.$loading.show();
            this.$http({
                data: {
                    m: 'company',
                    fn: 'branch-detail',
                    id: this.form.id
                }
            })
                .then(response => {
                    loading.hide();
                    if (response.success) {
                        this.form = Object.assign(this.form, response.data);
                        this.isLoader = true;
                    }
                })
                .catch(err => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        },
        save() {
            var me = this.form;
            if (me.name == '') {
                return this.$message('Bạn vui lòng nhập tên chi nhánh!', 'error');
            }
            this.$http({
                data: {
                    m: 'company',
                    fn: 'branch-save',
                    ...this.form
                }
            })
                .then(res => {
                    if (res.success) {
                        this.$message('Lưu thành công!');
                        this.$emit('closePopup');
                    }
                })
                .catch(err => {
                    return this.$message(err.message, 'error');
                });
        },
        closePopup() {
            this.$emit('closePopup');
        },
        changePhoto(field) {
            this.photoField = field;
            this.showFileManager = true;
        }
    }
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
