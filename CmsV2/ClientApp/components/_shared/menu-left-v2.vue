<template>
    <div class="sidebar">
        <div class="logo">
            <h1 class="page-title">
                <a href="/">
                    <div class="img-logo">
                        <img src="/assets-v2/images/logo-o2.svg" alt="" class="icon-h-gray" />
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
        <ul class="side-nav">
            <li class="sidenav-tit">Hệ thống</li>
            <!-- Thêm class "is-active" vào class "sidenav-itm" khi nội dung đó được chọn -->
            <li class="sidenav-itm">
                <router-link to="/users" class="d-flex align-items-center meet-link">
                    <i class="bi bi-ui-checks-grid"></i>
                    <strong class="itm-title">Người dùng</strong>
                </router-link>
            </li>
            <li class="sidenav-itm">
                <router-link to="/roles" class="d-flex align-items-center meet-link">
                    <i class="bi bi-collection"></i>
                    <strong class="itm-title">Nhóm quyền</strong>
                </router-link>
            </li>
            <li class="sidenav-itm">
                <router-link to="/reports" class="d-flex align-items-center meet-link">
                    <i class="bi bi-card-list"></i>
                    <strong class="itm-title">Nội dung báo cáo</strong>
                </router-link>
            </li>
            <li class="sidenav-itm">
                <router-link to="/test" class="d-flex align-items-center meet-link">
                    <i class="bi bi-card-list"></i>
                    <strong class="itm-title">Test input form</strong>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: "menu-left"
};
</script>

<style lang="scss" scoped>
</style>