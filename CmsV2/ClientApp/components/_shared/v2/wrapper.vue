<template>
<div>
    <!-- HEADER -->
        <header>
            <div class="header-ct d-flex justify-content-end align-items-center">
                <button type="button" class="btn-menubar js-btn-menubar" @click="toggleSidebar"></button>
                <div class="topbar-menu d-flex">
                    <!-- <div class="app-search">
                        <form>
                            <div class="topbar-search position-relative">
                                <input type="text" class="form-control ipt-search" placeholder="Nhập từ khóa tìm kiếm">
                                <button class="btn-search" type="submit"><img src="/assets-v2/calendar/images/icon-search.png" alt=""></button>
                            </div>
                        </form>
                    </div> -->
                    <slot name="header-search"></slot>
                    <ul class="lst-topbar-menu d-flex align-items-center">
                        <li class="itm-topbar itm-system">
                            <div class="js-btn-showPopHeader">
                                 <a class="itm-link js-btn-drop" href="javascript:void(0);" @click="toggleMenu(2)" >
                                    <img src="/assets-v2/images/icon-layout.svg" alt="" class="icon-h-gray">
                                    <img src="/assets-v2/images/icon-layout-white.svg" alt="" class="icon-h-white">
                                </a>
                                <div class="drop-menu type2" :class="{'show': menuIndex == 2}"
                                @mouseover="menuIndex = 2"
                                @mouseout="menuIndex = -1">
                                  
                                    <div class="row d-flex flex-wrap align-items-center justify-content-start">
                                        <RouterLink to="/management" class="col-4 drop-itm d-flex flex-column align-items-center"
                                        :class="{'is-disable':!isAllowBlock(1)}"
                                        >
                                            <i class="bi bi-gear"></i>
                                            <strong class="txt">Quản trị chung</strong>
                                        </RouterLink>

                                        <!-- [D] Thêm class "is-disable" vào class "drop-itm" khi sản phẩm đó chưa được kích hoạt is-disable -->
                                        <RouterLink to="/meet-room" class="col-4 drop-itm d-flex flex-column align-items-center"
                                        :class="{'is-disable':!isAllowBlock(CONSTANTS.BLOCKS_TYPE.MEET)}"
                                        >
                                            <i class="bi bi-camera-video"></i>
                                            <strong class="txt">O2 Meet</strong>
                                        </RouterLink>

                                        <RouterLink to="/task/dashboard" class="col-4 drop-itm d-flex flex-column align-items-center"
                                        :class="{'is-disable':!isAllowBlock(CONSTANTS.BLOCKS_TYPE.TASK)}"
                                        >
                                            <i class="bi bi-file-earmark-text"></i>
                                            <strong class="txt">O2 Task</strong>
                                        </RouterLink>

                                        <RouterLink to="/wiki/home" class="col-4 drop-itm d-flex flex-column align-items-center"
                                        :class="{'is-disable':!isAllowWiki()}"
                                        >
                                            <i class="bi bi-journal-text"></i>  
                                            <strong class="txt">O2 Wiki</strong>
                                        </RouterLink>
                                        
                                        <RouterLink to="/calendar" class="col-4 drop-itm d-flex flex-column align-items-center"
                                        :class="{'is-disable':!isAllowBlock(CONSTANTS.BLOCKS_TYPE.CALENDAR)}"
                                        >
                                            <i class="bi bi-calendar4-week"></i>
                                            <strong class="txt">O2 Calendar</strong>
                                        </RouterLink>
                                    </div>
                                </div>
                                
                            </div>
                        </li>
                        <li class="itm-topbar noti-remind">  
                            <!-- <notify-list @show="dropDown(-1)" ref="notilst"></notify-list>                             -->
                        </li>
                        <li class="itm-topbar user-profile">
                            <div class="js-btn-showPopHeader">
                                <a class="itm-link js-btn-drop d-flex align-items-center" href="javascript:void(0)" @click="toggleMenu(1)">
                                    <!-- <div class="acc-uavatar"> 
                                        <img :src="currentUser.avatar?currentUser.avatar:'/assets-v2/images/@avt.jpg'" :alt="currentUser.fullName">
                                    </div> -->
                                      <avatar
                                        :src="currentUser.avatar"
                                        :username="currentUser.fullName"
                                        css-class="acc-uavatar"
                                        :size="35"
                                    />
                                    <span class="acc-uname">{{currentUser.fullName}}</span>
                                </a>
                                <!-- [D] Thêm class "show" vào class "drop-menu" khi click vào "btn-top" để hiện box thông tin -->
                                <div class="drop-menu type2" :class="{'show': menuIndex == 1}">
                                    <!-- <a href="javascript:void(0);" class="drop-itm">Chỉnh sửa tài khoản</a> -->
                                    <a href="javascript:void(0);" class="drop-itm" @click="triggerClick('openChangePassPopup')">Đổi mật khẩu</a>
                                    <!-- <a href="javascript:void(0);" class="drop-itm">Điều khoản hoạt động</a> -->
                                    <a href="javascript:void(0);" class="drop-itm" @click="signOut">Đăng xuất</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
        <!-- END HEADER -->
        <slot name="side-bar">

        </slot>
        <div class="sidebar-overlay" v-if="sidebarModeOpen" @click="setSidebarMode(false)"></div>
        <main>
            <slot></slot>
        </main>
        <slot name="footer">
            <site-footer></site-footer>
        </slot>
