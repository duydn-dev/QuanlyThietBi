<template>
  <div>
    <template v-if="!disabled">
      <v-select
        @search="fetchOptions"
        v-model="selectedData"
        :options="listData"
        :filterable="false"
        placeholder="Nhập tên hoặc tài khoản để tìm kiếm"
        label="name"
        @search:focus="getData"
        :multiple="multiple"
        v-if="!withDepartment"
      >
        <span
          slot="no-options"
          style="color: #a8a6a6"
        >Không có dữ liệu</span>
      </v-select>
      <treeselect
        v-model="selectedData"
        :multiple="multiple"
        :searchable="true"
        :options="listData"
        :limit="10"
        :max-height="300"
        placeholder="Lựa chọn người dùng"
        :disable-branch-nodes="selectParent ? false : true"
        :default-expand-level="1"
        no-results-text="Không có dữ liệu"
        no-options-text="Không có dữ liệu"
        :disabled="disabled"
        v-else
      />
    </template>
    <input
      class="txt-ipt"
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
import Treeselect from '@riophae/vue-treeselect';
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
        isReturnValue: {
            type: Boolean,
            default: false
        },
        withDepartment: {
            type: Boolean,
            default: false
        },
        selectParent: {
            type: Boolean,
            default: false
        },
        data: {}
    },
    components: { Treeselect },
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
            console.log(this.selectedData);
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
            console.log(this.withDepartment);
            this.$http({
                data: {
                    m: 'user',
                    fn: !this.withDepartment ? 'get_list' : 'user-with-department',
                    ...this.objData
                }
            })
                .then(res => {
                    this.listData = this.processData(res.data);
                    if (loading) loading(false);
                })
                .catch(err => {
                    return this.$message(err.message, 'error');
                });
        },
        processData(data) {
            if (!data) return data;

            if (!this.withDepartment) {
                for (const item of data) {
                    item.name = `${item.fullName} ${
                        item.position ? '(' + item.position + ')' : ''
                    }`;
                }
                return data;
            } else {
                let departments = data.map(c => {
                    return {
                        departmentId: c.departmentId,
                        department: c.department
                    };
                });

                // departments = departments.filter(
                //     (item, index, self) => self.indexOf(item) == index
                // );

                departments = [...new Map(departments.map(item => [item['departmentId'], item])).values()];
                // console.log('department');
                // console.log(departments);

                let temps = [];
                let childrens = [];
                for (const department of departments) {
                    let item = {
                        id: department.departmentId + "-department",
                        label: department.department,
                        children: []
                    };
                    childrens = data.filter(c => c.departmentId == department.departmentId);
                    for (const children of childrens) {
                        item.children.push({ id: children.id, label: children.fullName });
                    }
                    temps.push(item);
                }
                return temps;
            }
        },
        getDetail() {
            this.$http({
                data: {
                    m: 'user',
                    fn: 'get_detail',
                    ...this.objData
                }
            })
                .then(res => {
                    this.commitWatch = false;
                    if (res.data && res.data.length > 0) this.selectedData = res.data[0];
                })
                .catch(err => {
                    return this.$message(err.message, 'error');
                });
        },
        getByListId() {
            if (!this.data && this.data.length > 0) return;

            this.$http({
                data: {
                    m: 'user',
                    fn: 'get_by_ids',
                    ids: this.multiple ? JSON.stringify(this.data) : JSON.stringify([this.data])
                }
            })
                .then(res => {
                    this.commitWatch = false;
                    if (this.multiple) this.selectedData = this.processData(res.data);
                    else this.selectedData = this.processData(res.data)[0];
                })
                .catch(err => {
                    return this.$message(err.message, 'error');
                });
        }
    },
    created() {
        if (this.withDepartment) {
            this.getData();
            if (this.data) this.selectedData = this.data;
        } else if (this.data) {
            this.getByListId();
        }
    }
};
</script>

<style>
/* .v-select .selected-tag {
   margin-top: 0 !important;
} */
</style>