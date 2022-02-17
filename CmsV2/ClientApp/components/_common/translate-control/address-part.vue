<template>
    <div class="row" v-if="lang=='vi'">
        <div class="col-lg-6 col-xl-6">
            <div class="form-group">
                <input v-model="districtId" class="form-control" placeholder="Nhập quận/huyện" />
            </div>
        </div>
        <div class="col-lg-6 col-xl-6">
            <div class="form-group">
                <fselect v-if="provinceList"
                         v-model="provinceId"
                         placeholder="Chọn tỉnh/tphố"
                         :options="provinceList"
                         :label="Flabel"
                         @selectNode="selectProvince" />
            </div>
        </div>
    </div>
    <div class="row" v-else>
        <div class="col-lg-6 col-xl-6">
            <div class="form-group">
                <input class="form-control" :value="districtName" />
            </div>
        </div>
        <div class="col-lg-6 col-xl-6">
            <div class="form-group">
                <input class="form-control" :value="provinceName" />
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            values: {
                type: Object
            },
            returnObject: {
                type: Boolean,
                default: false
            },
            label: {
                type: null,
                default: 'vi'
            },
            lang: {
                type: null,
                default: 'vi'
            },
        },
        data() {
            return {
                value: null,
                districtId: null,
                provinceId: null,
                district: null,
                province: null,
                districtList: null,
                provinceList: null,
                Flabel: 'vi',
                districtName: null,
                provinceName: null,
            };
        },
        computed: {
        },
        methods: {
            selectProvince(node) {
                this.province = node;
            },
            selectDistrict(node) {
                this.district = node;
            },
        },
        watch: {
            provinceId() {
                if (this.lang == 'vi') {
                    this.districtList = _.filter(this.dictionaries['district'], ['parentId', this.provinceId]);
                    if (this.returnObject) {
                        this.$emit('input', {
                            district: this.district,
                            province: this.province
                        });
                    } else
                        this.$emit('input', {
                            districtId: this.districtId,
                            provinceId: this.provinceId
                        });
                }
            },
            districtId() {
                if (this.lang == 'vi') {
                    if (this.returnObject) {
                        this.$emit('input', {
                            district: this.district,
                            province: this.province
                        });
                    } else
                        this.$emit('input', {
                            districtId: this.districtId,
                            provinceId: this.provinceId
                        });
                }
            },
            "lang"() {
                if (this.label && this.label != 'vi' && this.label != this.lang)
                    this.Flabel = this.label;
                else
                    this.Flabel = this.lang;
            }
        },
        created() {
            if (this.values) {
                if (!this.returnObject) {
                    this.districtId = this.values.districtId || null;
                    this.provinceId = this.values.provinceId || null;
                } else {
                    this.district = this.values.district;
                    this.province = this.values.province;
                    this.districtId = this.values.district.id || null;
                    this.provinceId = this.values.province.id || null;
                }
            }
            if (this.lang == 'vi') {
                if (this.label && this.label != 'vi' && this.label != this.lang)
                    this.Flabel = this.label;
                else
                    this.Flabel = this.lang;
                this.provinceList = _.filter(this.dictionaries['province'], ['createdBy', 'admin']);
                if (this.provinceId)
                    this.provinceList = _.concat(this.provinceList, _.find(this.dictionaries['province'], ['id', this.provinceId]));
            }
            else {
                let p = _.find(this.dictionaries['province'], ['id', this.provinceId]);
                if (Number.isInteger(this.districtId)) {
                    let d = _.find(this.dictionaries['district'], ['id', this.districtId]);
                    if (d)
                        this.districtName = d['vi'];
                    this.districtName = this.$dictAccents(this.districtName);
                } else
                this.districtName = this.$dictAccents(this.districtId);

                if (p)
                    this.provinceName = p['vi'];

                this.provinceName = this.$dictAccents(this.provinceName);

            }
        }
    };
</script>
