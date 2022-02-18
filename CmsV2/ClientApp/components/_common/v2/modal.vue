<template>
    <div>
        <div
            v-if="!isNotModal"
            id="myModal"
            :class="'modal popup fade ' + cls + ' ' + modalClass"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myModalLabel"
            aria-hidden="true"
            style="display: block"
            @click.self="close()"
            :style="styleModal"
        >
            <div :class="modalCls" :style="style">
                <div class="modal-content">
                    <div class="modal-header" v-if="isShowHeader">
                        <h5
                            id="myModalLabel"
                            class="modal-title mt-0 text-white"
                            v-html="title"
                            v-if="header"
                        />
                        <!-- <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-hidden="true"
                            @click="forceClose"
                        /> -->
                        <button type="button" class="btn btn-close" @click="forceClose"><img src="/assets-v2/images/icon-close.png" alt=""></button>
                    </div>
                    
                    <div :class="`modal-body ${bodyCls}`">
                        <slot name="body">Chưa có nội dung. Thêm div slot="body" để thay thế!</slot>
                    </div>
                    <div v-if="footer" class="modal-footer">
                        <slot name="footer">
                            <button
                                type="button"
                                class="btn btn-secondary waves-effect"
                                data-dismiss="modal"
                                @click="forceClose"
                            >
                                Đóng
                            </button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
        <slot name="outside" />
        <slot name="fullScreen"></slot>
    </div>
</template>
<style>
@media (min-width: 600px) {
    .modal-huge {
        max-width: 90%;
    }
}

.modal-in-header {
    position: absolute !important;
    z-index: 1041 !important;
}
</style>
<script>
export default {
    name: 'Modal',
    props: {
        title: {
            type: String,
            default: 'Thông báo',
        },
        width: {
            type: Number,
            default: 600,
        },
        widths: {
            type: String,
            default: '',
        },
        height: {
            type: Number,
            default: 100,
        },
        noCloseBackground: {
            type: Boolean,
            default: true,
        },
        footer: {
            type: Boolean,
            default: true,
        },
        isShowHeader: {
            type: Boolean,
            default: true,
        },
        header: {
            type: Boolean,
            default: true,
        },
        size: {
            type: String,
            default: '',
        },
        bodyCls: {
            type: String,
            default: '',
        },
        zIndex: {
            type: Number,
            default: 0,
        },
        isNotModal: {
            type: Boolean,
            default: false,
        },
        modalClass: {
            type: String,
            default: '',
        },
        isModalHeader: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            cls: '',
            tempId: null,
            // zIndex: 0
        };
    },
    computed: {
        style() {
            if (this.widths) {
                if (this.widths.includes('%')) return { 'max-width': parseInt(this.widths) + '%' };
            }
            if (this.width == 0) return { 'max-width': '100%' };
            if (this.size != 'huge') return { 'max-width': this.width + 'px' || '600px' };
            return {};
        },
        // styleContent(){
        //     if (this.height > 0) return { 'min-height': this.height + 'vh' || '80vh' };
        //     return {};
        // },
        modalCls() {
            let cls = 'modal-dialog modal-dialog-centered';
            if (this.size == 'large') cls += ' modal-lg';
            else if (this.size == 'huge') cls += ' modal-huge';
            return cls;
        },
        styleModal() {
            let temp = {};
            if (this.zIndex > 0) temp.zIndex = this.zIndex;

            return temp;
        },
    },
    mounted() {
        if (this.isNotModal) return;
        this.tempId = 'modal' + new Date().getTime();
        //let currentZIndex = this.getCurrentZIndex();
        document.getElementsByTagName('body')[0].classList.add('modal-open');
        // let backDrop = document.createElement('div');
        // backDrop.setAttribute('id', this.tempId + 'popupBackdrop');
        // backDrop.setAttribute('class', 'modal-backdrop fade');
        // document.getElementsByTagName('body')[0].appendChild(backDrop);
        setTimeout(() => {
            this.cls = 'show';
            // let b2 = document.getElementById(this.tempId + 'popupBackdrop');
            // b2.className += ' show';
        }, 100);

        if (this.isModalHeader) {
            document.getElementById('kt_subheader').classList.add('modal-in-header');
        }
    },
    destroyed() {
        var modalCount = document.getElementsByClassName('modal').length;
        if (modalCount == 0)
            document.getElementsByTagName('body')[0].classList.remove('modal-open');
        this.cls = '';
        let b2 = document.getElementById(this.tempId + 'popupBackdrop');
        if (b2) {
            b2.parentNode.removeChild(b2);
        }
    },
    methods: {
        close() {
            if (!this.noCloseBackground) {
                this.forceClose();
            }

            if (document.getElementById('kt_subheader'))
                document.getElementById('kt_subheader').classList.add('modal-in-header');
        },
        forceClose() {
            this.cls = '';
            setTimeout(() => {
                this.$emit('close');
            }, 200);
        },
        getCurrentZIndex() {
            let backDrops = document.getElementsByClassName('modal-backdrop');
            if (backDrops && backDrops.length > 0) {
                let temp = backDrops[backDrops.length - 1];
                let sZIndex = temp.getAttribute('zIndex');
                if (sZIndex && !isNaN(sZIndex)) return parseInt(sZIndex) + 1;

                return 1050;
            }

            return 0;
        },
    },
};
</script>
