import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';

if (!process.env.VUE_ENV) {
    Vue.mixin({
        computed: {
            ...mapGetters(['currentUser','permissions'])
        }
    });
}