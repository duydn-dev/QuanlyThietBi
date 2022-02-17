<template>  
  <div class="has-confirm" style="display: block;">
    <label class="lbl-name"  v-for="item in selectedData"
      :key="item.id">{{item.name}}</label>    
</div>
</template>

<script>
export default {
    props: {
        data: {},
        multiple: {
            type: Boolean,
            default: true
        }
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
    watch: {},
    methods: {
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

                departments = [
                    ...new Map(departments.map(item => [item['departmentId'], item])).values()
                ];
                // console.log('department');
                // console.log(departments);

                let temps = [];
                let childrens = [];
                for (const department of departments) {
                    let item = {
                        id: department.departmentId + '-department',
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
        this.getByListId();
    }
};
</script>

<style>
/* .v-select .selected-tag {
   margin-top: 0 !important;
} */
</style>