(function () {
    var a = {
        exec: function (editor) {
            if (window.openPhotoManager[editor.name])
                window.openPhotoManager[editor.name]();
            else {
                alert('window.openPhotoManager is not defined!');
            }
        }
    },
        b = 'fphotomanager';
    CKEDITOR.plugins.add(b, {
        init: function (editor) {
            editor.addCommand(b, a);
            editor.ui.addButton('fphotomanager', {
                label: 'Quản lý ảnh',
                icon: this.path + 'icons/mediamanager.png',
                command: b
            });
        }
    });
})();