<template>
    <fselect v-model="selected" :options="items" paceholder="Kỳ" />
</template>

<script>
export default {
    props: ['type', 'value', 'isHasAll'],
    data() {
        return {
            lstItem: [],
            selected: null
        };
    },
    computed: {
        items() {
            let temps = [];
            if (this.type == 1) {
                _.forEach(this.lstItem, o => {
                    temps.push({ id: o.period, name: `Kỳ tháng ${o.month} năm ${o.year}` });
                });
            } else if (this.type == 2) {
                _.forEach(this.lstItem, o => {
                    temps.push({ id: o.month, name: `Kỳ tháng ${o.month}` });
                });
            }

            if (this.isHasAll) {
                temps.unshift({ id: '0001-01-01', name: 'Tất cả' });
            }
            return temps;
        }
    },
    watch: {
        selected() {
            this.$emit('input', this.selected);
            // if (this.selected)
            // else this.$emit('input', null);
        }
    },
    methods: {
        getItems() {
            this.$http({
                data: {
                    m: 'AbroadSchoolInterviewPeriod',
                    fn: 'list-period'
                }
            })
                .then(response => {
                    this.lstItem = response.data;
                })
                .catch(err => {
                    return this.$message(err.message, 'error');
                });
        }
    },
    created() {
        this.selected = this.value;
        this.getItems();
    }
};
</script>

<style>
</style>