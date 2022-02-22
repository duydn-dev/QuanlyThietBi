import Vue from 'vue';
if (!process.env.VUE_ENV) {
    window.components = [];
    Vue.mixin({
        mounted() {
            window.components.push(this);
        }
    });
}