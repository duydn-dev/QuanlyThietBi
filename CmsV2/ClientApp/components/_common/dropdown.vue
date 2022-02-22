<template>
    <div :class="ddCls">
        <a
            class="btn btn-light dropdown-toggle"
            href="javascript:void(0)"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            @click="toggleShow"
            >{{ title }}</a
        >
        <div :class="ddMenuCls" aria-labelledby="dropdownMenuLink">
            <a class="dropdown-item" href="#">Tin tức</a>
            <a class="dropdown-item" href="#">Tin tuyển dụng</a>
            <a class="dropdown-item" href="#">Media</a>
            <div class="dropdown-divider" />
            <a class="dropdown-item" href="#">Danh mục</a>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Dropdown',
    props: {
        title: {
            type: String,
            default: 'Lựa chọn'
        }
    },
    data() {
        return {
            isShow: false
        };
    },
    computed: {
        ddCls() {
            if (!this.isShow) return 'dropdown d-inline-block';
            return 'dropdown d-inline-block show';
        },
        ddMenuCls() {
            if (!this.isShow) return 'dropdown-menu';
            return 'dropdown-menu show';
        }
    },
    methods: {
        toggleShow() {
            this.isShow = !this.isShow;
        }
    }
};
</script>
