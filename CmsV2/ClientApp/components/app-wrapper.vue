<template>
    <div v-if="done && !error"
         id="app-entry"
         style="height:100%">
        <router-view />
    </div>
    <div class="wrap" v-else-if="error">
        <div class="content-page d-flex align-items-center" style="position:fixed;top:50%;left:50%;width:365px;height:160px;min-height:auto;padding:5px 30px;background-color:#28293B;border-radius:10px;color:#fff;transform:translate(-50%, -50%);">
            <i class="bi bi-exclamation-triangle" style="font-size:40px;"></i>
            <p class="txt-noti" style="margin-left:20px;font-size:18px;">Hệ thống chưa được kích hoạt! Vui lòng thử lại hoặc liên hệ <a href="https://o2tech.vn/" class="d-inline-block" style="font-weight:700;color:#45A0FB;text-transform:uppercase;">O2Tech.VN</a></p>
        </div>
    </div>
</template>
<style scoped>
</style>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
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
        testSocket() {
            //console.log(this.$socket);
            //this.$socket.invoke('hello', { xxx: 1 });
        },
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
    },
    sockets: {
        // hello(data) {
        //     alert(data);
        // }
    },
};
</script>
