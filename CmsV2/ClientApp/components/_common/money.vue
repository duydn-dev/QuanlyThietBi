<template>
    <div class="input-group">
        <numeric v-model="money" />
        <div class="input-group-append">
            <currencyUnitSelect v-model="unitSelect" class="form-control" />
        </div>
    </div>
</template>

<script>
import currencyUnitSelect from './currency-unit-select';
export default {
    components: { currencyUnitSelect },
    props: {
        value: null
    },
    data() {
        return {
            money: 0,
            unitSelect: 'VND'
        };
    },
    watch: {
        money() {
            this.$emit('input', { money: this.money, unit: this.unitSelect });
        },
        unitSelect() {
            this.$emit('input', { money: this.money, unit: this.unitSelect });
        }
    },
    created() {
        if (this.value) {
            this.money = this.value.money;
            if (this.value.unit) this.unitSelect = this.value.unit;
        }
    }
};
</script>

<style>
</style>