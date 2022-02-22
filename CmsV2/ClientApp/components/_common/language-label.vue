<template>
    <span class="badge badge-info">
        <template v-for="lang in appSettings.languages">
            <template v-if="lang.code == code">
                {{ lang.name }}
            </template>
        </template>
    </span>
</template>
<script>
export default {
    name: 'LanguageLabel',
    props: {
        code: {
            type: String,
            default: '',
            required: true
        }
    }
};
</script>
