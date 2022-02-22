<template>
    <span v-if="mode=='edit'" style="white-space:normal">{{label}}</span>
    <input v-else-if="mode=='input'" type="text" disabled class="form-control" :value="label" />
    <!--<input v-else type="text" class="form-control" v-model="label" @change="changedata" />-->
</template>
<script>
export default {
    props: {
        values: {
            type: null,
        },
        type: {
            type: null,
            default: '',
        },
        lang: {
            type: String,
            default: 'vi',
        },
        separate: {
            type: null,
            default: '-',
        },
        isDict: {
            type: Boolean,
            default: false,
        },
        isUnit: {
            type: Boolean,
            default: true,
        },
        ffix: {
            type: String,
            default: '',
        },
        afix: {
            type: String,
            default: '',
        },
        mode: {
            default: 'edit',
        },
        isUpper: {
            type: Boolean,
            default: false,
        },
        isLower: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            wardId: 0,
            districtId: 0,
            provinceId: 0,
            districtName: null,
            provinceName: null,
            wardName: null,
            label: '',
            units: {
                vi: {
                    tinh: 'Tỉnh',
                    'thanh-pho': 'Thành phố',
                    huyen: 'Huyện',
                    quan: 'Quận',
                    xa: 'Xã',
                    phuong: 'Phường',
                    'thi-tran': 'Thị trấn',
                    'thi-xa': 'Thị xã',
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
                    tinh: 'province',
                    'thanh-pho': 'city',
                    huyen: 'district',
                    quan: 'district',
                    xa: 'commune',
                    phuong: 'ward',
                    'thi-tran': 'town',
                    'thi-xa': 'town',
                },
                de: {
                    tinh: 'province',
                    'thanh-pho': 'city',
                    huyen: 'district',
                    quan: 'district',
                    xa: 'commune',
                    phuong: 'ward',
                    'thi-tran': 'town',
                    'thi-xa': 'town',
                },
            },
        };
    },
    watch: {
        values() {
            this.ShowAddress();
        },
        afix() {
            this.ShowAddress();
        },
        ffix() {
            this.ShowAddress();
        },
    },
    methods: {
        ShowAddress() {
            this.label = '';
            if (this.values) {
                if (!this.values.type && !this.values.wardId) {
                    if (this.values.provinceId) {
                        let p = _.find(this.dictionaries['province'], [
                            'id',
                            this.values.provinceId,
                        ]);
                        var _l = this.lang;
                        let tp;
                        if (!this.isDict) _l = 'vi';
                        if (p) {
                            this.provinceName = p[_l];
                            tp = p['typeName'];
                        }
                        if (this.isUnit && (tp == 'tinh' || tp == 'thanh-pho')) {
                            this.provinceName = this.provinceName
                                .replace('tỉnh', '')
                                .replace('Tỉnh', '')
                                .replace('tinh', '')
                                .replace('thành phố', '')
                                .replace('Thành Phố', '')
                                .replace('Thành phố', '')
                                .trim();
                        }
                        if (this.lang == 'vi') {
                            if (this.isUnit && (tp == 'tinh' || tp == 'thanh-pho')) {
                                this.label = `${this.units[this.lang][tp]} ${this.provinceName}`;
                            } else this.label = `${this.provinceName}`;
                        } else {
                            if (
                                typeof this.values.provinceId == String ||
                                typeof this.values.provinceId == 'string'
                            ) {
                                this.label = `${this.values.provinceId}`;
                            } else {
                                if (!this.isDict) {
                                    this.provinceName = this.$dictAccents(this.provinceName);
                                }
                                if (this.isUnit && (tp == 'tinh' || tp == 'thanh-pho'))
                                    this.label = '';
                                // `${this.provinceName} ${this.units[this.lang][tp]}`;
                                else this.label = `${this.provinceName}`;

                                console.log('this.label123123', this.label);
                                console.log('this.provinceName123', this.provinceName);
                            }
                        }
                    } else if (this.values.districtId) {
                        let p = _.find(this.dictionaries['district'], [
                            'id',
                            this.values.districtId,
                        ]);
                        let tp;
                        if (p) {
                            this.districtName = p.vi;
                            tp = p['typeName'];

                            if (this.lang == 'vi') {
                                if (this.isUnit)
                                    this.label = `${this.units[this.lang][tp]} ${
                                        this.districtName
                                    }`;
                                else this.label = `${this.districtName}`;
                            } else {
                                if (
                                    typeof this.values.districtId == String ||
                                    typeof this.values.districtId == 'string'
                                ) {
                                    if (!this.isDict) {
                                        this.label = this.$dictAccents(this.values.districtId);
                                    }
                                    if (this.isUnit)
                                        this.label = `${this.values.districtId} ${
                                            this.units[this.lang][tp]
                                        }`;
                                    else this.label = this.$dictAccents(this.values.districtId);
                                } else {
                                    this.districtName = this.$dictAccents(this.districtName);
                                    if (this.isUnit)
                                        this.label = `${this.districtName} ${
                                            this.units[this.lang][tp]
                                        }`;
                                    else this.label = this.districtName;
                                }
                            }
                        } else this.label = this.values.districtId;
                    }
                } else {
                    // let isFFix = true;
                    this.provinceName = this.values.provinceId;
                    this.districtName = this.values.districtId;
                    this.wardName = this.values.wardId;
                    if (this.lang == 'vi') {
                        if (this.type == 'province') {
                            this.label = `${this.provinceName}`;
                        } else if (this.type == 'district') {
                            this.label = `${this.districtName}`;
                        } else if (this.type == 'ward') {
                            this.label = `${this.wardName}`;
                        } else {
                            var objLabel = [];
                            if (this.wardName && this.wardName != '') objLabel.push(this.wardName);
                            if (this.districtName && this.districtName != '')
                                objLabel.push(this.districtName);
                            if (this.provinceName && this.provinceName != '')
                                objLabel.push(this.provinceName);
                            this.label = objLabel.join(this.separate);
                        }
                    } else {
                        if (this.type == 'province') {
                            this.label = `${this.$dictAccents(this.provinceName)}`;
                        } else if (this.type == 'district') {
                            this.label = `${this.$dictAccents(this.districtName)}`;
                        } else if (this.type == 'ward') {
                            this.label = `${this.$dictAccents(this.wardName)}`;
                        } else {
                            var objLabelJP = [];
                            if (this.wardName && this.wardName != '')
                                objLabelJP.push(this.$dictAccents(this.wardName));
                            if (this.districtName && this.districtName != '')
                                objLabelJP.push(this.$dictAccents(this.districtName));
                            if (this.provinceName && this.provinceName != '')
                                objLabelJP.push(this.$dictAccents(this.provinceName));
                            this.label = objLabelJP.join(this.separate);
                        }
                    }
                }
                //Thêm từ trước/sau
                if (this.afix && this.afix != '')
                    this.label = this.afix + this.separate + this.label;
                if (this.lang == 'jp') {
                    if (this.ffix && this.ffix != '') this.label = this.label + ' ' + this.ffix;
                } else {
                    if (this.ffix && this.ffix != '') this.label = `${this.ffix} ${this.label}`;
                }

                //upper case
                if (this.isUpper) this.label = this.label.toUpperCase();
            }
        },
    },
    created() {
        if (typeof this.values == 'string') {
            this.label = this.values;
        } else {
            //console.log('this.values', this.values)
            this.ShowAddress();
        }

        if (!this.label) this.label = ' ';
    },
};
</script>
