import Vue from 'vue';
import CONSTANTS from '../utils/constants';

Vue.mixin({
    data() {
        return {
            CONSTANTS
        };
    }
});