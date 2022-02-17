import Vue from 'vue';
import { getLang } from '../../lang/utils';

Vue.mixin({
    computed: {
        lang() {
            return this.$route.params.language || getLang();
        }
    }
});