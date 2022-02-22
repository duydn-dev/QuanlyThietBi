<template>
    <div class="row">
        <div class="col-12 mb-1" v-if="lang=='vi'" ref="heightParent">
            <div class="row mb-2" v-if="isLoader">
                <template v-if="numberOfCells == 3">
                    <div class="col-4">
                        <label>Xã/phường</label>
                        <AddressSuggest v-model="ward" placeholder="Xã/phường" typeName="ward" />
                    </div>
                    <div class="col-4">
                        <label>Quận/huyện</label>
                        <AddressSuggest v-model="district" placeholder="Quận/huyện" typeName="district" />
                    </div>
                    <div class="col-4">
                        <label>Tỉnh/tp</label>
                        <AddressSuggest v-model="province" placeholder="Tỉnh/thành phố" typeName="province" />
                    </div>
                </template>
                <template v-else-if="numberOfCells == 2">
                    <div class="col-6">
                        <label>Quận/huyện</label>
                        <AddressSuggest v-model="district" placeholder="Quận/huyện" typeName="district" />
                    </div>
                    <div class="col-6">
                        <label>Tỉnh/tp</label>
                        <AddressSuggest v-model="province" placeholder="Tỉnh/thành phố" typeName="province" />
                    </div>
                </template>
                <template v-else>
                    <div class="col-12">
                        <AddressSuggest v-model="ward" placeholder="Nhập địa chỉ" />
                    </div>
                </template>
            </div>
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
            <input v-else class="form-control" v-model="ward" />
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import AddressSuggest from '../../_common/address-suggest';
    export default {
        name: 'AddressAI',
        components: { AddressSuggest },
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
                listData: [],
                isInput: false,
                ward: '',
                district: '',
                province: '',
                dataLabel: '',
                isLoader: false
            };
        },
        computed: {
        },
        watch: {
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
            if (!this.isInput && !_.isEmpty(this.values) && window.innerWidth < 1369)
                this.matchHeight = this.$refs.heightParent.clientHeight + 5 + 'px';
            else
                this.matchHeight = '34 px';
        },
        methods: {
            ...mapActions(['addressById']),
            ShowAddress() {
                if (this.lang == 'vi' && this.values && parseInt(this.values.wardId) > 0 && parseInt(this.values.districtId) > 0 && parseInt(this.values.provinceId) > 0) {
                    this.addressById(this.values.wardId).then((o) => {
                        if (!o)
                            return;
                        this.ward = o.wardType;
                        this.district = o.districtType;
                        this.province = o.provinceType;
                        this.dataLabel = { wardId: this.ward, districtId: this.district, provinceId: this.province, units: [], type: 1 };
                        if (this.numberOfCells == 1) {
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
                            this.$forceUpdate();
                            this.aiKey++;

                        }
                        this.isLoader = true;
                    });
                }
                else {
                    this.isLoader = true;
                    if (!this.values) {
                        return;
                    }
                    this.ward = this.values.wardId || '';
                    this.district = this.values.districtId || '';
                    this.province = this.values.provinceId || '';
                    if (this.lang == "en") {
                        if (this.ward || this.district || this.province) {
                            this.translate(this.values).then(res => {
                                this.ward = res.wardId;
                                this.district = res.districtId;
                                this.province = res.provinceId;
                                this.dataLabel = { wardId: this.ward, districtId: this.district, provinceId: this.province, units: [], type: 1 };
                            });
                        }
                    }
                    else if (this.lang == "jp") {
                        if (this.ward.toLowerCase().includes("ubnd") || this.ward.toLowerCase().includes("ủy ban nhân dân")) {
                            this.ward = this.ward.toLowerCase().replace("ubnd", "").replace("ủy ban nhân dân", "");
                            this.ward = this.$dictAccents(this.ward + "人民委員会");
                            this.district = this.$dictAccents(this.district);
                            this.province = this.$dictAccents(this.province);
                            this.dataLabel = { wardId: this.ward, districtId: this.district, provinceId: this.province, units: [], type: 1 };
                        }
                        else {
                            this.ward = this.$dictAccents(this.ward);
                            this.district = this.$dictAccents(this.district);
                            this.province = this.$dictAccents(this.province);
                            this.dataLabel = { wardId: this.ward, districtId: this.district, provinceId: this.province, units: [], type: 1 };
                        }
                    }
                    else {
                        this.dataLabel = { wardId: this.ward, districtId: this.district, provinceId: this.province, units: [], type: 1 };
                    }
                    if (this.numberOfCells == 1) {
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
                        this.$forceUpdate();
                    }
                }
            },
            translate(keyword) {
                return new Promise((resolve) => {
                    return this.$http({
                        data: {
                            m: 'address',
                            fn: 'translate-ai',
                            keyword: keyword
                        }
                    }).then(res => { return resolve(res.data); })
                });
            },
            emitAddress() {
                this.dataLabel = { wardId: this.ward, districtId: this.district, provinceId: this.province, units: [], type: 1 };
                this.$emit('input', this.dataLabel);
            }
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
