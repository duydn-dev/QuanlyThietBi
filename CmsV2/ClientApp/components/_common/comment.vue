<template>
    <div v-if="objectType">
       <h5 class="">Bình luận</h5>
        <div class="kt-notes">
            <div class="kt-notes__items task-comment-items">
                <template v-for="item in lstCommentParents">
                    <div class="kt-notes__item" :key="item.id">
                        <div class="kt-notes__media">
                            <avatar
                                :src="item.avatar"
                                :username="item.member"
                                css-class="kt-notes__icon kt-notes__icon--danger kt-font-boldest"
                                :size="50"
                            />
                        </div>
                        <div class="kt-notes__content comment-container">
                            <div class="kt-notes__section">
                                <div class="kt-notes__info">
                                    <a
                                        href="javascript:;"
                                        class="kt-notes__title font-weight-bold"
                                        >{{ item.member }}</a
                                    >
                                    <span class="kt-notes__desc">{{
                                        item.createdDate | moment('DD/MM/YYYY HH:mm')
                                    }}</span>
                                </div>
                            </div>

                            <span class="kt-notes__body" v-if="!item.isEdit">{{ item.body }}</span>
                            <textarea
                                class="form-control"
                                rows="2"
                                v-else
                                v-model="item.body"
                            ></textarea>
                            <div class="mt-3">
                                <a href="javascript:;" @click="answer(item.id)"> Trả lời </a>
                            </div>
                            <div class="comment-action-container text-right mt-1" v-if="item.createdBy == currentUserId">
                                <button
                                    class="btn btn-primary btn-icon btn-sm"
                                    @click="item.isEdit = true"
                                    v-if="!item.isEdit"
                                >
                                    <i class="fa fa-edit"></i>
                                </button>
                                <template v-else>
                                    <button
                                        class="btn btn-success btn-icon btn-sm"
                                        @click="saveEdit(item)"
                                    >
                                        <i class="fas fa-save"></i>
                                    </button>
                                    <button
                                        class="btn btn-warning btn-icon btn-sm"
                                        @click="item.isEdit = false"
                                    >
                                        <i class="fas fa-times"></i>
                                    </button>
                                </template>
                                <button
                                    class="btn btn-danger btn-icon btn-sm"
                                    @click="remove(item.id)"
                                >
                                    <i class="fa fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div
                        class="kt-notes__item child"
                        v-for="child in getCommentChilds(item.id)"
                        :key="child.id"
                    >
                        <div class="kt-notes__media">
                            <avatar
                                :src="child.avatar"
                                :username="child.member"
                                css-class="kt-notes__icon kt-notes__icon--danger kt-font-boldest"
                                :size="50"
                            />
                        </div>
                        <div class="kt-notes__content comment-container">
                            <div class="kt-notes__section">
                                <div class="kt-notes__info">
                                    <a
                                        href="javascript:;"
                                        class="kt-notes__title font-weight-bold"
                                        >{{ child.member }}</a
                                    >
                                    <span class="kt-notes__desc">{{
                                        child.createdDate | moment('DD/MM/YYYY HH:mm')
                                    }}</span>
                                </div>
                            </div>
                            <span class="kt-notes__body" v-if="!child.isEdit">{{
                                child.body
                            }}</span>
                            <textarea
                                class="form-control"
                                rows="2"
                                v-else
                                v-model="item.body"
                            ></textarea>

                            <div class="comment-action-container text-right mt-1" v-if="item.createdBy == currentUserId">
                                <button
                                    class="btn btn-primary btn-icon btn-sm"
                                    @click="child.isEdit = true"
                                    v-if="!child.isEdit"
                                >
                                    <i class="fa fa-edit"></i>
                                </button>
                                <template v-else>
                                    <button
                                        class="btn btn-success btn-icon btn-sm"
                                        @click="saveEdit(child)"
                                    >
                                        <i class="fas fa-save"></i>
                                    </button>
                                    <button
                                        class="btn btn-warning btn-icon btn-sm"
                                        @click="child.isEdit = false"
                                    >
                                        <i class="fas fa-times"></i>
                                    </button>
                                </template>
                                <button
                                    class="btn btn-danger btn-icon btn-sm"
                                    @click="remove(child.id)"
                                >
                                    <i class="fa fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <textarea
                    @keyup.enter="save"
                    class="form-control"
                    rows="2"
                    v-model="form.body"
                    v-validate="'required'"
                    name="Body"
                    ref="body"
                />
                <span v-show="errors.has('Body')" class="text-danger">{{
                    errors.first('Body')
                }}</span>

                <div class="mt-2">
                    <small>*Bấm "Enter" để gửi</small>
                </div>
                <div class="mb-3">
                    <small>*Bấm "Shift + Enter" để xuống dòng</small>
                </div>

                <button class="btn btn-sm btn-success pt-3" @click="save">
                    Gửi
                    <i aria-hidden="true" class="fa fa-paper-plane"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['objectId', 'objectType'],
    data() {
        return {
            form: { body: null, parentId: 0, objectId: this.objectId, objectType: this.objectType },
            lstCommentParents: [],
            listData: [],
            isLoader: false,
        };
    },
    computed: {
        totalComment() {
            return this.listData.length;
        },
        currentUserId(){
            return this.currentUser.id
        }
    },
    methods: {
        getlistData() {
            let loading = this.$loading.show();

            this.$http({
                data: {
                    m: 'Comment',
                    fn: 'get-list',
                    objectId: this.objectId,
                    objectType: this.objectType,
                },
            })
                .then((response) => {
                    loading.hide();
                    for (let item of response.data) {
                        item.isEdit = false;
                    }
                    this.listData = response.data;
                    this.lstCommentParents = this.getCommentChilds(0);
                })
                .catch((err) => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        },
        save() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    let loading = this.$loading.show();

                    this.$http({
                        data: {
                            m: 'Comment',
                            fn: 'save',
                            ...this.form,
                        },
                    })
                        .then(() => {
                            loading.hide();
                            this.form.parentId = 0;
                            this.form.body = null;
                            this.getlistData();
                        })
                        .catch((err) => {
                            loading.hide();
                            return this.$message(err.message, 'error');
                        });
                }
            });
        },
        saveEdit(item) {
            let loading = this.$loading.show();

            this.$http({
                data: {
                    m: 'Comment',
                    fn: 'save',
                    ...item,
                },
            })
                .then(() => {
                    loading.hide();
                    this.getlistData();
                })
                .catch((err) => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        },
        remove(id) {
            this.$confirm('Bạn có chắc muốn xóa bình luận này?').then(() => {
                let loading = this.$loading.show();

                this.$http({
                    data: {
                        m: 'Comment',
                        fn: 'delete',
                        id,
                    },
                })
                    .then(() => {
                        loading.hide();
                        this.getlistData();
                    })
                    .catch((err) => {
                        loading.hide();
                        return this.$message(err.message, 'error');
                    });
            });
        },
        answer(parentId) {
            this.form.parentId = parentId;
            this.$refs.body.focus();
        },
        getCommentChilds(parentId) {
            let temps = _.filter(this.listData, (o) => {
                return o.parentId == parentId;
            });
            temps = _.orderBy(temps, ['createdDate'], ['asc']);

            return temps;
        },
    },
    created() {
        this.getlistData();
    },
};
</script>

<style>
.comment-action-container {
    /* position: absolute;
    right: 5px;
    top: 50%;
    transform: translate(0, -50%); */
    width: 100%;
} /* 
.comment-container {
    position: relative;
} */
</style>