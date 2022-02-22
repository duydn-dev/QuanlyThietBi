<template>
    <div class="btn-group">
        <button class="btn btn-info" v-b-tooltip.hover title="Sao chép dữ liệu" @click="copy"><i class="fa fa-copy"></i></button>
        <button class="btn btn-info" v-b-tooltip.hover title="Dán dữ liệu" :disabled="!clipboard[code]" @click="paste"><i class="fa fa-paste"></i></button>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    export default {
        name: 'data-clipboard',
        props: {
            code: {
                type: String,
                require: true
            },
            value: null,
            onPaste: {
                type: Function
            }
        },
        computed: {
            ...mapGetters(['clipboard'])
        },
        methods: {
            ...mapActions(['setClipBoardData']),
            copy() {
                this.setClipBoardData({
                    key: this.code,
                    value: this.value
                });
                this.$notify({
                    type: 'success',
                    group: 'foo',
                    title: 'Thành công',
                    text: 'Đã sao chép dữ liệu!'
                });
            },
            paste() {
                this.$confirm("Dữ liệu sẽ bị thay đổi<br/>Bạn có muốn tiếp tục ?").then(() => {
                    setTimeout(() => {
                        this.$emit('input', this.$cloneObject(this.clipboard[this.code]));
                        this.$emit('change', this.$cloneObject(this.clipboard[this.code]));
                        this.$notify({
                            type: 'success',
                            group: 'foo',
                            title: 'Thành công',
                            text: 'Đã dán dữ liệu thành công!'
                        });
                    }, 100)
                });
            }
        }
    };
</script>
