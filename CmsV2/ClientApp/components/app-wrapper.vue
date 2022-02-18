<template>
    <div>
        <header>
            <div class="header-ct d-flex justify-content-end align-items-center">
                <button
                    type="button"
                    class="btn-menubar js-btn-menubar"
                    @click="toggleSidebar"
                ></button>
                <div class="topbar-menu d-flex">
                    <slot name="header-search"></slot>
                    <ul class="lst-topbar-menu d-flex align-items-center">
                        <li class="itm-topbar noti-remind"></li>
                        <li class="itm-topbar user-profile">
                            <div class="js-btn-showPopHeader">
                                <a
                                    class="itm-link js-btn-drop d-flex align-items-center"
                                    href="javascript:void(0)"
                                    @click="toggleMenu(1)"
                                >
                                    <avatar
                                        :src="currentUser.avatar"
                                        :username="currentUser.fullName"
                                        css-class="acc-uavatar"
                                        :size="35"
                                    />
                                    <span class="acc-uname">{{ currentUser.fullName }}</span>
                                </a>
                                <div class="drop-menu type2" :class="{ show: menuIndex == 1 }">
                                    <a
                                        href="javascript:void(0);"
                                        class="drop-itm"
                                        @click="triggerClick('openChangePassPopup')"
                                        >Đổi mật khẩu</a
                                    >
                                    <a href="javascript:void(0);" class="drop-itm" @click="signOut"
                                        >Đăng xuất</a
                                    >
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
        <menu-left />
        <div class="sidebar-overlay" v-if="sidebarModeOpen" @click="setSidebarMode(false)"></div>
        <main>
            <router-view />
        </main>
        <div>
            <site-footer></site-footer>
        </div>
    </div>
    <!-- <div v-if="done && !error"
         id="app-entry"
         :class="wrapCls" style="height:100%">
        <router-view />
    </div>
    <div class="wrap" v-else-if="error">
        <div class="content-page d-flex align-items-center" style="position:fixed;top:50%;left:50%;width:365px;height:160px;min-height:auto;padding:5px 30px;background-color:#28293B;border-radius:10px;color:#fff;transform:translate(-50%, -50%);">
            <i class="bi bi-exclamation-triangle" style="font-size:40px;"></i>
            <p class="txt-noti" style="margin-left:20px;font-size:18px;">Hệ thống chưa được kích hoạt! Vui lòng thử lại hoặc liên hệ <a href="https://o2tech.vn/" class="d-inline-block" style="font-weight:700;color:#45A0FB;text-transform:uppercase;">O2Tech.VN</a></p>
        </div>
    </div> -->
</template>
<style scoped>
</style>
<script>
import { mapActions, mapGetters } from 'vuex';
import siteFooter from './_shared/v2/site-footer.vue';
import menuLeft from './_shared/menu-left-v2.vue'
export default {
    components: {siteFooter, menuLeft},
    name: 'AppWrapper',
    data() {
        return { 
            done: true, 
            error: false,
            versions: [],
            menuIndex: -1, 
            };
    },
    computed: {
        ...mapGetters([
            'permissions',
            'userPermissions',
            'menuList',
            'isShowMainMenu',
            'blocks',
            'system',
        ]),
    },
    methods: {
        ...mapActions(['initSystem', 'updateAppSettings', 'getListCompany', 'updateDict', 'logOut', 'setSidebarMode', 'toggleSidebar']),
        signOut() {
            let token = localStorage.getItem(this.CONSTANTS.FIREBASE_TOKEN);
            if (token) this.fireBaseRemoveToken(token);
            this.logOut().then(() => {
                this.$router.push(`/login`);
            });
        },
        toggleMenu(index) {
            if (index == this.menuIndex) index = -1;
            this.menuIndex = index;
            // this.$refs.notilst.showListPanel(false);
        },
        dropDown(index) {
            if (this.menuIndex == index) this.menuIndex = -1;
            else this.menuIndex = index;
        },
        isAllowBlock(blockid) {
            let b = this.blocks.find((b) => b.block == blockid);
            return b && b.isAllow;
        },
        isAllowWiki() {
            return (
                this.isAllowBlock(this.CONSTANTS.BLOCKS_TYPE.DOCUMENT) ||
                this.isAllowBlock(this.CONSTANTS.BLOCKS_TYPE.WIKI)
            );
        },
    },
    created() {
        // let loading = this.$loading.show();
        // this.initSystem()
        //     .then(() => {
        //         this.done = true;
        //         let tempSettings = this.appSettings;
        //         var enumCustomFieldObjects = {};
        //         if (this.system.customFieldObjects)
        //             for (var i = 0; i < this.system.customFieldObjects.length; i++) {
        //                 enumCustomFieldObjects[
        //                     this.system.customFieldObjects[i].name
        //                 ] = this.system.customFieldObjects[i].id;
        //             }
        //         tempSettings.enumCustomFieldObjects = enumCustomFieldObjects;
        //         tempSettings = Object.assign(tempSettings, this.system);
        //         if (this.system.dictionarys)
        //             this.updateDict(this.system.dictionarys);
        //         this.updateAppSettings(tempSettings);
        //         this.CompanyId = this.system.companyId;
        //         loading.hide();
        //     })
        //     .catch(() => {
        //         this.error = true;
        //         loading.hide();
        //     });
        // setTimeout(() => {
        //     this.testSocket();
        // }, 3000);
    }
};
</script>
