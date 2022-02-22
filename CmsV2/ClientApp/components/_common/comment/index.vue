<template>
    <div>
        <h4>Bình luận</h4>
        <div id="embed-comment">
        </div>
    </div>
</template>
<style scoped>
    #embed-comment { border: 1px #d6d6d6 solid; }
</style>
<style>
    #embed-comment iframe { vertical-align: top; }
</style>
<script>
    export default {
        name: 'comment',
        props: {
            threadKey: {
                type: String,
                default: null
            },
            systemId: {
                type: Number,
                default: 1
            },
            frameborder: {
                type: Number,
                default: 0
            },
            currentUserId: {
                type: Number,
                default: 0
            },
            height: {
                type: String,
                default: null
            },
            width: {
                type: String,
                default: null
            },
            isAssign: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                objectData: {
                    id: 'embed-comment',
                    threadKey: this.threadKey,
                    systemId: this.systemId,
                    userId: this.currentUserId,
                    height: this.height,
                    width: this.width,
                    frameborder: this.frameborder,
                    isAssign: this.isAssign,
                    listUser: [],
                }
            };
        },
        watch: {
            'threadKey'(val) {
                this.$set(this.objectData, 'threadKey', val);
                this.$set(this.objectData, 'systemId', this.systemId);
                this.$set(this.objectData, 'currentUserId', this.currentUserId);
                this.$set(this.objectData, 'height', this.height);
                this.$set(this.objectData, 'frameborder', this.frameborder);
                this.$set(this.objectData, 'isAssign', this.isAssign);
                renderIframe(this.objectData);
            }
        },
        mounted() {
            this.getUsers();
        },
        created() {
        },
        methods: {
            getUsers() {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'user',
                        fn: 'get-users-for-comment'
                    }
                })
                    .then(res => {
                        loading.hide();
                        if (res.success) {
                            this.objectData.listUser = res.data;

                            //emmbed iframe comment//
                            renderIframe(this.objectData);
                        }
                    })
                    .catch(err => {
                        loading.hide();
                        return this.$message(err.message, 'error');
                    });
            }
        }
    };
</script>
