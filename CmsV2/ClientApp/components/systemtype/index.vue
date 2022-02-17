<template>
    <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor">
        <div id="kt_subheader" class="kt-subheader   kt-grid__item">
            <div class="kt-subheader__main">
                <h3 class="kt-subheader__title">
                    Loại hệ thống
                </h3>

                <span class="kt-subheader__separator kt-subheader__separator--v" />
            </div>

            <div class="kt-subheader__toolbar">
                <a @click="openPopup()" class="btn btn-brand">
                    <i class="fa fa-plus-square"></i> Tạo mới
                </a>
            </div>
        </div>
        <div id="kt_content" class="kt-content  kt-grid__item kt-grid__item--fluid">
            <div class="kt-portlet p-3">
                <div v-if="systemTypeList" class="kt-widget4">
                    <div
                        v-for="(item, i) in systemTypeList"
                        :key="item.id"
                        class="kt-widget4__item"
                    >
                        <div class="kt-widget4__pic kt-widget4__pic--pic pr-0">
                            <stt :val="i + 1" />
                        </div>
                        <div class="kt-widget4__info">
                            <a class="kt-widget4__username">
                                {{ item.name }}
                            </a>
                            <p class="kt-widget4__text">
                                <span>{{ item.description }}</span>
                            </p>
                        </div>
                        <span class="btn-action">
                            <button class="btn btn-primary" @click="openPopup(item.id)">
                                <i class="fa fa-edit" />
                            </button>
                            <button class="btn btn-danger" @click="remove(item.id)">
                                <i class="fa fa-trash-alt" />
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <edit v-if="popupAdd" :id="id" @closePopup="closePopup" />
    </div>
</template>
<script>
import edit from './edit';
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'SystemType',
    components: { edit },
    data() {
        return {
            id: 0,
            listData: [],
            totalRow: 0,
            popupAdd: false
        };
    },
    computed: {
        ...mapGetters(['systemTypeList'])
    },
    methods: {
        ...mapActions(['getSystemTypeList']),
        openPopup(id) {
            this.id = id || 0;
            this.popupAdd = true;
        },

        closePopup() {
            this.popupAdd = false;
            this.getListData();
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
        if (!this.systemTypeList) this.getSystemTypeList();
    }
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
