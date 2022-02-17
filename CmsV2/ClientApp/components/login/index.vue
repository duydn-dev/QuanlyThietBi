<template>
    <div class="kt-grid kt-grid--ver kt-grid--root kt-page">
        <div id="kt_login" class="kt-grid kt-grid--hor kt-grid--root kt-login kt-login--v1">
            <div
                class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--desktop kt-grid--ver-desktop kt-grid--hor-tablet-and-mobile"
            >
                <!--begin::Aside-->
                <div
                    class="kt-grid__item kt-grid__item--order-tablet-and-mobile-2 kt-grid kt-grid--hor kt-login__aside"
                    style="background: #146cd8"
                >
                    <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver">
                        <div class="kt-grid__item kt-grid__item--middle" id="site-center-logo">
                            <!--<div id="logo-top" class="logo-site"></div>-->
                            <h1
                                class="kt-login__title"
                                style="font-size: 80px; font-weight: bold; margin: 20px"
                            >
                                O2WORK
                            </h1>
                            <h4
                                class="kt-login__subtitle"
                                style="text-transform: uppercase; color: #fff; margin: 20px"
                            >
                                Bộ giải pháp giúp doanh nghiệp chuyển đổi số hiệu quả.
                            </h4>
                            <!--<div id="logo-bottom" class="logo-site"></div>-->
                        </div>
                    </div>

                    <div class="kt-grid__item">
                        <div class="kt-login__info">
                            <div class="kt-login__copyright">
                                © {{ new Date().getFullYear() }} O2Tech.,JSC
                            </div>
                            <div class="kt-login__menu">
                                <!--<a href="http://O2Tech.vn/" class="kt-link" target="_blank">Giới thiệu</a>-->
                                <a href="http://O2Tech.vn/" class="kt-link" target="_blank"
                                    >Liên hệ</a
                                >
                            </div>
                        </div>
                    </div>
                </div>
                <!--begin::Aside-->
                <!--begin::Content-->
                <div
                    class="kt-grid__item kt-grid__item--fluid kt-grid__item--order-tablet-and-mobile-1 kt-login__wrapper"
                >
                    <!--begin::Body-->
                    <div class="kt-login__body">
                        <!--begin::Signin-->
                        <div class="kt-login__form">
                            <div class="kt-login__title">
                                <h3 style="font-weight: bold; color: #808080">ĐĂNG NHẬP</h3>
                            </div>

                            <!--begin::Form-->
                            <form id="login-form" class="kt-form" novalidate="novalidate">
                                <div class="form-group">
                                    <i class="flaticon-user txt-ico" />
                                    <input
                                        v-model="loginData.userName"
                                        class="form-control txt"
                                        type="text"
                                        placeholder="TÊN ĐĂNG NHẬP"
                                        name="email"
                                        autocomplete="off"
                                        required
                                        @keyup.enter="doLogin"
                                    />
                                </div>
                                <div class="form-group">
                                    <i class="flaticon-lock txt-ico" />
                                    <input
                                        v-model="loginData.password"
                                        class="form-control txt"
                                        type="password"
                                        placeholder="MẬT KHẨU"
                                        name="password"
                                        required
                                        @keyup.enter="doLogin"
                                    />
                                </div>
                                <div class="form-group">
                                    <div class="input-group mb-2 mr-sm-2 mb-sm-0">
                                        <i
                                            class="flaticon-lock txt-ico"
                                            style="
                                                top: 34px;
                                                color: #646c9a;
                                                z-index: 10;
                                                font-size: 14px;
                                            "
                                        />
                                        <input
                                            v-model="loginData.captcha"
                                            type="text"
                                            class="form-control txt"
                                            placeholder="Mã xác nhận"
                                            style="text-transform: uppercase"
                                            required
                                            @keyup.enter="doLogin"
                                        />
                                        <img id="img-captcha" :src="imgCaptcha" width="200" />
                                        <span
                                            id="reloadCaptcha"
                                            title="Đổi mã mới"
                                            @click="getCaptcha()"
                                        >
                                            <strong
                                                style="font-size: 22px"
                                                class="flaticon2-reload text-warning"
                                            />
                                        </span>
                                    </div>
                                </div>
                                <!--begin::Action-->
                                <div class="kt-login__actions">
                                    <a href="#" class="kt-link kt-login__link-forgot" />
                                    <button
                                        type="button"
                                        id="kt_login_signin_submit"
                                        class="btn btn-primary"
                                        @click="doLogin"
                                        style="padding: 8px 15px; font-weight: bold"
                                    >
                                        Đăng nhập
                                    </button>
                                </div>
                                <!--end::Action-->
                            </form>
                            <!--end::Form-->
                        </div>
                        <!--end::Signin-->
                    </div>
                    <!--end::Body-->
                </div>
                <!--end::Content-->
            </div>
        </div>
    </div>
