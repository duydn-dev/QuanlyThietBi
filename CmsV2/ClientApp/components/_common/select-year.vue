<template>
    <fselect v-model="values"
             :options="listYear"
             label="values"
             code="values"></fselect>
</template>
<script>
    export default {
        name: 'select-year',
        components: {},
        props: {
            value: {
                type: null
            }
        },
        data() {
            return {
                values: null
            };
        },
        computed: {
            listYear() {
                let list = [];
                for (var i = 0; i < 100; i++) {
                    let year = {
                        id: null,
                        values: null
                    };
                    year.id = i;
                    year.values = new Date().getFullYear() - i+4;
                    list.push(year);
                }
                return list;
            }
        },
        watch: {
            'values'() {
                this.$emit('input', this.values)
            }
        },
        methods: {
        },
        created() {
            this.values = this.value;
        }
    };
</script>
