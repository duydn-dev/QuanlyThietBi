<template>
    <!-- <v-select
        v-model="province"
        :options="provinceList"
        :filterable="true"
        placeholder="Nhập tên tỉnh để tìm kiếm"
        v-b-tooltip.focus="'Nhập vào ô tìm kiếm để hiển thị thêm danh sách kết quả'"
        label="name"
        v-if="provinceList"
    > 
        <span slot="no-options" style="color:#a8a6a6">Không có dữ liệu</span>
    </v-select>-->
    <select-dict
        data-type-name="province"
        :onlyDataByAdmin="true"
        :allowAdd="false"
        v-model="province"
        placeholder="---Tất cả---"
        :multiple="false"
    />
</template>

<script>
//import { mapActions, mapGetters } from 'vuex';
export default {
    data() {
        return {
            province: null
        };
    },
    watch: {
        province() {
            console.log("Vao", this.province);
            if (this.province) this.$emit('input', this.province);
            else this.$emit('input', null);
        }
    },
    // computed: {
    //     ...mapGetters(['provinceList'])
    // },
    // methods: {
    //     ...mapActions(['getProvinceList'])
    // },
    created() {
      //  this.getProvinceList();
    }
};
</script>

<style>
</style>