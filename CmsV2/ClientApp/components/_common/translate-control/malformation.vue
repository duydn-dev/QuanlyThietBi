<template>
    <div class="row">
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
            }
        },
        data() {
            return {
                value: null,
                id: null,
                valueShow: ''
            };
        },
        watch: {
            valueShow() {
                this.$emit('input', this.valueShow);
            }
        },
        methods: {
            ...mapActions(['getMalformationById']),
        },
        created() {
            if (this.values) {
                //if (typeof (this.values) == 'string') {
                //    this.valueShow = this.values;
                //    return;
                //}
                //else if (typeof (this.values) == 'object') {
                //    this.id = this.values.id || null;
                //    this.value = this.values.value || null;
                //}
                //else
                //    this.id = parseInt(this.values)

                //if (this.id > 0)
                //    this.getMalformationById(this.id).then((o) => {
                //        if (o) {
                //            if (this.lang == 'vi')
                //                this.selectedData = o;
                //            else {
                //                if (o[this.lang])
                //                    this.valueShow = o[this.lang];
                //                else
                //                    this.valueShow = this.$dictAccents(o.vi);
                //            }
                //        }
                //    });
                if (this.lang != 'vi') {
                    this.$http({
                        data: {
                            m: 'Malformation',
                            fn: 'dict',
                            value: this.values,
                            lang: this.lang
                        }
                    }).then(response => {
                        if (response.data != '')
                            this.valueShow = response.data;
                        else this.valueShow = this.values;
                    });
                }
                else
                    this.valueShow = this.values;
            }
        }
    };
</script>
