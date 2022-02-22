<template>
    <div class="file-manager-wrapper">
        <modalv2 title="Quản lý file" size="huge" @close="closeManager" bodyCls="no-pd" modalClass='popup-xxl'>
            <div class="container-fluid" slot="body">
                <div class="row" style="min-height:500px">
                    <div
                        class="col-md-2 float-right"
                        style="overflow: auto;border-right:solid 1px #ddd;"
                    >
                        <tree-item
                            v-if="lstFileFolders && lstFileFolders.length > 0"
                            :item="lstFileFolders[0]"
                            @change-data="UpdateData($event)"
                            @select-folder="UpdateFileDataByFolderId($event)"
                        />
                    </div>
                    <div class="col-md-10">
                        <div id="file-manager-toolbar" class="row">
                            <div class="col-md-3">
                                <div class="bootstrap-filestyle input-group">
                                    <input
                                        v-model="searchObj.keyWord"
                                        type="text"
                                        class="form-control"
                                        placeholder="Nhập nội dung tìm kiếm"
                                        @keyup.13="searchFile()"
                                    />
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div>
                                    <select v-model="searchObj.isMyFile" class="form-control">
                                        <option :value="0">File của tôi</option>
                                        <option :value="1">Tất cả file</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-4" id="pager-file-manager">
                                <pager
                                    :total="fileCount"
                                    :page-index="searchObj.pageIndex"
                                    :page-size="searchObj.pageSize"
                                    :showNumber="false"
                                    @change="pageChange"
                                />
                            </div>
                            <div class="col-md-3">
                                <upload-btn
                                    id="btn-upload-file"
                                    :exts="exts"
                                    :folder-id="searchObj.folderId"
                                    @percentCompleted="getPercentCompleted"
                                    @uploaded="reloadList"
                                    @startloadingfile="startLoadingFile"
                                    @endloadingfile="endLoadingFile"
                                />
                                <b-progress
                                    v-if="isLoadingFile"
                                    id="percentCompleted"
                                    v-model="percentCompleted"
                                    :max="100"
                                    show-progress
                                    animated
                                />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-sm-12">
                                <div class="row">
                                    <div class="col-lg-9">
                                        <template v-if="files">
                                            <file-item
                                                v-for="file in files"
                                                :key="file.id"
                                                :file="file"
                                                :max-select="maxSelect"
                                                :count-selected-item="countSelectedFileItem"
                                                @select="select(file)"
                                                @deselect="deselect(file)"
                                                @deleted="reloadList"
                                            />
                                        </template>
                                    </div>
                                    <div class="col-lg-3">
                                        <div
                                            v-if="
                                             selected &&
                                             selected.length>
                                            0 &&
                                            selected.length <= 1
                                            "
                                        >
                                            <file-detail
                                                :file-selected="selected[0]"
                                                :user-name="userName"
                                                @reloadList="reloadList()"
                                            />
                                        </div>
                                        <div
                                            v-if="
                                             selected &&
                                             selected.length>
                                            0 &&
                                            selected.length > 1
                                            "
                                        >
                                            <div class="row">
                                                <div class="col-sm-12 text-center">
                                                    <b>Các ảnh được chọn</b>
                                                </div>
                                            </div>
                                            <div
                                                v-for="(item, index) in selected"
                                                id="listFile"
                                                :key="item.id"
                                                class="row"
                                            >
                                                <div class="col-sm-2">
                                                    <label>{{ index + 1 }}.</label>
                                                </div>
                                                <div class="col-sm-10 file-name">
                                                    <label>{{ item.name }}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <template slot="footer">
                <div class="d-flex flex-fill justify-content-between">
                    <button
                        type="button"
                        class="btn btn-danger waves-effect"
                        data-dismiss="modal"
                        @click="closeManager(false)"
                    >Đóng</button>
                    <button
                        v-show="selected && selected.length > 0"
                        type="button"
                        class="btn btn-primary waves-effect waves-light"
                        @click="insert"
                    >
                        <span class="icon-span-filestyle fas fa-arrow-circle-down" />Chèn file đã
                        chọn
                    </button>
                </div>
            </template>
        </modalv2>
    </div>
</template>
<style>
#pager-file-manager .kt-datatable.kt-datatable--default > .kt-datatable__pager {
    padding: 10px;
}
.modal-body.no-pd {
    padding: 0;
}
</style>
<script>
import uploadBtn from './upload-btn';
import fileItem from './file-item';
import treeItem from './tree-item';
import fileDetail from './file-detail';

