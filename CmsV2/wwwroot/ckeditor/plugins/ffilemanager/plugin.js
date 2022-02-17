(function () {
    var a = {
        exec: function (editor) {   
            if (window.openFileManager[editor.name])
                window.openFileManager[editor.name]();
            else {
                alert('window.openFileManager is not defined!');
            }
        }
    },
        b = 'ffilemanager';
    CKEDITOR.plugins.add(b, {
        init: function (editor) {
            editor.addCommand(b, a);
            editor.ui.addButton('ffilemanager', {
                label: 'Quản lý file',
                icon: this.path + 'icons/filemanager.png',
                command: b
            });
        }
    });
})();