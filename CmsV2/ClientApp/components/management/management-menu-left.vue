<template>
    <div class="sidebar" :class="{ open: sidebarModeOpen }" 
    @click.self.stop="clickSideBar"
    >
        
        <h1 class="logo">
            <router-link to="/management" class="d-flex align-items-center">
                <div class="img-logo"><img src="/assets-v2/images/logo-o2.svg" alt="" /></div>
                <span class="txt-logo">Quản trị</span>
            </router-link>
        </h1>            
        
        <ul class="side-nav">
            <li class="user-info d-flex align-items-center">
                <!-- <div class="img-area">
                    <img :src="currentUser.avatar?currentUser.avatar:'/assets-v2/images/@avt.jpg'" :alt="currentUser.fullName">
                    </div> -->
                    <avatar
                        :src="currentUser.avatar"
                        :username="currentUser.fullName"
                        css-class="img-area"
                        :size="40"
                    />
                <div class="name-area">
                    <strong>{{currentUser.fullName}}</strong>
                    <span>{{currentUser.roleName}}</span>
                </div>
            </li>
            <li class="sidenav-tit">Hệ thống</li>
            <li class="sidenav-itm" v-if="isPermission(['configManagement'])">
                <RouterLink to="/management/config" class="d-flex align-items-center">
                    <i class="bi bi-gear"></i>
                    <strong class="itm-title">Cấu hình</strong>
                </RouterLink>
            </li>
            <li class="sidenav-itm" v-if="isPermission(['category'])">
                <RouterLink to="/management/category" class="d-flex align-items-center">
                    <i class="bi bi-list-nested"></i>
                    <strong class="itm-title">Thiết lập danh mục</strong>
                </RouterLink>
            </li>
            <li class="sidenav-itm" v-if="appSettings.companies && appSettings.currentCompany.isSystem && isPermission(['companyManagement'])">
                <RouterLink to="/management/company" class="d-flex align-items-center">
                    <i class="bi bi-diagram-3"></i>
                    <strong class="itm-title">Company</strong>
                </RouterLink>
            </li>
            <li class="sidenav-itm" v-if="isPermission(['companyDepartment'])">
                <RouterLink to="/management/department" class="d-flex align-items-center">
                    <i class="bi bi-ui-checks-grid"></i>
                    <strong class="itm-title">Phòng ban</strong>
                </RouterLink>
            </li>
            <li class="sidenav-itm" v-if="isPermission(['roleManagement'])">
                <RouterLink to="/management/role" class="d-flex align-items-center">
                    <i class="bi bi-collection"></i>
                    <strong class="itm-title">Nhóm quyền</strong>
                </RouterLink>
            </li>
            
            <!-- <li class="sidenav-itm">
                <RouterLink to="/management/" class="d-flex align-items-center">
                    <i class="bi bi-diagram-3"></i>
                    <strong class="itm-title">Chức danh</strong>
                </RouterLink>
            </li> -->
            <li class="sidenav-itm" v-if="isPermission(['userManagement'])">
                <RouterLink to="/management/user" class="d-flex align-items-center">
                    <i class="bi bi-person"></i>
                    <strong class="itm-title">Người dùng</strong>
                </RouterLink>
            </li>
            <li class="sidenav-itm">
                <a href="javscript:void(0)" class="d-flex align-items-center" @click="logOut">
                    <i class="bi bi-box-arrow-right"></i>
                    <strong class="itm-title">Đăng xuất</strong>
                </a>
            </li>
        </ul>
        
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import PermissionMixins from '../../core/mixins/permission'; //'../../../core/mixins/permission';

export default {    
    mixins: [PermissionMixins],
    props: {
        open: {
            type: Boolean,
            default: true,
        },
        docked: {
            type: Boolean,
            default: true,
        },
        showMenuMobile: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapGetters([
            'permissions',
            'userPermissions',
            'menuList',
            'isShowMainMenu',
            'menuData',
            'blocks'
        ])      
        
    },
    methods: {
        ...mapActions([            
            'logOut'          
        ]),        
    },
    watch: {
       
    },
    created() {
       
    },
};
</script>