import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'FileManager',
    components: { uploadBtn, fileItem, treeItem, fileDetail },
    computed: {
        ...mapGetters(['files', 'fileCount']),
    },
    props: {
        exts: {
            type: String,
            default: 'png;jpg;jpeg;gif',
        },
        maxSelect: {
            type: Number,
            default: 1,
        },
    },
    data() {
        return {
            searchObj: {
                keyWord: '',
                exts: '',
                pageIndex: 1,
                pageSize: 15,
                isMyFile: 0,
                folderId: 1,
                totalRows: null,
            },
            selected: [],
            userName: '',
            lstFileFolders: {},
            isLoadingFile: false,
            activeTree: null,
            percentCompleted: 0,
            countSelectedFileItem: 0,
        };
    },
    methods: {
        ...mapActions(['getListFiles']),
        list() {
            this.getListFiles(this.searchObj);
            this._.forEach(this.selected, (val) => {
                let index = this._.findIndex(this.files, (o) => {
                    return o.id == val.id;
                });
                if (index == -1) {
                    this.countSelectedFileItem--;
                    this.$delete(
                        this.selected,
                        this._.findIndex(this.selected, (s) => {
                            return s.id == val.id;
                        })
                    );
                }
            });
            this.selected.length = 0;
        },
        closeManager(isReload) {
            this.$emit('close', isReload);
        },
        // select(file) {
        //     let index = this._.findIndex(this.selected, o => {
        //         return o.id == file.id;
        //     });
        //     if (this.maxSelect == 1) {
        //         if (index == -1) {
        //             this.getUserName(file.createdBy);
        //             this.selected.length = 0;
        //             this.selected.push(file);
        //         } else {
        //             this.selected = this.selected.splice(index, 1);
        //         }
        //     } else {
        //         if (index == -1) {
        //             this.getUserName(file.createdBy);
        //             if (this.selected.length < this.maxSelect) {
        //                 this.selected.push(file);
        //                 this.countSelectedFileItem++;
        //             } else {
        //                 return;
        //             }
        //         }
        //     }
        // },
        // deselect(file) {
        //     let index = this._.findIndex(this.selected, o => {
        //         return o.id == file.id;
        //     });
        //     if (index != -1) this.$delete(this.selected, index);
        //     this.countSelectedFileItem--;
        // },

        select(file) {
            let index = this._.findIndex(this.selected, (o) => {
                return o.id == file.id;
            });
            if (index == -1) {
                if (this.maxSelect == 1) this.selected = [];
                this.getUserName(file.createdBy);
                this.selected.push(file);
            } else {
                this.selected = this.selected.splice(index, 1);
            }
        },
        deselect(file) {
            if (this.maxSelect == 1) this.selected = [];
            else {
                let index = this._.findIndex(this.selected, (o) => {
                    return o.id == file.id;
                });
                if (index != -1) {
                    this.$delete(this.selected, index);
                    this.countSelectedFileItem--;
                }
            }
        },
        insert() {
            if (this.selected && this.selected.length > 0) {
                this.$emit('insert', this.selected);
                this.closeManager(true);
            }
        },
        pageChange(page) {
            this.searchObj.pageIndex = page;
            this.list();
        },
        reloadList() {
            this.searchObj.pageIndex = 1;
            this.list();
        },
        searchFile() {
            let loading = this.$loading.show();
            this.list();
            loading.hide();
        },
        getUserName(id) {
            this.$http({
                data: {
                    m: 'user',
                    fn: 'get_info_by_id',
                    id: id,
                },
            })
                .then((response) => {
                    if (response.success) {
                        if (response.data) this.userName = response.data.fullName;
                    }
                })
                .catch((err) => {
                    return this.$message(err.message, 'error');
                });
        },
        getListFileFolder() {
            let loading = this.$loading.show();
            this.$http({
                data: {
                    m: 'filefolder',
                    fn: 'get-list-file-folder',
                },
            })
                .then((response) => {
                    loading.hide();
                    if (response.success) {
                        this.lstFileFolders = this.createTreeData(response.data);
                        if (this.lstFileFolders.length == 0) {
                            this.createRootFolder();
                        }
                    }
                })
                .catch((err) => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        },
        UpdateData() {
            this.getListFileFolder();
        },
        UpdateFileData(data) {
            this.searchObj.folderId = data;
            this.getListFiles();
        },
        createTreeData(data) {
            var map = {},
                node,
                roots = [],
                i;
            for (i = 0; i < data.length; i += 1) {
                map[data[i].id] = i; // initialize the map
                data[i].children = []; // initialize the children
            }
            for (i = 0; i < data.length; i += 1) {
                node = data[i];
                if (node.parentId != 0) {
                    // if you have dangling branches check that map[node.parentId] exists
                    data[map[node.parentId]].children.push(node);
                } else {
                    roots.push(node);
                }
            }
            return roots;
        },
        UpdateFileDataByFolderId(data) {
            this.searchObj.folderId = data;
            this.list();
        },
        startLoadingFile() {
            this.isLoadingFile = true;
        },
        endLoadingFile() {
            this.isLoadingFile = false;
        },
        getPercentCompleted(val) {
            console.log(val);
            this.percentCompleted = val;
        },
        createRootFolder() {
            let loading = this.$loading.show();
            var rootFolder = {
                name: 'Thư mục gốc',
                parentId: 0,
            };
            this.$http({
                data: {
                    m: 'filefolder',
                    fn: 'create-or-edit-folder',
                    ...rootFolder,
                },
            })
                .then((res) => {
                    if (res.success) {
                        loading.hide();
                        this.getListFileFolder();
                    }
                })
                .catch((err) => {
                    loading.hide();
                    return this.$message(err.message, 'error');
                });
        },
    },
    watch: {
        'searchObj.isMyFile'() {
            this.list();
        },
    },
    created() {
        this.searchObj.exts = this.exts;
        this.list();
        this.selected.length = 0;
        this.getListFileFolder();
    },
};
</script>
<style>
#listFile {
    margin-top: 10px;
}

