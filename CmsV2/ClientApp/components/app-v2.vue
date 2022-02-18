<template>    
<div v-if="currentUser" id="app-full">
    
    
    <router-view :key="$route.path + appSettings.CompanyId" />

    <modalv2
            v-if="openChangePassPopup"
            :width="325"
            :footer="false"
            title="Đổi mật khẩu"
            @close="triggerClick('openChangePassPopup')"
        >
            <div slot="body">
                <div class="form-group">
                    <label for="userpassword">Mật khẩu hiện tại</label>
                    <input
                        v-model="form.oldPassword"
                        type="password"
                        class="form-control"
                        placeholder="Nhập mật khẩu"
                    />
                </div>
                <div class="form-group">
                    <label for="userpassword">Mật khẩu mới</label>
                    <input
                        v-model="form.newPassword"
                        type="password"
                        class="form-control"
                        placeholder="Nhập mật khẩu"
                    />
                </div>
                <div class="form-group">
                    <label for="userpassword">Xác nhận lại</label>
                    <input
                        v-model="form.newPassword2"
                        type="password"
                        class="form-control"
                        placeholder="Nhập mật khẩu"
                    />
                </div>
                <div class="form-group text-right">
                    <span
                        class="btn btn-primary w-md waves-effect waves-light"
                        @click="submitChangePassword"
                    >Xác nhận</span>
                </div>
            </div>
        </modalv2>
        <modalv2
            v-if="openCompanyPopup"
            id="modal-company"
            :footer="false"
            :width="500"
            title="Chuyển đổi hệ thống"
            @close="triggerClick('openCompanyPopup')"
        >
            <div slot="body">
                <ul class="kt-nav kt-margin-t-10 kt-margin-b-10">
                    <li v-for="com in appSettings.companies" :key="com.id" class="kt-nav__item">
                        <a href="javascipt:void(0)" class="kt-nav__link" @click="changeCompany(com.id)">
                            <span class="kt-nav__link-icon">
                                <avatar
                                    :src="com.logo"
                                    :username="com.name"
                                    css-class="kt-badge kt-badge--xl"
                                    :size="30"
                                />
                            </span>
                            <span class="kt-nav__link-text ml-2">{{ com.name }}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </modalv2>
        <modalv2
            v-if="openTimeOutPopup"
            id="modal-company"
            :width="500"
            title="Cảnh báo"
            @close="closeTimeOut"
        >
            <div slot="body">
                <p>Hệ thống đã không nhận được phản hồi của bạn trong một thời gian?</p>
                <h5>
                    Tự động đăng xuất trong
                    <b>{{ logOutDelay }}</b> giây nữa!
                </h5>
            </div>
            <div slot="footer">
                <div class="row">
                    <div class="col-sm-12">
                        <button class="btn btn-primary" @click="closeTimeOut">
                            <span>Tiếp tục thao tác</span>
                        </button>
                    </div>
                </div>
            </div>
        </modalv2>
        <!--<guide v-if="openTutorialPopup" @closePopup="triggerClick('openTutorialPopup')"></guide>-->
        <send-error v-if="openSendErrorPopup" @closePopup="triggerClick('openSendErrorPopup')"></send-error>
        <notifications group="foo" />

        <!--<progressBar />-->
        <!-- https://service.O2Tech.vn/ -->
        <iframe
            id="error_Report"
            :src="`${techCoServiceUrl}/embed/error-report?memberId=${currentUser.id}&memberName=${currentUser.userName} - ${currentUser.fullName}&system=${CONSTANTS.SYSTEM_NAME}`"
            style="width: 100%; height: 100%; position: fixed; top: 0; left: 0; display: none;z-index: 2000;"
        ></iframe> 
</div>
</template>

<style scoped>
    @import '/assets-v2/css/bootstrap.min.css';
    @import '/assets-v2/css/bootstrap-icons.css';
    @import '/assets-v2/css/style-common.css';   
    @import '/assets-v2/css/common-custom.css';  
</style>

<script>
import { mapGetters, mapActions,mapMutations } from 'vuex';
import CONSTANTS from '../core/utils/constants';

//import headerTop from './_shared/v2/header-top';
// import menuLeft from './calendar/v2/menu-left';
// import siteFooter from './_shared/site-footer';
// import stickyToolbar from './_shared/sticky-toolbar';

