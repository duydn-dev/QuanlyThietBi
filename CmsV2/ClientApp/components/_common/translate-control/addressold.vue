<template>
    <div class="row" v-if="lang=='vi'">
        <div :class="className">
            <div class="form-group">
                <!-- <fselect
                    v-if="provinceList"
                    v-model="provinceId"
                    placeholder="Chọn tỉnh/tphố"
                    :options="provinceList"
                    :label="label"
                    @selectNode="selectProvince"
                />-->
                <select-dict
                    data-type-name="province"
                    :onlyDataByAdmin="isOnlyAdmin"
                    :allowAdd="false"
                    v-model="provinceId"
                    placeholder="---Tất cả---"
                    :multiple="false"
                    :disabled="disabled"
                />
            </div>
        </div>
        <div :class="className">
            <div class="form-group">
                <fselect
                    v-model="districtId"
                    placeholder="Chọn quận/huyện"
                    :options="districtList"
                    :label="label"
                    :key="`district_${count}`"
                    :disabled="disabled"
                />
                <!-- @selectNode="selectDistrict" -->
            </div>
        </div>
        <div :class="className" v-if="isShowWard">
            <div class="form-group">
                <fselect
                    v-model="wardId"
                    placeholder="Chọn xã/phường"
                    :options="wardList"
                    :key="`ward_${count}`"
                    :disabled="disabled"
                />
                <!--  @selectNode="selectWard" -->
            </div>
        </div>
    </div>
    <div class="row" v-else>
        <div :class="className">
            <div class="form-group">
                <input class="form-control" :value="provinceName" disabled />
            </div>
        </div>
        <div :class="className">
            <div class="form-group">
                <input class="form-control" :value="districtName" disabled />
            </div>
        </div>
        <div :class="className">
            <div class="form-group">
                <input class="form-control" :value="wardName" disabled />
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    props: {
        values: {
            type: Object,
        },
        returnObject: {
            type: Boolean,
            default: false,
        },
        label: {
            type: null,
            default: 'vi',
        },
        lang: {
            type: null,
            default: 'vi',
        },
        isDict: {
            type: Boolean,
            default: false,
        },
        disable: {
            type: Boolean,
            default: false,
        },
        isOnlyAdmin: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        isShowWard: {
            type: Boolean,
            default: true,
        },
        className: {
            type: String,
            default: 'col-lg-4 col-xl-4',
        },
    },
    data() {
        return {
            value: null,
            wardId: null,
            districtId: null,
            provinceId: null,
            ward: null,
            district: null,
            province: null,
            wardList: null,
            districtList: null,
            provinceList: null,
            districtName: null,
            provinceName: null,
            wardName: null,
            count: 0,
            isFirstLoad: true,
        };
    },
    computed: {},
    methods: {
        ...mapActions(['getWardList']),
        selectProvince(node) {
            this.province = node;
            if (this.districtList && this.districtList.length > 0)
                this.districtId = this.districtList[0].id;
        },
        selectDistrict(node) {
            this.district = node;
        },
        selectWard(node) {
            this.ward = node;
        },
        getWardByDistrict() {
            if (this.districtId)
                this.getWardList(this.districtId).then((o) => {
                    this.wardList = o;
                    if (this.wardList && this.wardList.length > 0 && !this.isFirstLoad) {
                        this.wardId = this.wardList[0].id;
                    }
                    this.count++;
                    this.isFirstLoad = false;
                });
            else {
                this.wardList = [];
                this.isFirstLoad = false;
            }
        },
    },
    watch: {
        wardId() {
            if (this.lang == 'vi')
                if (this.returnObject) {
                    this.$emit('input', {
                        ward: this.ward,
                        district: this.district,
                        province: this.province,
                    });
                } else
                    this.$emit('input', {
                        wardId: this.wardId,
                        districtId: this.districtId,
                        provinceId: this.provinceId,
                    });
        },
        provinceId() {
            if (this.lang == 'vi') {
                this.districtList = _.filter(this.dictionaries['district'], [
                    'parentId',
                    this.provinceId,
                ]);

                if (this.districtList && this.districtList.length > 0 && !this.isFirstLoad)
                    this.districtId = this.districtList[0].id;

                if (this.returnObject) {
                    this.$emit('input', {
                        ward: this.ward,
                        district: this.district,
                        province: this.province,
                    });
                } else
                    this.$emit('input', {
                        wardId: this.wardId,
                        districtId: this.districtId,
                        provinceId: this.provinceId,
                    });
            }
        },
        districtId() {
            this.getWardByDistrict();
            if (this.lang == 'vi') {
                // this.wardList = _.filter(this.dictionaries['ward'], ['parentId', this.districtId]);

                // if (this.wardList && this.wardList.length > 0 && !this.isFirstLoad) {
                //     this.wardId = this.wardList[0].id;
                // }

                if (this.returnObject) {
                    this.$emit('input', {
                        ward: this.ward,
                        district: this.district,
                        province: this.province,
                    });
                } else
                    this.$emit('input', {
                        wardId: this.wardId,
                        districtId: this.districtId,
                        provinceId: this.provinceId,
                    });
            }
        },
        lang() {
            if (this.label && this.label != 'vi' && this.label != this.lang)
                this.Flabel = this.label;
            else this.Flabel = this.lang;
        },
    },
    created() {
        if (this.values) {
            if (!this.returnObject) {
                this.wardId = this.values.wardId || null;
                this.districtId = this.values.districtId || null;
                this.provinceId = this.values.provinceId || null;
            } else {
                this.ward = this.values.ward;
                this.district = this.values.district;
                this.province = this.values.province;
                this.wardId = this.values.ward.id || null;
                this.districtId = this.values.district.id || null;
                this.provinceId = this.values.province.id || null;
            }
        }
        if (this.lang == 'vi') {
            this.provinceList = this.dictionaries['province'];
        } else {
            let p = _.find(this.dictionaries['province'], ['id', this.provinceId]);
            let d = _.find(this.dictionaries['district'], ['id', this.districtId]);
            let w = _.find(this.dictionaries['ward'], ['id', this.wardId]);

            var _l = this.lang;
            if (!this.isDict) _l = 'vi';
            if (p) this.provinceName = p[_l];
            if (d) this.districtName = d[_l];
            if (w) this.wardName = w[_l];

            if (!this.isDict) {
                this.provinceName = this.$dictAccents(this.provinceName);
                this.districtName = this.$dictAccents(this.districtName);
                this.wardName = this.$dictAccents(this.wardName);
            }
        }
    },
};
</script>
