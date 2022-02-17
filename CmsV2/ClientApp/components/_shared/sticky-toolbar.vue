<template>
    <div v-if="appSettings.configs.reportError && (appSettings.configs.reportError == '1' || appSettings.configs.videoTutorial == '1')"> 
        <ul class="kt-sticky-toolbar" style="margin-top: 30px;" >
            <!--<li id="kt_demo_panel_toggle"
                class="kt-sticky-toolbar__item kt-sticky-toolbar__item--success"
                data-toggle="kt-tooltip"
                title="Check out more demos"
                data-placement="right">
                <a href="#" class=""><i class="flaticon2-drop" /></a>
            </li>
            <li class="kt-sticky-toolbar__item kt-sticky-toolbar__item--brand"
                data-toggle="kt-tooltip"
                title="Layout Builder"
                data-placement="left">
                <a href="https://keenthemes.com/metronic/preview/demo6/builder.html" target="_blank">
                    <i class="flaticon2-gear" />
                </a>
            </li>-->
            <li class="kt-sticky-toolbar__item kt-sticky-toolbar__item--warning" v-if="appSettings.configs.reportError && appSettings.configs.reportError == '1'"
                data-toggle="kt-tooltip"
                title="Báo cáo lỗi"
                data-placement="left">
                <a @click="openPopup()">
                    <i class="flaticon2-telegram-logo" />
                </a>
            </li>
            <li id="kt_sticky_toolbar_chat_toggler"  v-if="appSettings.configs.videoTutorial && appSettings.configs.videoTutorial == '1'"
                class="kt-sticky-toolbar__item kt-sticky-toolbar__item--danger"
                data-toggle="kt-tooltip"
                title="Xem hướng dẫn"
                data-placement="left">
                <a @click="openPopupGuide()">
                    <i class="fab fa-youtube"></i>
                </a>
            </li>
        </ul>
        <modal v-if="popup"
               id="modal-dashbroad"
               title="Gửi thông báo lỗi"
               @close="closePopup()">
            <div slot="body">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="form-group">
                            <label>Loại lỗi</label>
                            <select type="text"
                                    v-model="objError.typeError"
                                    class="form-control">
                                <option value="0">
                                    --- Chọn lỗi ---
                                </option>
                                <option value="1">
                                    Thiếu dữ liệu
                                </option>
                                <option value="2">
                                    Dữ liệu trùng lặp
                                </option>
                                <option value="3">
                                    Dịch sai dữ liệu
                                </option>
                                <option value="4">
                                    Lỗi khác
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="form-group">
                            <label>Nội dung</label>
                            <textarea ref="description" class="form-control" v-model="objError.description" rows="5" />
                        </div>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <button class="btn btn-cyan" @click="insert()">
                    <span>Lưu lại</span>
                </button>
                <button class="btn btn-danger" @click="closePopup()">
                    <span>Quay lại</span>
                </button>
            </div>
        </modal>
    </div>


</template>
<script>
    export default {
        data() {
            return {
                objError: {
                    id: 0,
                    typeError: 0,
                    createdDate: null,
                    createdBy: '',
                    description: '',
                    url: '',
                    status: 0
                },
                popup: false,
                popupGuide: false
            };
        },
        methods: {
            insert() {
                if (this.objError.typeError != 0) {
                    this.objError.url = window.location.pathname;
                    this.objError.createdBy = this.currentUser.fullName;
                    this.$http({
                        data: {
                            m: 'errorreport',
                            fn: 'insert',
                            ...this.objError,
                        }
                    }).then(response => {
                        if (response.success) {
                            this.$message('Ý kiến của bạn đã được gửi đến Quản trị viên');
                        } else {
                            this.$message('Chưa lưu được dữ liệu, vui lòng thử lại !', 'error');
                        }
                        this.closePopup();
                    }).catch(ex => {
                        this.$message(ex.message, 'error');
                        this.closePopup();
                    });
                } else {
                    this.$message('Vui lòng chọn loại lỗi !', 'error');
                }
            },
            openPopup() {
                this.objError.typeError = 0;
                this.popup = true;
            },
            closePopup() {
                this.popup = false;
            },
            openPopupGuide() {
                this.popupGuide = true;
            },
            closePopupGuide() {
                this.popupGuide = false;
            },
        },
    }
</script>