<template>
    <div v-if="lang== 'vi'">
        <template v-if="listData && !allowAdd">
            <template v-if="disabled">
                <input class="form-control" v-model="valueShow" disabled />
            </template>
            <template v-else>
                <treeselect :key="lang+key"
                            v-model="selectedData"
                            name="demo"
                            :multiple="multiple"
                            :searchable="true"
                            :options="listData"
                            :limit="10"
                            :disabled="disabled"
                            :max-height="300"
                            :placeholder="placeholder"
                            :disable-branch-nodes="selectParent ? false : true"
                            :default-expand-level="1"
                            no-results-text="Không có dữ liệu"
                            no-options-text="Không có dữ liệu" @search-change="searchChange" />
                <template v-if="type == 'province'">
                    <label class="kt-checkbox ml-2" title="Miền Bắc">
                        <input type="checkbox" v-model="regionSelected" :value="1" />Miền Bắc
                        <span />
                    </label>
                    <label class="kt-checkbox ml-2" title="Miền Trung">
                        <input type="checkbox" v-model="regionSelected" :value="2" />Miền Trung
                        <span />
                    </label>
                    <label class="kt-checkbox ml-2" title="Miền Nam">
                        <input type="checkbox" v-model="regionSelected" :value="3" />Miền Nam
                        <span />
                    </label>
                </template>
            </template>
        </template>
        <template v-else>
            <div>
                <div>
                    <treeselect :key="lang+key" v-if="listData"
                                v-model="selectedData"
                                name="demo"
                                :multiple="multiple"
                                :searchable="true"
                                :options="listData"
                                :limit="10"
                                :disabled="disabled"
                                :max-height="300"
                                :placeholder="placeholder"
                                :disable-branch-nodes="selectParent ? false : true"
                                :default-expand-level="1"
                                no-results-text="Không có dữ liệu"
                                no-options-text="Không có dữ liệu" @search-change="searchChange" />
                </div>
                <div v-if="$route.path.indexOf('translate') == -1">
                    <span class="cursor-pointer btn-add-new-value-dict" @click="openAdd= true" v-if="!disabled">
                        <i class="fa fa-plus"></i>Thêm giá trị
                    </span>
                </div>
            </div>
            <modal title="Thêm giá trị" @close="openAdd = false" v-if="openAdd && allowAdd && isShowButton">
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
                                <div class="col-sm-12" v-if="dataTypeName == 'province'">
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
                                        <input v-model="form.jp"
                                               placeholder="Nhập giá trị"
                                               class="form-control" />
                                    </div>
                                    <div class="form-group">
                                        <label>Tiếng Anh</label>
                                        <input v-model="form.en"
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
        </template>
    </div>
    <input v-else class="form-control" v-model="valueShow" />
