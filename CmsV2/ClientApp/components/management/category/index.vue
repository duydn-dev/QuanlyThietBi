<template>
    <managementwrapper>
        
        <div class="box box-manage-position">
            <div class="box-head d-flex align-items-center justify-content-between">
                <strong class="txt-head">Thiết lập danh mục</strong>
                <div class="group-right d-flex align-items-center">
                    <!-- <div class="form-wrap">
                        <input type="text" class="form-control ipt-search" placeholder="Từ khóa">
                    </div> -->
                    <button type="button" class="btn-evt btn-create js-btnCreate d-flex align-items-center" 
                    v-if="appSettings.companies && appSettings.currentCompany.isSystem"
                    @click="openPopup()">
                        <i class="bi bi-plus"></i>
                        <span>Tạo danh mục mới</span>
                    </button>
                </div>
            </div>
            
            <div class="box-ct box-tbl-ct">
                <div class="kt-portlet">
                    <div class="kt-portlet__body kt-portlet__body--fit">
                        <div id="kt_wizard_v2"
                            class="kt-grid  kt-wizard-v2 kt-wizard-v2--white"
                            data-ktwizard-state="first">
                            <div class="kt-grid__item kt-wizard-v2__aside">
                                <!--begin: Form Wizard Nav -->
                                <div class="kt-wizard-v2__nav">
                                    <div class="kt-wizard-v2__nav-items">
                                        <a v-for="(cat, index) in categoryList"
                                        :key="cat.id"
                                        class="kt-wizard-v2__nav-item"
                                        href="javascript:;"
                                        data-ktwizard-type="step"
                                        :data-ktwizard-state="
                                                tabActive == index ? 'current' : 'pending'
                                            "
                                        @click="tabActive = index">
                                            <div class="kt-wizard-v2__nav-body">
                                                <div class="kt-wizard-v2__nav-icon">
                                                    <i class="flaticon-list" />
                                                </div>
                                                <div class="kt-wizard-v2__nav-label">
                                                    <div class="kt-wizard-v2__nav-label-title">
                                                        {{ cat.name }}
                                                    </div>
                                                </div>
                                                <span v-if="
                                                        appSettings.companies &&
                                                            appSettings.currentCompany.isSystem
                                                    "
                                                    class="btn fa fa-edit edit-category"
                                                    @click="openPopup(cat.id)" />
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <!--end: Form Wizard Nav -->
                            </div>
                            <div class="kt-grid__item kt-grid__item--fluid kt-wizard-v2__wrapper p-3">
                                <div v-if="curentCat && curentCat.type == 2" class="kt-widget4 pr-2">
                                    <div class="kt-portlet__body">
                                        <div class="kt-section mb-1">
                                            <h3 class="kt-section__title">
                                                Bắt đầu
                                            </h3>
                                            <div class="alert" :class="'alert-' + listItemType1.badge">
                                                <strong>{{ listItemType1.value }}</strong>
                                                <div class="category-action">
                                                    <button type="button"
                                                            class="btn btn-success btn-sm"
                                                            @click="openPopupItem(listItemType1)">
                                                        <i class="fa fa-edit p-0" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="kt-separator kt-separator--dashed" />
                                        <div class="kt-section">
                                            <h3 class="kt-section__title">
                                                Xử lý
                                            </h3>
                                            <draggable :list="listItemType2"
                                                    @end="saveMove(listItemType2)">
                                                <div v-for="item in listItemType2"
                                                    :key="'listItemType2' + item.id"
                                                    class="alert cursor-move"
                                                    :class="'alert-' + item.badge">
                                                    <strong>{{ item.value }}</strong>
                                                    <div class="category-action">
                                                        <button type="button"
                                                                class="btn btn-success btn-sm"
                                                                @click="openPopupItem(item)">
                                                            <i class="fa fa-edit p-0" />
                                                        </button>
                                                        <button type="button"
                                                                class="btn btn-danger btn-sm"
                                                                @click="remove(item.id)">
                                                            <i class="fa fa-times p-0" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </draggable>
                                            <div class="mt-4">
                                                <button type="button"
                                                        class="btn btn-success btn-sm"
                                                        @click="openPopupAdd(2)">
                                                    <i class="fa fa-plus p-0" />
                                                </button>
                                            </div>
                                        </div>
                                        <div class="kt-separator kt-separator--dashed" />
                                        <div class="kt-section">
                                            <h3 class="kt-section__title">
                                                Kết thúc
                                            </h3>
                                            <div class="row">
                                                <div class="col-6">
                                                    <h3 class="kt-section__title">
                                                        Thành công
                                                    </h3>
                                                    <div class="alert"
                                                        :class="'alert-' + listItemType3.badge">
                                                        <strong>{{ listItemType3.value }}</strong>
                                                        <div class="category-action">
                                                            <button type="button"
                                                                    class="btn btn-success btn-sm"
                                                                    @click="openPopupItem(listItemType3)">
                                                                <i class="fa fa-edit p-0" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-6">
                                                    <h3 class="kt-section__title">
                                                        Thất bại
                                                    </h3>
                                                    <draggable :list="listItemType4"
                                                            @end="saveMove(listItemType4)">
                                                        <div v-for="item in listItemType4"
                                                            :key="'listItemType4' + item.id"
                                                            class="alert cursor-move"
                                                            :class="'alert-' + item.badge">
                                                            <strong>{{ item.value }}</strong>
                                                            <div class="category-action">
                                                                <button type="button"
                                                                        class="btn btn-success btn-sm"
                                                                        @click="openPopupItem(item)">
                                                                    <i class="fa fa-edit p-0" />
                                                                </button>
                                                                <button type="button"
                                                                        class="btn btn-danger btn-sm"
                                                                        @click="remove(item.id)">
                                                                    <i class="fa fa-times p-0" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </draggable>
                                                    <div class="mt-4">
                                                        <button type="button"
                                                                class="btn btn-success btn-sm"
                                                                @click="openPopupAdd(4)">
                                                            <i class="fa fa-plus p-0" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else>
                                    <alert v-if="totalRow == 0" />
                                    <div v-else id="category-type2" class="kt-widget4 p-4">
                                        <draggable v-if="curentCat.isSetPriority"
                                                :list="listItemData"
                                                :options="{ handle: '.handle' }"
                                                @end="saveMove">
                                            <div v-for="(item, i) in listItemData"
                                                :key="'listItemData' + item.id"
                                                class="kt-widget4__item">
                                                <div class="kt-widget4__pic kt-widget4__pic--pic pr-0 handle cursor-move  mr-1">
                                                    <stt :val="i + 1"
                                                        :c-class="'badge-' + item.badge" />
                                                </div>
                                                <div class="kt-widget4__info">
                                                    <a class="kt-widget4__username">
                                                        {{ item.value }}
                                                    </a>
                                                </div>
                                                <span class="btn-action d-flex">
                                                    <button class="btn btn-primary"
                                                            @click="openPopupItem(item)">
                                                        <i class="fa fa-edit" />
                                                    </button>
                                                    <button class="btn btn-danger"
                                                            @click="remove(item.id, i)">
                                                        <i class="fa fa-trash-alt" />
                                                    </button>
                                                </span>
                                            </div>
                                        </draggable>
                                        <div v-for="(item, i) in listItemData"
                                            v-else
                                            :key="item.id"
                                            class="row">
                                            <div class="kt-widget4__item col-12">
                                                <div class="kt-widget4__pic kt-widget4__pic--pic pr-0 mr-1">
                                                    <stt :val="i + 1" :c-class="item.badge" />
                                                </div>
                                                <div class="kt-widget4__info">
                                                    <a class="kt-widget4__username">
                                                        {{ item.value }}
                                                    </a>
                                                </div>
                                                <span class="btn-action d-flex">
                                                    <button class="btn btn-primary"
                                                            @click="openPopupItem(item)">
                                                        <i class="fa fa-edit" />
                                                    </button>
                                                    <button class="btn btn-danger"
                                                            @click="remove(item.id)">
                                                        <i class="fa fa-trash-alt" />
                                                    </button>
                                                </span>
                                            </div>
                                            <div class="col-12 pl-5">
                                                <div v-for="(ch, i2) in item.children"
                                                    :key="ch.id"
                                                    class="kt-widget4__item">
                                                    <div class="kt-widget4__pic kt-widget4__pic--pic pr-0 mr-1">
                                                        <stt :val="i2 + 1" :c-class="ch.badge" />
                                                    </div>
                                                    <div class="kt-widget4__info">
                                                        <a class="kt-widget4__username">
                                                            {{ ch.value }}
                                                        </a>
                                                    </div>
                                                    <span class="btn-action d-flex">
                                                        <button class="btn btn-primary"
                                                                @click="openPopupItem(ch)">
                                                            <i class="fa fa-edit" />
                                                        </button>
                                                        <button class="btn btn-danger"
                                                                @click="remove(ch.id)">
                                                            <i class="fa fa-trash-alt" />
                                                        </button>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-4">
                                        <button type="button"
                                                class="btn btn-success btn-sm"
                                                @click="openPopupItem()">
                                            <i class="fa fa-plus p-0" /> {{this.curentCat?this.curentCat.name:''}}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
        <edit v-if="popupAdd" :id="id" @closePopup="closePopup" />
        <addItem v-if="popupItem"
                 :id="catId"
                 :parent-list="listData"
                 :item="catItem"
                 :category="curentCat"
                 @closePopup="closePopupItem" />
    </managementwrapper>
