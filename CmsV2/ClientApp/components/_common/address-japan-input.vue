<template>
    <span> {{label}}</span>
</template>

<script>
    export default {
        name: 'text-address-japan',
        props: {
            provinceId: {
                type: Number,
                required: 0
            },
           
        },
        data() {
            return {
                jpProvinceList: [],
                label:''
            }
        },
        watch: {
            'provinceId'() {
                if (!this.provinceId) this.label = '---';
                else {
                    if (this.jpProvinceList) {
                      
                        var obj = _.find(this.jpProvinceList, (o) => { return o.id == this.provinceId })
                        this.label = obj.label;
                    }
                }
            }
        },
        computed: {
          
        },
        created() {
            this.jpProvinceList = this.dictionaries['jpProvince'];
             if (!this.provinceId) this.label = '---';
                else {
                    if (this.jpProvinceList) {
                      
                        var obj = _.find(this.jpProvinceList, (o) => { return o.id == this.provinceId })
                        if (obj)
                            this.label = obj.romaji;
                        else this.label = '';
                    }
                }
        }
    }
</script>
