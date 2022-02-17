<template>
    <div class="input-group">
        <div class="input-group-prepend">
            <span class="input-group-text">
                <i class="fa fa-phone" />
            </span>
        </div>
        <input v-model="phone"
               v-validate="{ required:true,regex:/((0|(84))+([0-9]{9}))\b/ }" type="text"
               :placeholder="placeholder"
               name="SĐT"
               class="form-control" />
        <span v-show="errors.has('SĐT')"
              class="text-danger col-sm-12">
            {{errors.first('SĐT')}}
        </span>
    </div>
</template>
<script>
    export default {
        name: 'Phone',
        props: ['value','placeholder'],
        watch: {
            'phone'() {
                this.$emit('input',this.phone)
            }
        },
        data() {
            return {
                phone:null,
            }
        },
        created() {
            this.phone = this.value;
        }
    }
</script>