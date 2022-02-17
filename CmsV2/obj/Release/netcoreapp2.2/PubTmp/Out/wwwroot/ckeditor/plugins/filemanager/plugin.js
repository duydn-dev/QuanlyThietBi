/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.plugins.add('filemanager', {
    requires: 'dialog',
    icons: 'filemanager', // %REMOVE_LINE_CORE%
    hidpi: true, // %REMOVE_LINE_CORE%
    init: function (editor) {
        var command = editor.addCommand('filemanager', new CKEDITOR.dialogCommand('filemanager'));
        command.modes = { wysiwyg: 1, source: 1 };
        command.canUndo = false;
        command.readOnly = 1;

        editor.ui.addButton && editor.ui.addButton('filemanager', {
            label: 'File Manager',
            command: 'filemanager',
            toolbar: 'filemanager'
        });

        CKEDITOR.dialog.add('filemanager', this.path + 'dialogs/filemanager.js');
        function receiveData(e) {
            try {
                var data = JSON.parse(e.data + '');
                switch (data.type) {
                    case 'objectSelectedPhotoManagerInEditor':
                        editor.insertHtml('<img src="' + data.data.url + '"/>');
                        CKEDITOR.dialog.getCurrent().hide();
                        break;
                }
            } catch (e) {
                console.log(e);
            }
        }
        if (typeof window.addEventListener != 'undefined') {
            window.addEventListener('message', receiveData, false);
        }
        else if (typeof window.attachEvent != 'undefined') {
            window.attachEvent('onmessage', receiveData);
        }
    }
});
