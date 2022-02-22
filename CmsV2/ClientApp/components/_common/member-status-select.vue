<template>
    <fselect
        v-model="value"
        placeholder="---Tất cả---"
        :options="lstStatus"
        :treeselectable="true"
        :disableParent="true"
        :multiple="false"
    />
</template>

<script>
export default {
    props: ['departmentCode', 'systemType'],
    data() {
        return {
            lstStatus: [],
            value: null
        };
    },
    watch: {
        value() {
            this.$emit('input', this.value);
        }
    },
    created() {
        this.$http({
            data: {
                m: 'MemberStatus',
                fn: 'filter-status',
                departmentType: this.departmentCode,
                type: this.systemType
            }
        })
            .then(res => {
                this.lstStatus = res.data;
            })
            .catch(err => {
                return this.$message(err.message, 'error');
            });
    }
};
</script>

<style>
</style>