</template>
<script>
    import edit from './edit';
    import addItem from './addItem';
    import { mapGetters, mapActions } from 'vuex';
    export default {
        name: 'Source',
        components: { edit, addItem },
        data() {
            return {
                objData: {
                    keyword: '',
                    status: 1,
                    pageIndex: 1,
                    pageSize: 20
                },
                id: 0,
                listData: [],
                totalRow: 0,
                popupAdd: false,
                popupItem: false,
                catItem: null,
                tabActive: -1
            };
        },
        computed: {
            ...mapGetters(['categoryList']),
            rowNum() {
                return (this.objData.pageIndex - 1) * this.objData.pageSize;
            },
            catId() {
                if (this.categoryList && this.tabActive > -1)
                    return this.categoryList[this.tabActive].id;
                return 0;
            },
            curentCat() {
                if (this.categoryList && this.tabActive > -1) return this.categoryList[this.tabActive];
                return null;
            },
            listItemData() {
                if (this.curentCat.isHierarchy) {
                    var parent = _.filter(this.listData, ['parentId', 0]);
                    for (let p of parent) {
                        p.children = _.filter(this.listData, ['parentId', p.id]);
                    }
                    return parent;
                }
                return this.listData;
            },
            listItemType1() {
                let obj = {
                    value: 'Bắt đầu',
                    itemType: 1,
                    badge: 'info',
                    parentId: 0,
                    id: 0,
                    departmentId: 0,
                    categoryId: this.catId
                };
                if (this.listData && this.listData.length > 0) {
                    var val = _.find(this.listData, ['itemType', 1]);
                    if (val) obj = val;
                }
                return obj;
            },
            listItemType2() {
                if (this.listData && this.listData.length > 0) {
                    return _.filter(this.listData, ['itemType', 2]);
                }
                return null;
            },
            listItemType3() {
                let obj = {
                    value: 'Kết thúc thành công',
                    itemType: 3,
                    badge: 'success',
                    parentId: 0,
                    id: 0,
                    departmentId: 0,
                    categoryId: this.catId
                };
                if (this.listData && this.listData.length > 0) {
                    var val = _.find(this.listData, ['itemType', 3]);
                    if (val) obj = val;
                }
                return obj;
            },
            listItemType4() {
                if (this.listData && this.listData.length > 0) {
                    return _.filter(this.listData, ['itemType', 4]);
                }
                return null;
            }
        },
        watch: {
            tabActive() {
                if (this.categoryList)
                    this.getCategoryListItem({
                        catId: this.categoryList[this.tabActive].id
                    }).then(res => {
                        this.listData = res.data;
                        this.totalRow = res.totalRow;
                    });
            }
        },
        methods: {
            ...mapActions(['getCategoryList', 'getCategoryListItem']),
            getListData() {
                let loading = this.$loading.show();
                this.getSourceList(this.objData)
                    .then(response => {
                        loading.hide();
                        this.listData = response.data;
                        this.totalRow = response.totalRow;
                    })
                    .catch(err => {
                        loading.hide();
                        return this.$message(err.message, 'error');
                    });
            },
            addItem() {
                this.id = this.categoryList[this.tabActive].id;
                this.popupAdd = true;
            },
            getItem(id, index) {
                this.getCategoryListItem({ catId: id }).then(res => {
                    this.listData = res.data;
                });
                this.tabActive = index;
            },
            pageChange(pageNum) {
                this.$set(this.objData, 'pageIndex', pageNum);
                this.getListData();
            },
            openPopup(id) {
                this.id = id || 0;
                this.popupAdd = true;
            },
            openPopupItem(item) {
                this.catItem = item || null;
                this.popupItem = true;
            },
            openPopupAdd(type) {
                this.catItem = {
                    value: '',
                    itemType: type,
                    badge: '',
                    parentId: 0,
                    id: 0,
                    departmentId: 0,
                    categoryId: this.catId
                };
                this.popupItem = true;
            },
            closePopup() {
                this.popupAdd = false;
                this.getCategoryList().then(() => {
                    this.tabActive = 0;
                });
            },
            closePopupItem() {
                this.popupItem = false;
                this.getCategoryListItem({
                    catId: this.categoryList[this.tabActive].id
                }).then(res => {
                    this.listData = res.data;
                    this.totalRow = res.totalRow;
                });
            },
            saveMove(data) {
                if (!data) data = this.listData;
                this.$http({
                    data: {
                        m: 'category',
                        fn: 'save-priority',
                        catId: this.catId,
                        listData: JSON.stringify(data)
                    }
                })
                    .then(response => {
                        this.listData = response.data;
                        this.totalRows = response.totalRows;
                        this.$notify({
                            group: 'foo',
                            duration: 1000,
                            title: this.$t('Label.Successful')
                        });
                    })
                    .catch(err => {
                        return this.$message(err.message, 'error');
                    });
            },
            remove(id) {
                this.$confirm('Bạn có chắc muốn xóa giá trị này?').then(() => {
                    let loading = this.$loading.show();
                    this.$http({
                        data: {
                            m: 'category',
                            fn: 'remove-item',
                            id: id
                        }
                    })
                        .then(() => {
                            loading.hide();
                            var index = _.findIndex(this.listData, ['id', id]);
                            this.listData.splice(index, 1);
                        })
                        .catch(err => {
                            loading.hide();
                            return this.$message(err.message, 'error');
                        });
                });
            }
        },
        created() {
            this.getCategoryList().then(() => {
                this.tabActive = 0;                
            });

            
        }
    };
</script>
<style scoped>
    #category-type2 .alert {
        position: relative;
    }

    .category-action {
        position: absolute;
        top: 7px;
        right: 10px;
    }

    .edit-category {
        position: absolute;
        right: 10px;
        top: 18px;
        display: none;
    }

    .kt-wizard-v2__nav-item {
        position: relative;
    }

        .kt-wizard-v2__nav-item:hover .edit-category {
            display: block;
        }
    .btn-action .btn{
        margin: 0 2px;
    }
</style>
