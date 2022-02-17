<template>
    <div v-if="currentUser" id="app-full" class="full-page">
        <div id="kt_header_mobile" class="kt-header-mobile kt-header-mobile--fixed">
            <div class="kt-header-mobile__logo">
                <a href="javascript:;" style="color:#d1021c; font-weight:bold; font-size:18px">
                    <!--<img alt="Logo" src="/metronic/themes/metronic/theme/default/demo1/dist/assets/media/logos/logo-light.png">-->
                    {{appSettings.currentCompany.name}}
                </a>
            </div>
            <div class="kt-header-mobile__toolbar">
                <button
                    class="kt-header-mobile__toggler kt-header-mobile__toggler--left"
                    id="kt_aside_mobile_toggler"
                    @click="mobileToggleLeftMenu()"
                >
                    <span></span>
                </button>
                <button
                    class="kt-header-mobile__topbar-toggler"
                    id="kt_header_mobile_topbar_toggler"
                    @click="mobileToggleToolBar()"
                >
                    <i class="flaticon-more"></i>
                </button>
            </div>
        </div>
        <!-- end:: Header Mobile -->
        <div class="kt-grid kt-grid--hor kt-grid--root">
            <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-page">
                <!-- <menu-left
                    :key="appSettings.CompanyId"
                    :show-menu-mobile="showMenuMobile"
                    @closeMobileMenu="updateShowMenuMobile"
                /> -->

                <div
                    id="kt_wrapper"
                    class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper"
                >
                    <!--<menu-top />-->

                    <div
                        class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-subheader--fixed"
                    >
                        <router-view :key="$route.path + appSettings.CompanyId" />
                    </div>

                    <!-- begin:: Footer -->
                    <site-footer />

                    <!-- end:: Footer -->
                </div>
            </div>
        </div>

        <!-- end:: Page -->
        <!-- begin::Quick Panel -->
        <quick-panel />

        <!-- end::Quick Panel -->
        <!-- begin::Scrolltop -->
        <div id="kt_scrolltop" class="kt-scrolltop">
            <i class="fa fa-arrow-up" />
        </div>
        <!-- end::Scrolltop -->
        <!-- begin::Sticky Toolbar -->
        <sticky-toolbar v-if="false" />

        <!-- end::Sticky Toolbar -->
        <!-- begin::Demo Panel -->
        <div v-if="false" id="kt_demo_panel" class="kt-demo-panel">
            <div class="kt-demo-panel__head">
                <h3 class="kt-demo-panel__title">
                    Select A Demo
                    <!--<small>5</small>-->
                </h3>
                <a id="kt_demo_panel_close" href="#" class="kt-demo-panel__close">
                    <i class="flaticon2-delete" />
                </a>
            </div>
            <div class="kt-demo-panel__body">
                <div class="kt-demo-panel__item">
                    <div class="kt-demo-panel__item-title">Default</div>
                    <div class="kt-demo-panel__item-preview">
                        <img src="/assets//media/demos/preview/demo1.jpg" alt />
                        <div class="kt-demo-panel__item-preview-overlay">
                            <a
                                href="demo1/index.html"
                                class="btn btn-brand btn-elevate"
                                target="_blank"
                            >Preview</a>
                        </div>
                    </div>
                </div>
                <div class="kt-demo-panel__item">
                    <div class="kt-demo-panel__item-title">Demo 2</div>
                    <div class="kt-demo-panel__item-preview">
                        <img src="/assets//media/demos/preview/demo2.jpg" alt />
                        <div class="kt-demo-panel__item-preview-overlay">
                            <a
                                href="demo2/index.html"
                                class="btn btn-brand btn-elevate"
                                target="_blank"
                            >Preview</a>
                        </div>
                    </div>
                </div>
                <div class="kt-demo-panel__item">
                    <div class="kt-demo-panel__item-title">Demo 3</div>
                    <div class="kt-demo-panel__item-preview">
                        <img src="/assets//media/demos/preview/demo3.jpg" alt />
                        <div class="kt-demo-panel__item-preview-overlay">
                            <a
                                href="demo3/index.html"
                                class="btn btn-brand btn-elevate"
                                target="_blank"
                            >Preview</a>
                        </div>
                    </div>
                </div>
                <div class="kt-demo-panel__item">
                    <div class="kt-demo-panel__item-title">Demo 4</div>
                    <div class="kt-demo-panel__item-preview">
                        <img src="/assets//media/demos/preview/demo4.jpg" alt />
                        <div class="kt-demo-panel__item-preview-overlay">
                            <a
                                href="demo4/index.html"
                                class="btn btn-brand btn-elevate"
                                target="_blank"
                            >Preview</a>
                        </div>
                    </div>
                </div>
                <div class="kt-demo-panel__item">
                    <div class="kt-demo-panel__item-title">Demo 5</div>
                    <div class="kt-demo-panel__item-preview">
                        <img src="/assets//media/demos/preview/demo5.jpg" alt />
                        <div class="kt-demo-panel__item-preview-overlay">
                            <a
                                href="demo5/index.html"
                                class="btn btn-brand btn-elevate"
                                target="_blank"
                            >Preview</a>
                        </div>
                    </div>
                </div>
                <div class="kt-demo-panel__item kt-demo-panel__item--active">
                    <div class="kt-demo-panel__item-title">Demo 6</div>
                    <div class="kt-demo-panel__item-preview">
                        <img src="/assets//media/demos/preview/demo6.jpg" alt />
                        <div class="kt-demo-panel__item-preview-overlay">
                            <a
                                href="demo6/index.html"
                                class="btn btn-brand btn-elevate"
                                target="_blank"
                            >Preview</a>
                        </div>
                    </div>
                </div>
                <div class="kt-demo-panel__item">
                    <div class="kt-demo-panel__item-title">Demo 7</div>
                    <div class="kt-demo-panel__item-preview">
                        <img src="/assets//media/demos/preview/demo7.jpg" alt />
                        <div class="kt-demo-panel__item-preview-overlay">
                            <a
                                href="demo7/index.html"
                                class="btn btn-brand btn-elevate"
                                target="_blank"
                            >Preview</a>
                        </div>
                    </div>
                </div>
                <div class="kt-demo-panel__item">
                    <div class="kt-demo-panel__item-title">Demo 8</div>
                    <div class="kt-demo-panel__item-preview">
                        <img src="/assets//media/demos/preview/demo8.jpg" alt />
                        <div class="kt-demo-panel__item-preview-overlay">
                            <a
                                href="demo8/index.html"
                                class="btn btn-brand btn-elevate"
                                target="_blank"
                            >Preview</a>
                        </div>
                    </div>
                </div>
                <div class="kt-demo-panel__item">
                    <div class="kt-demo-panel__item-title">Demo 9</div>
                    <div class="kt-demo-panel__item-preview">
                        <img src="/assets//media/demos/preview/demo9.jpg" alt />
                        <div class="kt-demo-panel__item-preview-overlay">
                            <a
                                href="demo9/index.html"
                                class="btn btn-brand btn-elevate"
                                target="_blank"
                            >Preview</a>
                        </div>
                    </div>
                </div>
                <div class="kt-demo-panel__item">
                    <div class="kt-demo-panel__item-title">Demo 10</div>
                    <div class="kt-demo-panel__item-preview">
                        <img src="/assets//media/demos/preview/demo10.jpg" alt />
                        <div class="kt-demo-panel__item-preview-overlay">
                            <a
                                href="demo10/index.html"
                                class="btn btn-brand btn-elevate"
                                target="_blank"
                            >Preview</a>
                        </div>
                    </div>
                </div>
                <div class="kt-demo-panel__item">
                    <div class="kt-demo-panel__item-title">Demo 11</div>
                    <div class="kt-demo-panel__item-preview">
                        <img src="/assets//media/demos/preview/demo11.jpg" alt />
                        <div class="kt-demo-panel__item-preview-overlay">
                            <a
                                href="demo11/index.html"
                                class="btn btn-brand btn-elevate"
                                target="_blank"
                            >Preview</a>
                        </div>
                    </div>
                </div>
                <div class="kt-demo-panel__item">
                    <div class="kt-demo-panel__item-title">Demo 12</div>
                    <div class="kt-demo-panel__item-preview">
                        <img src="/assets//media/demos/preview/demo12.jpg" alt />
                        <div class="kt-demo-panel__item-preview-overlay">
                            <a
                                href="demo12/index.html"
                                class="btn btn-brand btn-elevate"
                                target="_blank"
                            >Preview</a>
                        </div>
                    </div>
                </div>
                <div class="kt-demo-panel__item">
                    <div class="kt-demo-panel__item-title">Demo 13</div>
                    <div class="kt-demo-panel__item-preview">
                        <img src="/assets//media/demos/preview/demo13.jpg" alt />
                        <div class="kt-demo-panel__item-preview-overlay">
                            <a href="#" class="btn btn-brand btn-elevate disabled">Coming soon</a>
                        </div>
                    </div>
                </div>
                <div class="kt-demo-panel__item">
                    <div class="kt-demo-panel__item-title">Demo 14</div>
                    <div class="kt-demo-panel__item-preview">
                        <img src="/assets//media/demos/preview/demo14.jpg" alt />
                        <div class="kt-demo-panel__item-preview-overlay">
                            <a href="#" class="btn btn-brand btn-elevate disabled">Coming soon</a>
                        </div>
                    </div>
                </div>
                <a
                    href="https://1.envato.market/EA4JP"
                    target="_blank"
                    class="kt-demo-panel__purchase btn btn-brand btn-elevate btn-bold btn-upper"
                >Buy Metronic Now!</a>
            </div>
        </div>

        <modal
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
        </modal>
        <modal
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
        </modal>
        <modal
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
        </modal>
        <!--<guide v-if="openTutorialPopup" @closePopup="triggerClick('openTutorialPopup')"></guide>-->
        <send-error v-if="openSendErrorPopup" @closePopup="triggerClick('openSendErrorPopup')"></send-error>
        <notifications group="foo" />
        <modal v-if="hasNewVersion" @close="hasNewVersion=false">
            <div slot="body">
                <h5
                    style="color:red;"
                >Hệ thống đã có phiên bản mới! Hãy lưu dữ liệu và F5 để cập nhật.</h5>
            </div>
            <div slot="footer">
                <div class="row">
                    <div class="col-sm-12">
                        <button class="btn btn-primary" @click="reloadNow">
                            <span>Cập nhật ngay</span>
                        </button>
                        <button class="btn btn-default" @click="hasNewVersion=false">
                            <span>Đóng</span>
                        </button>
                    </div>
                </div>
            </div>
        </modal>

        <!--<progressBar />-->
        <!-- https://service.O2Tech.vn/ -->
        <iframe
            id="error_Report"
            :src="`${techCoServiceUrl}/embed/error-report?memberId=${currentUser.id}&memberName=${currentUser.userName} - ${currentUser.fullName}&system=${CONSTANTS.SYSTEM_NAME}`"
            style="width: 100%; height: 100%; position: fixed; top: 0; left: 0; display: none;z-index: 2000;"
        ></iframe>
    </div>
