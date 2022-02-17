(function () {
    //Chức năng khi ấn vào nút    
CKEDITOR.plugins.add('thepancontent', {
    requires: 'widget',
    icons: 'thepancontent',
    init: function (editor) {
        editor.ui.addButton('thepancontent', {
            label: 'Chèn nội dung 2 cột',
            icon: this.path + '/icons/thepancontent.png',
            command: 'thepancontent'
        });
        editor.widgets.add('thepancontent', {

            button: 'Chèn nội dung 2 cột',

            template:
            '<div class="thepancontent">' +
            '<h2 class="thepancontent-title">Nội dung cột trái</h2>' +
            '<div class="thepancontent-content"><h3 class="heading-block-content">Tiêu đề</h3><div class="thepancontent-content-detail"><p>Nội dung</p></div></div>' +
            '</div>',

            editables: {
                title: {
                    selector: '.thepancontent-title',
                    allowedContent: false
                },
                headline: {
                    selector: '.heading-block-content',
                    allowedContent: 'br strong em'
                },
                content: {
                    selector: '.thepancontent-content-detail',
                    allowedContent: false//'*'//'p br ul ol li strong em img'
                }
            },

            allowedContent:
            'div(!thepancontent); div(!thepancontent-content); h2(!thepancontent-title);h3(!heading-block-content); div(!thepancontent-content-detail);',

            requiredContent: 'div(thepancontent)',

            upcast: function (element) {
                return element.name == 'div' && element.hasClass('thepancontent');
            }
        });
    }
    });

})();
