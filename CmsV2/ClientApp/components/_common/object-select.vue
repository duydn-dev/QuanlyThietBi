<template>
    <div class="form-group">
        <label> {{ field.name }} <span v-if="field.isRequired">*</span> </label>
        <div>
            <div class="input-group">
                <input type="text" class="form-control disabled" disabled :value="displayValue" />
                <div class="input-group-append">
                    <button class="btn btn-success" type="button" @click="openSelect()">
                        Chọn giá trị
                    </button>
                </div>
            </div>
        </div>

        <span v-if="field.help" class="form-text text-muted">{{ field.help }}</span>
        <modal v-if="openPopup" :title="field.name" @close="openPopup = false">
            <div slot="body">
                <b-tabs v-if="tabList" content-class="mt-3">
                    <b-tab
                        v-for="(tab, index) in tabList"
                        :key="index"
                        :active="tabActive == index"
                        :title="tab.displayName"
                        @click="tabActive = index"
                    >
                        <div class="kt-portlet p-3">
                            <alert v-if="totalRow == 0" />
                            <div v-else class="kt-widget4">
                                <div
                                    v-for="(item, i) in listData"
                                    :key="'data-' + item.id"
                                    class="kt-widget4__item cursor-pointer"
                                    @click="selectItem = item.id"
                                >
                                    <div class="kt-widget4__pic kt-widget4__pic--pic pr-0">
                                        <stt
                                            :val="i + 1"
                                            :size="25"
                                            :c-class="selectItem == item.id ? 'badge-success' : ''"
                                        />
                                    </div>
                                    <div class="kt-widget4__info">
                                        <a class="kt-widget4__username">
                                            {{ item.name }}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </b-tab>
                </b-tabs>
                <alert v-else />
            </div>
            <div slot="footer" class="row">
                <div class="col-sm-12">
                    <button type="button" class="btn btn-primary" secondary @click="Ok()">
                        <span>Xác nhận</span>
                    </button>
                    <button type="button" class="btn btn-danger" @click="closePopup()">
                        <span>Đóng</span>
                    </button>
                </div>
            </div>
        </modal>
    </div>
</template>
<script>
export default {
    props: ['field', 'values'],
    data() {
        return {
            value: '',
            openPopup: false,
            tabActive: -1,
            objData: {
                keyword: '',
                pageIndex: 1,
                pageSize: 20
            },
            totalRow: 0,
            selectItem: -1,
            displayValue: '',
            listData: null
        };
    },
    computed: {
        tabList() {
            if (this.field.config)
                return _.filter(this.appSettings.customFieldObjects, i => {
                    return this.field.config.objectTypes.lastIndexOf(i.id) != -1;
                });
            return [];
        }
    },
    watch: {
        tabActive() {
            if (this.values) {
                if (typeof this.values == 'string') this.value = JSON.parse(this.values)[0];
                else this.value = this.values[0];
            }
            this.selectItem = -1;
            this.objData.pageIndex = 1;
            this.getListData();
        }
    },
    created() {
        this.tabActive = 0;
        if (typeof this.field.config == 'string') this.field.config = JSON.parse(this.field.config);
        if (this.values) {
            if (typeof this.values == 'string') this.value = JSON.parse(this.values)[0];
            else this.value = this.values[0];
            if (this.value && this.value != '') {
                this.getName();
            }
        }
    },
    methods: {
        getData() {
            let val = [];
            if (this.value) val.push(this.value);
            return val;
        },
        openSelect() {
            this.openPopup = true;
        },
        closePopup() {
            this.openPopup = false;
        },
        Ok() {
            if (this.selectItem > 0) {
                var name = _.find(this.listData, ['id', this.selectItem]).name;
                this.displayValue = this.tabList[this.tabActive].displayName + ' | ' + name;
                this.value = {
                    id: this.selectItem,
                    typeId: this.tabList[this.tabActive].id,
                    typeName: this.tabList[this.tabActive].name
                };
            }
            this.openPopup = false;
            this.$emit('change', {
                field: this.field,
                values: this.getData()
            });
            this.$emit('input', this.getData());
        },
        getListData() {
            let loading = this.$loading.show();
            this.$http({
                data: {
                    m: this.tabList[this.tabActive].name,
                    fn: 'list-selected',
                    ...this.objData
                }
            })
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
        getName() {
            this.$http({
                data: {
                    m: this.value.typeName,
                    fn: 'get-name',
                    id: this.value.id
                }
            })
                .then(response => {
                    this.displayValue = response.data;
                    var obj = _.find(this.tabList, ['id', this.value.typeId]);
                    if (obj) this.displayValue = obj.displayName + ' | ' + this.displayValue;
                })
                .catch(err => {
                    return this.$message(err.message, 'error');
                });
        }
    }
};
</script>
