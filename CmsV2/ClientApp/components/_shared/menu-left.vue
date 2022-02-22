<template>
    <div>
        <button id="kt_aside_close_btn" class="kt-aside-close " @click="$emit('closeMobileMenu')">
            <i class="la la-close" />
        </button>
        <div id="kt_aside"
             :class="{
                'kt-aside  kt-aside--fixed kt-grid__item kt-grid kt-grid--desktop kt-grid--hor-desktop': true,
                'kt-aside--on': showMenuMobile
            }">
            <!-- begin:: Aside Menu -->
            <div id="kt_aside_menu_wrapper" class="kt-aside-menu-wrapper kt-grid__item kt-grid__item--fluid" @mouseover="showMenu" @mouseout="hideMenu">
                <div id="kt_aside_menu" class="kt-aside-menu " data-ktmenu-vertical="1" data-ktmenu-scroll="1" data-ktmenu-dropdown-timeout="500">
                    <ul class="kt-menu__nav ">
                        <template v-for="(menu1, menu1Index) in menuData">
                            <!--Menu cấp 1-->
                            <li aria-haspopup="true" v-if="checkPermission(menu1)" :key="menu1Index" :class="{ 'kt-menu__item  kt-menu__item--submenu': true, 'kt-menu__item--open': menu1.open}" data-ktmenu-submenu-toggle="hover">
                                <router-link to="/" class="kt-menu__link " v-if="menu1.link">
                                    <i :class="`kt-menu__link-icon ${menu1.icon}`" /><span class="kt-menu__link-text">{{menu1.title}}</span>
                                </router-link>
                                <a href="javascript:;" class="kt-menu__link kt-menu__toggle" @click="openMenuGroup(menu1Index)" v-else>
                                    <i :class="`kt-menu__link-icon ${menu1.icon}`" /><span class="kt-menu__link-text">{{menu1.title}}</span><span class="kt-menu__link-badge" /><i class="kt-menu__ver-arrow la la-angle-right" />
                                </a>
                                <div class="kt-menu__submenu " v-if="menu1.childs">
                                    <span class="kt-menu__arrow" />
                                    <ul class="kt-menu__subnav">
                                        <template v-for="(menu2,menu2Index) in menu1.childs">
                                            <!--Menu cấp 2-->
                                            <li :class="{
                                            'kt-menu__item  kt-menu__item--submenu': true,
                                            'kt-menu__item--open': menu2.open
                                        }" aria-haspopup="true" :key="menu2Index" v-if="checkPermission(menu2)">
                                                <router-link :to="menu2.link" class="kt-menu__link" v-if="menu2.link">
                                                    <i class="kt-menu__link-bullet kt-menu__link-bullet--line"><span /></i><span class="kt-menu__link-text">{{menu2.title}}</span>
                                                </router-link>
                                                <a href="javascript:;" class="kt-menu__link kt-menu__toggle" @click="openMenuSubGroup(menu1Index,menu2Index)" v-else>
                                                    <i class="kt-menu__link-bullet kt-menu__link-bullet--line"><span /></i><span class="kt-menu__link-text">{{menu2.title}}</span><i class="kt-menu__ver-arrow la la-angle-right" />
                                                </a>
                                                <div class="kt-menu__submenu " v-if="menu2.childs">
                                                    <span class="kt-menu__arrow" />
                                                    <ul class="kt-menu__subnav">
                                                        <template v-for="(menu3,menu3Index) in menu2.childs">
                                                            <!--Menu cấp 3-->
                                                            <li class="kt-menu__item " aria-haspopup="true" v-if="checkPermission(menu3)" :key="menu3Index">
                                                                <router-link :to="menu3.link" class="kt-menu__link ">
                                                                    <i class="kt-menu__link-bullet kt-menu__link-bullet--dot"><span /></i><span class="kt-menu__link-text">{{menu3.title}}</span>
                                                                </router-link>
                                                            </li>
                                                        </template>
                                                    </ul>
                                                </div>
                                            </li>
                                        </template>
                                    </ul>
                                </div>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>

            <!-- end:: Aside Menu -->
        </div>
        <div v-if="showMenuMobile" class="kt-aside-overlay" @click="$emit('closeMobileMenu')" />
    </div>
</template>
<style>
    #kt_aside_menu {
        height: calc(100vh - 80px);
        overflow: auto;
    }

        #kt_aside_menu::-webkit-scrollbar {
            width: 6px;
            background-color: #F5F5F5;
        }

        #kt_aside_menu::-webkit-scrollbar-thumb {
            background-color: #dcdcdc;
        }

    .kt-aside-menu .kt-menu__nav > .kt-menu__item > .kt-menu__submenu .kt-menu__subnav > .kt-menu__item > .kt-menu__submenu .kt-menu__subnav > .kt-menu__item > .kt-menu__link {
        padding-right: 30px;
    }
</style>
<script>
    import Vue from 'vue';
    import { mapGetters } from 'vuex';
    import PermissionMixins from '../../core/mixins/permission';

    export default {
        components: {},
        mixins: [PermissionMixins],
        props: {
            open: {
                type: Boolean,
                default: true
            },
            docked: {
                type: Boolean,
                default: true
            },
            showMenuMobile: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                menuVal: '#/',
                versions: [],
                menuStates: new Object(),
            };
        },
        computed: {
            ...mapGetters(['permissions', 'userPermissions','menuData']),
            lang() {
                return Vue.config.lang;
            }
        },
        methods: {
            showMenu() {
                document.getElementsByTagName('body')[0].classList.remove('kt-aside--minimize');
                document.getElementsByTagName('body')[0].classList.add('kt-aside--minimize-hover');
            },
            hideMenu() {
                document.getElementsByTagName('body')[0].classList.add('kt-aside--minimize');
                document.getElementsByTagName('body')[0].classList.remove('kt-aside--minimize-hover');
            },
            openMenuGroup(index) {
                this._.each(this.menuData, (menu, menuIndex) => {
                    if (menuIndex != index)
                        this.$set(this.menuData[menuIndex], 'open', false);
                });
                this.$set(this.menuData[index], 'open', !this.menuData[index].open);
            },
            openMenuSubGroup(menu1Index, menu2Index) {
                this._.each(this.menuData[menu1Index].childs, (menu, menuIndex) => {
                    if (menuIndex != menu2Index) {
                        this.$set(this.menuData[menu1Index].childs[menuIndex], 'open', false);
                    }
                });
                this.$set(this.menuData[menu1Index].childs[menu2Index], 'open', !this.menuData[menu1Index].childs[menu2Index].open);
            },
           
        }
    };
</script>
