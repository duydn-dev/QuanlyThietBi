<template>
    <div>
        <div>
            <table class="kt-datatable__table table-hover table-bordered" style="width:100%">
                <tr v-for="(depart,i) in listDepartment" :key="i">
                    <td class="header-tbl">{{depart.name}}</td>
                    <td>
                        <table style="width:100%;" class="table table-borderless">
                            <tbody v-if="listCurrentStatus && listCurrentStatus.length > 0">
                                <tr class="form-group" v-for="(item,index) in renderListCurrentStatus(depart.code)" :key="index">
                                    <td>
                                        <label>{{item.title}}</label>
                                        
                                    </td>
                                    <td>
                                        {{item.userName}}
                                    </td>
                                    <td class="text-left">
                                        <span class="text-dark-75 font-weight-bolder d-block font-size-lg">{{item.createdDate |moment('HH:mm DD/MM/YYYY')}}</span>
                                        <span v-if="item.note" class="text-muted d-block font-size-sm">Ghi chú: <text-more v-if="item.note" :text="item.note" :countW="20"></text-more></span>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                        <div class="mt-4" v-if="depart.code == departmentType && listStatusMember && listStatusMember.length > 0">
                            <button class="btn btn-outline-primary" @click="isShowModal = true">Thay đổi <i class="fa fa-arrow-right" aria-hidden="true"></i></button>
                        </div>
                    </td>
                </tr>

            </table>

        </div>

        <modal title="Thay đổi trạng thái" @close="closeModal" v-if="isShowModal" :width="800">
            <div slot="body">
                <div class="form-group row" v-for="parent in listTreeStatus" :key="parent.id">
                    <label class="col-3 col-form-label font-weight-bold">  {{parent.title}}</label>
                    <div class="col-9 col-form-label">
                        <div class="checkbox-list" v-if="parent.listChild && parent.listChild.length > 0">
                            <div class="row form-group" v-for="(child,childIndex) in parent.listChild" :key="childIndex">
                                <label class="kt-checkbox kt-mbt col-12">
                                    <input type="checkbox" :disabled="child.disable" name="Checkboxes4" :value="child.id" v-model="listSelectStatus" @change="selectStatus(parent.isAllowMultiple,child.id,parent.listChild)">
                                    <span></span>{{child.title}}

                                </label>
                                <div class="col-md-8" v-if="child.isCheckNote">
                                    <input :disabled="child.disable" class="form-control" v-model="child.note" placeholder="Nhập ghi chú trạng thái" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div slot="footer" class="row">
                <div class="col-sm-12">
                    <button class="btn btn-primary" @click="updateStatus">
                        <i class="fa fa-save" />
                        Lưu
                    </button>
                    <button class="btn btn-danger" @click="closeModal">
                        <span>Thoát</span>
                    </button>
                </div>
            </div>
        </modal>
    </div>
</template>
<style @scoped>
    #dropdown-form ul { width: 100% !important; }