</template>

<style>

@import '/assets/vendors/general/bootstrap-datepicker/dist/css/bootstrap-datepicker3.css';
@import '/assets/vendors/general/bootstrap-datetime-picker/css/bootstrap-datetimepicker.css';
@import '/assets/vendors/general/bootstrap-timepicker/css/bootstrap-timepicker.css';
@import '/assets/vendors/general/bootstrap-daterangepicker/daterangepicker.css';

@import '/assets/vendors/general/bootstrap-select/dist/css/bootstrap-select.css';
@import '/assets/vendors/general/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.css';
@import '/assets/vendors/general/select2/dist/css/select2.css';
@import '/assets/vendors/general/animate.css/animate.css';
@import '/assets/vendors/general/sweetalert2/dist/sweetalert2.css';
@import '/assets/vendors/general/socicon/css/socicon.css';
@import '/assets/vendors/custom/vendors/line-awesome/css/line-awesome.css';
@import '/assets/vendors/custom/vendors/flaticon/flaticon.css';
@import '/assets/vendors/custom/vendors/flaticon2/flaticon.css';
@import '/assets/vendors/general/fortawesome/fontawesome-free/css/all.min.css';

@import '/assets/css/style.bundle.css';
@import '/assets/css/dark.css';
@import '/assets/css/custom.css';
</style>

