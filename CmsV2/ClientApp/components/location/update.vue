<template>
    <modal
        id="modal-edit-class"
        :title="(id > 0 ? 'Cập nhật ' : 'Thêm mới ') + 'vị trí'"
        @close="close"
    >
        <div slot="body" v-if="form">
            <div class="row">
                <div class="col-sm-12 form-group">
                    <label>Tên</label>
                    <input
                        type="text"
                        class="form-control"
                        v-model="form.name"
                        name="Tên"
                        v-validate="'required'"
                    />
                    <span v-show="errors.has('Tên')" class="text-danger">{{
                        errors.first('Tên')
                    }}</span>
                </div>
                <div class="col-sm-12 form-group">
                    <label>Ghi chú</label>
                    <textarea
                        type="text"
                        class="form-control"
                        v-model="form.description"
                        rows="3"
                    />
                </div>
            </div>
        </div>
        <div slot="footer">
            <button class="btn btn-primary" @click="save()">
                <span>{{ $t('Label.Save') }}</span>
            </button>
        </div>
        <div slot="outside"></div>
    </modal>
</template>

<script>
export default {
    props: ['id', 'type'],
    data() {
        return {
            form: {},
        };
    },
    computed: {},
    methods: {
       
        close(isReload) {
            this.$emit('close', isReload);
        },
        getDetail() {
            let loading = this.$loading.show();
            this.$http({
                data: {
                    m: 'location',
                    fn: 'get-by-id',
                    id: this.id,
                },
            })
                .then((response) => {
                    this.form = response.data;
                    loading.hide();
                })
                .catch((err) => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        },
        fileChange(files) {
            if (files) this.files = files;
            else this.files = [];
        },
        save() {
            this.$validator.validate().then((valid) => {
                if (valid) {
                    this.$http({
                        data: {
                            m: 'location',
                            fn: 'save',
                            obj: this.form,
                        },
                    })
                        .then(() => {
                            this.$message('Lưu thành công!');
                            this.close(true);
                        })
                        .catch((err) => {
                            return this.$message(err.message, 'error');
                        });
                }
            });
        },
    },
    created() {
        this.form.id = this.id;
        this.form.calendarType = this.type;
        if (this.form.id) this.getDetail();
        else this.isLoader = true;
    },
};
</script>

<style>
</style>