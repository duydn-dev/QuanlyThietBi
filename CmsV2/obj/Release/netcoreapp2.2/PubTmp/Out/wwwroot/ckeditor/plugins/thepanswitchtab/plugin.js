
(function () {
    window.switchToSlide = function (index) {
        console.log('switchToSlide', index);
    }
    CKEDITOR.plugins.add('thepanswitchtab', {
    icons: 'thepanswitchtab',
    init: function (editor) {

        editor.addCommand('panTab', new CKEDITOR.dialogCommand('panTabDialog'));

        editor.ui.addButton('thepanswitchtab', {
            label: 'Chèn nút chuyển tab',
            command: 'panTab',
            icon: this.path + '/icons/tab.png',
            toolbar: 'insert'
        });

        //if (editor.contextMenu) {
        //    editor.addMenuGroup('panTabGroup');
        //    editor.addMenuItem('panTabItem', {
        //        label: 'Edit Abbreviation',
        //        icon: this.path + 'icons/tab.png',
        //        command: 'thepanswitchtab',
        //        group: 'panTabGroup'
        //    });

        //    editor.contextMenu.addListener(function (element) {
        //        if (element.getAscendant('abbr', true)) {
        //            return { panTabItem: CKEDITOR.TRISTATE_OFF };
        //        }
        //    });
        //}

        CKEDITOR.dialog.add('panTabDialog', this.path + 'dialogs/panTab.js');
    }
    });

})();