</div>
</template>
<style scoped>
header{z-index: 97 !important;}
.sidebar-overlay {
    background-color: rgba(0,0,0,.1);
    bottom: 0;
    display: block;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 98;
}
.modal.popup .modal-content{border-radius: 10px;}

.ecosystem-wrap .btn-menubar{display:none}

/* @media screen and (min-width: 768px) and (max-width: 991px){
    .wrap .sidebar:not(.open)::before {
        width: 100%;
        height: 100%;
        content: '';
        position: absolute;
        top: 0;
        left: 0;z-index: 9999;
        display: block;
        
    }
} */
</style>
<script>
import { mapGetters, mapActions } from 'vuex';
 import siteFooter from './site-footer.vue';
export default {
  components: { siteFooter },
    data() {
        return {
            versions: [],
            menuIndex: -1,
            // helpIndex: false,
            // langIndex: false,
            // currentLang: null           
        };
    },
    computed: {
        //...mapGetters(['system']),
        ...mapGetters([
            'permissions',
            'userPermissions',
            'menuList',
            'isShowMainMenu',
            //'menuData',
            'blocks',
            'system'            
        ]),
        currentCompany() {
            if (this.appSettings.companies) {
                return _.find(this.appSettings.companies, ['id', this.appSettings.CompanyId]);
            }
            return this.appSettings.currentCompany;
        }
    },
    methods: {
        ...mapActions(['logOut','setSidebarMode','toggleSidebar']),
        //...mapMutations(['setMenuAllow', 'setMenuList']),
        signOut() {
            let token = localStorage.getItem(this.CONSTANTS.FIREBASE_TOKEN);
            if (token) this.fireBaseRemoveToken(token);
            this.logOut().then(() => {
                this.$router.push(`/login`);
            });
        },
        toggleMenu(index) {
            if (index == this.menuIndex)
                index = -1;
            this.menuIndex = index;
            // this.$refs.notilst.showListPanel(false);
        },
        dropDown(index) {
            if (this.menuIndex == index) this.menuIndex = -1;
            else this.menuIndex = index;
        },        
        isAllowBlock(blockid){
            let b= this.blocks.find(b=>b.block==blockid);
            return b && b.isAllow;

        },
        isAllowWiki(){
            return this.isAllowBlock(this.CONSTANTS.BLOCKS_TYPE.DOCUMENT) || this.isAllowBlock(this.CONSTANTS.BLOCKS_TYPE.WIKI);
        }
    },
    
    created(){
        // $(document).ready(function() {
        //      $('.js-btn-drop').on('click', function (){
        //          if(($('.itm-system').hasClass('open'))){
        //              $(this).parents('.wrap').addClass('bg-overlay');
        //          } else {
        //              $('.topbar-menu .itm-system').parents('.wrap').removeClass('bg-overlay');
        //          }
        //      });
        // });

        //console.log('blocks in wrapper',this.blocks);
    }
};
</script>