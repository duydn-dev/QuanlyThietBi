<template>
    <wrapper>
        <template slot="header">
            <template v-if="!isShowInModal">
                <div class="kt-subheader__main">
                    <h3 class="kt-subheader__title">Quản lý phòng ban</h3>

                    <span class="kt-subheader__separator kt-subheader__separator--v" />

                    <div id="kt_subheader_search" class="kt-subheader__group">
                        <div id="kt_subheader_search_form" class="kt-margin-l-20">
                            <div class="kt-input-icon kt-input-icon--right kt-subheader__search">
                                <input id="generalSearch"
                                       v-model="keyword"
                                       type="text"
                                       class="form-control"
                                       placeholder="Từ khóa..."
                                       @keyup.enter="getlistData" />
                                <span class="kt-input-icon__icon kt-input-icon__icon--right">
                                    <span>
                                        <i class="fa fa-search" />
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="kt-subheader__toolbar">
                    <button @click="openPopup()" class="btn btn-brand">
                        <i class="fa fa-plus-square"></i> Tạo mới
                    </button>
                </div>
            </template>
        </template>
        <div id="kt_content" class=" kt-grid__item kt-grid__item--fluid" :class="!isShowInModal ?  'kt-content' : ''">
            <!--<listEdu :id="id" @edit="openPopup" v-if="appSettings.CompanyId == 12" :key="keyIndex" />-->
            <list :id="id" @edit="openPopup" :key="keyIndex" :companyId="companyId" />
        </div>
        <template v-if="popupAdd">
            <!--<editEdu :id="id" @closePopup="closePopup" v-if="appSettings.CompanyId == 12" />-->
            <edit :id="id" @closePopup="closePopup" :companyId="companyId" />
        </template>
    </wrapper>
</template>
<script>
    import edit from './edit';
    //import editEdu from './edit-edu';
    import list from './list';
    //import listEdu from './list-edu';
    export default {
        name: 'Companydepartment',
        props: ['isShowInModal', 'companyId'],
        components: { edit, list },
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
            getlistData() { },
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
        created() { }
    };
</script>
<style scoped>
    .stt {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        text-align: center;
        vertical-align: middle;
        background-color: rgb(255, 64, 129);
        font: 13px/42px Helvetica, Arial, sans-serif;
        color: rgb(255, 154, 219);
        float: left;
        margin-right: 10px;
        margin-top: 5px;
    }

    .NewsItemTitle1 {
        clear: right;
        color: #444;
        cursor: pointer;
        display: inline-block;
        font-size: 16px;
        line-height: 51px; /*//25*/
        padding-right: 20px;
        font-weight: bold;
        margin: 0;
        padding-bottom: 5px;
    }

    .action-btnn {
        width: 55px;
        position: absolute;
        right: 0;
        top: 25px;
        display: none;
        background: #f1f1f1;
    }
</style>
