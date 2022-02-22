<template>
    <div class="row">
        <div class="col-12 mb-1" v-if="lang=='vi'" ref="heightParent">
            <div class="mb-2" v-if="!isInput">
                <v-select v-bind:style="{ height: matchHeight}" @search="fetchOptions" v-model="selectedData" :options="listData" :label="label" :filterable="false" placeholder="Xã/phường, quận/huyện, tỉnh/tp" :disabled="disable">
                    <span slot="no-options" style="color:#a8a6a6">
                        Không có dữ liệu
                    </span>
                </v-select>
            </div>
            <div class="row mb-2" v-else>
                <template v-if="numberOfCells == 3">
                    <div class="col-4">
                        <label>Xã/phường</label>
                        <input class="form-control" v-model="ward" placeholder="Xã/phường" />
                    </div>
                    <div class="col-4">
                        <label>Quận/huyện</label>
                        <input class="form-control" v-model="district" placeholder="Quận/huyện" />
                    </div>
                    <div class="col-4">
                        <label>Tỉnh/tp</label>
                        <input class="form-control" v-model="province" placeholder="Tỉnh/thành phố" />
                    </div>
                </template>
                <template v-else-if="numberOfCells == 2">
                    <div class="col-6">
                        <label>Quận/huyện</label>
                        <input class="form-control" v-model="district" placeholder="Quận/huyện" />
                    </div>
                    <div class="col-6">
                        <label>Tỉnh/tp</label>
                        <input class="form-control" v-model="province" placeholder="Tỉnh/thành phố" />
                    </div>
                </template>
                <template v-else>
                    <div class="col-12">
                        <input class="form-control" v-model="ward" placeholder="Nhập địa chỉ" />
                    </div>
                </template>
            </div>
            <template v-if="isOption">
                <label class="kt-checkbox mr-3">
                    <input type="checkbox" checked="checked" v-model="isInput" @change="addressInput"> Nhập tay
                    <span></span>
                </label>
                <template v-if="!isInput">
                    <label class="kt-checkbox mr-3" v-b-tooltip.hover title="Hiển thị phân cấp hành chính (xã/phường)">
                        <input type="checkbox" checked="checked" v-model="unitSelected" :value="1"> Hiện xã/phường
                        <span></span>
                    </label>
                    <label class="kt-checkbox mr-3" v-b-tooltip.hover title="Hiển thị phân cấp hành chính (quận/huyện)">
                        <input type="checkbox" checked="checked" v-model="unitSelected" :value="2"> Hiện quận/huyện
                        <span></span>
                    </label>
                    <label class="kt-checkbox" v-b-tooltip.hover title="Hiển thị phân cấp hành chính (tỉnh/thành)">
                        <input type="checkbox" checked="checked" v-model="unitSelected" :value="3"> Hiện tỉnh/thành
                        <span></span>
                    </label>
                </template>
            </template>
        </div>
        <div class="form-group col-12" v-else>
            <div v-if="numberOfCells == 3" class="row">
                <div class="col-4">
                    <label>Xã/phường</label>
                    <input class="form-control" v-model="ward" placeholder="Xã/phường" />
                </div>
                <div class="col-4">
                    <label>Quận/huyện</label>
                    <input class="form-control" v-model="district" placeholder="Quận/huyện" />
                </div>
                <div class="col-4">
                    <label>Tỉnh/tp</label>
                    <input class="form-control" v-model="province" placeholder="Tỉnh/thành phố" />
                </div>
            </div>
            <div v-else-if="numberOfCells == 2" class="row">
                <div class="col-6">
                    <label>Quận/huyện</label>
                    <input class="form-control" v-model="district" placeholder="Quận/huyện" />
                </div>
                <div class="col-6">
                    <label>Tỉnh/tp</label>
                    <input class="form-control" v-model="province" placeholder="Tỉnh/thành phố" />
                </div>
            </div>
            <input v-else class="form-control" v-model="dataLabel.wardId" />
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        name: 'AddressNew',
        props: {
            values: {
                type: null
            },
            label: {
                type: null,
                default: 'name'
            },
            lang: {
                type: null,
                default: 'vi'
            },
            isAuto: {
                type: Boolean,
                default: true
            },
            isDict: {
                type: Boolean,
                default: false
            },
            disable: {
                type: Boolean,
                default: false
            },
            isOption: {
                type: Boolean,
                default: true
            },
            numberOfCells: {
                type: Number,
                default: 1
            },
            mode: {
                default: 'edit'
            }
        },

        data() {
            return {
                matchHeight: '',
                selectedData: null,
                listData: [],
                unitSelected: [1, 2, 3],
                isInput: false,
                ward: '',
                district: '',
                province: '',
                dataLabel: '',
                units: {
                    'vi': { 'tinh': 'Tỉnh', 'thanh-pho': 'Thành phố', 'huyen': 'Huyện', 'quan': 'Quận', 'xa': 'Xã', 'phuong': 'Phường', 'thi-tran': 'Thị trấn', 'thi-xa': 'Thị xã' },
                    'jp': { 'tinh': '省', 'thanh-pho': '市', 'huyen': '郡', 'quan': '区', 'xa': '村', 'phuong': '地区', 'thi-tran': '町', 'thi-xa': '市社' },
                    'en': { 'tinh': 'province', 'thanh-pho': 'city', 'huyen': 'district', 'quan': 'district', 'xa': 'commune', 'phuong': 'ward', 'thi-tran': 'town', 'thi-xa': 'town' },
                    'de': { 'tinh': 'province', 'thanh-pho': 'city', 'huyen': 'district', 'quan': 'district', 'xa': 'commune', 'phuong': 'ward', 'thi-tran': 'town', 'thi-xa': 'town' }
                }
            };
        },
        computed: {
            showOption() {
                if (this.$route.path.indexOf('translate') !== -1)
                    return false;
                return this.isOption;
            },

        },
        watch: {
            'unitSelected'() {
                if (this.selectedData)
                    this.dataLabel = { wardId: this.selectedData.id, districtId: this.selectedData.districtId, provinceId: this.selectedData.provinceId, units: this.unitSelected, type: this.selectedData.type };
                else
                    this.dataLabel = null;
                this.$emit('input', this.dataLabel);
            },
            'selectedData'(val) {
                if (!this.isInput && !this.isOption && val != null && window.innerWidth < 1369)
                    this.matchHeight = this.$refs.heightParent.clientHeight + 5 + 'px';
                else
                    this.matchHeight = '34 px';
                if (val) {
                    this.dataLabel = { wardId: val.id, districtId: val.districtId, provinceId: val.provinceId, units: this.unitSelected, type: this.selectedData.type };
                }
                else
                    this.dataLabel = null;

                this.$emit('input', this.dataLabel);
                this.$emit('change', this.dataLabel);
            },
            'ward'() {
                this.emitAddress();
            },
            'district'() {
                this.emitAddress();
            },
            'province'() {
                this.emitAddress();
            }
        },
        created() {
            this.ShowAddress();
        },
        mounted() {
            if (!this.isInput && !this.isOption && !_.isEmpty(this.values) && window.innerWidth < 1369)
                this.matchHeight = this.$refs.heightParent.clientHeight + 5 + 'px';
            else
                this.matchHeight = '34 px';
        },
        methods: {
            ...mapActions(['addressById', 'addressAutocomplete']),
            ShowAddress() {
                var objLabel = [];
                if (!this.values) {
                    this.selectedData = null;
                }
                else if (this.values.wardId && (!this.values.type || this.values.type != 1)) {
                    if (this.values.wardId == ' ' || this.values.wardId == null)
                        return;
                    this.addressById(this.values.wardId).then((o) => {

                        this.unitSelected = this.values.units || [1, 2, 3];
                        if (o) {
                            let tp = o.provinceType;
                            let td = o.districtType;
                            let tw = o.wardType;
                            //Tách riêng với tiếng Nhật: k dịch đơn vị hành chính(chỉ bỏ dấu)

                            if (this.lang == 'jp') {
                                this.ward = this.$dictAccents(o.wardName);
                                this.district = this.$dictAccents(o.districtName);
                                this.province = this.$dictAccents(o.provinceName);
                                if (this.checkUnit(3))
                                    this.province = this.$dictAccents(`${this.units['vi'][tp]} ${this.province}`);
                                if (this.checkUnit(2))
                                    this.district = this.$dictAccents(`${this.units['vi'][td]} ${this.district}`);
                                if (this.checkUnit(1)) {
                                    this.ward = this.$dictAccents(`${this.units['vi'][tw]} ${this.ward}`);
                                }
                                this.dataLabel = { wardId: this.ward, districtId: this.district, provinceId: this.province, units: this.values.units || [], type: 1 };

                                if (this.numberOfCells == 1) {
                                    objLabel = [];
                                    if (this.ward && this.ward != '')
                                        objLabel.push(this.ward);
                                    if (this.district && this.district != '')
                                        objLabel.push(this.district);
                                    if (this.province && this.province != '')
                                        objLabel.push(this.province);
                                    this.ward = objLabel.join(', ');
                                    this.district = '';
                                    this.province = '';
                                    this.dataLabel = { wardId: this.ward, districtId: this.district, provinceId: this.province, units: this.values.units || [], type: 1 };
                                }
                                this.$emit('input', this.dataLabel);
                                return;
                            }
                            else if (this.lang != 'vi') {
                                this.ward = this.$dictAccents(o.wardName);
                                this.district = this.$dictAccents(o.districtName);
                                this.province = this.$dictAccents(o.provinceName);
                                if (this.checkUnit(3))
                                    this.province = this.$dictAccents(`${this.province} ${this.units[this.lang][tp]}`);
                                if (this.checkUnit(2))
                                    this.district = this.$dictAccents(`${this.district} ${this.units[this.lang][td]}`);
                                if (this.checkUnit(1)) {
                                    this.ward = this.$dictAccents(`${this.ward} ${this.units[this.lang][tw]}`);
                                }
                                this.dataLabel = { wardId: this.ward, districtId: this.district, provinceId: this.province, units: this.values.units || [], type: 1 };

                                if (this.numberOfCells == 1) {
                                    objLabel = [];
                                    if (this.ward && this.ward != '')
                                        objLabel.push(this.ward);
                                    if (this.district && this.district != '')
                                        objLabel.push(this.district);
                                    if (this.province && this.province != '')
                                        objLabel.push(this.province);
                                    this.ward = objLabel.join(', ');
                                    this.district = '';
                                    this.province = '';
                                    this.dataLabel = { wardId: this.ward, districtId: this.district, provinceId: this.province, units: this.values.units || [], type: 1 };
                                }
                                this.$emit('input', this.dataLabel);
                                return;
                            }
                            else {
                                this.ward = o.wardName;
                                this.district = o.districtName;
                                this.province = o.provinceName;
                                if (this.checkUnit(3))
                                    this.province = `${this.units[this.lang][tp]} ${this.province}`;

                                if (this.checkUnit(2))
                                    this.district = `${this.units[this.lang][td]} ${this.district}`;

                                if (this.checkUnit(1)) {
                                    this.ward = `${this.units[this.lang][tw]} ${this.ward}`;
                                }
                                this.selectedData = o;
                            }


                        }
                    });
                }
                else if (this.values.type == 1) {
                    this.ward = this.values.wardId;
                    this.district = this.values.districtId;
                    this.province = this.values.provinceId;
                    if (this.lang == 'en') {
                        if (this.ward && (this.ward.toLowerCase().includes("xã") || this.ward.toLowerCase().includes("thị trấn") || this.ward.toLowerCase().includes("phường")))
                            this.translate(this.ward).then(res => {
                                this.ward = res;
                            });
                        if (this.district && (this.district.toLowerCase().includes("quận") || this.ward.toLowerCase().includes("huyện")))
                            this.translate(this.district).then(res => {
                                this.district = res;
                            });
                        if (this.province && (this.province.toLowerCase().includes("tỉnh") || this.ward.toLowerCase().includes("thành phố")))
                            this.translate(this.province).then(res => {
                                this.province = res;
                            });
                    }
                    this.ward = this.$dictAccents(this.ward);
                    this.district = this.$dictAccents(this.district);
                    this.province = this.$dictAccents(this.province);
                    this.isInput = true;
                    if (this.numberOfCells == 2 && this.ward && this.ward != '') {
                        this.ward = '';
                    }
                    else if (this.numberOfCells == 1) {

                        objLabel = [];
                        if (this.ward && this.ward != '')
                            objLabel.push(this.ward);
                        if (this.district && this.district != '')
                            objLabel.push(this.district);
                        if (this.province && this.province != '')
                            objLabel.push(this.province);
                        this.ward = objLabel.join(', ');
                        this.district = '';
                        this.province = '';
                    }
                    if (this.lang != 'vi' && this.numberOfCells == 1) {
                        objLabel = [];
                        if (this.ward && this.ward != '')
                            objLabel.push(this.ward);
                        if (this.district && this.district != '')
                            objLabel.push(this.district);
                        if (this.province && this.province != '')
                            objLabel.push(this.province);
                        this.ward = objLabel.join(', ');
                        this.district = '';
                        this.province = '';
                        this.dataLabel = { wardId: this.ward, districtId: this.district, provinceId: this.province, units: this.values.units || [], type: 1 };
                    }
                    else {
                        this.dataLabel = { wardId: this.ward, districtId: this.district, provinceId: this.province, units: this.values.units || [], type: 1 };
                    }
                }
                else {
                    this.dataLabel = this.values;
                }

            },
            addressInput() {
                var add = [];
                if (this.ward != '')
                    add.push(this.ward);
                if (this.district != '')
                    add.push(this.district);
                if (this.province != '')
                    add.push(this.province);
                if (add.length > 0)
                    this.ward = add.join(', ');
                this.district = '';
                this.province = '';
                this.dataLabel = { wardId: this.ward, districtId: this.district, provinceId: this.province, units: this.unitSelected, type: 1 };
            },
            fetchOptions(obj, loading) {
                loading(true);
                this.addressAutocomplete(obj).then((data) => {
                    this.listData = data;
                    loading(false);
                });
            },
            translate(keyword) {
                return new Promise((resolve) => {
                    return this.$http({
                        data: {
                            m: 'autotranslate',
                            fn: 'translate',
                            keyword: keyword
                        }
                    }).then(res => { return resolve(res.data); })
                });
            },
            emitAddress() {
                if (this.isInput || (this.values && this.values.type == 1) || this.lang != 'vi') {
                    if (this.lang != 'vi' && this.numberOfCells == 1) {
                        var objLabel = [];
                        if (this.ward && this.ward != '')
                            objLabel.push(this.ward);
                        if (this.district && this.district != '')
                            objLabel.push(this.district);
                        if (this.province && this.province != '')
                            objLabel.push(this.province);
                        this.ward = objLabel.join(', ');
                        this.district = '';
                        this.province = '';
                        this.dataLabel = { wardId: this.ward, districtId: this.district, provinceId: this.province, units: [], type: 1 };
                    }
                    else {
                        this.dataLabel = { wardId: this.ward, districtId: this.district, provinceId: this.province, units: this.unitSelected, type: 1 };
                    }

                    this.$emit('input', this.dataLabel);
                }
            },
            checkUnit(type) {
                if (this.values.units && this.values.units.indexOf(type) != -1)
                    return true;
                return false;
            },
        }
    };
</script>
<style>
    .v-select .open-indicator {
        display: none !important
    }

    .v-select .dropdown-toggle .clear {
        right: 6px !important;
        bottom: 4px !important
    }

    .v-select .spinner, .v-select .spinner:after {
        width: 4em !important;
        height: 4em !important;
    }

    .v-select .spinner {
        top: 8px !important
    }

    .v-select li > a {
        padding: 5px 15px !important;
    }

    .v-select.searchable .dropdown-toggle {
        padding-left: 8px;
        border: none !important;
        border-radius: 4px !important;
    }

    .v-select .form-control {
        display: block;
        width: 100% !important;
        height: 34px !important;
        padding: 0.65rem 1rem !important;
        font-size: 1rem !important;
        font-weight: 400 !important;
        line-height: 1.5 !important;
        color: #495057 !important;
        border: none !important;
        -webkit-transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
        transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
        position: absolute !important;
        left: 0px;
    }

        .v-select .form-control::placeholder {
            color: #c1c0c0;
            font-weight: normal
        }

    /* .v-select .selected-tag {
        margin-top: 6px !important;
    } */

    /* .v-select .selected-tag {
        height: 18px !important;
        line-height: 18px !important;
    } */
</style>
