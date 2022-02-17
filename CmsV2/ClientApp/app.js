import Vue from 'vue';
import lodash from 'lodash';
import VueLodash from 'vue-lodash';
import { sync } from 'vuex-router-sync';
import VueScrollTo from 'vue-scrollto';
import VueMoment from 'vue-moment';
import VueCookie from 'vue-cookie';
import store from './vuex/index';
import router from './router';
import debugMixin from './core/mixins/debug';
import appSettings from './core/mixins/appSettings';
import alert from './core/plugins/alert';
import http from './core/plugins/http';
import uploadFile from './core/plugins/uploadFile';

import DateProfile from './components/_common/translate-control/date-profile';
import upload from './core/plugins/upload';
import Entry from './components/entry.vue';
import Phone from './components/_common/phone.vue';
import Avatar from './components/_common/avatar.vue';
import STT from './components/_common/stt.vue';
import Price from './components/_common/price.vue';
import Photo from './components/_common/photo.vue';
import AnimatedNumberDisplay from './components/_common/animated-number-display.vue';
import Pager from './components/_common/pager.vue';
import PagerV2 from './components/_common/v2/pager.vue';
import FileManager from './components/_common/file-manager/index.vue';
import ViewMore from './components/_common/viewmore.vue';
import DropDown from './components/_common/dropdown.vue';
import Modal from './components/_common/modal.vue';
import ModalV2 from './components/_common/v2/modal.vue';
import DateTimePicker from './components/_common/datetimepicker.vue';
import LanguageLabel from './components/_common/language-label';
import StatusLabel from './components/_common/status-label';
import FSelect from './components/_common/fselect';
import SelectBoxDataItem from './components/_common/select-box-data-item';
import SelectBoxDataItemTraslate from './components/_common/translate-control/select-box-data-item';
import DictLabel from './components/_common/translate-control/dict-label';
import GoogleTranslate from './components/_common/translate-control/google-translate';
import SelectBoxOptionTraslate from './components/_common/translate-control/select-box-option';
import Autocomplete from './components/_common/translate-control/autocomplete';
import AddressLabel from './components/_common/translate-control/address-label';
import AddressAI from './components/_common/translate-control/address-ai';
import DateLabel from './components/_common/translate-control/date-label';
import ReverseLabel from './components/_common/translate-control/reverse-label';
import DataLabel from './components/_common/translate-control/data-label';
import ResultAlert from './components/_common/alert';
import PhotoSelect from './components/_common/photo-select/index';
import SelectYear from './components/_common/select-year';
import FileSelect from './components/_common/file-select/index';
import BadgeStep from './components/_common/badge-step.vue';
import vueNumeric from './components/_common/numeric.vue';
import textMore from './components/_common/textmore.vue';
import InputText from './components/_common/translate-control/input-text.vue';
import AddressDict from './components/_common/translate-control/address-new.vue';
import AddressDictPart from './components/_common/translate-control/address-part.vue';
import SelectCategory from './components/_common/select-category.vue';
import CategoryLabel from './components/_common/category-label.vue';
import FullName from './components/_common/full-name.vue';
import routerLinkI18n from './components/_common/router-link-i18n.vue';
import documentViewer from './components/_common/document-viewer.vue';
import CommonMixins from './core/mixins/common';
import CurrentInfo from './core/mixins/currentInfo';
import print from './core/mixins/print';
import dictionary from './core/mixins/dictionary';
import CONSTANTS from './core/mixins/constants';
import filterStorage from './core/mixins/filterStorage';
import { VLazyImagePlugin } from 'v-lazy-image';
import VueLazyLoad from 'vue-lazyload';
import DataClipBoard from './components/_common/clipboard/data-clipboard';
import UIBuilder from './components/_common/ui-builder/ui-builder';
import UIItemWrapper from './components/_common/ui-builder/ui-item-wrapper';
import Notice from './components/_common/notice';
import VueApexCharts from 'vue-apexcharts';
import numberDisplay from './components/_common/number-display';
import numberic from './components/_common/numeric';

