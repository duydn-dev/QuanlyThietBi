<template>
    <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor">
        <div id="kt_subheader"
             class="kt-subheader kt-grid__item">
            <slot name="header"></slot>
            <div class="kt-header__topbar-item kt-header__topbar-item--user"
                 :class="{ show: menuIndex == 2 }"
                 style="position:relative">
                <div class="kt-header__topbar-wrapper" v-tooltip.auto="'Hệ thống'" @click="toggleMenu(2)"
                     data-toggle="dropdown"
                     data-offset="10px,0px" style="margin-top: 1px;">
                    <button class="btn btn-icon btn-clean btn-lg mr-1 mt-2" id="kt_quick_panel_toggle">
                        <span class="svg-icon svg-icon-xl svg-icon-primary">
                            <!--begin::Svg Icon | path:/metronic/theme/html/demo1/dist/assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32px" height="32px" viewBox="0 0 24 24" version="1.1">
                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <rect x="0" y="0" width="24" height="24"></rect>
                                    <rect fill="#000000" x="4" y="4" width="7" height="7" rx="1.5"></rect>
                                    <path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3"></path>
                                </g>
                            </svg>
                            <!--end::Svg Icon-->
                        </span>
                    </button>
                </div>
                <div class="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg" :class="{'show': menuIndex == 2}" x-placement="bottom-end" style="width:500px; position: absolute; transform: translate3d(-450px, 48px, 0px); top: 0px; left: 0px; will-change: transform;">
                    <!--begin:Header-->
                    <div class="d-flex flex-column flex-center py-10 bgi-size-cover bgi-no-repeat rounded-top" style="background-image: url(/assets/media/misc/bg-1.jpg); background-size:cover">
                        <h4 class="text-white font-weight-bold">
                            O2WORK
                        </h4>
                    </div>
                    <!--end:Header-->
                    <!--begin:Nav-->
                    <div class="row row-paddingless">
                        <!--begin:Item-->
                        <template v-for="(b,i) in blocks">
                            <div class="col-4" :key="i" :class="{'lock': !b.isAllow}">
                                <a href="javascript:;" @click="switchBlock(b)" class="d-block py-10 text-center bg-hover-light border-right border-bottom">
                                    <span class="svg-icon svg-icon-3x svg-icon-success">
                                        <i :class="`fas fa-${b.icon}`" style="font-size:30px" />
                                    </span>
                                    <span class="d-block text-dark-75 font-weight-bold font-size-h6 mt-2 mb-1" style="color:#626161">{{b.title}}</span>
                                </a>
                            </div>
                        </template>
                        <!--end:Item-->
                    </div>
                    <!--end:Nav-->
                </div>
            </div>
        </div>
        <slot></slot>
    </div>
</template>
<style scoped>
    .lock{opacity:0.5; cursor: not-allowed!important;}
    .lock a{
        cursor: not-allowed !important;
    }
</style>
<script>
    import { mapActions, mapGetters } from 'vuex';
    export default {
        data() {
            return {
                menuIndex: 0,
                //blocks: [
                //    { title: 'Hệ thống', groupIds: [1], icon: 'cogs' },
                //    { title: 'Meet', groupIds: [2], icon: 'video'},
                //    { title: 'Lịch', groupIds: [3], icon: 'calendar-alt'},
                //    { title: 'Nhiệm vụ công việc', groupIds: [4], icon: 'clipboard-list' },
                //    { title: 'Tin tức', groupIds: [5, 6], icon: 'newspaper' },
                //    { title: 'Wiki', groupIds: [7], icon: 'file-alt' }
                //],
                blockAllow: [],
                listMenuAllow: []
            };
        },
        computed: {
            ...mapGetters(['menuList', 'menuData', 'blocks'])
        },
        watch: {
            menuList() {
                //this.$router.push("/");
            }
        },
        methods: {
            ...mapActions(['showSetMenuByBlock']),
            toggleMenu(index) {
                if (index == this.menuIndex)
                    index = -1;
                this.menuIndex = index;
            },
            switchBlock(b) {
                if (!b.isAllow) return;
                this.menuIndex = -1;
                //var menu = this.listMenuAllow.filter(k => b.groupIds.includes(k.groupId));
                this.showSetMenuByBlock(b.block);
            }
        },
        created() {
            //for (let m of this.menuData) {
            //    if (this.checkPermission(m))
            //        this.listMenuAllow.push(m);
            //}
            //var ids = this.listMenuAllow.map(k => k.groupId);
            //this.blockAllow = this.blocks.filter(k => {
            //    return _.difference(ids, k.groupIds).length > 0;
            //});
            //if (!this.menuList || this.menuList.length === 0) {
            //    var menu = this.listMenuAllow[0];
            //    this.showSetMenuByBlock([menu]);
            //}
        }
    }
</script>
