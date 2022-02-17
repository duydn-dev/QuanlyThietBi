<template>
    <span>{{valueShow}}</span>
</template>
<script>
    import { mapActions } from 'vuex';
    export default {
        props: {
            value: {
                type: null
            },
            lang: {
                type: null,
                default: 'vi'
            }
        },
        data() {
            return {
                valueShow: ''
            };
        },
        methods: {
            ...mapActions(['getMalformationById'])
        },
        created() {
            if (this.value) {
                if (typeof (this.value) == 'string') {
                    this.valueShow = this.value;
                    return;
                }
                else if (typeof (this.value) == 'object') {
                    if (this.value.id > 0)
                        this.getMalformationById(this.value.id).then((o) => {
                            if (o) {
                                this.valueShow = o[this.lang];
                                if (!this.valueShow)
                                    this.valueShow = this.$dictAccents(o.vi);
                            }
                            else
                                this.valueShow = this.value.value;
                        });
                }
                else
                    this.valueShow = "";
                
                if (this.lang != 'vi') {
                    this.$http({
                        data: {
                            m: 'Malformation',
                            fn: 'dict',
                            value: this.value,
                            lang: this.lang
                        }
                    }).then(response => {
                        this.valueShow = response.data;
                    });
                }
            }
        }
    };
</script>