</template>
<style>
#site-center-logo {
    text-align: center;
    margin: 0 auto;
}
.logo-site {
    background: url('/img/techco-bomas.png') no-repeat;
    height: 165px;
    background-position: center center;
}
#logo-top {
    background-position: center top;
}
#logo-bottom {
    background-position: center bottom;
}
#kt_login_signin_submit {
    background: #146cd8;
    border-color: #146cd8;
}
</style>
<script>
import { mapGetters, mapActions } from 'vuex';
function getInitData() {
    return {
        isLoading: false,
        imgCaptcha: '',
        loginData: {
            userName: '',
            password: '',
            token: '',
            captcha: '',
            md5Captcha: '',
        },
    };
}
var opts = {
    name: 'login-index',
    data() {
        return getInitData();
    },
    computed: {
        ...mapGetters(['isLoggedIn', 'system']),
    },
    methods: {
        ...mapActions(['getUserInfo', 'logIn', 'initSystem', 'updateAppSettings', 'updateDict']),
        onSubmit: function () {
            this.doLogin();
        },
        onVerify(response) {
            this.isLoading = true;
            this.$http({
                data: {
                    m: 'user',
                    fn: 'verify_captcha',
                    token: response,
                },
            })
                .then((response) => {
                    if (response.success) {
                        this.isLoading = false;
                        this.doLogin();
                    }
                })
                .catch((ex) => {
                    this.$message(ex.message, 'error');
                    this.resetRecaptcha();
                });
        },
        onExpired() {
            console.log('Expired');
        },
        updateTokenFireBase(token) {
            this.$http({
                data: {
                    m: 'FCMToken',
                    fn: 'save',
                    token: token,
                },
            })
                .then(() => {})
                .catch((ex) => {
                    this.$message(ex.message, 'error');
                    this.resetRecaptcha();
                });
        },
        resetRecaptcha() {
            this.$refs.invisibleRecaptcha.reset(); // Direct call reset method
        },
        doLogin() {
            if (!this.loginData.userName || !this.loginData.password || !this.loginData.captcha) {
                return this.$alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin!', 'error');
            } else {
                var obj = Object.assign({}, this.loginData);
                this.isLoading = true;
                this.logIn(obj)
                    .then(() => {
                        //add token firebase
                        // this.fireBaseGetToken().then(token => {
                        //    this.updateTokenFireBase(token);
                        // });

                        this.isLoading = false;
                        this.initSystem().then(() => {
                            this.done = true;
                            let tempSettings = this.appSettings;

                            tempSettings = Object.assign(tempSettings, this.system);
                            this.updateDict(this.system.dictionarys);
                            this.updateAppSettings(tempSettings);
                            this.CompanyId = this.system.companyId;

                            if (this.$route.query && this.$route.query.returnUrl)
                                this.$router.push(decodeURIComponent(this.$route.query.returnUrl));
                            else this.$router.push('/');
                        });
                    })
                    .catch((response) => {
                        this.$error(response.message);
                        clearTimeout(this.timeDelay);
                        this.timeDelay = setTimeout(() => {
                            location.reload();
                        }, 800);
                    });
            }
        },
        getCaptcha() {
            this.$http({
                data: {
                    m: 'user',
                    fn: 'get_captcha',
                },
            })
                .then((response) => {
                    this.loginData.captcha = '';
                    this.imgCaptcha = response.data;
                    this.loginData.md5Captcha = response.content;
                })
                .catch(() => {});
        },
    },
    created() {
        this.getCaptcha();
        if (!process.env.VUE_ENV)
            if (localStorage.getItem(this.CONSTANTS.AUTH_TOKEN)) {
                if (this.$route.query && this.$route.query.returnUrl)
                    this.$router.push(decodeURIComponent(this.$route.query.returnUrl));
                else this.$router.push('/');
            }
        localStorage.setItem(this.CONSTANTS.CURRENT_VERSION, this.appSettings.Version);
    },
    watch: {},
};
export default opts;
</script>
<style scoped>
#login-form .form-group {
    position: relative;
}
#login-form .txt-ico {
    position: absolute;
    top: 14px;
    left: 15px;
}
#login-form .txt {
    padding-left: 40px;
}
.kt-login.kt-login--v1 .kt-login__aside {
    width: 605px;
    padding: 3rem 3.5rem;
    background-repeat: no-repeat;
    background-size: cover;
}
.kt-login.kt-login--v1 .kt-login__aside .kt-login__logo {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.kt-login.kt-login--v1 .kt-login__aside .kt-login__title {
    color: #ffffff;
    font-size: 2rem;
    font-weight: 500;
}
.kt-login.kt-login--v1 .kt-login__aside .kt-login__subtitle {
    font-size: 1.2rem;
    font-weight: 200;
    margin: 2.5rem 0 3.5rem 0;
    color: rgba(255, 255, 255, 0.7);
}
.kt-login.kt-login--v1 .kt-login__aside .kt-login__info {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
}
.kt-login.kt-login--v1 .kt-login__aside .kt-login__info .kt-login__menu > a {
    text-decoration: none;
    color: #fff;
    margin-right: 2rem;
    display: inline-block;
    color: rgba(255, 255, 255, 0.7);
}
.kt-login.kt-login--v1 .kt-login__aside .kt-login__info .kt-login__menu > a:hover {
    color: #fff;
}
.kt-login.kt-login--v1 .kt-login__aside .kt-login__info .kt-login__menu > a:hover:after {
    border-bottom: 1px solid #fff;
    opacity: 0.3;
}
.kt-login.kt-login--v1 .kt-login__aside .kt-login__info .kt-login__menu > a:last-child {
    margin-right: 0;
}
.kt-login.kt-login--v1 .kt-login__aside .kt-login__info .kt-login__copyright {
    color: rgba(255, 255, 255, 0.4);
}

.kt-login.kt-login--v1 .kt-login__wrapper {
    padding: 3rem 3rem;
    background: #fff;
}
.kt-login.kt-login--v1 .kt-login__wrapper .kt-login__head {
    font-size: 1rem;
    font-weight: 500;
    text-align: right;
}
.kt-login.kt-login--v1 .kt-login__wrapper .kt-login__head .kt-login__signup-label {
    color: #a7abc3;
}
.kt-login.kt-login--v1 .kt-login__wrapper .kt-login__head .kt-login__signup-link {
    color: #2c77f4;
}
.kt-login.kt-login--v1 .kt-login__wrapper .kt-login__body {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 100%;
}
.kt-login.kt-login--v1 .kt-login__wrapper .kt-login__body .kt-login__form {
    width: 100%;
    max-width: 450px;
}
.kt-login.kt-login--v1 .kt-login__wrapper .kt-login__body .kt-login__form .kt-login__title {
    display: block;
    text-align: center;
    margin-bottom: 5rem;
    text-decoration: none;
}
.kt-login.kt-login--v1 .kt-login__wrapper .kt-login__body .kt-login__form .kt-login__title > h3 {
    font-size: 2rem;
    color: #67666e;
}
.kt-login.kt-login--v1 .kt-login__wrapper .kt-login__body .kt-login__form .kt-form {
    margin: 4rem auto;
}
.kt-login.kt-login--v1 .kt-login__wrapper .kt-login__body .kt-login__form .kt-form .form-group {
    margin: 0;
    padding: 0;
    margin: 0 auto;
}
.kt-login.kt-login--v1
    .kt-login__wrapper
    .kt-login__body
    .kt-login__form
    .kt-form
    .form-group
    .form-control {
    border: none;
    height: 50px !important;
    margin-top: 1.25rem;
    background-color: rgba(247, 247, 249, 0.7);
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    -webkit-transition: background-color 0.3s ease;
    transition: background-color 0.3s ease;
}
.kt-login.kt-login--v1
    .kt-login__wrapper
    .kt-login__body
    .kt-login__form
    .kt-form
    .form-group
    .form-control:focus {
    -webkit-transition: background-color 0.3s ease;
    transition: background-color 0.3s ease;
    background-color: #f7f7f9;
}
.kt-login.kt-login--v1 .kt-login__wrapper .kt-login__body .kt-login__form .kt-login__actions {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin: 3rem 0;
}
.kt-login.kt-login--v1
    .kt-login__wrapper
    .kt-login__body
    .kt-login__form
    .kt-login__actions
    .kt-login__link-forgot {
    color: #a7abc3;
}
.kt-login.kt-login--v1
    .kt-login__wrapper
    .kt-login__body
    .kt-login__form
    .kt-login__actions
    .kt-login__link-forgot:hover {
    color: #2c77f4;
}
.kt-login.kt-login--v1
    .kt-login__wrapper
    .kt-login__body
    .kt-login__form
    .kt-login__actions
    .kt-login__link-forgot:hover:after {
    border-bottom: 1px solid #2c77f4;
    opacity: 0.3;
}
.kt-login.kt-login--v1
    .kt-login__wrapper
    .kt-login__body
    .kt-login__form
    .kt-login__actions
    .kt-login__btn-secondary,
.kt-login.kt-login--v1
    .kt-login__wrapper
    .kt-login__body
    .kt-login__form
    .kt-login__actions
    .kt-login__btn-primary {
    height: 50px;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
}
.kt-login.kt-login--v1 .kt-login__wrapper .kt-login__body .kt-login__form .kt-login__divider {
    margin: 1rem 0 2rem 0;
}
.kt-login.kt-login--v1
    .kt-login__wrapper
    .kt-login__body
    .kt-login__form
    .kt-login__divider:not(:first-child):not(:last-child) {
    font-weight: 400;
    color: #b5b2c3;
    font-size: 1rem;
}
.kt-login.kt-login--v1 .kt-login__wrapper .kt-login__body .kt-login__form .kt-login__options {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    max-width: 100%;
}
.kt-login.kt-login--v1 .kt-login__wrapper .kt-login__body .kt-login__form .kt-login__options > a {
    text-decoration: none;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.kt-login.kt-login--v1
    .kt-login__wrapper
    .kt-login__body
    .kt-login__form
    .kt-login__options
    > a:not(:first-child):not(:last-child) {
    margin: 0 1.5rem;
}

@media (min-width: 1025px) {
    .kt-login.kt-login--v1 .kt-login__aside {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
    }
}

@media (max-width: 1024px) {
    .kt-login.kt-login--v1 .kt-login__aside {
        width: 100%;
        height: auto;
        padding: 2rem 1.5rem;
    }
    .kt-login.kt-login--v1 .kt-login__aside .kt-login__logo {
        margin-bottom: 2.5rem;
    }
    .kt-login.kt-login--v1 .kt-login__aside .kt-login__info {
        margin-top: 2rem;
    }
    .kt-login.kt-login--v1 .kt-login__aside .kt-login__subtitle {
        margin: 2rem 0;
    }
    .kt-login.kt-login--v1 .kt-login__wrapper {
        padding: 3rem 1.5rem;
    }
    .kt-login.kt-login--v1 .kt-login__wrapper .kt-login__head {
        padding-left: 2rem;
        right: 2rem;
    }
    .kt-login.kt-login--v1 .kt-login__wrapper .kt-login__body {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin-top: 5rem;
    }
    .kt-login.kt-login--v1
        .kt-login__wrapper
        .kt-login__body
        .kt-login__form
        .kt-login__options
        > a:not(:first-child):not(:last-child) {
        margin: 0 0.8rem;
    }
}

@media (max-width: 1368px) {
    h3.kt-login__title {
        font-size: 20px !important;
    }
    h1.kt-login__title {
        font-size: 55px !important;
    }
}

h3.kt-login__title {
    color: #d7d7d7 !important;
}
#reloadCaptcha {
    border: 1px solid #146cd8;
    cursor: pointer;
    padding: 9px 10px 5px;
    background: #146cd8;
    color: #fff;
    border-radius: 0 0.25rem 0.25rem 0;
    border-left: 1px solid #146cd8;
    margin-top: 1.25rem;
    height: 50px;
}
#reloadCaptcha i {
    font-size: 20px;
}
#img-captcha {
    height: 50px;
    margin-top: 1.25rem;
}
#reloadCaptcha .text-warning {
    color: #fff !important;
}
</style>