</template>
<style>
    .btn-add-new-value-dict { font-size: 12px; color: #ccc; }
        .btn-add-new-value-dict i { margin-right: 5px; }
        .btn-add-new-value-dict:hover { color: #039be5; }
</style>
<script>
    import Treeselect from '@riophae/vue-treeselect';
    import '@riophae/vue-treeselect/dist/vue-treeselect.css';
    import { mapActions } from 'vuex';
    export default {
        name: 'SelectDict',
        components: { Treeselect },
        props: {
            options: {
                type: Array
            },
            label: {
                type: String,
                default: 'vi'
            },
            code: {
                type: String,
                default: 'id'
            },
            placeholder: {
                type: String,
                default: 'Chọn giá trị'
            },
            multiple: {
                type: Boolean,
                default: false
            },
            returnObj: {
                type: Boolean,
                default: false
            },
            value: null,
            dataTypeName: {
                type: String,
                default: ''
            },
            selectParent: {
                type: Boolean,
                default: false
            },
            allowAdd: {
                type: Boolean,
                default: true
            },
            lang: {
                type: null,
                default: 'vi'
            },
            type: {
                type: String,
                default: 'all'
            },
            onlyDataByAdmin: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            isUsedInProfile: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                selectedData: null,
                listData: [],
                Flabel: '',
                valueShow: '',
                openAdd: false,
                selectRegionAll: false,
                form: {
                    vi: '',
                    jp: '',
                    en: '',
                    status:0,
                    type: 'tinh'
                },
                regionSelected: [],
                key: 1
            };
        },
        computed: {
            language() {
                return this.$getLang();
            },
            isShowButton() {
                let categoriItem = ['position', 'ethnic', 'nationality', 'relation', 'gender', 'bai_thi_to_hop', 'type_of_tranning', 'religion', 'dink_alcohol', 'blood_type',
                    'preferred_hand', 'smoking', 'relationship', 'money_plan', 'japan_level', 'korea_level'];
                return !categoriItem.includes(this.dataTypeName)
            }
        },
        watch: {
            'regionSelected'() {
                if (this.regionSelected) {
                    var selected = this._.filter(this.listData, (o) => {
                        return this.regionSelected.includes(o.regionId);
                    });
                    this.selectedData = this._.map(selected, 'id');
                } else {
                    this.selectedData = [];
                }

            },
            selectedData() {
                this.$emit('change', this.selectedData);
                this.$emit('input', this.selectedData);

            },
            'lang'() {
                this.getListDataSelect();
                if (this.value) this.selectedData = this.value;
            },
            valueShow(val) {
                if (this.lang != 'vi')
                    this.$emit('input', val);
            },
        },
        created() {
            this.showData();
        },
        methods: {
            ...mapActions(['pushDict', 'pushDictByType']),
            showData() {
                if (this.value) {
                    if (this.multiple && !Array.isArray(this.value)) {
                        let a = [];
                        a.push(this.value);
                        this.selectedData = a;
                    }
                    else
                        this.selectedData = this.value;
                }
                if (this.selectedData < 0)
                    this.selectedData = null;
                if (this.lang == 'vi') {
                    this.getListDataSelect();
                }
                else {
                    var obj;
                    if (typeof (this.value) == "object" && Array.isArray(this.value)) {
                        if (typeof (this.value[0]) == 'string')
                            this.valueShow = this.value[0];
                        else {
                            var list = this.dictionaries[this.dataTypeName];
                            obj = _.filter(list, (o) => {
                                return this.value && this.value.indexOf(o.id) !== -1
                            });
                        }
                    }
                       
                    else {
                        if (typeof (this.value) === 'string') {
                            this.valueShow = this.value
                        } else {
                            obj = _.filter(this.dictionaries[this.dataTypeName], ['id', this.value]);
                        }
                    }
                    if (obj) {
                        this.valueShow = _.map(obj, this.lang).join(', ');
                    } else
                        this.valueShow = this.value;
                }
                this.selectedDataBK = this.selectedData;

                //Trường hợp disable control
                if (this.disabled)
                    this.getValueShow(this.selectedData);
            },
            getValueShow(value) {
                var obj;
                if (typeof (value) == "object" && Array.isArray(value))
                    obj = _.filter(this.dictionaries[this.dataTypeName], (o) => {
                        return value && value.indexOf(o.id) !== -1
                    });
                else {
                    if (typeof (this.value) === 'string') {
                        this.valueShow = value
                    } else {
                        obj = _.filter(this.dictionaries[this.dataTypeName], ['id', value]);
                    }
                }
                if (obj) {
                    this.valueShow = _.map(obj, this.lang).join(', ');
                } else
                    this.valueShow = value;
            },
            getListDataSelect() {
                if (!this.options) {
                    if (this.label && this.label != 'vi' && this.label != this.lang)
                        this.Flabel = this.label;
                    else
                        this.Flabel = this.lang;
                    this.listData = [];
                    var dataF = this.dictionaries[this.dataTypeName];

                    //console.log('dictionaries', this.dictionaries);
                    dataF = _.orderBy(dataF, ['vi'], ['asc']);
                    if (this.dataTypeName == 'province' && this.onlyDataByAdmin) {
                        var listProvince = this._.filter(dataF, ['createdBy', 'admin']);
                        for (let item of listProvince) {
                            this.listData.push({
                                id: item[this.code],
                                label: item[this.Flabel],
                                badge: item.badge,
                                regionId: item.regionId
                            });
                        }
                    }
                    else {
                        for (let item of dataF) {
                            this.listData.push({
                                id: item[this.code],
                                label: item[this.Flabel],
                                badge: item.badge
                            });
                        }
                    }
                    //order A-Z
                    this.listData = _.orderBy(this.listData, 'label', 'asc');
                    this.listDataBK = this.listData;
                } else {
                    for (let item of this.options) {
                        this.listData.push({
                            id: item.id,
                            label: item.title,
                            badge: item.title
                        });
                    }
                    //order A-Z
                    this.listData = _.orderBy(this.listData, 'label', 'asc');
                    this.listDataBK = this.listData;
                }
            },
            save() {
                if (!this.form.vi) {
                    return this.$message('Bạn vui lòng nhập giá trị!', 'error');
                }
                let m = "CategoryData";
                let fn = 'save-temp';
                if (this.dataTypeName == 'province') {
                    m = "address";
                    fn = 'save-province-temp';
                }
                else {
                    this.form.type = this.dataTypeName;
                    if (!this.isUsedInProfile)
                        this.form.status = 1;
                    
                }

                this.$http({
                    data: {
                        m: m,
                        fn: fn,
                        ...this.form
                    }
                }).then(res => {
                    let obj = _.find(this.listData, ['id', res.data.id]);
                    if (!obj) {
                        if (this.label && this.label != 'vi' && this.label != this.lang)
                            this.Flabel = this.label;
                        else
                            this.Flabel = this.lang;
                        this.listData.unshift({
                            id: res.data[this.code],
                            label: res.data[this.Flabel]
                        });
                        if (this.dataTypeName == 'province')
                            this.pushDictByType({ type: 'province', data: res.data });
                        else
                            this.pushDict(res.data);
                    }
                    this.openAdd = false;
                    if (this.multiple) {
                        if (this.selectedData && typeof (this.selectedData) == "object" && this.selectedData.length > 0)
                            this.selectedData.push(res.data.id);
                        else {
                            this.selectedData = [];
                            this.selectedData.push(res.data.id);
                        }
                    } else
                        this.selectedData = res.data.id;
                    this.key++;
                }).catch(err => {
                    return this.$message(err.message, 'error');
                });
            },
            searchChange(keyword) {
                if (keyword)
                    this.form.vi = keyword;
            }
            //createTreeData(data) {
            //    var map = {},
            //        node,
            //        roots = [],
            //        i;
            //    for (i = 0; i < data.length; i += 1) {
            //        map[data[i].id] = i;
            //        data[i].label = data[i][this.Flabel];
            //        data[i].children = [];
            //    }
            //    for (i = 0; i < data.length; i += 1) {
            //        node = data[i];
            //        if (this.code == 'name') node.id = data[i][this.Flabel];
            //        if (node.parentId != 0) {
            //            data[map[node.parentId]].children.push(node);
            //        } else {
            //            roots.push(node);
            //        }
            //    }
            //    return this.cleanTreeData(roots);
            //},
            //cleanTreeData(treeData) {
            //    this._.forEach(treeData, node => {
            //        if (node.children.length == 0) {
            //            delete node.children;
            //        } else this.cleanTreeData(node.children);
            //    });
            //    return treeData;
            //}
        }
    };
</script>
<style>
    .vue-treeselect b.badge { margin: 11.5px 5px 0 5px; padding: 1px 5px; float: right; }

    .vue-treeselect .custom-badge .label { float: right; margin-top: 9px; }

    .vue-treeselect .custom-badge { line-height: 20px; margin: 0; }

    .vue-treeselect .no-badge b.badge { display: none !important; }
</style>
