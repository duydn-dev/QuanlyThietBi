<style scoped>
    .folder {
        padding-left: inherit;
        list-style: none;
        position: relative;
    }

    .folderselected {
        background-color: #5867dd;
        color: #fff;
        border-radius: 3px;
    }

    .tree-item {
        cursor: pointer;
        padding: 5px;
    }

    ul {
        padding-left: 15px;
    }

        ul li {
            padding: 5px;
            font-size: 15px;
        }

    .icon-span-folderstyle {
        position: absolute;
        top: 10px;
        right: 10px;
        padding-right: 2px;
    }
</style>
<template>
    <div id="treelist" class="left">
        <ul class="folder">
            <li>
                <div
                    class="tree-item"
                    :class="{ folderselected: activeFolderId == item.id }"
                    @click="selectFolder(item)"
                    @dblclick="dbclickFolder(item)"
                    @mouseover="showButtonAction"
                    @mouseleave="disShowButtonAction"
                >
                    <span v-if="isFolder && isOpen" @click="dbclickFolder(item)"
                        ><i class="fa fa-caret-down">&nbsp;</i></span
                    >
                    <span v-if="!isOpen" @click="dbclickFolder(item)"
                        ><i class="fa fa-caret-right">&nbsp;</i></span
                    >
                    <span><i class="fa fa-folder"/></span>
                    {{ item.name }}&nbsp;&nbsp;
                    <div class="icon-span-folderstyle">
                        <span
                            v-if="
                                (isAction && currentUser.id == item.createdBy) ||
                                    (isAction && item.id == 1)
                            "
                            title="add new folder"
                            @click.stop.prevent="addItem(item)"
                        >
                            <i class="fa fa-plus" />
                        </span>
                        <span
                            v-if="isAction && currentUser.id == item.createdBy"
                            title="edit"
                            @click.stop.prevent="editItem(item)"
                        >
                            <i class="fa fa-edit" />
                        </span>
                        <span
                            v-if="isAction && currentUser.id == item.createdBy"
                            title="delete"
                            @click.stop.prevent="delItem(item)"
                        >
                            <i class="fa fa-trash" />
                        </span>
                    </div>
                </div>
                <ul v-show="isOpen">
                    <tree-item
                        v-for="(child, index) in item.children"
                        :key="index"
                        class="item"
                        :item="child"
                        @change-data="$emit('change-data', $event)"
                        @select-folder="$emit('select-folder', $event)"
                        @add-item="$emit('add-item', $event)"
                    />
                </ul>
            </li>
        </ul>

        <modal
            v-if="popupAdd"
            :title="fileFolder.id == 0 ? 'Thêm Thư Mục' : 'Sửa Thư Mục'"
            @close="popupAdd = false"
            @addFolder="SaveFolder"
        >
            <div slot="body">
                <div class="form-group">
                    <label>Tên thư mục</label><br />
                    <input v-model="fileFolder.name" type="text" class="form-control" />
                </div>
            </div>
            <div slot="footer" class="row">
                <div class="col-sm-12">
                    <button class="btn btn-cyan" @click="save()">
                        <span>Lưu lại</span>
                    </button>

                    <button class="btn btn-danger" @click="closePopup()">
                        <span>Quay lại</span>
                    </button>
                </div>
            </div>
        </modal>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'TreeItem',
    props: { item: Object },
    data: function() {
        return {
            isOpen: true,
            popupAdd: false,
            fileFolder: {
                id: 0,
                name: '',
                parentId: null
            },
            isAction: false,
            lstDelFolder: [],
            selectFolderId: 1,
            isSelect: false
        };
    },
    computed: {
        isFolder() {
            if (this.item) {
                return this.item.children && this.item.children.length > 0;
            }
            return false;
        },
        ...mapGetters(['activeFolderId'])
    },
    methods: {
        ...mapActions(['changeActiveFolder']),
        selectFolder(item) {
            this.selectFolderId = item.id;
            this.$emit('select-folder', item.id);
            this.isSelect = true;
            this.changeActiveFolder(item.id);
        },
        dbclickFolder() {
            if (this.isFolder) {
                this.isOpen = !this.isOpen;
            }
        },
        addItem(item) {
            this.fileFolder.parentId = item.id;
            this.popupAdd = true;
        },
        editItem(item) {
            this.fileFolder.id = item.id;
            this.fileFolder.parentId = item.id;
            this.fileFolder.name = item.name;
            this.popupAdd = true;
        },
        delItem(item) {
            if (item.id == 1) return this.$message('Không xóa thư mục gốc', 'error');
            this.lstDelFolder = [];
            this.trunkNode(item);
            let ids = _.map(this.lstDelFolder, 'id');
            this.$confirm(this.$t('Label.AreYouSure')).then(() => {
                this.$http({
                    data: {
                        m: 'filefolder',
                        fn: 'delete-folder',
                        ids: JSON.stringify(ids)
                    }
                })
                    .then(res => {
                        if (res.success) {
                            this.$emit('change-data', this.fileFolder.name);
                            this.$message('Xóa thành công!');
                            this.closePopup();
                        }
                    })
                    .catch(err => {
                        return this.$message(err.message, 'error');
                    });
            });
            this.refresh();
        },
        trunkNode(data) {
            var node = {
                name: data.name,
                id: data.id,
                parentId: data.parentId
            };
            if (data.children.length > 0) {
                data.children.forEach(value => {
                    this.trunkNode(value);
                });
            }
            this.lstDelFolder.push(node);
        },
        closePopup() {
            this.popupAdd = false;
            this.refresh();
        },
        save() {
            if (this.fileFolder.name == '') {
                return this.$message('Bạn vui lòng nhập tên thư mục!', 'error');
            }
            this.$http({
                data: {
                    m: 'filefolder',
                    fn: 'create-or-edit-folder',
                    ...this.fileFolder
                }
            })
                .then(res => {
                    if (res.success) {
                        this.$emit('change-data', this.fileFolder.name);
                        this.$message('Lưu thành công!');
                        this.closePopup();
                    }
                })
                .catch(err => {
                    return this.$message(err.message, 'error');
                });
            this.refresh();
        },
        refresh() {
            this.fileFolder.id = 0;
            this.fileFolder.name = '';
            this.fileFolder.parentId = null;
        },
        SaveFolder(val) {
            this.fileFolder.name = val;
        },
        showButtonAction() {
            this.isAction = true;
        },
        disShowButtonAction() {
            this.isAction = false;
        }
    },
    created() {
        this.changeActiveFolder(null);
    }
};
</script>
