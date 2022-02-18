<template>
    <wrapperv2>
        <template slot="side-bar">
            <!-- SIDEBAR -->
            <div class="sidebar">
                <div class="logo">
                    <h1 class="page-title">
                        <a href="/">
                            <div class="img-logo">
                                <img
                                    src="/assets-v2/images/logo-o2.svg"
                                    alt=""
                                    class="icon-h-gray"
                                />
                                <img
                                    src="/assets-v2/images/logo-o2-white.svg"
                                    alt=""
                                    class="icon-h-white"
                                />
                            </div>
                            <span class="txt-logo">DTI</span>
                        </a>
                    </h1>
                </div>
            </div>
            <!-- END SIDEBAR -->
        </template>
        <!-- <div class="content-page d-flex flex-column align-items-center justify-content-center">
            <div class="footer-ct d-flex flex-column align-items-center justify-content-center">
                <strong>CÔNG TY CỔ PHẦN CÔNG NGHỆ O2 VIỆT NAM</strong>
                <p>
                    Tầng 3, Tòa Nhà CT2, Dự án khu nhà ở cán bộ,nhân viên Ban cơ yếu chính phủ, Lê
                    Văn Lương, P. Nhân Chính, Q. Thanh Xuân, TP. Hà Nội
                </p>
                <p>
                    Điện thoại: <a href="tel:+02466635775" class="txt-link">0246 6635 775</a> -
                    Email:
                    <a href="mailto:contact@o2tech.vn" class="txt-link">contact@o2tech.vn</a> -
                    Website:
                    <a href="http://o2tech.vn" target="_blank" class="txt-link">http://o2tech.vn</a>
                </p>
            </div>
        </div> -->
        <template slot="footer">
            <div class="d-none"></div>
        </template>
    </wrapperv2>
</template>
<style scoped>
</style>
<script>
import { mapGetters } from 'vuex';
import PermissionMixins from '../../../core/mixins/permission';

export default {
    name: 'DashboardIndexV2',
    mixins: [PermissionMixins],
    computed: {
        ...mapGetters(['menuData', 'blocks']),
    },
    methods: {
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
        //this.$router.push('/membercare');

        console.log(this.blocks);
    },
};
</script>