let menuMode = '';
if (typeof localStorage !== 'undefined') {
    try {
        menuMode = localStorage.getItem(CONSTANTS.MENU_MODE) || '';
    } catch (e) {
        menuMode = '';
    }
}
export default {
    name: 'AppV2',
    components: {
        // menuLeft,
        // siteFooter,
        // stickyToolbar,
        // quickPanel,
        //menuTop,
        //guide,
        //headerTop,
    },
    data() {
        return {
            showMenuMobile: false,
            popupChangePassword: false,
            form: {
                oldPassword: '',
                newPassword: '',
                newPassword2: ''
            },
            isInFullScreen: false,
            showModal: false,
            showMenuUser: false,
            menuMode: menuMode,
            popupCompany: false,
            openTimeOutPopup: false,
            constSessionTimeOut: 20 * 60,
            sessionTimeOut: 20 * 60,
            logOutDelay: 30,
            delayTimeOut: null,
            timeOut: null
        };
    },
    computed: {
        ...mapGetters([
            'system',
            'openCompanyPopup',
            'openChangePassPopup',
            'openTutorialPopup',
            'openSendErrorPopup',
            'blocks',
            'menuData'
        ])
    },
    methods: {
        ...mapActions(['logOut', 'initSystem', 'updateAppSettings']),
        ...mapMutations(['setMenuAllow', 'setMenuList']),
        // updateShowMenuMobile() {
        //     this.showMenuMobile = !this.showMenuMobile;
        //     if (this.showMenuMobile)
        //         document.getElementsByTagName('body')[0].classList.add('kt-aside--on');
        //     else document.getElementsByTagName('body')[0].classList.remove('kt-aside--on');
        // },
        // mobileToggleToolBar() {
        //     document.getElementsByTagName('body')[0].classList.remove('kt-aside--on');
        //     document.getElementById('kt_aside').classList.remove('kt-aside--on');
        //     if (!this.showToolBar)
        //         document
        //             .getElementsByTagName('body')[0]
        //             .classList.add('kt-header__topbar--mobile-on');
        //     else
        //         document
        //             .getElementsByTagName('body')[0]
        //             .classList.remove('kt-header__topbar--mobile-on');
        //     this.showToolBar = !this.showToolBar;
        // },
        // mobileToggleLeftMenu() {
        //     document
        //         .getElementsByTagName('body')[0]
        //         .classList.remove('kt-header__topbar--mobile-on');
        //     if (!this.showLeftMenuMobile) {
        //         document.getElementsByTagName('body')[0].classList.add('kt-aside--on');
        //         document.getElementById('kt_aside').classList.add('kt-aside--on');
        //     } else {
        //         document.getElementsByTagName('body')[0].classList.remove('kt-aside--on');
        //         document.getElementById('kt_aside').classList.remove('kt-aside--on');
        //     }
        //     this.showLeftMenuMobile = !this.showLeftMenuMobile;
        // },
        signOut() {
            this.logOut().then(() => {
                clearInterval(this.timeOut);
                this.$router.push(`/login`);
            });
        },
        closeTimeOut() {
            this.openTimeOutPopup = false;
            clearInterval(this.delayTimeOut);
            this.$http({
                data: {
                    m: 'session',
                    fn: 'reset-session',
                    isBasic: true
                }
            }).then(() => {
                this.sessionTimeOut = this.constSessionTimeOut;
                this.initSession();
            });
        },
        submitChangePassword() {
            if (!this.form.oldPassword || !this.form.newPassword || !this.form.newPassword2)
                return this.$message('Vui lòng nhập đầy đủ thông tin!', 'error');
            if (this.form.newPassword != this.form.newPassword2)
                return this.$message('Mật khẩu mới không trùng nhau, vui lòng nhập lại!', 'error');
            this.$http({
                data: {
                    m: 'user',
                    fn: 'change_pass',
                    ...this.form
                }
            })
                .then(response => {
                    if (response.success) {
                        this.form = {
                            oldPassword: '',
                            newPassword: '',
                            newPassword2: ''
                        };
                        this.triggerClick('openChangePassPopup');
                        return this.$message('Đổi mật khẩu thành công!');
                    }
                })
                .catch(() => {
                    return this.$error('Mật khẩu hiện tại không chính xác!');
                });
        },
        cancelFullScreen(el) {
            var requestMethod =
                el.cancelFullScreen ||
                el.webkitCancelFullScreen ||
                el.mozCancelFullScreen ||
                el.exitFullscreen;
            if (requestMethod) {
                // cancel full screen.
                requestMethod.call(el);
            } else if (typeof window.ActiveXObject !== 'undefined') {
                // Older IE.
                var wscript = new ActiveXObject('WScript.Shell');
                if (wscript !== null) {
                    wscript.SendKeys('{F11}');
                }
            }
        },
        requestFullScreen(el) {
            // Supports most browsers and their versions.
            var requestMethod =
                el.requestFullScreen ||
                el.webkitRequestFullScreen ||
                el.mozRequestFullScreen ||
                el.msRequestFullscreen;

            if (requestMethod) {
                // Native full screen.
                requestMethod.call(el);
            } else if (typeof window.ActiveXObject !== 'undefined') {
                // Older IE.
                var wscript = new ActiveXObject('WScript.Shell');
                if (wscript !== null) {
                    wscript.SendKeys('{F11}');
                }
            }
            return false;
        },
        toggleFullScreen() {
            var elem = document.body; // Make the body go full screen.
            this.isInFullScreen =
                (document.fullScreenElement && document.fullScreenElement !== null) ||
                document.mozFullScreen ||
                document.webkitIsFullScreen;
            if (this.isInFullScreen) {
                this.cancelFullScreen(document);
                this.isInFullScreen = false;
            } else {
                this.requestFullScreen(elem);
                this.isInFullScreen = true;
            }
            return false;
        },
        toggleMenuMode() {
            this.menuMode == 'enlarged' ? (this.menuMode = '') : (this.menuMode = 'enlarged');
        },
        changeCompany(id) {
            let loading = this.$loading.show();
            this.initSystem({ swCompanyId: id }).then(() => {
                loading.hide();
                this.done = true;
                this.appSettings.CompanyId = id;
                let tempSettings = this.appSettings;
                var enumCustomFieldObjects = {};
                //for (var i = 0; i < this.system.customFieldObjects.length; i++) {
                //    enumCustomFieldObjects[
                //        this.system.customFieldObjects[i].name
                //    ] = this.system.customFieldObjects[i].id;
                //}
                tempSettings.enumCustomFieldObjects = enumCustomFieldObjects;
                tempSettings = Object.assign(tempSettings, this.system);
                this.updateAppSettings(tempSettings);
                this.triggerClick('openCompanyPopup');
            });
        },
        initSession() {
            this.logOutDelay = 30;
            this.timeOut = setInterval(() => {
                this.sessionTimeOut--;
                if (this.sessionTimeOut <= 0) {
                    clearInterval(this.timeOut);
                    this.$http({
                        data: {
                            m: 'session',
                            fn: 'check-time-out',
                            isBasic: true
                        }
                    })
                        .then(response => {
                            if (response.data <= 0) {
                                this.openTimeOutPopup = true;
                                this.delayTimeOut = setInterval(() => {
                                    this.logOutDelay--;
                                    if (this.logOutDelay <= 0) {
                                        clearInterval(this.delayTimeOut);
                                        this.$http({
                                            data: {
                                                m: 'session',
                                                fn: 'check-time-out',
                                                isBasic: true
                                            }
                                        })
                                            .then(response => {
                                                if (response.data <= 0) {
                                                    this.signOut();
                                                } else {
                                                    this.openTimeOutPopup = false;
                                                    this.sessionTimeOut = this.constSessionTimeOut;
                                                    console.log('2', this.sessionTimeOut);
                                                    this.initSession();
                                                }
                                            })
                                            .catch(() => {
                                                this.sessionTimeOut = this.constSessionTimeOut;
                                                this.initSession();
                                            });
                                    }
                                }, 1000);
                            } else {
                                this.sessionTimeOut = response.data;
                                console.log('1', this.sessionTimeOut);
                                this.initSession();
                            }
                        })
                        .catch(() => {
                            this.sessionTimeOut = this.constSessionTimeOut;
                            this.initSession();
                        });
                }
            }, 1000);
        },
        reloadNow() {
            window.location.reload();
        },
        initMenuData(isWatch) {
            var listMenuAllow = [];
            for (let m of this.menuData) {
                if (this.checkPermission(m)) listMenuAllow.push(m);
            }
            this.setMenuAllow(listMenuAllow);
            if (isWatch || !this.menuList || this.menuList.length === 0) {
                var fullUrl = this.$route.path;
                var url = '';
                var url2 = '';
                if (this.$route.params) {
                    for (let p in this.$route.params) {
                        url = fullUrl.replace(`/${this.$route.params[p]}`, '');
                    }
                    if (url && url.split('/').length > 1) url2 = url.split('/')[1];
                }
                var index = listMenuAllow
                    .map(element => {
                        return {
                            ...element,
                            childs: element.childs.filter(subElement => subElement.link === fullUrl)
                        };
                    })
                    .findIndex(k => k.childs.length > 0);

                if (index === -1)
                    index = listMenuAllow
                        .map(element => {
                            return {
                                ...element,
                                childs: element.childs.filter(
                                    subElement =>
                                        url &&
                                        url !== '/' &&
                                        (subElement.link === url ||
                                            (subElement.link && subElement.link.includes(url2)))
                                )
                            };
                        })
                        .findIndex(k => k.childs.length > 0);

                if (index === -1) index = 1;
                this.setMenuList(listMenuAllow.filter(k => k.block === listMenuAllow[index].block));
            }
        }
    },
    watch: {
        menuMode() {
            if (this.menuMode && this.menuMode == 'enlarged') {
                document.getElementsByTagName('body')[0].classList.add('enlarged');
            } else {
                document.getElementsByTagName('body')[0].classList.remove('enlarged');
            }
        },
        // $route() {
        //     this.showMenuMobile = false;
        //     this.showLeftMenuMobile = false;
        //     document.getElementsByTagName('body')[0].classList.remove('kt-aside--on');
        //     document.getElementById('kt_aside').classList.remove('kt-aside--on');
        // }
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    created() {
        this.initMenuData();
        //this.initSession();
    }
};
</script>
