<template>
    <router-link :to="toWithLang">
        <slot />
    </router-link>
</template>

<script>
export default {
    name: 'RouterLinkI18n',
    props: {
        to: {
            type: String,
            required: true
        }
    },
    computed: {
        toWithLang() {
            return '/' + this.lang + this.to;
        }
    }
};
</script>
