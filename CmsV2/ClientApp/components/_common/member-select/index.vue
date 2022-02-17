
<template>
    <div class="avatar-select-wrapper">
        <div>
            <div class="mb-2">
                <button class="btn custom-file-upload" @click="openPop()">
                    <i class="icon-span-filestyle fas fa-plus-circle" />Chọn học viên
                </button>
            </div>
            <div v-for="(item, index) in getSelectd" :key="index" class="row">
                <div class="input-group mb-2 col-sm-6">
                    <div class="input-group-prepend ">
                        <span id="basic-addon2" class="input-group-text">
                            <i class="fa fa-user" aria-hidden="true" />
                        </span>
                    </div>

                    <input class="form-control " :value="item.name" style="min-height: 50px;" disabled />
                    <div class="input-group-append">
                        <button class="btn btn-danger" type="button" @click="remove(index)">
                            <i class="fa fa-times" />
                        </button>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group">
                        <label>Mô tả</label>
                        <textarea v-model="item.description" class="col-sm-12 form-control" />
                    </div>
                </div>
            </div>
        </div>
        <modal v-if="popAdd" title="Chọn học viên" :width="500" @close="popAdd = false">
            <div slot="body">
                <div class="row">
                    <div class="form-group col-sm-12">
                        <input class="form-control" placeholder="Tìm học viên" v-model="form.keyword" />
                    </div>
                    <div class="col-sm-12">
                        <div class="form-group">
                            <div class="kt-checkbox-list">
                                <label v-for="item in listMemberByOrder"
                                       :key="item.index"
                                       class="kt-checkbox">
                                    <input v-model="selectted" :value="item" type="checkbox" />
                                    {{ item.name }}
                                    <span />
                                </label>
                            </div>
                        </div>
                        <div class="pr-4 pl-4">
                            <pager :total="totalRow" :page-index="form.pageIndex" @change="pageChange" />
                        </div>
                    </div>
                </div>
            </div>
            <div slot="footer" class="row">
                <div class="col-sm-12">
                    <button class="btn btn-primary" secondary @click="save()">
                        <span>Xác nhận</span>
                    </button>
                    <button class="btn btn-danger" @click="closePopup()">
                        <span>Đóng</span>
                    </button>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
    export default {
        name: 'ListMemberSelect',
        props: {
            memberId: null,
            members: null,
            memberTypeId: null,
        },
        data() {
            return {
                popAdd: false,
                listMemberByOrder: [],
                totalRow: 0,
                form: {
                    pageIndex: 1,
                    pageSize: 20,
                    keyword: '',
                    memberTypeId: null,

                },
                selectted: [],
                getSelectd: [],

            };
        },
        computed: {

        },
        watch: {
            'form.keyword'(val) {
                this.$set(this.form, 'keyword', val);
                this.getListMemberByOrder();
            },
            'memberTypeId'() {
                this.form.memberTypeId = this.memberTypeId;
                this.getListMemberByOrder();
            },
            //'listMemberByOrder'() {
            //    if (this.listMemberByOrder.length > 0 && this.memberId) {
            //        var obj = _.find(this.listMemberByOrder, (o) => { return o.id == this.memberId });
            //        if (!_.find(this.getSelectd, ['id', obj.id])) this.getSelectd.push(obj);
            //        this.$emit('selected', this.getSelectd);
            //    }
            //}

        },
        created() {
            this.form.memberTypeId = this.memberTypeId;
            this.getListMemberByOrder();
            if (this.members.length > 0) {
                this.getSelectd = this.members;
            }
            else {
                //console.log(this.memberId)
                //var obj =  _.find(this.listMemberByOrder, (o) => { return o.id == this.memberId });
                // this.getSelectd.push(obj);

            }
        },
        methods: {
            getListMemberByOrder() {
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'laborincident',
                        fn: 'list-member-by-order',
                        ...this.form
                    }
                })
                    .then(res => {
                        loading.hide();
                        this.totalRow = res.totalRow;
                        this.listMemberByOrder = res.data;
                        if (this.memberId)
                            this.selectted = _.filter(this.listMemberByOrder, ['id', this.memberId]);
                        
                    })
                    .catch(err => {
                        loading.hide();
                        return this.$message(err.message, 'error');
                    });
            },
            openPop() {
                this.popAdd = true;
            },
            closePopup() {
                this.popAdd = false;
            },
            pageChange(pageNum) {
                this.$set(this.form, 'pageIndex', pageNum);
                this.getListMemberByOrder();
            },
            save() {
                this.getSelectd = [];
                if (this.selectted.length != 0) {
                    for (let l of this.selectted) {
                        if (!_.find(this.getSelectd, ['id', l.id])) this.getSelectd.push(l);
                    }
                }
                this.popAdd = false;
                this.$emit('selected', this.getSelectd);
            },
            remove(index) {
                this.getSelectd.splice(index, 1);
                this.$emit('remove', this.getSelectd);
            }
        }
    };
</script>
<style scoped>
    ul {
        display: flex;
        margin-left: 0;
        padding-left: 0;
    }

        ul li {
            list-style-type: none;
            position: relative;
            margin-right: 10px;
            margin-bottom: 5px;
        }

            ul li .remove-file {
                position: absolute;
                background: #fff;
                cursor: pointer;
                top: 1px;
                right: 1px;
                width: 20px;
                text-align: center;
                height: 20px;
                line-height: 20px;
            }

                ul li .remove-file:hover {
                    background: red;
                    color: #fff;
                }

    .file-select-image {
        width: 150px;
        max-height: 150px;
    }

    .file-select-image-plh {
        width: 120px;
        max-height: 150px;
    }

    input[type='file'] {
        opacity: 0;
        position: absolute;
        right: 0;
        top: 0;
    }

    .custom-file-upload {
        display: inline-block;
        width: 120px;
        padding: 5px 0;
        cursor: pointer;
        position: relative;
        text-align: center;
        background: #2196f3;
        color: #fff;
        border: 0;
        overflow: hidden;
    }

    .avatarMember {
        max-width: 100% !important;
        border-radius: 8px !important;
        line-height: 100px !important;
    }
</style>
