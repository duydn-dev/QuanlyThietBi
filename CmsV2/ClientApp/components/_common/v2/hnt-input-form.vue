<template>
    <div class="hnt-input-form" :data="dataInput" @data-output="(data) => (dataOutput = data)">
        <slot></slot>
    </div>
</template>
<script>
// import { clickOutSide } from '../../../core/utils/click-outside-directive';
    export default {
        name: 'InputForm',
        data() {
            return {
                dataInput: {
                    "input_title":"Đã ban hành kế hoạch",
                    "input_name":"c",
                    "input_value":0,
                    "intput_type":"number",
                    "input_actiontype":"checkbox"
                },
                dataOutput: {},
            };
        },
        computed: {
        },
        methods: {
        },
        created() {
            
        },
    };
</script>