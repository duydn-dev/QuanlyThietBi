<template>
    <div class="js-btn-showPopHeader">
    <a class="itm-link js-btn-drop" href="javascript:void(0);" @click="showNotification(false)">
        <img src="/assets-v2/images/icon-remind.svg" alt="" class="icon-h-gray">
        <img src="/assets-v2/images/icon-remind-white.svg" alt="" class="icon-h-white">
        <label class="lbl-num-noti" v-if="totalItemNotRead">
            {{totalItemNotRead}}
        </label>
    </a>
    <!-- [D] Thêm class "show" vào class "drop-menu" khi click vào "btn-top" để hiện box thông tin -->
    <div class="drop-menu" :class="{'show':isShowDetail == true}" 
    @mouseover="isShowDetail = true"
    @mouseout="isShowDetail = false">
        <div class="top-noti d-flex align-items-center justify-content-between">
            <strong>Thông báo</strong>
            <button type="button" class="mark-read" @click="readAll" v-if="lstNotification && lstNotification.length > 0">Đánh dấu tất cả đã đọc</button>
        </div>
        
        <div>
            <!-- Nếu box thông báo dài vượt quá 400px thì thêm class "scroll" vào class "lst-noti" -->
            <ul class="lst-noti" id="lst-noti" ref="notiList" :class="{scroll:lstNotification && lstNotification.length > 3}">
                <!-- <li class="itm-noti" 
                    v-for="item in lstNotification"
                    :key="item.id"                
                >
                    <a href="javascript:void(0);" class="d-flex" @click="goToLink(item)">
                        <div class="img-area">
                            <img :src="item.memberAvatar?item.memberAvatar:'/assets-v2/images/@avt.jpg'" alt="">
                        </div>
                        <div class="info-area">
                            <strong class="txt-tit">{{item.fullName}}</strong>
                            <p class="txt-desc">{{item.title}}</p>
                            <span class="txt-time">{{item.createdDate | moment("DD/MM/YYYY HH:mm")}}</span>
                        </div>
                    </a>
                </li> -->
                <alert
                    v-if="!lstNotification || lstNotification.length == 0"
                    text="Không có thông báo mới"
                />
                <li v-else class="itm-noti" v-for="item in lstNotification"
                    :key="'noti_item_'+item.id">
                    <!-- Thông báo chưa đọc -->
                    <a href="javascript:void(0);" class="d-flex" :class="{'un-read':!item.isRead}" @click="goToLink(item)">
                        <div class="img-area">
                            <img :src="item.memberAvatar?item.memberAvatar:'/assets-v2/images/@avt.jpg'" alt="">
                        </div>
                        <div class="info-area">
                            <p class="txt-desc" v-html="item.body"></p>
                            <span class="txt-time">{{getTimeAgo(item.createdDate)}}</span>
                        </div>
                    </a>
                </li>
                <!-- <li class="itm-noti">
                    <a href="javascript:void(0);" class="d-flex">
                        <div class="img-area">
                            <img src="/assets-v2/images/@avt.jpg" alt="">
                        </div>
                        <div class="info-area">
                            <p class="txt-desc"><b>Nguyễn Ngọc Kiều</b> đã thêm nhiệm vụ <b>NV cá nhân</b></p>
                            <span class="txt-time">10 ngày</span>
                        </div>
                    </a>
                </li> -->
            </ul>
            <a href="javascript:void(0);" 
                @click="getMore" 
                class="view-more d-flex justify-content-center">
                Xem thêm
            </a>
        </div>
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
import CONSTANTS from '../../../core/utils/constants';
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            objData: {
                pageIndex: 1,
                pageSize: 10
            },
            isShowDetail: false,
            isFirstTimeLoaded:false,
            totalItemNotRead: 0,
            lstNotification: [],
            //lstHeight: 0,
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
        // console.log('this.scrollSettings', this.scrollSettings);

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
        // calculateLstHeight(){
        //     this.lstHeight = this.$refs.notiList? this.$refs.notiList.clientHeight:0;
        //     console.log('this.lstHeight',this.lstHeight)
        // },
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
            //if (this.isShowDetail) {
            if (!this.isFirstTimeLoaded) {
                this.objData.pageIndex = 1;
                this.getNotification(false);
                this.isFirstTimeLoaded=true;
            }
            this.$emit('show');
        },
        showListPanel(isShow){
            this.isShowDetail =isShow;
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

                    console.log('lstNotification', this.lstNotification);

                    //this.calculateLstHeight();
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
        },
        getTimeAgo(datetime){
            return this.$moment(datetime).locale('vi').fromNow(true);
        }
    }
}
    
</script>

<style scoped>
.is-system .dropdown-menu {
    left: -126px !important;
}
.kt-aside--minimize .dropdown-menu {
    left: -23px !important;
}
</style>