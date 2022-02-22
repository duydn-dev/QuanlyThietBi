<template>
    <div :class="cls" role="alert" class="m-0">
        <div class="alert-icon"><i class="flaticon-warning"></i></div>
        <div class="alert-text" v-html="text"></div>
    </div>
</template>

<script>
    export default {
        name: 'Alert',
        props: {
            type: {
                type: String,
                default() {
                    return 'info';
                }
            },
            text: {
                type: String,
                default: ' Chưa có dữ liệu!'
            }
        },
        data() {
            return {
                backgroundColors: [
                    'badge-danger',
                    'badge-dark',
                    'badge-info',
                    'badge-primary',
                    'badge-secondary',
                    'badge-success',
                    'badge-warning'
                ]
            }
        },
        computed: {
            cls() {
                switch (this.type) {
                    case 'info':
                        return 'alert alert-light alert-elevate fade show';
                     case 'danger':
                        return 'alert alert-danger fade show';
                      case 'warning':
                        return 'alert alert-warning fade show';
                }
                return '';
            }
        }
    };
</script>
