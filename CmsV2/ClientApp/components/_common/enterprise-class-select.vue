<template>
    <fselect v-model="selected" :options="lstClass" placeholder="Lớp" />
</template>

<script>
export default {
    data() {
        return {
            lstClass: null,
            selected: null
        };
    },
    watch: {
        selected() {
            this.$emit('input', this.selected);
        }
    },
    methods: {
        getListClass() {
            this.$http({
                data: {
                    m: 'Enterprise',
                    fn: 'list_class'
                }
            })
                .then(response => {
                    this.lstClass = response.data;
                })
                .catch(err => {
                    return this.$message(err.message, 'error');
                });
        }
    },
    created() {
        this.getListClass();
    }
};
</script>

<style>
</style>