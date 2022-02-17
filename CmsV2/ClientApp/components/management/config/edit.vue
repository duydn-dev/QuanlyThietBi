<template>
  <modalv2 id="modal-dashbroad" title="Cập nhật cấu hình" @close="$emit('closePopup')">
    <div slot="body">
      <div id="news-wrapper">
        <div v-if="form" class="row">
          <div class="col-12" v-if="isAdd" >
            <div class="form-group">
              <label>Key cấu hình</label>
              <input v-model="form.configKey" type="text" class="form-control" fullWidth />
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label>Tên cấu hình</label>
              <input v-model="form.configName" type="text" class="form-control" fullWidth />
            </div>
          </div>
          <div v-if="form.configType == 'EDITOR'" class="col-12 mt-10">
            <div class="form-group">
              <label>Nội dung</label>
              <editor v-if="isLoader" id="newsEditor" ref="editor" :content="form.configValue" />
            </div>
          </div>
          <div v-if="form.configType == 'TEXT'" class="col-12">
            <div class="form-group">
              <label>Nội dung</label>
              <textarea v-model="form.configValue" class="form-control" rows="2" fullWidth />
            </div>
          </div>
          <div v-if="form.configType == 'BOOL'" class="col-12">
            <div class="form-group">
              <div class="custom-control custom-checkbox">
                <input
                  id="select_all"
                  v-model="form.configValue"
                  type="checkbox"
                  class="custom-control-input"
                />
                <label class="custom-control-label" for="select_all">
                  {{
                  form.configName
                  }}
                </label>
              </div>
            </div>
          </div>
          <div v-if="form.configType == 'SELECT'" class="col-12">
            <div class="form-group">
              <label>Nội dung</label>
              <select
                v-if="form && form.configData"
                v-model="form.configValue"
                class="form-control"
                fullWidth
              >
                <option
                  v-for="(c, index) in form.configData"
                  :key="'c_' + index"
                  :value="c.id + ''"
                >{{c.value}}</option>
              </select>
            </div>
          </div>
          <div v-if="form.configType == 'PHOTO'" class="col-12">
            <div class="form-group">
              <img v-if="fileUrl" id="avatar-plh" :src="fileUrl" class="mr-3" />
              <button
                type="button"
                class="btn btn-success waves-effect waves-light"
                @click="showFileManager = true"
              >Chọn ảnh</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer" class="mt-1">
      <button class="btn btn-primary" @click="save()">
        <span>{{ $t('Label.Save') }}</span>
      </button>
    </div>
    <div slot="outside">
      <file-manager v-if="showFileManager" @close="showFileManager = false" @insert="selectFile" />
    </div>
  </modalv2>
</template>

<script>
import editor from '../../_common/editor';
export default {
    name: 'ConfigEdit',
    components: { editor },
    props: ['configKey', 'configGroup'],
    data() {
        return {
            form: {
                configKey: '',
                configName: '',
                configValue: '',
                configType: ''
            },
            editorContent: '',
            isLoader: false,
            showFileManager: false,
            isAdd: false
        };
    },
    computed: {
        fileUrl() {
            if (
                this.form.configType == 'PHOTO' &&
                this.form.configValue &&
                !this.form.configValue.startsWith('http')
            )
                return this.appSettings.configs.storageDomain + this.form.configValue;
 
            return this.form.configValue;
        }
    },
    created() {
        this.form.configKey = this.configKey;
        if (this.configKey != '') {
            this.getDetail();
            this.isAdd = false;
        } else {
            this.isAdd = true;
            this.form.configType = 'TEXT';
        }
    },
    methods: {
        selectFile(val) {
            if (val && val.length > 0) this.form.configValue = val[0].url;
        },
        getDetail() {
            let loading = this.$loading.show();
            this.$http({
                data: {
                    m: 'config',
                    fn: 'get-by-key',
                    key: this.form.configKey
                }
            })
                .then(response => {
                    loading.hide();
                    if (response.success) {
                        this.form = response.data;
                        if (this.form.configType == 'EDITOR') {
                            this.isLoader = true;
                        } else if (this.form.configType == 'SELECT') {
                            this.form.configData = JSON.parse(this.form.configData);
                        } else if (this.form.configType == 'BOOL') {
                            this.form.configValue = this.form.configValue == '1';
                        }
                    }
                })
                .catch(err => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        },
        save() {
            if (this.form.configType == 'EDITOR') {
                if (typeof CKEDITOR != 'undefined')
                    this.form.configValue = encodeURIComponent(this.$refs.editor.getData());
            } else if (this.form.configType == 'BOOL') {
                this.form.configValue = this.form.configValue ? 1 : 0;
            }
            
            var fn = "save";
            if(this.isAdd) {
                fn = "add";
                this.form.groupType = this.configGroup
            }
            this.$http({
                data: {
                    m: 'config',
                    fn: fn,
                    ...this.form
                }
            })
                .then(() => {
                    this.$message('Lưu thành công!');
                    this.$emit('closePopup');
                })
                .catch(err => {
                    return this.$message(err.message, 'error');
                });
        }
    }
};
</script>
<style>
.deadlineClass {
    color: #ff0000;
}

#editor .ql-tooltip[data-mode='video'] {
    left: 25% !important;
    top: 35% !important;
}

#editor .ql-tooltip[data-mode='video'] input {
    height: 80px !important;
    width: 400px !important;
}

#editor {
    height: 600px;
}

#avatar-plh {
    max-width: 200px;
    max-height: 200px;
}

#news-wrapper .input[type='text'] label,
#news-wrapper .common-label {
    font-weight: bold;
    color: #000;
}
</style>
