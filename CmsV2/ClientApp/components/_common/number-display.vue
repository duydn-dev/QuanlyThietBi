<template>
    <label style="margin-bottom: 0;" :class="{'form-control': isControl}">{{ displayPercent }}</label>
</template>
<script>
export default {
    name: 'Price',
    props: {
        value: {
            type: Number,
            default: 0
        },
        isControl: {
            type: Boolean,
            default: false
        },
        zeroText: {
            type: String,
            default: ''
        },
        unit: {
            type: String,
            default: 'vi'
        },
        decimalDigits: {
            type: Number,
            default: 0
        }
        
    },
    data() {
        return {};
    },
    computed: {
        displayPercent() {
         
            let _price = '';
            if (this.value) {
                _price = this.getNumberFormat(this.value, this.decimalDigits);
                //_price = this.value.toString();
            } else _price = '---';
            return _price;

        }
    }
};
</script>
