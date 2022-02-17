<template>
    <transition :name="transitionName">
        <a
            v-show="visible"
            id="back2top"
            class="btn-to-top"
            href="javascript:;"
            :style="customStyle"
            @click="backToTop"
            ><i class="fa fa-angle-up" aria-hidden="true"
        /></a>
    </transition>
</template>
<script>
export default {
    name: 'BackToTop',
    props: {
        visibilityHeight: {
            type: Number,
            default: 400
        },
        backPosition: {
            type: Number,
            default: 0
        },
        customStyle: {
            type: Object
        },
        transitionName: {
            type: String,
            default: 'fade'
        }
    },
    data() {
        return {
            visible: false,
            interval: null
        };
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
        if (this.interval) {
            clearInterval(this.interval);
        }
    },
    methods: {
        handleScroll() {
            this.visible = window.pageYOffset > this.visibilityHeight;
        },
        backToTop() {
            const start = window.pageYOffset;
            let i = 0;
            this.interval = setInterval(() => {
                const next = Math.floor(this.easeInOutQuad(10 * i, start, -start, 500));
                if (next <= this.backPosition) {
                    window.scrollTo(0, this.backPosition);
                    clearInterval(this.interval);
                } else {
                    window.scrollTo(0, next);
                }
                i++;
            }, 16.7);
        },
        easeInOutQuad(t, b, c, d) {
            if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
            return (-c / 2) * (--t * (t - 2) - 1) + b;
        }
    }
};
</script>
<style scoped>
#back2top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: gainsboro;
    width: 40px;
    height: 40px;
    text-align: center;
    border-radius: 50%;
    color: #272727;
    z-index: 10;
}
#back2top i {
    font-size: 25px;
    line-height: 37px;
}
</style>
