/*
 Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
CKEDITOR.dialog.add("filemanager", function (editor) {
    return {
        title: 'Quản lý file',
        minWidth: 800,
        minHeight: 450,
        className: 'abc1111111111',
        resizable: CKEDITOR.DIALOG_RESIZE_NONE,
        contents: [
            {
                id: 'tab-basic',
                label: 'Basic Settings',
                elements: [
                    {
                        id: 'filemanager-iframe',
                        type: 'html',
                        html: '<div><input type="file"></div>'
                    }
                ]
            }
        ],
        buttons: [CKEDITOR.dialog.cancelButton],
        onOk: function () {
            var dialog = this;

            var abbr = editor.document.createElement('abbr');
            abbr.setAttribute('title', dialog.getValueOf('tab-basic', 'title'));
            abbr.setText(dialog.getValueOf('tab-basic', 'abbr'));

            editor.insertElement(abbr);
        },
        onShow: function () {
            var dialogC = CKEDITOR.dialog.getCurrent();
        }
    };
});