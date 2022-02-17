<template>
    <modal title="Chọn người quản lý" @close="closePopup()">
        <div slot="body">
            <div class="kt-widget4">
                <template v-for="propety in Object.keys(countMemberMananger)">
                    <fieldset
                        class="form-group border p-2"
                        :key="propety"
                        v-if="countMemberMananger[propety]"
                    >
                        <legend
                            class="w-auto kt-badge kt-badge--inline kt-badge--brand"
                        >{{title[propety]}}</legend>
                        <div class="row">
                            <div class="col-12 form-group">
                                <label>
                                    Có:
                                    <b style="font-size:20px">{{countMemberMananger[propety]}}</b> học viên đang quản lý
                                </label>
                                <userChoice v-model="obj[propety]" :isNeedBranch="false" />
                                <!--
                                     v-validate="'required'"
                                    :name="title[propety]" <span
                                    v-show="errors.has(title[propety])"
                                    class="text-danger"
                                >{{errors.first(title[propety])}}</span>-->
                            </div>
                        </div>
                    </fieldset>
                </template>
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
import { mapActions, mapGetters } from 'vuex';
import userChoice from '../_common/user-select/user-select-by-branch';
export default {
    props: ['countMemberMananger', 'userId'],
    components: { userChoice },
    data() {
        return {
            title: {
                marketing: 'Marketing',
                admissions: 'Tuyển sinh',
                abroad: 'Hồ sơ du học',
                labor: 'Hồ sơ XKLĐ'
            },
            obj: {
                userId: this.userId
            }
        };
    },
    computed: {
        ...mapGetters(['listUsers'])
    },
    methods: {
        ...mapActions(['getListUsers']),
        closePopup() {
            this.$emit('close');
        },
        save() {
            if (!this.objectValid(this.obj)) return this.$error('Vui lòng chọn người quản lý');
            this.$http({
                data: {
                    m: 'user',
                    fn: 'update_member_mananger',
                    ...this.obj
                }
            })
                .then(() => {
                    this.$message(this.$t('Label.Successful'));
                    this.closePopup();
                })
                .catch(ex => {
                    this.$message(ex.message, 'error');
                });
        },
        objectValid(obj) {
            if (!obj) return false;
            let isValid = true;
            for (var key in obj) {
               
                if (!obj[key]) {
                    isValid = false;
                    break;
                }
            }

            return isValid;
        }
    },
    created() {
        for (let item in this.countMemberMananger) {
            if (this.countMemberMananger[item]) this.obj[item] = null;
        }
        this.getListUsers({ pageSize: 10000 });
    }
};
</script>

<style>
</style>