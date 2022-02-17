<template>
    <div
        class="file-box"
        :class="{
            selected: this.maxSelect != 1 ? selected : activeFileId == file.id
        }"
        @click="select"
    >
        <div class="file">
            <span v-if="isImage">
                <button class="btn btn-sm" @click="viewImage">
                    <i class="fa fa-eye" title="Xem Ảnh"></i>
                </button>
            </span>
            <span class="close">
                <button
                    v-if="file.isShare && file.createdBy == currentUser.id"
                    class="btn btn-sm btn-primary"
                    title="Hủy chia sẻ"
                    @click="shareFile(false)"
                >
                    <i class="fa fa-share-alt" />
                </button>
            </span>
            <span class="close">
                <button
                    v-if="!file.isShare && file.createdBy == currentUser.id"
                    class="btn btn-sm"
                    title="Chia sẻ"
                    @click="shareFile(true)"
                >
                    <i class="fa fa-share-alt" />
                </button>
            </span>
            <a href="javascript:void(0);" :title="file.name">
                <span class="corner" />
                <div v-if="isImage" class="image">
                    <photo
                        :alt="file.name"
                        class="img-responsive"
                        :src="file.url"
                        :width="180"
                        :height="140"
                    />
                </div>
                <div v-else-if="isAudio" class="image">
                    <photo
                        :alt="file.name"
                        class="img-responsive"
                        src="/data/mp3.png"
                        :width="110"
                        :height="130"
                    />
                </div>
                <div v-else class="icon">
                    <i class="fa fa-file" />
                </div>
                <div class="file-name">
                    <b>{{ file.name }}</b>
                    <small>{{ file.createdDate | moment('HH:mm DD/MM/YYYY') }}</small>
                </div>
            </a>
        </div>
    </div>
</template>
<style>
.file-name b {
    display: block;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.file-box.selected .corner {
    border-right: 0.6em solid #4caf50;
    border-bottom: 0.6em solid #4caf50;
}

.file-box.selected .file {
    border: 1px solid #4caf50;
}

.file {
    position: relative;
}

.file .close {
    position: absolute;
    top: 2px;
    right: 2px;
    z-index: 100;
}
</style>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'FileItem',
    props: ['file', 'countSelectedItem', 'maxSelect'],
    data() {
        return {
            selected: false,
        };
    },
    computed: {
        isImage() {
            return ['png', 'jpg', 'jpeg', 'gif'].indexOf(this.file.ext.toLowerCase()) != -1;
        },
        isAudio() {
            return ['mp3'].indexOf(this.file.ext.toLowerCase()) != -1;
        },
        ...mapGetters(['activeFileId']),
    },
    methods: {
        ...mapActions(['changeActiveFile']),
        select() {
            if (this.maxSelect == 1) {
                if (this.activeFileId == this.file.id) {
                    this.$emit('deselect');
                    this.changeActiveFile(null);
                } else {
                    this.$emit('select');
                    this.changeActiveFile(this.file.id);
                }
            } else {
                if (this.countSelectedItem < this.maxSelect || this.selected) {
                    this.selected ? this.$emit('deselect') : this.$emit('select');
                    this.selected = !this.selected;
                } else this.$message('Chỉ được chọn tối đa ' + this.maxSelect + ' file', 'info');
            }
        },
        deleteFile() {
            this.$confirm(this.$t('Label.AreYouSure')).then(() => {
                this.$http({
                    data: {
                        m: 'file',
                        fn: 'remove',
                        id: this.file.id,
                    },
                }).then((response) => {
                    if (response.success) {
                        this.$notify({
                            type: 'success',
                            group: 'foo',
                            title: 'Thành công',
                            text: 'Xóa thành công!',
                        });
                    }
                    this.$emit('deleted');
                });
            });
        },
        shareFile(isShareFile) {
            this.file.isShare = isShareFile;
            this.$http({
                data: {
                    m: 'file',
                    fn: 'update-share-file',
                    isShareFile: this.file.isShare,
                    id: this.file.id,
                },
            })
                .then((res) => {
                    if (res.success) {
                        this.$message('Lưu thành công!');
                    }
                })
                .catch((err) => {
                    return this.$message(err.message, 'error');
                });
        },
        viewImage() {
            window.open(this.appSettings.configs.storageDomain + this.file.url);
        },
    },
    created() {
        if (this.maxSelect == 1) this.changeActiveFile(null);
    },
};
</script>
