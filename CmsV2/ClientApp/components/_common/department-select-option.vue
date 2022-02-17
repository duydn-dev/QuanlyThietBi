<template>
  <div>
    <v-select
      @search="fetchOptions"
      v-model="selectedData"
      :options="listData"
      :filterable="false"
      placeholder="Nhập phòng ban"
      label="name"
      @search:focus="getData"
      v-if="!disabled"
      :multiple="multiple"
    >
      <span
        slot="no-options"
        style="color: #a8a6a6"
      >Không có dữ liệu</span>
    </v-select>
    <input
      class="form-control"
      disabled="true"
      v-bind:value="selectedData != null ? selectedData.name : ''"
      v-else
    />

    <!-- v-b-tooltip.focus="
        'Nhập vào ô tìm kiếm để hiển thị thêm danh sách kết quả'
      " -->
  </div>
</template>

<script>
export default {
    props: {
        multiple: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        data: {}
    },
    data() {
        return {
            objData: {
                pageIndex: 1,
                pageSize: 20,
                keyword: '',
                status: 1
            },
            listData: [],
            selectedData: null,
            commitWatch: true
        };
    },
    watch: {
        selectedData() {
            if (!this.multiple) {
                var val = {};
                val = Object.assign(val, this.selectedData);
                if (this.objectType == 1) {
                    val = {
                        id: val.id,
                        name: val.memberName,
                        address: val.address,
                        memberTypeId: val.memberTypeId
                    };
                }
                if (val) {
                    if (this.isReturnValue) this.$emit('input', val.id);
                    else this.$emit('input', val);
                } else this.$emit('input', null);
            } else this.$emit('input', this.selectedData);
        },
        objectType() {
            this.objData.objectType = this.objectType;
            this.objData.keyword = '';
            this.selectedData = null;
        }
    },
    methods: {
        fetchOptions(keyword, loading) {
            loading(true);
            this.objData.keyword = keyword;
            this.getData(loading);
        },

        getData(loading) {
            this.$http({
                data: {
                    m: 'CompanyDepartment',
                    fn: 'list',
                    ...this.objData
                }
            })
                .then(res => {
                    this.listData = res.data;
                    if (loading) loading(false);
                })
                .catch(err => {
                    return this.$message(err.message, 'error');
                });
        },

        getByListId() {
            if (!this.data && this.data.length > 0) return;
            this.$http({
                data: {
                    m: 'CompanyDepartment',
                    fn: 'get-by-ids',
                    ids: JSON.stringify(this.data)
                }
            })
                .then(res => {
                    this.commitWatch = false;
                    if (this.multiple) this.selectedData = res.data;
                    else if (res.data.length > 0) this.selectedData = res.data[0].id;
                })
                .catch(err => {
                    return this.$message(err.message, 'error');
                });
        }
    },
    created() {
        if (this.data) {
            this.getByListId();
        }
    }
};
</script>

<style>
.v-select .selected-tag {
    height: auto !important;
}
</style>