#percentCompleted {
    margin-top: 5px;
    height: auto;
}

#btn-upload-file {
}

.file-box {
    float: left;
    width: 200px;
}

.file-manager h5 {
    text-transform: uppercase;
}

.file-manager {
    list-style: none outside none;
    margin: 0;
    padding: 0;
}

.folder-list li a {
    color: #666666;
    display: block;
    padding: 5px 0;
}

.folder-list li {
    border-bottom: 1px solid #e7eaec;
    display: block;
}

.folder-list li i {
    margin-right: 8px;
    color: #3d4d5d;
}

.category-list li a {
    color: #666666;
    display: block;
    padding: 5px 0;
}

.category-list li {
    display: block;
}

.category-list li i {
    margin-right: 8px;
    color: #3d4d5d;
}

.category-list li a .text-navy {
    color: #1ab394;
}

.category-list li a .text-primary {
    color: #1c84c6;
}

.category-list li a .text-info {
    color: #23c6c8;
}

.category-list li a .text-danger {
    color: #ef5352;
}

.category-list li a .text-warning {
    color: #f8ac59;
}

.file-manager h5.tag-title {
    margin-top: 20px;
}

.tag-list li {
    float: left;
}

.tag-list li a {
    font-size: 12px;
    background-color: #f3f3f4;
    padding: 5px 12px;
    color: inherit;
    border-radius: 2px;
    border: 1px solid #e7eaec;
    margin-right: 5px;
    margin-top: 5px;
    display: block;
}

.file {
    border: 1px solid #e7eaec;
    padding: 0;
    position: relative;
    margin-bottom: 20px;
    margin-right: 20px;
    background: #d8d8d8;
    background-size: cover;
}

.file-manager .hr-line-dashed {
    margin: 15px 0;
}

.file .icon,
.file .image {
    height: 100px;
    overflow: hidden;
}

.file .image {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

.file .icon {
    padding: 15px 10px;
    text-align: center;
}

.file-control {
    color: inherit;
    font-size: 12px;
    margin-right: 10px;
}

.file-control.active {
    text-decoration: underline;
}

.file .icon i {
    font-size: 70px;
    color: #dadada;
}

.file .file-name {
    padding: 10px;
    background-color: #f8f8f8;
    border-top: 1px solid #e7eaec;
}

.file-name small {
    color: #676a6c;
}

ul.tag-list li {
    list-style: none;
}

.corner {
    position: absolute;
    display: inline-block;
    width: 0;
    height: 0;
    line-height: 0;
    border: 0.6em solid transparent;
    border-right: 0.6em solid #f1f1f1;
    border-bottom: 0.6em solid #f1f1f1;
    right: 0em;
    bottom: 0em;
}

a.compose-mail {
    padding: 8px 10px;
}

.mail-search {
    max-width: 300px;
}

.ibox {
    clear: both;
    margin-bottom: 25px;
    margin-top: 0;
    padding: 0;
}

.ibox.collapsed .ibox-content {
    display: none;
}

.ibox.collapsed .fa.fa-chevron-up:before {
    content: '\f078';
}

.ibox.collapsed .fa.fa-chevron-down:before {
    content: '\f077';
}

.ibox:after,
.ibox:before {
    display: table;
}

.ibox-title {
    -moz-border-bottom-colors: none;
    -moz-border-left-colors: none;
    -moz-border-right-colors: none;
    -moz-border-top-colors: none;
    background-color: #ffffff;
    border-color: #e7eaec;
    border-image: none;
    border-style: solid solid none;
    border-width: 3px 0 0;
    color: inherit;
    margin-bottom: 0;
    padding: 14px 15px 7px;
    min-height: 48px;
}

.ibox-content {
    background-color: #ffffff;
    color: inherit;
}

.ibox-footer {
    color: inherit;
    border-top: 1px solid #e7eaec;
    font-size: 90%;
    background: #ffffff;
    padding: 10px 15px;
}

#file-manager-toolbar {
    background: #f7f7f7;
    padding: 7px 0;
    border-bottom: solid 1px #f1f1f1;
    margin-bottom: 10px;
}

#file-manager-toolbar ul {
    margin-bottom: 0;
}

@media (max-width: 1450px) {
    .file-box {
        width: calc(100% / 6);
    }
}

@media (max-width: 1300px) {
    .file-box {
        width: calc(100% / 5);
    }
}

@media (max-width: 1000px) {
    .file-box {
        width: calc(100% / 4);
    }
}

@media (max-width: 800px) {
    .file-box {
        width: calc(100% / 3);
    }

    .file {
        margin-bottom: 15px;
        margin-right: 15px;
    }
}

@media (max-width: 600px) {
    .file-box {
        width: calc(100% / 2);
    }

    .file {
        margin-top: 10px;
        margin-right: 10px;
    }
}

progress:not([value]) {
    /* Styling here */
}
</style>
