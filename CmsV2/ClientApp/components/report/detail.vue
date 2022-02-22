<template>
    <div>
        <div class="box-head">
            <strong class="txt-head">XEM SỐ LIỆU - CHÍNH QUYỀN SỐ</strong>
        </div>
        <div class="box-ct">
            <ul class="dti-lst-ct dti-tab-lst d-flex align-items-center justify-content-between">
                <!-- [D] Thêm class is-active vào class tab-txt khi tab đó được chọn -->
                <li :class="`tab-txt ${typeView == 'info-tab1' ? 'is-active' : ''}`">
                    <button type="button" class="btn-tab" @click="changeView('info-tab1')">Thông tin chung</button>
                </li>
                <li :class="`tab-txt ${typeView == 'info-tab2' ? 'is-active' : ''}`">
                    <button type="button" class="btn-tab" @click="changeView('info-tab2')">Chuyển đổi nhận thức</button>
                </li>
                <li :class="`tab-txt ${typeView == 'info-tab3' ? 'is-active' : ''}`">
                    <button type="button" class="btn-tab">Kiến tạo thể chế</button>
                </li>
                <li :class="`tab-txt ${typeView == 'info-tab4' ? 'is-active' : ''}`">
                    <button type="button" class="btn-tab">Hạ tầng và nền tảng số</button>
                </li>
                <li :class="`tab-txt ${typeView == 'info-tab5' ? 'is-active' : ''}`">
                    <button type="button" class="btn-tab">Thông tin và dữ liệu số</button>
                </li>
                <li :class="`tab-txt ${typeView == 'info-tab6' ? 'is-active' : ''}`">
                    <button type="button" class="btn-tab">Hoạt động chính quyền số</button>
                </li>
                <li :class="`tab-txt ${typeView == 'info-tab7' ? 'is-active' : ''}`">
                    <button type="button" class="btn-tab">An toàn, an ninh mạng</button>
                </li>
                <li :class="`tab-txt ${typeView == 'info-tab8' ? 'is-active' : ''}`">
                    <button type="button" class="btn-tab">Đào tạo và phát triển nhân lực</button>
                </li>
                <li :class="`tab-txt ${typeView == 'info-tab9' ? 'is-active' : ''}`">
                    <button type="button" class="btn-tab">Đánh giá qua pv chuyên gia</button>
                </li>
            </ul>
            <div class="dti-tab-content">
                <!-- [D] Thêm class is-active vào class tab-panel khi tab đó được chọn -->
                <div class="tab-panel is-active" v-if="typeView == 'info-tab1'">
                    <div class="tbl-wrap">
                        <table class="tbl dti-tbl">
                             <colgroup>
                                <col width="5%">
                                <col width="32%">
                                <col width="18%">
                                <col width="33%">
                                <col width="14%">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th class="text-start">Thông tin chung</th>
                                    <th>Ghi chú</th>
                                    <th>Số liệu kê khai</th>
                                    <th>Đơn vị</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td class="text-start">Thông tin về Tỉnh/TP</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>1.1</td>
                                    <td class="text-start">Tên Tỉnh/TP</td>
                                    <td></td>
                                    <td>Hòa Bình</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>1.2</td>
                                    <td class="text-start">Địa chỉ trụ sở Ủy ban nhân dân (UBND) Tỉnh/TP</td>
                                    <td></td>
                                    <td>Số 8, đường An Dương Vương, phường Phương Lâm, thành phố Hòa Bình, tỉnh Hòa Bình.</td>
                                    <td>người</td>
                                </tr>
                                <tr>
                                    <td>1.2.1</td>
                                    <td class="text-start">Số lượng CQNN cấp tỉnh</td>
                                    <td>CQNN của tỉnh được hiểu là toàn bộ CQNN của tỉnh; bao gồm: các CQNN cấp tỉnh, UBND cấp huyện, UBND cấp xã</td>
                                    <td>20</td>
                                    <td>cơ quan</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td class="text-start">Thông tin liên hệ số liệu báo cáo</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>A</td>
                                    <td class="text-start">Cơ quan thực hiện báo cáo</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>2.1</td>
                                    <td class="text-start">Họ tên người báo cáo</td>
                                    <td>Sở Thông tin và Truyền thông</td>
                                    <td>https://www.hoabinh.gov.vn</td>
                                    <td>người</td>
                                </tr>
                                <tr>
                                    <td>2.2</td>
                                    <td class="text-start">Chức vụ</td>
                                    <td></td>
                                    <td>Trưởng phòng</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>B</td>
                                    <td class="text-start">Cơ quan giám sát, phê duyệt báo cáo</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>2.1</td>
                                    <td class="text-start">Họ tên người giám sát báo cáo</td>
                                    <td></td>
                                    <td>Nguyễn Thị Thu Hoàn</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>2.2</td>
                                    <td class="text-start">Chức vụ</td>
                                    <td></td>
                                    <td>Dev web</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="tab-panel is-active" v-else-if="typeView == 'info-tab2'">
                    <div class="tbl-wrap">
                        <table class="tbl dti-tbl">
                             <colgroup>
                                <col width="5%">
                                <col width="32%">
                                <col width="18%">
                                <col width="33%">
                                <col width="14%">
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th class="text-start">Chỉ số chính/Chỉ số thành phần/Tiêu chí</th>
                                    <th>Điểm tối đa</th>
                                    <th>Số liệu kê khai</th>
                                    <th>Đơn vị</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td class="text-start">Chuyển đổi nhận thức</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>1.1</td>
                                    <td class="text-start">Địa chỉ trang/cổng thông tin điện tử (Website/Portal) chính thức</td>
                                    <td></td>
                                    <td>Phó Giám đốc Sở</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>1.2</td>
                                    <td class="text-start">Địa chỉ trụ sở Ủy ban nhân dân (UBND) Tỉnh/TP</td>
                                    <td></td>
                                    <td>Số 8, đường An Dương Vương, phường Phương Lâm, thành phố Hòa Bình, tỉnh Hòa Bình.</td>
                                    <td>người</td>
                                </tr>
                                <tr>
                                    <td>1.2.1</td>
                                    <td class="text-start">Số lượng CQNN cấp tỉnh</td>
                                    <td>Ủy ban nhân dân tỉnh</td>
                                    <td>20</td>
                                    <td>cơ quan</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td class="text-start">Thông tin liên hệ số liệu báo cáo</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>A</td>
                                    <td class="text-start">Cơ quan thực hiện báo cáo</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>2.1</td>
                                    <td class="text-start">Họ tên người báo cáo</td>
                                    <td>Sở Thông tin và Truyền thông</td>
                                    <td>https://www.hoabinh.gov.vn</td>
                                    <td>người</td>
                                </tr>
                                <tr>
                                    <td>2.2</td>
                                    <td class="text-start">Chức vụ</td>
                                    <td></td>
                                    <td>Trưởng phòng</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>B</td>
                                    <td class="text-start">Cơ quan giám sát, phê duyệt báo cáo</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>2.1</td>
                                    <td class="text-start">Họ tên người giám sát báo cáo</td>
                                    <td></td>
                                    <td>Nguyễn Thị Thu Hoàn</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>2.2</td>
                                    <td class="text-start">Chức vụ</td>
                                    <td></td>
                                    <td>Dev web</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'ReportDetail',
        data() {
            return {
                typeView: '',
            };
        },
        methods: {
            changeView(type) {
                this.typeView = type;
            },
        },
        created() {
            this.typeView = (this.$route.query.type ? this.$route.query.type : 'info-tab1')
        },
    };
</script>