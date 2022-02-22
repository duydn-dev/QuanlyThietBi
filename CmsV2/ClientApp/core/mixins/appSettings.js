import Vue from 'vue';
import { mapGetters } from 'vuex';
if (!process.env.VUE_ENV) {
    let isFirstLoad = false;    
    Vue.mixin({
        computed: {
            ...mapGetters(['appSettings'])
        },
        methods: {
            getStorageUrl(val) {
                if (val) {
                    if (val.startsWith('http'))
                        return val;
                    return this.appSettings.configs.storageDomain + val;
                }
                return val;
            },
            removeStorageUrl(val) {
                if (val) {
                    return val.replace(this.appSettings.configs.storageDomain, '');
                }
                return val;
            }
        }
    });
}