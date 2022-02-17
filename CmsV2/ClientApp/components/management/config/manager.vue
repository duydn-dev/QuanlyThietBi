<template>
    <managementwrapper>
        <div class="box box-manage-position">
            <div class="box-head d-flex align-items-center justify-content-between">
                <strong class="txt-head">Quản lý danh mục dữ liệu</strong>                
            </div>
            <div class="box-ct box-tbl-ct">
                <div class="kt-portlet">
                    <div class="kt-portlet__body kt-portlet__body--fit">
                        <div
                            id="kt_wizard_v2"
                            class="kt-grid kt-wizard-v2 kt-wizard-v2--white"
                            data-ktwizard-state="first"
                        >
                            <div class="kt-grid__item kt-wizard-v2__aside" v-if="!configGroupCode">
                                <!--begin: Form Wizard Nav -->
                                <div class="kt-wizard-v2__nav">
                                    <div class="kt-wizard-v2__nav-items">
                                        <a
                                            v-for="(group, index) in listConfig"
                                            :key="index"
                                            class="kt-wizard-v2__nav-item"
                                            href="javascript:;"
                                            data-ktwizard-type="step"
                                            :data-ktwizard-state="
                                                activeTabIndex == index ? 'current' : 'pending'
                                            "
                                            @click="selectGroup(group, index)"
                                        >
                                            <div class="kt-wizard-v2__nav-body">
                                                <div class="kt-wizard-v2__nav-icon">
                                                    <i class="flaticon-list" />
                                                </div>
                                                <div class="kt-wizard-v2__nav-label">
                                                    <div class="kt-wizard-v2__nav-label-title">
                                                        {{ group.group.groupName }}
                                                        <span class="ml-1"
                                                            >({{ group.configs.length }})</span
                                                        >
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <!--end: Form Wizard Nav -->
                            </div>
                            <div
                                class="kt-grid__item kt-grid__item--fluid kt-wizard-v2__wrapper p-3"
                            >
                                <h4 class="kt-subheader__title" v-if="!configGroupCode">
                                    {{ currentGroup.group.groupName }}
                                </h4>
                                <div class="kt-widget4">
                                    <alert v-if="currentGroup.configs == 0" />
                                    <div
                                        id="category-type2"
                                        class="kt-widget4 kt-padding-r-0 kt-padding-l-0"
                                    >
                                        <div
                                            v-for="(item, indexConfig) in currentGroup.configs"
                                            :key="item.id"
                                            class="kt-widget4__item col-12"
                                        >
                                            <div class="kt-widget4__pic kt-widget4__pic--pic pr-0">
                                                <stt :val="indexConfig + 1" :c-class="item.badge" />
                                            </div>
                                            <div class="kt-widget4__info">
                                                <a class="kt-widget4__username">{{
                                                    item.configName
                                                }}</a>
                                                <p class="kt-widget4__text">{{ item.configKey }}</p>
                                            </div>
                                            <span class="btn-action">
                                                <button
                                                    class="btn btn-primary"
                                                    @click="openPopup(item.configKey)"
                                                >
                                                    <i class="fa fa-edit" />
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        class="mt-4"
                                        style="padding-left: 8px"
                                        v-if="appSettings.currentCompany.isSystem"
                                    >
                                        <button
                                            type="button"
                                            class="btn btn-success btn-sm"
                                            @click="openPopup('')"
                                        >
                                            <i class="fa fa-plus p-0" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <edit
            v-if="openConfig"
            :config-key="configKey"
            :config-group="configGroup"
            @closePopup="closePopup()"
        />
    </managementwrapper>
</template>
<style scoped>
h3 {
    padding-top: 0 !important;
}

.config-key {
    color: #999;
    font-weight: normal;
    font-size: 14px;
}
</style>
<script>
import edit from './edit';
export default {
    name: 'ConfigManager',
    props: {
        configGroupCode: {
            type: String,
            default: '',
        },
        isRemoveSystem: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        edit,
    },
    data() {
        return {
            objData: {
                keyword: '',
                pageIndex: 1,
                pageSize: 20,
                isRemoveSystem: this.isRemoveSystem,
            },
            listConfig: [],
            totalRows: 0,
            openConfig: false,
            configKey: '',
            activeTabIndex: 0,
            currentGroup: {
                group: {},
            },
            isOpenConfigAdd: false,
            itemConfig: null,
        };
    },
    computed: {
        rowNum() {
            return (this.objData.pageIndex - 1) * this.objData.pageSize;
        },
    },
    watch: {
        'objData.keyword'(val) {
            clearTimeout(this.timeDelay);
            this.timeDelay = setTimeout(() => {
                this.$set(this.objData, 'keyword', val);
                this.getListConfig();
            }, 500);
        },
    },
    created() {
        this.getListConfig();
    },
    methods: {
        openPopup(id) {
            this.configKey = id;
            this.openConfig = true;
            this.configGroup = this.currentGroup.group.groupType;
        },
        closePopup() {
            this.openConfig = false;
            this.getListConfig();
        },
        getListConfig() {
            let loading = this.$loading.show();
            this.$http({
                data: {
                    m: 'Config',
                    fn: 'list_with_group',
                    ...this.objData,
                },
            })
                .then((response) => {
                    loading.hide();
                    if (!this.configGroupCode) {
                        this.listConfig = response.data;
                    } else {
                        if (response.data)
                            this.listConfig = _.filter(response.data, (o) => {
                                return o.group.groupType == this.configGroupCode;
                            });
                    }
                    this.totalRows = response.totalRows;
                    if (
                        this.currentGroup &&
                        this.currentGroup.group &&
                        this.currentGroup.group.groupType &&
                        this.currentGroup.groupType != ''
                    ) {
                        this._.forEach(this.listConfig, (val) => {
                            if (val.groupType == this.currentGroup.groupType) {
                                this.currentGroup = val;
                                return;
                            }
                        });
                    } else if (this.listConfig.length > 0) this.selectGroup(this.listConfig[0], 0);
                })
                .catch((err) => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        },
        clickCallback(pageNum) {
            this.$set(this.objData, 'pageIndex', pageNum);
            this.getListConfig();
        },
        selectGroup(group, index) {
            (this.currentGroup = group), (this.activeTabIndex = index);
        },
    },
};
</script>
<style scoped>
ul {
    width: 100%;
}

li {
    vertical-align: middle;
    width: 100%;
    margin-bottom: 20px;
    background: #f1f1f1;
    padding: 10px;
    float: left;
    list-style: none;
    border: 1px solid #e8e8e8;
}

li div {
    float: left;
}

li .priority {
    width: 60px;
}

.action-right {
    float: right;
    padding-top: 5px;
}

li h3 {
    padding-top: 8px;
    margin: 0;
    font-size: 20px;
}

ul {
    padding: 0;
}

.config-key {
    margin: 0;
}
</style>
<style>
.sortable-chosen {
    border: 1px dashed #ffc300 !important;
}
</style>
