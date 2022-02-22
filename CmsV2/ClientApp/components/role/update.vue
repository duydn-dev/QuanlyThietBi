<template>
    <modalv2 id="modal-edit-class" :title="`${userPositionId ? 'Cập nhật': 'Thêm mới'} nhóm người dùng`" @close="close" :width="1000">
        <div slot="body">
            <ul class="lst-info">
                <li class="d-flex flex-column">
                    <label class="txt-tit">Tên nhóm quyền</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="form.userPositionName"
                        placeholder="Nhập họ tên"
                    />
                </li>
                <li class="d-flex flex-column">
                    <label class="txt-tit">Trạng thái <label class="text-danger">*</label></label>
                    <v-select
                        v-model="form.status"
                        :options="userStatus"
                        :reduce="(n) => n.id"
                        label="name"
                        placeholder="Chọn trạng thái"
                        name="Trạng thái"
                        v-validate="'required'"
                    />
                    <span v-show="errors.has('Trạng thái')" class="text-danger">
                        {{ errors.first('Trạng thái') }}
                    </span>
                </li>
            </ul>
        </div>
        <div slot="footer">
            <button class="btn btn-primary" @click="save">
                <span>Lưu</span>
            </button>
            <button class="btn btn-secondary" @click="close">Đóng</button>
        </div>
    </modalv2>
</template>

<script>
import {mapGetters} from 'vuex';
    export default {
        props: {
            userPositionId: {
                type: String,
                default: null
            },
        },
        data() {
            return {
                form: {}
            }
        },
        computed: {
            ...mapGetters(['userStatus'])
        },
        methods: {
            save(){

            },
            close() {
                this.$emit('close', false);
            }
        },
    }
</script>

<style scoped>

</style>