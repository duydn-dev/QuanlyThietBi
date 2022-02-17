<template>
    <modalv2 :title="form.id > 0 ? 'Sửa giá trị' : 'Thêm giá trị'" @close="closePopup()">
        <div slot="body">
            <div class="row">
                <div class="col-sm-12">
                    <div class="row">
                        <div class="col-sm-12 form-group">
                            <label>Tên giá trị</label>
                            <input
                                v-model="form.value"
                                type="text"
                                placeholder="Nhập giá trị"
                                class="form-control"
                            />
                        </div>
                        <div class="col-sm-12 form-group">
                            <label>Thứ tự</label>
                            <input
                                v-model="form.priority"
                                type="number"
                                placeholder="Nhập giá trị"
                                class="form-control"
                            />
                        </div>

                        <div
                            v-if="category.isHierarchy && parentList && parentList.length > 0"
                            class="col-sm-12"
                        >
                            <div class="form-group">
                                <label>Cấp cha</label>
                                <select
                                    v-if="parentList"
                                    v-model="form.parentId"
                                    class="form-control"
                                >
                                    <option :value="0">Chọn cấp cha</option>
                                    <option
                                        v-for="item in parentList"
                                        :key="item.id"
                                        :value="item.id"
                                    >
                                        {{ item.value }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div v-if="category.isBadge" class="col-sm-12">
                            <div class="form-group">
                                <label>Chọn nhãn</label>
                                <div>
                                    <span
                                        v-for="item in badgeList"
                                        :key="item"
                                        :class="{ 'active-badge': form.badge == item }"
                                        @click="form.badge = item"
                                    >
                                        <span
                                            class="badge ml-2 p-2 pr-3 pl-3 mb-1 cursor-pointer"
                                            :class="'badge-' + item"
                                            >&nbsp;</span
                                        >
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div v-if="false" class="col-sm-12">
                            <div class="form-group">
                                <label>Loại</label>
                                <select v-model="form.itemType" class="form-control">
                                    <option :value="1">Bắt đầu</option>
                                    <option :value="2">Xử lý</option>
                                    <option :value="3">Thành công</option>
                                    <option :value="4">Thất bại</option>
                                </select>
                            </div>
                        </div>
                        <!--<div class="col-sm-12" v-if="category.type == 2">
                            <div class="form-group">
                                <label>Phòng ban</label>
                                <select class="form-control" v-model="form.departmentId">
                                    <option :value="0">Chọn phòng ban</option>
                                    <option v-if="listDepartMent" v-for="b in listDepartMent" :value="b.id" :key="'dp'+b.id">{{b.name}}</option>
                                </select>
                            </div>
                        </div>-->
                    </div>
                </div>
            </div>
        </div>
        <div slot="footer" class="row">
            <div class="col-sm-12">
                <button class="btn btn-primary" @click="save()">
                    <span>Lưu lại</span>
                </button>
                <button class="btn btn-danger" @click="closePopup()">
                    <span>Hủy</span>
                </button>
            </div>
        </div>
    </modalv2>
</template>

<script>
export default {
    name: 'SourceEdit',
    props: ['id', 'parentList', 'item', 'category'],
    data() {
        return {
            form: {
                value: '',
                itemType: 1,
                badge: '',
                parentId: 0,
                id: 0,
                departmentId: 0,
                categoryId: this.id,
            },
            badgeList: [
                'danger',
                'dark',
                'info',
                'primary',
                'secondary',
                'success',
                'warning',
                'orange',
                'red',
                'pink',
                'purple',
                'indigo',
                'blue',
                'light',
                'red',
                'gray',
                'cyan',
                'teal',
                'yellow',
            ],
        };
    },
    computed: {
        //...mapGetters(['departmentList']),
        //listDepartMent() {
        //    if (this.departmentList)
        //        return _.filter(this.departmentList, ['parentId', 0]);
        //    return this.departmentList;
        //}
    },
    created() {
        if (this.item) this.form = this.item;
        //if (!departmentList)
        //this.getDepartmentList();
    },
    methods: {
        //...mapActions(['getDepartmentList']),
        save() {
            if (this.form.value == '') {
                return this.$message('Bạn vui lòng nhập tên giá trị!', 'error');
            }
            this.form.categoryId = this.id;
            this.$http({
                data: {
                    m: 'category',
                    fn: 'save-item',
                    ...this.form,
                },
            })
                .then((res) => {
                    if (res.success) {
                        this.$message('Lưu thành công!');
                        this.closePopup();
                    }
                })
                .catch((err) => {
                    return this.$message(err.message, 'error');
                });
        },
        closePopup() {
            this.$emit('closePopup');
        },
    },
};
</script>
<style>
.active-badge .badge {
    border: 2px solid #000000 !important;
    opacity: 0.5;
}
</style>
