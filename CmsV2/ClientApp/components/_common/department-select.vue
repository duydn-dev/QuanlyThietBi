<template>
    <modal title="Chọn phòng ban" :width="500" @close="closePopup()">
        <div slot="body">
            <div class="kt-widget4">
                <div
                    v-for="(item, i) in departmentList"
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
        <div slot="footer" class="row">
            <div class="col-sm-12">
                <button class="btn btn-primary" secondary @click="save()">
                    <span>Xác nhận</span>
                </button>
                <button class="btn btn-danger" @click="closePopup()">
                    <span>Đóng</span>
                </button>
            </div>
        </div>
    </modal>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'DepartmentSelect',
    props: {
        maxSelected: {
            type: Number,
            default: 10000
        }
    },
    data() {
        return {
            form: {
                departmentId: 0,
                permissionCode: '',
                keyWord: '',
                pageIndex: 1,
                pageSize: 20
            },
            selectItem: 0,
            selectAll: false
        };
    },
    watch: {},
    computed: {
        ...mapGetters(['departmentList'])
    },
    methods: {
        ...mapActions(['getDepartmentList']),
        save() {
            if (this.selectItem == 0) {
                return this.$message('Vui lòng lựa chọn phòng ban!', 'error');
            }
            this.$emit('selected', this.selectItem);
        },
        closePopup() {
            this.$emit('close');
        }
    },
    created() {
        this.getDepartmentList();
    }
};
</script>
