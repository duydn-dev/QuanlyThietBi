<template>
    <div>
        <textarea v-if="id" :id="id" v-model="bodyContent" disable="disabled" />
        <file-manager
            v-if="showFileManager"
            :exts="exts"
            @close="showFileManager = false"
            @insert="selectFile"
        />
    </div>
</template>
<script>
window.loadCK = {};
window.loadingCKScript = false;
export default {
    name: 'Editor',
    props: {
        content: {
            type: String,
            default: ''
        },
        id: {
            type: String,
            required: true
        },
        disabled: {
            type: Boolean,
            required: false
        },
        height: {
            type: Number,
            default: 200
        },
        toolbar: {
            type: String,
            default: 'full'
        }
    },
    data() {
        return {
            bodyContent: '',
            showFileManager: false,
            exts: 'png;jpg;jpeg;gif',
            isFile: false
        };
    },
    created() {
        if (this.id) {
            this.bodyContent = this.content;
            this.initScript().then(() => {
                window.loadCK[this.id] = setInterval(() => {
                    if (window.CKEDITOR && window.CKEDITOR.replace) {
                        this.initEditor(this.id);
                        this.$emit('loaded', this.id);
                        clearInterval(window.loadCK[this.id]);
                    }
                }, 100);
            });
            if (!window.openFileManager) window.openFileManager = {};
            window.openFileManager[this.id] = () => {
                this.exts = 'pdf;zip;rar;doc;docx;xls;xlsx';
                this.showFileManager = true;
                this.isFile = true;
            };
            if (!window.openPhotoManager) window.openPhotoManager = {};
            window.openPhotoManager[this.id] = () => {
                this.exts = 'png;jpg;jpeg;gif';
                this.showFileManager = true;
                this.isFile = false;
            };
        }
    },
    methods: {
        initScript() {
            if (window.loadingCKScript) {
                return new Promise(resolve => {
                    resolve();
                });
            }
            window.loadingCKScript = true;
            return new Promise(resolve => {
                (function(d, s, id) {
                    if (d.getElementById(id)) {
                        return resolve();
                    }
                    const fjs = d.getElementsByTagName(s)[0];
                    const js = d.createElement(s);
                    js.id = id;
                    js.src = '/ckeditor/ckeditor.js';
                    fjs.parentNode.insertBefore(js, fjs);
                    return resolve();
                })(document, 'script', 'ckeditor');
            });
        },
        initEditor(id) {
            if (CKEDITOR.instances[id]) CKEDITOR.instances[id].destroy();
            var config = {
                height: this.height + 'px',
                width: '100%',
                language: 'vi',
                entities: false,
                fullPage: false,
                toolbarCanCollapse: false,
                resize_enabled: false,
                colorButton_enableMore: false,
                extraPlugins: 'mediamanager,fphotomanager,ffilemanager',
                allowedContent: true
            };
            if (this.toolbar == 'full') {
                config.toolbar = [
                    { name: 'tools2', items: ['fphotomanager', 'ffilemanager'] },
                    {
                        name: 'document',
                        items: ['Source', '-', 'Preview', 'Print', '-', 'Templates']
                    },
                    {
                        name: 'clipboard',
                        items: [
                            'Cut',
                            'Copy',
                            'Paste',
                            'PasteText',
                            'PasteFromWord',
                            '-',
                            'Undo',
                            'Redo'
                        ]
                    },
                    {
                        name: 'editing',
                        items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt']
                    },
                    //{ name: 'forms', items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'] },
                    //'/',
                    {
                        name: 'basicstyles',
                        items: [
                            'Bold',
                            'Italic',
                            'Underline',
                            'Strike',
                            'Subscript',
                            'Superscript',
                            '-',
                            'CopyFormatting',
                            'RemoveFormat'
                        ]
                    },
                    {
                        name: 'paragraph',
                        items: [
                            'NumberedList',
                            'BulletedList',
                            '-',
                            'Outdent',
                            'Indent',
                            '-',
                            'Blockquote',
                            'CreateDiv',
                            '-',
                            'JustifyLeft',
                            'JustifyCenter',
                            'JustifyRight',
                            'JustifyBlock',
                            '-',
                            'BidiLtr',
                            'BidiRtl',
                            'Language'
                        ]
                    },
                    { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
                    {
                        name: 'insert',
                        items: [
                            /*'Image', 'Flash',*/ 'Table',
                            'HorizontalRule',
                            'Smiley',
                            'SpecialChar',
                            'PageBreak',
                            'Iframe'
                        ]
                    },
                    //'/',
                    { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
                    { name: 'colors', items: ['TextColor', 'BGColor'] },
                    { name: 'tools', items: ['Maximize', 'ShowBlocks'] }
                ];
            } else if (this.toolbar == 'basic') {
                config.toolbar = [
                    { name: 'document', items: ['Source', '-'] },
                    { name: 'tools2', items: ['fphotomanager'] },
                    {
                        name: 'basicstyles',
                        items: [
                            'Bold',
                            'Italic',
                            'Underline',
                            'Strike',
                            'Subscript',
                            'Superscript',
                            '-',
                            'CopyFormatting',
                            'RemoveFormat'
                        ]
                    },
                    { name: 'colors', items: ['TextColor', 'BGColor'] }
                ];
                config.removePlugins = 'elementspath';
            }
            window.CKEDITOR.replace(id, config);
            CKEDITOR.instances[id].setData(this.bodyContent);
        },
        setData(data) {
            CKEDITOR.instances[this.id].setData(data);
        },
        getData() {
            return CKEDITOR.instances[this.id].getData();
        },
        selectFile(val) {
            this._.each(val, item => {
                let html = '';
                if (this.isFile) {
                    html = `<a class="pan-download-button" href="${
                        this.appSettings.configs.storageDomain
                    }${item.url}" target="_blank">Download</a>`;
                } else {
                    html = `<img src="${this.appSettings.configs.storageDomain}${item.url}"/>`;
                }
                CKEDITOR.instances[this.id].insertHtml(html);
            });
        }
    }
};
</script>
