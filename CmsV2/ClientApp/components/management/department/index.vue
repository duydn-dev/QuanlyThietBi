<template>
    <management-wrapper>
        
        <div class="box box-manage-room">
            <div class="box-head d-flex justify-content-between" v-if="!isShowInModal">
                <strong class="txt-head">Quản lý phòng ban</strong>
                <div class="group-right d-flex align-items-center">
                    <!-- <div class="form-wrap">
                        <input type="text" class="form-control ipt-search" placeholder="Từ khóa"
                        v-model="keyword">
                    </div> -->
                    <button type="button" class="btn-evt btn-create js-btnCreate d-flex align-items-center" @click="openPopup()">
                        <i class="bi bi-plus"></i>
                        <span>Tạo mới</span>
                    </button>
                </div>
            </div>
            <list ref="list" :id="id" @edit="openPopup" :key="keyIndex" :companyId="companyId" :keyword="keyword" />
        </div>
        <template v-if="popupAdd">
            <!--<editEdu :id="id" @closePopup="closePopup" v-if="appSettings.CompanyId == 12" />-->
            <edit :id="id" @closePopup="closePopup" :companyId="companyId" />
        </template>
    </management-wrapper>
</template>
<script>
    import managementWrapper from '../management-wrapper.vue';
    import edit from './edit';
    //import editEdu from './edit-edu';
    import list from './list';
    //import listEdu from './list-edu';
    export default {
        name: 'Companydepartment',
        props: ['isShowInModal', 'companyId'],
        components: { edit, list,managementWrapper },
        data() {
            return {
                id: 0,
                popupAdd: false,
                keyIndex: 0,
                keyword: ''
            };
        },
        methods: {
            openPopup(id) {
                this.id = id || 0;
                this.popupAdd = true;
            },

            closePopup() {
                this.popupAdd = false;
                this.keyIndex++;
                //this.getListData();
            },
            getlistData() { 
                this.$refs.list.getListData();
            },
            remove(id) {
                this.$confirm('Bạn có chắc muốn xóa phòng ban này?').then(() => {
                    let loading = this.$loading.show();
                    this.$http({
                        data: {
                            m: 'companydepartment',
                            fn: 'remove',
                            id: id
                        }
                    })
                        .then(() => {
                            loading.hide();
                            this.getListData();
                        })
                        .catch(err => {
                            loading.hide();
                            return this.$message(err.message, 'error');
                        });
                });
            }
        },
        created() { 

            if(!this.isPermission(['companyDepartment'])){
                this.$error('Bạn không có quyền truy cập trang này!');
                    this.$router.push('/');
                    return;
            }
        }
    };
</script>
