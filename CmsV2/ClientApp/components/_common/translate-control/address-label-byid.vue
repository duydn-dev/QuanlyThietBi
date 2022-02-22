<template>
    <span v-if="mode=='edit'" style="white-space:normal">{{label}}</span>
    <input v-else-if="mode=='input'" type="text" disabled class="form-control" :value="label" />
</template>
<script>
    import { mapActions } from 'vuex';
    export default {
        props: {
            values: {
                type: null
            },
            type: {
                type: null,
                default: ''
            },
            lang: {
                type: String,
                default: 'vi'
            },
            separate: {
                type: null,
                default: ','
            },
            mode: {
                default: 'edit'
            }
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
            };
        },
        watch: {
            'values'() {
                this.ShowAddress();
            }
        },
        methods: {
            ...mapActions(['addressById']),
            ShowAddress() {
                this.label = '';
                if (this.values) {

                    if (this.values && this.values.wardId) {
                        if (this.values.wardId == ' ') return;
                        this.addressById(this.values.wardId).then((o) => {
                            if (!o)
                                return;
                            if (this.type == 'province') {
                                this.label = o.provinceType;
                            } else if (this.type == 'district') {
                                this.label = o.wardType;
                            } else if (this.type == 'ward') {
                                this.label = o.wardType;
                            } else {
                                this.label = o.name;
                            }
                        });
                    }
                    else if (this.values && this.values.provinceId) {
                        let p = _.find(this.dictionaries['province'], ['id', this.values.provinceName]);
                        if (p) {
                            this.provinceName = p[this.lang];
                            this.label = `${this.provinceName}`;
                        }
                        else
                            this.label = this.values.provinceName;
                    }
                    else if (this.values && this.values.districtId) {
                        let p = _.find(this.dictionaries['district'], ['id', this.values.districtId]);
                        if (p) {
                            this.districtName = p.vi;
                            this.label = `${this.provinceName}`;
                        } else
                            this.label = this.values.districtId;
                    }
                    else if (this.values && typeof (this.values) == "string") {
                        this.label = this.values;
                    }
                }

            }
        },
        created() {

            if (typeof this.values == 'string') {
                this.label = this.values;
            }
            else {
                this.ShowAddress();
            }

            if (!this.label)
                this.label = ' ';
        }
    };
</script>
