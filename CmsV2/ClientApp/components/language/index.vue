<template>
    <wrapper title="Quản lý ngôn ngữ" sapo="">
        <div id="form-search">
            <button type="button" class="btn btn-primary" @click="openPopup()">
                <i class="fa fa-plus-circle" /> Thêm ngôn ngữ
            </button>
        </div>
        <div class="common-table tbl-fix-600">
            <table class="table table-striped">
                <thead slot="header">
                    <tr>
                        <th>{{ $t('Label.Stt') }}</th>
                        <th>Mã ngôn ngữ</th>
                        <th>Tên</th>
                        <th>Tên tiếng Việt</th>
                        <th>Thứ tự hiển thị</th>
                        <th>Trạng thái</th>
                        <th class="text-center width-250">
                            {{ $t('Label.Action') }}
                        </th>
                    </tr>
                </thead>
                <tbody v-if="languages">
                    <tr v-for="(item, index) in languages" :key="item.code">
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.code }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.viName }}</td>
                        <td>{{ item.priority }}</td>
                        <td>
                            <span v-if="item.status == 1" class="badge badge-primary"
                                >Hiển thị</span
                            >
                            <span v-else class="badge badge-danger">Ẩn</span>
                        </td>
                        <td class="text-center">
                            <button
                                class="btn btn-warning"
                                :title="$t('Label.Edit')"
                                @click="openPopup(item.code)"
                            >
                                Sửa
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="common-table tbl-fix-600">
            <h5>Danh sách từ khóa tĩnh</h5>
            <table class="table table-striped">
                <thead slot="header">
                    <tr>
                        <th>{{ $t('Label.Stt') }}</th>
                        <!--<th>Key</th>-->
                        <th>Từ khóa</th>
                        <th v-for="item in languages" :key="item.code">
                            {{ item.name }}
                        </th>
                    </tr>
                </thead>
                <tbody v-if="staticTexts">
                    <tr v-for="(item, index) in staticTexts" :key="item.info.languageKey">
                        <td>{{ index + 1 }}</td>
                        <!--<td>{{item.info.languageKey}}</td>-->
                        <td>
                            <h6>{{ item.info.languageDefaultValue }}</h6>
                            <small>{{ item.info.languageKey }}</small>
                        </td>
                        <td v-for="jtem in languages" :key="jtem.code">
                            <input
                                v-model="item.langs[jtem.code]"
                                type="text"
                                class="form-control"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div id="xxx">
                <button type="button" class="btn btn-primary" @click="saveStaticTexts()">
                    <i class="fa fa-save" /> Lưu dữ liệu từ khóa
                </button>
            </div>
        </div>
        <modal
            v-if="popupAdd"
            :title="code != '' ? 'Cập nhật ngôn ngữ' : 'Tạo mới ngôn ngữ'"
            @close="popupAdd = false"
        >
            <div v-if="languageDetail" slot="body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label>Chọn ngôn ngữ</label>
                            <select
                                v-model="languageDetail.code"
                                class="form-control"
                                placeholder="Tên tiếng Việt"
                                :disabled="code != ''"
                            >
                                <option v-for="(lang, key) in allLanguages" :key="key" :value="key">
                                    {{ lang[0] }} - {{ lang[1] }}
                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Tên tiếng Việt</label>
                            <input
                                v-model="languageDetail.viName"
                                type="text"
                                class="form-control"
                            />
                        </div>
                        <div class="form-group">
                            <label>Thứ tự hiển thị</label>
                            <input
                                v-model="languageDetail.priority"
                                type="text"
                                class="form-control"
                            />
                        </div>
                        <div class="form-group">
                            <label>Trạng thái</label>
                            <select v-model="languageDetail.status" class="form-control">
                                <option value="0">
                                    Ẩn
                                </option>
                                <option value="1">
                                    Hiển thị
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <button class="btn btn-primary" @click="save()">
                    <span>{{ $t('Label.Save') }}</span>
                </button>
            </div>
        </modal>
    </wrapper>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'LanguageIndex',
    computed: {
        ...mapGetters(['languages', 'allLanguages'])
    },
    data() {
        return {
            popupAdd: false,
            code: '',
            languageDetail: { code: '' },
            staticTexts: null
        };
    },
    methods: {
        ...mapActions(['getLanguages', 'insertLanguage', 'updateLanguage']),
        openPopup(code) {
            this.code = code || '';
            this.popupAdd = true;
            if (this.code != '') this.getDetail();
            else
                this.languageDetail = {
                    code: ''
                };
        },
        closePopup() {
            this.popupAdd = false;
        },
        save() {
            if (this.languageDetail.code == '') {
                return this.$message('Hãy chọn ngôn ngữ muốn thêm!', 'error');
            }
            let loading = this.$loading.show();
            let name = this.allLanguages[this.languageDetail.code][0];
            this.languageDetail.name = name;
            this.$http({
                data: {
                    m: 'language',
                    fn: 'save',
                    ...this.languageDetail
                }
            })
                .then(() => {
                    loading.hide();
                    this.closePopup();
                    this.$message(this.$t('Label.Successful'));
                    this.getLanguages();
                })
                .catch(err => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        },
        getDetail() {
            this.languageDetail = this._.find(this.languages, item => {
                return item.code == this.code;
            });
        },
        getStaticText() {
            let loading = this.$loading.show();
            this.$http({
                data: {
                    m: 'language',
                    fn: 'list_static'
                }
            })
                .then(res => {
                    loading.hide();
                    this.staticTexts = res.data;
                })
                .catch(err => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        },
        saveStaticTexts() {
            let data = JSON.stringify(this.staticTexts);
            let loading = this.$loading.show();
            this.$http({
                data: {
                    m: 'language',
                    fn: 'save_static',
                    texts: data
                }
            })
                .then(() => {
                    loading.hide();
                    return this.$success('Lưu thành công!');
                })
                .catch(err => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        }
    },
    created() {
        let loading = this.$loading.show();
        this.getLanguages().then(() => {
            loading.hide();
        });
        this.getStaticText();
    }
};
</script>
