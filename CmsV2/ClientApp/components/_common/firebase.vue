<template>
    <div class="kt-header__topbar-item dropdown" :class="{ show: isShowDetail == true }">
        <div
            class="kt-header__topbar-wrapper"
            data-toggle="dropdown"
            data-offset="10px,0px"
            aria-expanded="true"
            @click="showNotification(false)"
        >
            <span class="kt-header__topbar-icon kt-header__topbar-icon--success">
                <i class="flaticon2-bell-alarm-symbol"></i>
            </span>
            <span
                class="kt-badge kt-badge--danger alert-total-not-read"
                v-if="totalItemNotRead"
            >{{totalItemNotRead}}</span>
        </div>
        <!-- @mouseover="isShowDetail = true"
        @mouseout="isShowDetail = false"-->
        <div
            class="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-xl"
            :class="{ show: isShowDetail == true }"
            style="left: -171px; width: 450px"
            x-placement="bottom-end"
            @mouseover="isShowDetail = true"
            @mouseout="isShowDetail = false"
        >
            <form>
                <!--begin: Head -->
                <div
                    class="kt-head kt-head--skin-dark kt-head--fit-x kt-head--fit-b"
                    style="background-image: url('/img/bg-1.jpg');padding-bottom: 30px !important;"
                >
                    <h3 class="kt-head__title kt-head--skin-dark">
                        Thông báo
                        &nbsp;
                        <span
                            class="btn btn-success btn-sm btn-bold btn-font-md"
                            v-if="totalItemNotRead"
                        >{{totalItemNotRead}}</span>
                    </h3>
                </div>
                <!--end: Head -->

                <div class="tab-content">
                    <div
                        class="tab-pane show active"
                        id="topbar_notifications_notifications"
                        role="tabpanel"
                    >
                        <alert
                            v-if="!lstNotification || lstNotification.length == 0"
                            text="Không có thông báo mới"
                        />
                        <div v-else>
                            <div class="col-12 text-right mb-2 mt-2">
                                <a href="javascript:;" @click="readAll">Đánh dấu tất cả đã đọc</a>
                            </div>
                            <div
                                class="kt-notification kt-margin-t-10 kt-margin-b-10 notification-items"
                            >
                                <a
                                    href="javascript:;"
                                    @click="goToLink(item)"
                                    class="kt-notification__item"
                                    v-for="item in lstNotification"
                                    :key="item.id"
                                    :class="{'notification-item-not-read': !item.isRead}"
                                >
                                    <!-- <div class="kt-notification__item-icon">
                                    <i class="flaticon2-line-chart kt-font-success"></i>
                                    </div>-->
                                    <div class="kt-notification__item-details">
                                        <div class="kt-notification__item-title">{{item.title}}</div>
                                        <div
                                            class="kt-notification__item-time"
                                        >{{item.createdDate | moment("DD/MM/YYYY HH:mm")}}</div>
                                    </div>
                                </a>
                            </div>
                            <div class="col-12 text-right mb-2">
                                <a href="javascript:;" @click="getMore">Xem thêm</a>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
