<template>
    <modal title="Chi tiết hành động" size="huge" @close="$emit('close')">
        <div slot="body">
            <table class="table table-bordered">
                <tr>
                    <td class="header-tbl">Ngày thao tác</td>
                    <td>{{logDetail.createdDate|moment('HH:mm - DD/MM/YYYY')}}</td>
                </tr>
                <tr>
                    <td class="header-tbl">Người thao tác</td>
                    <td>{{logDetail.createdBy}}</td>
                </tr>
                <tr>
                    <td class="header-tbl">Hành động</td>
                    <td>{{logDetail.title}}</td>
                </tr>
                <tr>
                    <td class="header-tbl">Loại</td>
                    <td>
                        <badgeLogAction :type="logDetail.type" />
                    </td>
                </tr>
            </table>
            <!--<h3>Chi tiết</h3>-->
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th class="header-tbl">Tên</th>
                        <th class="header-tbl">Dữ liệu trước thay đổi</th>
                        <th class="header-tbl">Dữ liệu sau thay đổi</th>
                    </tr>
                </thead>
                <!-- :class="{'bg-warning': (item.oldValue != item.newValue) && (item.oldValue  || item.newValue )}" -->
                <tbody>
                    <tr v-for="item in logDetailDataShow" :key="item.key">
                        <td>{{item.name}}</td>
                        <td>{{item.oldValue}}</td>
                        <td>{{item.newValue}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </modal>
</template>

<script>
import badgeLogAction from '../_common/badge-log-action';
export default {
    props: ['itemId'],
    components: { badgeLogAction },
    data() {
        return {
            logDetail: {},
            logDetailData: [],
        };
    },
    computed: {
        logDetailDataShow() {
            return this.logDetailData.filter(
                (item) => item.oldValue != item.newValue && (item.oldValue || item.newValue)
            );
        },
    },
    methods: {
        viewDetail(id) {
            let loading = this.$loading.show();
            this.$http({
                data: {
                    m: 'logaction',
                    fn: 'detail',
                    id: id,
                },
            })
                .then((response) => {
                    loading.hide();
                    this.logDetail = response.data.item;
                    this.logDetailData = response.data.itemDetails;
                })
                .catch((err) => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        },
    },
    created() {
        this.viewDetail(this.itemId);
    },
};
</script>

<style>
</style>