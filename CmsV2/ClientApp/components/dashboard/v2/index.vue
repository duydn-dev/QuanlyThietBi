<template>
    <wrapperv2>
        <template slot="side-bar">
            <!-- SIDEBAR -->
            <div class="sidebar">
                <div class="logo">
                    <h1 class="page-title">
                        <a href="/">
                            <div class="img-logo">
                                <img src="/assets-v2/images/logo-o2.svg" alt="" class="icon-h-gray">
                                <img src="/assets-v2/images/logo-o2-white.svg" alt="" class="icon-h-white">
                                </div>
                            <span class="txt-logo">O2 System</span>
                        </a>
                    </h1>
                </div>
            </div>
            <!-- END SIDEBAR -->
        </template>
        <div class="content-page d-flex flex-column align-items-center justify-content-center">
                
                <div class="logo-ct"><img src="/assets-v2/images/logo-o2-white.svg" alt=""></div>
                <h2 class="txt-tit">O2 Government Platform</h2>
                <ul class="lst-ecosystem">
                    <!-- [D] Thêm class "is-active" vào li khi sản phẩm đó được chọn -->
                    <li :class="{'is-disable':!isAllowWiki()}">
                        <RouterLink v-if="isAllowWiki()" :to="'/wiki/home'" class="box-product d-flex flex-column align-items-center justify-content-center">
                            <div class="img-area"><img src="/assets-v2/images/logo-wiki.svg" alt=""></div>
                            <strong>O2 Wiki</strong>
                        </RouterLink>
                        <a v-else href='javascript:void(0)' class="box-product d-flex flex-column align-items-center justify-content-center">
                            <div class="img-area"><img src="/assets-v2/images/logo-wiki.svg" alt=""></div>
                            <strong>O2 Wiki</strong>
                        </a>
                    </li>
                    <!-- [D] Thêm class "is-disable" vào li khi sản phẩm đó chưa được kích hoạt -->
                    <li :class="{'is-disable':!isAllowBlock(CONSTANTS.BLOCKS_TYPE.CALENDAR)}">
                        <RouterLink v-if="isAllowBlock(CONSTANTS.BLOCKS_TYPE.CALENDAR)" to="/calendar" class="box-product d-flex flex-column align-items-center justify-content-center">
                            <div class="img-area"><img src="/assets-v2/images/logo-calendar.svg" alt=""></div>
                            <strong>O2 Calendar</strong>
                        </RouterLink>
                        <a v-else href="javascript:void(0)" class="box-product d-flex flex-column align-items-center justify-content-center">
                            <div class="img-area"><img src="/assets-v2/images/logo-calendar.svg" alt=""></div>
                            <strong>O2 Calendar</strong>
                        </a>
                    </li>
                    <li :class="{'is-disable':!isAllowBlock(CONSTANTS.BLOCKS_TYPE.MEET)}">
                        <RouterLink v-if="isAllowBlock(CONSTANTS.BLOCKS_TYPE.MEET)" to="/meet-room" class="box-product d-flex flex-column align-items-center justify-content-center">
                            <div class="img-area"><img src="/assets-v2/images/logo-meet.svg" alt=""></div>
                            <strong>O2 Meet</strong>
                        </RouterLink>
                        <a v-else href="javascript:void(0)" class="box-product d-flex flex-column align-items-center justify-content-center">
                            <div class="img-area"><img src="/assets-v2/images/logo-meet.svg" alt=""></div>
                            <strong>O2 Meet</strong>
                        </a>
                    </li>
                    <li :class="{'is-disable':!isAllowBlock(CONSTANTS.BLOCKS_TYPE.TASK)}">
                        <RouterLink v-if="isAllowBlock(CONSTANTS.BLOCKS_TYPE.TASK)" to="/task/dashboard" class="box-product d-flex flex-column align-items-center justify-content-center">
                            <div class="img-area"><img src="/assets-v2/images/logo-task.svg" alt=""></div>
                            <strong>O2 Task</strong>
                        </RouterLink>
                        <a v-else href="javascript:void(0)" class="box-product d-flex flex-column align-items-center justify-content-center">
                            <div class="img-area"><img src="/assets-v2/images/logo-task.svg" alt=""></div>
                            <strong>O2 Task</strong>
                        </a>
                    </li>
                </ul>
                <div class="footer-ct d-flex flex-column align-items-center justify-content-center">
                    <strong>CÔNG TY CỔ PHẦN CÔNG NGHỆ O2 VIỆT NAM</strong>
                    <p>Tầng 3, Tòa Nhà CT2, Dự án khu nhà ở cán bộ,nhân viên Ban cơ yếu chính phủ, Lê Văn Lương, P. Nhân Chính, Q. Thanh Xuân, TP. Hà Nội</p>
                    <p>
                        Điện thoại: <a href="tel:+02466635775" class="txt-link">0246 6635 775</a>
                        - Email: <a href="mailto:contact@o2tech.vn" class="txt-link">contact@o2tech.vn</a>
                        - Website: <a href="http://o2tech.vn" target="_blank" class="txt-link">http://o2tech.vn</a>
                    </p>
                </div>



        <!-- <ul class="lst-ecosystem">                    
                    <template v-for="(b,i) in blocks">
                        <li 
                        :key="i"
                        :class="{'is-disable': !b.isAllow}"
                        v-if="b.active.portal"
                        >
                            <router-link :to='b.link' class="box-product d-flex flex-column align-items-center justify-content-center">
                            <strong>{{b.title}}</strong>
                                <span>{{b.title}}</span>
                                <div class="img-area"><img :src="b.thumb.portal" alt=""></div>
                            </router-link>
                        </li>
                    </template>
                    
                </ul>
                <h2 class="txt-tit">Hệ sinh thái O2 Tech</h2>-->
        </div> 
        <template slot="footer">
            <div class="d-none"></div>
        </template>
    </wrapperv2>
</template>
<style scoped>
/* .wrap .content-page{background-color:transparent;} */

</style>
<script>
    import { mapGetters } from 'vuex';
    import PermissionMixins from '../../../core/mixins/permission';

    export default {
        name: 'DashboardIndexV2',
        mixins: [PermissionMixins],       
        computed: {
            ...mapGetters(['menuData','blocks'])
        },
        methods:{
            isAllowBlock(blockid){
                let b= this.blocks.find(b=>b.block==blockid);
                return b && b.isAllow;

            },
            isAllowWiki(){
                return this.isAllowBlock(this.CONSTANTS.BLOCKS_TYPE.DOCUMENT) || this.isAllowBlock(this.CONSTANTS.BLOCKS_TYPE.WIKI);
            }
        },
        created() {
            //this.$router.push('/membercare');

            console.log(this.blocks);
        }
    };
</script>
