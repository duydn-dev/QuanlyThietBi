<template>
    <div>
        <div class="box-head">
            <strong class="txt-head">Test</strong>
        </div>
        <div class="box-ct">
            <hntInputForm />
        </div>
    </div>
</template>
<script>
    import hntInputForm from '../_common/v2/hnt-input-form.vue';
    export default {
        name: 'ReportIndex',
        components: {hntInputForm},
    };
</script>