import ViewStatus from './components/_common/view-status.vue';
import SelectStatus from './components/_common/select-status.vue';

import InputAddressJ from './components/_common/address-japan-input.vue';
import comment from './components/_common/comment';


Vue.use(VLazyImagePlugin);

import multiselect from './components/_common/multi-select';
//import lang from './core/mixins/lang';
import i18n from './lang/_i18n';

import metaInfo from './core/mixins/metaInfo';
import uploadImage from './core/mixins/uploadImage';
import { VueEditor, Quill } from 'vue2-editor';
import Notifications from 'vue-notification';
import vSelect from 'vue-select';
import draggable from 'vuedraggable';
import VeeValidate, { Validator } from 'vee-validate';
import vi from 'vee-validate/dist/locale/vi';
import VueMultiselect from 'vue-multiselect';
import BootstrapVue from 'bootstrap-vue';
import Autocomplete1 from 'vuejs-auto-complete';
var Loading = null;
import 'vue-loading-overlay/dist/vue-loading.min.css';
// import 'vue-multiselect/dist/vue-multiselect.min.css';

import VueSignalR from './realtime/hubs/system-hub';
import money from './components/_common/money';

import scrollTable from './components/_common/scroll-table';
import confirmF5 from './components/_common/confirmf5';

import abroadPeriod from './components/_common/abroad-period';
import KanjiToRomaji from './components/_common/kanji-to-romaji';
import ProgressBar from './components/_common/progress';
import vClickOutside from 'v-click-outside';
import BranchSelect from './components/_common/branch-select';
import StarRating from 'vue-star-rating';
import userComplete from './components/_common/user-complete';
import vGanttChart from 'v-gantt-chart';
import ZoneSelect from './components/_common/zone-select';
import Wrapper from './components/_shared/wrapper';
import WrapperV2 from './components/_shared/v2/wrapper';
import ManagementWrapper from './components/management/management-wrapper';
import VueCompositionAPI from '@vue/composition-api'
import VTooltip from 'v-tooltip'

Vue.use(VueCompositionAPI)
Vue.use(vGanttChart);
Vue.use(VueSignalR);
//var $ = null;
// let html2Canvas = null;
var vueCustomScrollbar = null;
if (typeof window !== 'undefined') {
    Loading = require('vue-loading-overlay');
    vueCustomScrollbar = require('vue-custom-scrollbar');
    //$ = require('jquery');
    //window.jQuery = $;
    //window.$ = $;
    // html2Canvas = require('vue-html2canvas');
}
import FlowChart from 'flowchart-vue';

Vue.use(FlowChart);
Vue.use(VTooltip)
Vue.mixin(metaInfo);
Vue.use(Loading);
Vue.use(VueCookie);
// Vue.use(Vue2Filters);
Vue.use(VueLodash, lodash);
Vue.use(VueScrollTo);
Vue.use(CommonMixins);
Vue.use(VueMoment);
Vue.use(vSelect);
Vue.use(draggable);
Vue.use(CurrentInfo);
Vue.use(print);
Vue.use(dictionary);
Vue.use(filterStorage);
Vue.use(VueMultiselect);
Vue.use(Autocomplete);
Vue.use(VueApexCharts);
Vue.use(SelectCategory);
Vue.use(vClickOutside);
Vue.use(VeeValidate, {
    classes: true
});

Vue.use(VueLazyLoad, {
    preLoad: 1.3,
    error: 'dist/error.png',
    loading: 'dist/loading.gif',
    attempt: 1
});

Validator.localize('vi', vi);

Vue.filter('twoDigits', value => {
    if (value.toString().length <= 1) {
        return '0' + value.toString();
    }
    return value.toString();
});

