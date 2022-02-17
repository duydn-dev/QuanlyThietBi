<template>
    <div v-if="lang=='vi'">
        <template v-if="multiple">
            <select-dict
                v-model="selectedData"
                :dataTypeName="dataTypeName"
                :placeholder="placeholder"
                :lang="lang"
                :disabled="disabled"
                :isEs="isEs"
                :multiple="multiple"
                :allowAdd="allowAdd"
            />
        </template>
        <template v-else>
            <div class="input-group">
                <div class="form-control m-0 p-0 border-0">
                    <template v-if="disabled">
                        <input
                            class="form-control"
                            :value="selectedData ? selectedData[lang] : ''"
                            disabled
                        />
                    </template>
                    <template v-else>
                        <v-select
                            v-if="isEs"
                            ref="autoSelect"
                            @search="fetchOptions"
                            v-model="selectedData"
                            :options="listData"
                            :label="label"
                            :filterable="false"
                            :placeholder="placeholder"
                            @search:focus="onSearchFocus"
                            v-b-tooltip.focus="'Nhập vào ô tìm kiếm để hiển thị thêm danh sách kết quả'"
                        >
                            <span slot="no-options" style="color:#a8a6a6">Không có dữ liệu</span>
                        </v-select>
                        <v-select
                            v-else
                            v-model="selectedData"
                            :options="listData"
                            :label="label"
                            :placeholder="placeholder"
                        >
                            <span slot="no-options" style="color:#a8a6a6">Không có dữ liệu</span>
                        </v-select>
                    </template>
                </div>
                <div
                    class="input-group-append"
                    v-if="isShowButton && allowAdd && $route.path.indexOf('translate') == -1 && !disabled"
                >
                    <span class="input-group-text cursor-pointer" @click="openAdd= true">
                        <i class="fa fa-plus"></i>
                    </span>
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
                                        <input
                                            v-model="form.vi"
                                            placeholder="Nhập giá trị"
                                            class="form-control"
                                        />
                                    </div>
                                </div>
                                <div class="col-sm-12" v-if="dataTypeName == 'district'">
                                    <div class="form-group">
                                        <label>Đơn vị hành chính</label>
                                        <select v-model="form.type" class="form-control">
                                            <option value="huyen">Huyện</option>
                                            <option value="quan">Quận</option>
                                            <option value="thanh-pho">Thành phố</option>
                                            <option value="thi-xa">Thị xã</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-12" v-else-if="dataTypeName == 'province'">
                                    <div class="form-group">
                                        <label>Đơn vị hành chính</label>
                                        <select v-model="form.type" class="form-control">
                                            <option value="tinh">Tỉnh</option>
                                            <option value="thanh-pho">Thành phố</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-12" v-else>
                                    <div class="form-group">
                                        <label>Tiếng Nhật</label>
                                        <input
                                            v-model="form.jp"
                                            placeholder="Nhập giá trị"
                                            class="form-control"
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label>Tiếng Anh</label>
                                        <input
                                            v-model="form.en"
                                            placeholder="Nhập giá trị"
                                            class="form-control"
                                        />
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
        </template>
    </div>
    <input v-else class="form-control" v-model="valueShow" @change="returnData" />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'data-autocomplete',
    props: {
        options: {
            type: Array,
        },
        label: {
            type: String,
            default: 'vi',
        },
        code: {
            type: String,
            default: 'id',
        },
        placeholder: {
            type: String,
            default: 'Chọn giá trị',
        },
        returnObj: {
            type: Boolean,
            default: false,
        },
        value: null,
        lang: {
            type: String,
            default: 'vi',
        },
        dataTypeName: {
            type: String,
            default: null,
        },
        allowAdd: {
            type: Boolean,
            default: true,
        },
        isDict: {
            type: Boolean,
            default: false,
        },
        isUnit: {
            default: true,
        },
        isEs: {
            type: Boolean,
            default: true,
        },
        multiple: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        onlyDataByAdmin: {
            type: Boolean,
            default: false,
        },
        searchForType: {
            type: Boolean,
            default: true,
        },
        isUpper: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            selectedData: null,
            listData: [],
            valueShow: '',
            openAdd: false,
            form: {
                vi: '',
                jp: '',
                type: 'huyen',
                en: '',
            },
            key: 1,
            units: {
                vi: {
                    // tinh: 'tỉnh',
                    // 'thanh-pho': 'thành phố',
                    // huyen: 'huyện',
                    // quan: 'quận',
                    // xa: 'xã',
                    // phuong: 'phường',
                    // 'thi-tran': 'thị trấn',
                    // 'thi-xa': 'thị xã'

                    tinh: 'Tỉnh',
                    'thanh-pho': 'Thành Phố',
                    huyen: 'Huyện',
                    quan: 'Quận',
                    xa: 'Xã',
                    phuong: 'Phường',
                    'thi-tran': 'Thị Trấn',
                    'thi-xa': 'Thị Xã',
                },
                jp: {
                    tinh: '省',
                    'thanh-pho': '市',
                    huyen: '郡',
                    quan: '区',
                    xa: '村',
                    phuong: '地区',
                    'thi-tran': '町',
                    'thi-xa': '市社',
                },
                en: {
                    tinh: 'Province',
                    'thanh-pho': 'City',
                    huyen: 'District',
                    quan: 'District',
                    xa: 'Commune',
                    phuong: 'Ward',
                    'thi-tran': 'Town',
                    'thi-xa': 'Town',
                },
                de: {
                    tinh: 'Province',
                    'thanh-pho': 'City',
                    huyen: 'District',
                    quan: 'District',
                    xa: 'Commune',
                    phuong: 'Ward',
                    'thi-tran': 'Town',
                    'thi-xa': 'Town',
                },
            },
            countKey: 0,
            refx: null,
        };
    },
    computed: {
        ...mapGetters(['dictListByIds']),
        initialText() {
            return this.$dictId(this.selectedData, this.dataTypeName);
        },
        comKeyword() {
            if (this.refx) return this.refx.search;
            return '-';
        },
        isShowButton() {
            let categoriItem = [
                'position',
                'ethnic',
                'nationality',
                'gender',
                'bai_thi_to_hop',
                'type_of_tranning',
                'religion',
                'dink_alcohol',
                'blood_type',
                'preferred_hand',
                'smoking',
                'money_plan',
                'japan_level',
                'school_level',
                'majors_japan',
                'status_labor',
            ];
            return !categoriItem.includes(this.dataTypeName);
        },
    },
    watch: {
        selectedData() {
            var val = this.selectedData;
            if (val) {
                if (this.multiple) this.$emit('input', val);
                else this.$emit('input', val.id);
            } else this.$emit('input', null);
        },
        lang() {
            this.getListDataSelect();
        },
        valueShow(val) {
            if (this.countKey == 0) {
                if (this.lang != 'vi') this.$emit('input', val);
                this.countKey++;
            }
        },
        comKeyword(val) {
            if (val == '') this.onSearchFocus(true);
        },
        dictListByIds() {
            if (this.isEs) {
                var obj;
                if (this.isDict) {
                    obj = _.find(this.dictListByIds, ['id', parseInt(this.value)]);
                } else obj = _.find(this.dictListByIds, ['id', parseInt(this.value)]);
                if (obj) this.selectedData = obj;
                if (this.lang != 'vi') {
                    if (this.selectedData) { 
                        if (this.dataTypeName == 'district' || this.dataTypeName == 'province') {
                            if (this.isUnit) {
                                if (this.lang=='en')
                                    this.valueShow = `${this.$dictAccents(this.selectedData.vi)} ${this.$dictAccents(this.units[this.lang][this.selectedData.typeName])}`;
                                else this.valueShow = `${this.$dictAccents(
                                    this.units['vi'][this.selectedData.typeName]
                                )} ${this.$dictAccents(this.selectedData.vi)} `;
                            } 
                            else this.valueShow = this.$dictAccents(this.selectedData.vi);
                        } else this.valueShow = this.selectedData[this.lang];
                    } else this.valueShow = this.value;
                }

                if (this.isUpper && this.valueShow) this.valueShow = this.valueShow.toUpperCase();
            }
        },
    },
    created() {
        if (!this.multiple) {
            if (this.value && typeof this.value != 'string') {
                if (this.isEs) {
                    if (this.value > 0 || parseInt(this.value) > 0) this.getDictByIds(this.value);
                } else {
                    var obj;
                    if (this.isDict) {
                        obj = _.find(this.dictionaries['dict'], ['id', this.value]);
                    } else
                        obj = _.find(this.dictionaries[this.dataTypeName], [
                            'id',
                            parseInt(this.value),
                        ]);
                    this.selectedData = obj;

                    if (this.lang != 'vi') {
                        if (obj) {
                            if (
                                this.dataTypeName == 'district' ||
                                this.dataTypeName == 'province'
                            ) {
                                if (this.isUnit) {
                                    if (obj.typeName == 'tinh' || obj.typeName == 'thanh-pho') {
                                        obj.vi = obj.vi
                                            .replace('tỉnh', '')
                                            .replace('Tỉnh', '')
                                            .replace('tinh', '')
                                            .replace('thành phố', '')
                                            .replace('Thành Phố', '')
                                            .replace('Thành phố', '')
                                            .trim();
                                    }
                                    if (this.lang == 'en')
                                        this.valueShow = `${this.$dictAccents(obj.vi)} ${this.$dictAccents(this.units[this.lang][this.selectedData.typeName])}`;
                                    else this.valueShow = `${this.$dictAccents(
                                        this.units['vi'][this.selectedData.typeName]
                                    )} ${this.$dictAccents(obj.vi)} `;
                                } else this.valueShow = this.$dictAccents(obj.vi);
                            } else this.valueShow = obj[this.lang];
                        } else this.valueShow = this.value;
                    }
                }
            } else if (typeof this.value == 'string') this.valueShow = this.value;
            if (this.lang == 'vi' && !this.isEs) this.getListDataSelect();
        } else {
            this.selectedData = this.value;
            if (this.lang != 'vi' && this.value)
                if (typeof this.value == 'object' && Array.isArray(this.value)) {
                    let dt = this.dictionaries[this.dataTypeName];
                    var res = [];
                    _.forEach(this.value, (o) => {
                        let obj = _.find(dt, ['id', parseInt(o)]);
                        if (obj) {
                            if (obj[this.lang]) res.push(obj[this.lang]);
                            else res.push(obj.vi);
                        }
                    });
                    if (res) {
                        this.valueShow = res.join(', ');
                    } else this.valueShow = this.value;
                }
        }

        if (this.isUpper && this.valueShow) this.valueShow = this.valueShow.toUpperCase();
    },
    methods: {
        ...mapActions(['pushDict', 'getListDict', 'getDictByIds']),
        returnData() {
            if (this.lang != 'vi') this.$emit('input', this.valueShow);
        },
        fetchOptions(keyword, loading) {
            this.refx = this.$refs['autoSelect'];
            loading(true);
            if (keyword !== '') this.form.vi = keyword;
            this.getListDict({
                keyword: keyword,
                type: this.searchForType ? this.dataTypeName : '',
            })
                .then((data) => {
                    this.listData = data;
                    loading(false);
                })
                .catch(() => {
                    this.listData = [];
                    loading(false);
                });
        },
        getListDataSelect() {
            if (this.isDict) {
                this.listData = _.filter(this.dictionaries['dict'], [
                    'typeName',
                    this.dataTypeName,
                ]);
            } else this.listData = this.dictionaries[this.dataTypeName];
            if (this.onlyDataByAdmin) {
                this.listData = _.filter(this.listData, ['createdBy', 'admin']);
            }
        },
        save() {
            if (!this.form.vi) {
                return this.$message('Bạn vui lòng nhập giá trị!', 'error');
            }

            let m = 'CategoryData';
            let fn = 'save-temp';
            if (this.dataTypeName == 'district') {
                m = 'address';
                fn = 'save-district-temp';
            } else if (this.dataTypeName == 'province') {
                m = 'address';
                fn = 'save-province-temp';
            } else this.form.type = this.dataTypeName;

            this.$http({
                data: {
                    m: m,
                    fn: fn,
                    ...this.form,
                },
            })
                .then((res) => {
                    let obj = _.find(this.listData, ['id', res.data.id]);
                    if (!obj) {
                        this.listData.unshift(res.data);
                        this.pushDict(res.data);
                        if (fn != 'save-temp') {
                            this.pushDictByType({ type: this.dataTypeName, data: res.data });
                        } else this.pushDict(res.data);
                    }
                    this.openAdd = false;
                    this.selectedData = res.data;
                })
                .catch((err) => {
                    return this.$message(err.message, 'error');
                });
        },
        searchChange(keyword) {
            if (keyword) this.form.vi = keyword;
        },
        onSearchFocus(isEmty) {
            if (!this.listData || this.listData.length == 0 || isEmty)
                this.getListDict({
                    type: this.dataTypeName,
                })
                    .then((data) => {
                        this.listData = _.filter(data, ['status', 1]);
                    })
                    .catch(() => {
                        this.listData = [];
                    });
        },
    },
};
</script>
<style>
.vue-treeselect b.badge {
    margin: 11.5px 5px 0 5px;
    padding: 1px 5px;
    float: right;
}

.vue-treeselect .custom-badge .label {
    float: right;
    margin-top: 9px;
}

.vue-treeselect .custom-badge {
    line-height: 20px;
    margin: 0;
}

.vue-treeselect .no-badge b.badge {
    display: none !important;
}

.dropdown.v-select {
    width: 100%;
    /*height: calc(1.5em + 1.3rem + 2px);*/
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #d4d4d4;
    border-radius: 4px;
    -webkit-transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
        -webkit-box-shadow 0.15s ease-in-out;
}
</style>