<script>
import { mapGetters, mapActions } from 'vuex';
import CONSTANTS from '../core/utils/constants';

// import menuLeft from './_shared/menu-left-v2';
import siteFooter from './_shared/site-footer';
import stickyToolbar from './_shared/sticky-toolbar';
import quickPanel from './_shared/quick-panel';
//import menuTop from './_shared/menu-top';
//import guide from './videotutorial/display';
let menuMode = '';
if (typeof localStorage !== 'undefined') {
    try {
        menuMode = localStorage.getItem(CONSTANTS.MENU_MODE) || '';
    } catch (e) {
        menuMode = '';
    }
}
export default {
    name: 'App',
    components: {
        // menuLeft,
        siteFooter,
        stickyToolbar,
        quickPanel,
        //menuTop,
        //guide,
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
            timeOut: null,
            hasNewVersion: false
        };
    },
    computed: {
        ...mapGetters([
            'system',
            'openCompanyPopup',
            'openChangePassPopup',
            'openTutorialPopup',
            'openSendErrorPopup'
        ])
    },
    methods: {
        ...mapActions(['logOut', 'initSystem', 'updateAppSettings']),
        updateShowMenuMobile() {
            this.showMenuMobile = !this.showMenuMobile;
            if (this.showMenuMobile)
                document.getElementsByTagName('body')[0].classList.add('kt-aside--on');
            else document.getElementsByTagName('body')[0].classList.remove('kt-aside--on');
        },
        mobileToggleToolBar() {
            document.getElementsByTagName('body')[0].classList.remove('kt-aside--on');
            document.getElementById('kt_aside').classList.remove('kt-aside--on');
            if (!this.showToolBar)
                document
                    .getElementsByTagName('body')[0]
                    .classList.add('kt-header__topbar--mobile-on');
            else
                document
                    .getElementsByTagName('body')[0]
                    .classList.remove('kt-header__topbar--mobile-on');
            this.showToolBar = !this.showToolBar;
        },
        mobileToggleLeftMenu() {
            document
                .getElementsByTagName('body')[0]
                .classList.remove('kt-header__topbar--mobile-on');
            if (!this.showLeftMenuMobile) {
                document.getElementsByTagName('body')[0].classList.add('kt-aside--on');
                document.getElementById('kt_aside').classList.add('kt-aside--on');
            } else {
                document.getElementsByTagName('body')[0].classList.remove('kt-aside--on');
                document.getElementById('kt_aside').classList.remove('kt-aside--on');
            }
            this.showLeftMenuMobile = !this.showLeftMenuMobile;
        },
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
        checkVersion() {
            setInterval(() => {
                if (window.XMLHttpRequest) {
                    var xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = () => {
                        if (xhr.status == 200 && xhr.readyState == 4) {
                            var sourceCode = xhr.responseText;
                            if (sourceCode != window.appSettings.Version) {
                                this.hasNewVersion = true;
                                //this.$notify({
                                //    group: 'foo',
                                //    title: 'Thông báo',
                                //    text: 'Hệ thống vừa cập nhật phiên bản mới, vui lòng lưu dữ liệu & F5 để cập nhật!',
                                //    type: 'info',
                                //    duration: 30000,
                                //});
                            }
                        }
                    };
                    xhr.open('GET', '/api/version', true);
                    xhr.send(null);
                }
            }, 30000);
        },
        reloadNow() {
            window.location.reload();
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
        $route() {
            this.showMenuMobile = false;
            this.showLeftMenuMobile = false;
            document.getElementsByTagName('body')[0].classList.remove('kt-aside--on');
            document.getElementById('kt_aside').classList.remove('kt-aside--on');
        }
    },
    destroyed() {
        window.removeEventListener('resize', this.handleResize);
    },
    created() {
        this.checkVersion();
        //this.initSession();
    }
};
</script>