Vue.use(Notifications);
Vue.use(BootstrapVue);
InputAddressJ;
Vue.component('date-profile', DateProfile);
Vue.component('phone', Phone);
Vue.component('input-addj', InputAddressJ);
Vue.component('scrollTable', scrollTable);
Vue.component('selectstatus', SelectStatus);
Vue.component('viewstatus', ViewStatus);
Vue.component('data-clipboard', DataClipBoard);
Vue.component('avatar', Avatar);
Vue.component('alert', ResultAlert);
Vue.component('stt', STT);
Vue.component('photo', Photo);
Vue.component('animated-number-display', AnimatedNumberDisplay);
Vue.component('photo-select', PhotoSelect);
Vue.component('select-year', SelectYear);
Vue.component('file-select', FileSelect);
Vue.component('price', Price);
Vue.component('dropdown', DropDown);
Vue.component('file-manager', FileManager);
Vue.component('datetimepicker', DateTimePicker);
Vue.component('viewmore', ViewMore);
Vue.component('modal', Modal);
Vue.component('modalv2', ModalV2);
Vue.component('pager', Pager);
Vue.component('pagerv2', PagerV2);
Vue.component('router-link-i18n', routerLinkI18n);
Vue.component('v-select', vSelect);
Vue.component('language-label', LanguageLabel);
Vue.component('status-label', StatusLabel);
Vue.component('draggable', draggable);
Vue.component('vue-multiselect', VueMultiselect);
Vue.component('fselect', FSelect);
Vue.component('badgestep', BadgeStep);
Vue.component('numeric', vueNumeric);
Vue.component('text-more', textMore);
Vue.component('select-box-data-item', SelectBoxDataItem);
Vue.component('select-dict', SelectBoxDataItemTraslate);
Vue.component('google-translate', GoogleTranslate);
Vue.component('select-option', SelectBoxOptionTraslate);
Vue.component('autocomplete-dict', Autocomplete);
Vue.component('document-viewer', documentViewer);
Vue.component('full-name', FullName);
Vue.component('autocomplete', Autocomplete1);
Vue.component('address-dict', AddressDict);
Vue.component('address-dict-part', AddressDictPart);
Vue.component('address-label', AddressLabel);
Vue.component('address-ai', AddressAI);
Vue.component('date-label', DateLabel);
Vue.component('data-label', DataLabel);
Vue.component('reverse-label', ReverseLabel);
Vue.component('multiselect', multiselect);
Vue.component('ui-builder', UIBuilder);
Vue.component('ui-item-wrapper', UIItemWrapper);
Vue.component('notice', Notice);
Vue.component('apexchart', VueApexCharts);
Vue.component('select-category', SelectCategory);
Vue.component('category-label', CategoryLabel);
Vue.component('input-text', InputText);
Vue.component('number-display', numberDisplay);
Vue.component('numberic', numberic);
Vue.component('money', money);
Vue.component('confirmf5', confirmF5);
Vue.component('abroadPeriod', abroadPeriod);
Vue.component('dict-label', DictLabel);
Vue.component('kanji-to-romaji', KanjiToRomaji);
Vue.component('progressBar', ProgressBar);
Vue.component('vue-custom-scrollbar', vueCustomScrollbar);
Vue.component('branch-select', BranchSelect);
Vue.component('star-rating', StarRating);
Vue.component('userComplete', userComplete);
Vue.component('comment', comment);
Vue.component('zone-select', ZoneSelect);
Vue.component('wrapper', Wrapper);
Vue.component('wrapperv2', WrapperV2);
Vue.component('managementwrapper', ManagementWrapper);

import "vue-select/dist/vue-select.css";
import 'vue-multiselect/dist/vue-multiselect.min.css';
Vue.filter('trimFloat', function (value) {
    if (!value) return 0;
    return Math.round(value * 100) / 100;
});

sync(store, router);

const app = new Vue({
    i18n,
    router,
    store,
    ...Entry
});

if (!process.env.VUE_ENV) window.app = app;
export { app, router, store };