var self = this;
function log() {
    self.totalItemNotRead++;
    console.log(self.totalItemNotRead);
}
// import firebase from 'firebase'
// import 'firebase/messaging'
// import { HubConnectionBuilder, LogLevel } from 'signalr';
// import $ from 'jquery';
// import "signalR";
import CONSTANTS from '../../core/utils/constants';
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            objData: {
                pageIndex: 1,
                pageSize: 10
            },
            isShowDetail: false,
            totalItemNotRead: 0,
            lstNotification: []
        };
    },
    created() {
        this.getTotalNotificationNotRead();
        // Không xóa
        if (this.fireBaseMessaging) {
            // this.fireBaseMessaging.onMessage(payload => {
            //     this.showNotificationInfo(payload);
            //     console.log(payload);
            // });
        }

        var connection = $.hubConnection(this.getUrlApi() + '/signalr');
        connection.qs = {
            Authorization: this.getToken()
        };

        // console.log('connection', connection);

        let systemHubProxy = connection.createHubProxy('systemhub');
        systemHubProxy.on('notification', payload => {
            this.showNotificationInfo(payload);
        });

        this.setSystemHubProxy(systemHubProxy);
        console.log(this.systemHubProxy);
        // this.systemHubProxy.on('progress', payload => {
        //     console.log('payload111111111111' + payload);
        //     //this.item = payload;
        // });
        // this.scrollSettings = {};
        console.log('this.scrollSettings', this.scrollSettings);

        connection
            .start({ jsonp: true })
            .done(function() {
                console.log('connected');
            })
            .fail(function(a) {
                console.log('not connected' + a);
            });
    },
 
    computed: {
        // messaging() {
        //     return firebase.messaging();
        // }
    },
    methods: {
        ...mapActions(['setSystemHubProxy']),
        showNotificationInfo(payload) {
            if (this.lstNotification.length > 0 && payload.data)
                this.lstNotification.unshift(payload.data);
            let notification = payload.notification;

            this.totalItemNotRead++;
            this.$notify({
                type: 'success',
                group: 'foo',
                title: notification.title,
                text: notification.body
            });
        },
        getTotalNotificationNotRead() {
            this.$http({
                data: {
                    m: 'notification',
                    fn: 'total-notification-not-read'
                }
            })
                .then(response => {
                    this.totalItemNotRead = response.data;
                })
                .catch(err => {
                    return this.$message(err.message, 'error');
                });
        },
        showNotification() {
            this.isShowDetail = !this.isShowDetail;
            if (this.isShowDetail) {
                this.objData.pageIndex = 1;
                this.getNotification(false);
            }
            this.$emit('show');
        },
        goToLink(item) {
            if (this.isShowDetail) {
                this.$http({
                    data: {
                        m: 'notification',
                        fn: 'update-read-notification',
                        id: item.id
                    }
                })
                    .then(() => {
                        if (this.totalItemNotRead > 0) this.totalItemNotRead--;
                        this.isShowDetail = false;
                    })
                    .catch(err => {
                        return this.$message(err.message, 'error');
                    });
            }
            if (item.url) this.$router.push(item.url);
        },
        readAll() {
            this.$http({
                data: {
                    m: 'notification',
                    fn: 'update-read-all-notification'
                }
            })
                .then(() => {
                    this.$success('Tất cả thông báo đã được đọc');
                    this.totalItemNotRead = 0;
                    _.forEach(this.lstNotification, o => {
                        o.isRead = true;
                    });
                })
                .catch(err => {
                    return this.$message(err.message, 'error');
                });
        },
        getNotification(isAddmore) {
            this.$http({
                data: {
                    m: 'notification',
                    fn: 'list',
                    ...this.objData
                }
            })
                .then(response => {
                    if (!isAddmore) this.lstNotification = response.data;
                    else this.lstNotification = this.lstNotification.concat(response.data);
                    // if (!this.lstNotification || this.lstNotification.length == 0)
                    //     this.lstNotification = response.data;
                    // else this.lstNotification = this.lstNotification.concat(response.data);
                })
                .catch(err => {
                    return this.$message(err.message, 'error');
                });
        },
        getMore() {
            this.objData.pageIndex++;
            this.getNotification(true);
        },
        log() {
            log();
        },
        getToken() {
            var token = null;
            if (!process.env.VUE_ENV) token = localStorage.getItem(CONSTANTS.AUTH_TOKEN);
            if (window.appSettings.token) token = window.appSettings.token;
            return token;
        },
        getUrlApi() {
            let BASE_URLAPI = null;
            if (process.env.BASE_URL) {
                BASE_URLAPI = process.env.ApiUrl;
            } else {
                BASE_URLAPI = window.appSettings.ApiUrl;
            }

            return BASE_URLAPI;
        }
    }
};
</script>

<style scoped>
.is-system .dropdown-menu {
    left: -126px !important;
}
.kt-aside--minimize .dropdown-menu {
    left: -23px !important;
}
</style>