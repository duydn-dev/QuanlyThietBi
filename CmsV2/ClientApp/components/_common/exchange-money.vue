<template>
    <div style="float: right">
        <div class="form-inline">
            <div class="form-group">
                <label>Loại tiền</label>
                <currencyUnitSelect v-model="unit" class="form-control mr-2 ml-2" />
            </div>

            <div class="form-group">
                <label class="mr-2">Tỷ giá</label>
                <numberic v-model="exChangeRate" />
            </div>
        </div>
    </div>
</template>

<script>
import currencyUnitSelect from './currency-unit-select';
export default {
    data() {
        return {
            unit: 'VND',
            exChangeRate: 2000
        };
    },
    watch: {
        exChangeRate() {
            this.$emit('input', this.exChangeRate);
        }
    },
    components: { currencyUnitSelect }
};
</script>

<style scoped>
.div-inline-50 {
    display: inline;
    width: 50%;
    float: left;
}
</style>