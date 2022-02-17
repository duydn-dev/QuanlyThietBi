/*
 Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
(function () {
    alert(0);
    var a = {
        exec: function (editor) {
            var maxW = '100%';
            alert(0);
        }
    }
    CKEDITOR.plugins.add('mediamanager', {
        init: function (editor) {
            editor.addCommand('mediamanager', a);
            editor.ui.addButton('mediamanager', {
                label: 'Quản lý ảnh',
                icon: this.path + 'mediamanager.png',
                command: 'mediamanager'
            });
        }
    })
})();