</style>
<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'select-status',
        //props: ['type', 'departmentType', 'listStatus', 'memberId', 'isGetStatus', 'is'],
        props: {
            isDisabled: {
                type: Boolean,
                default: false
            },
            type: {

                default: 0
            },
            departmentType: {

                default: ''
            },

            memberId: {

                default: 0
            },
            memberTypeId: {

                default: 0
            },
            isGetStatus: {
                type: Boolean,
                default: true
            },
            isActiveDepartment: {
                type: Boolean,
                default: false
            }

        },
        components: {},
        data() {
            return {
                listSelectStatus: [],
                isLoader: false,
                title: '',
                isShowModal: false,
                listTreeStatus: [],
                listSaveStatus: [],
                listCurrentStatus: [],
                listDepartment: [
                    { code: 'HS', name: 'Phòng hồ sơ' },
                    { code: 'DN', name: 'Phòng đối ngoại' },
                    { code: 'TC', name: 'Phòng tài chính' },
                    { code: 'TS', name: 'Phòng tuyển sinh' }
                ]
            };
        },
        watch: {
        },
        computed: {
            ...mapGetters(['listStatusMember'])
        },
        methods: {
            ...mapActions(['GetListMemberSatus']),
            renderListCurrentStatus(code) {
                return _.filter(this.listCurrentStatus, o => {
                    return o.code == code;
                })
            },
            selectStatus(isAllowMultiple, childId, listChild) {
                if (!isAllowMultiple) {
                    for (let i = 0; i < listChild.length; i++) {
                        if (listChild[i].id != childId) {
                            let index = this.listSelectStatus.indexOf(listChild[i].id);
                            if (index != -1) {
                                this.$delete(this.listSelectStatus, index);
                            }
                        }
                    }

                }
            },

            updateStatus() {
                this.listSaveStatus = [];
                _.forEach(this.listSelectStatus, (o) => {
                    var obj = _.find(this.listStatusMember, (x) => {
                        return x.id == o;
                    })

                    if (obj) {
                        var objAdd = {
                            statusId: obj.id,
                            note: obj.note,
                        }
                        this.listSaveStatus.push(objAdd);
                    }

                });
                let loading = this.$loading.show();
                this.$http({
                    data: {
                        m: 'memberstatusdata',
                        fn: 'save',
                        listSaveStatus: JSON.stringify(this.listSaveStatus),
                        memberId: this.memberId,
                        departmentType: this.departmentType,
                        type: this.type,
                        memberTypeId: this.memberTypeId

                    }
                })
                    .then(res => {
                        loading.hide();
                        if (res.data) {
                            this.$emit('doneSave');
                            this.$notify({
                                group: 'foo',
                                duration: 1000,
                                title: this.$t('Label.Successful')
                            });
                        }
                        this.getCurrentMemberStatus();
                        this.isShowModal = false;
                    })
                    .catch(err => {
                        loading.hide();
                        return this.$message(err.message, 'error');
                    });
            },
            createdTree(listStatusMember) {
                if (listStatusMember && listStatusMember.length > 0) {
                    this.listTreeStatus = _.filter(listStatusMember, o => {
                        return o.parentId == 0;
                    });
                    for (var i = 0; i < this.listTreeStatus.length; i++) {
                        var listChild = _.filter(listStatusMember, o => {
                            return this.listTreeStatus[i].id == o.parentId;
                        });
                        this.listTreeStatus[i].listChild = listChild;
                    }
                }
            },

            getCurrentMemberStatus() {
                this.$http({
                    data: {
                        m: 'memberstatusdata',
                        fn: 'current-member-status',
                        memberId: this.memberId,
                        departmentType: this.departmentType,
                        type: this.type,
                        memberTypeId: this.memberTypeId
                    }
                })
                    .then(res => {
                        let data = res.data;
                        this.listCurrentStatus = res.data;
                        this.listSelectStatus = _.map(data, o => {
                            return o.statusId;
                        });

                    })
                    .catch(err => {
                        return this.$message(err.message, 'error');
                    });
            },
            closeModal() {
                this.isShowModal = false;
                this.getCurrentMemberStatus();
            }
        },
        created() {
            this.getCurrentMemberStatus();
            this.GetListMemberSatus({ type: this.type, departmentType: this.departmentType, memberTypeId: this.memberTypeId, memberId: this.memberId }).then(() => {
                if (this.listStatusMember) {
                    this.createdTree(this.listStatusMember);
                }
            });

        }
    };
</script>
<style>
    .col-form-label { padding-top: calc(0.65rem + 1px); padding-bottom: calc(0.65rem + 1px); margin-bottom: 0; font-size: inherit; line-height: 1.5; }

    .checkbox-list { display: flex; /* -webkit-box-orient: vertical; */ /* -webkit-box-direction: normal; */ -ms-flex-direction: column; flex-direction: column; }
</style>