<template>
    <div class="kcb-contextmenu" v-if="show" :style="style" ref="context" tabindex="0" v-click-outside="handleClickOutside">
        <slot></slot>
    </div>
</template>
<script>
import { clickOutSide } from '../../../core/utils/click-outside-directive';
    export default {
        name: 'ContextMenu',
        //props: {
        //    display: Boolean, // prop detect if we should show context menu
        //},
        directives: {
            clickOutSide
        },
        data() {
            return {
                left: 0, // left position
                top: 0, // top position
                show: false, // affect display of context menu
            };
        },
        computed: {
            // get position of context menu
            style() {
                return {
                    top: this.top + 'px',
                    left: this.left + 'px',
                    position:'fixed'
                };
            },
        },
        methods: {
            // closes context menu
            close() {
                this.show = false;
                this.left = 0;
                this.top = 0;
            },
            open(evt) {
                console.log(evt);
                // updates position of context menu
                this.left = evt.clientX || evt.pageX ;
                this.top = evt.clientY || evt.pageY;// || evt.clientY;
                // make element focused
                // @ts-ignore
                //Vue.nextTick(() => this.$el.focus());
                this.show = true;
            },
            //Click outside
            handleClickOutside() {
                this.close();
            },
        },
    };
</script>