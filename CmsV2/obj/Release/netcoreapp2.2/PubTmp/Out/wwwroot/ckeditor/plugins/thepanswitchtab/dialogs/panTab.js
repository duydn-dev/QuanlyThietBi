CKEDITOR.dialog.add('panTabDialog', function (editor) {
    return {
        title: 'Thông tin nút',
        minWidth: 400,
        minHeight: 200,

        contents: [
            {
                id: 'tab-basic',
                label: 'Thông tin cơ bản',
                elements: [
                    {
                        type: 'text',
                        id: 'content',
                        label: 'Nội dung nút',
                        validate: CKEDITOR.dialog.validate.notEmpty("Nội dung không được để trống!"),

                        setup: function (element) {
                            this.setValue(element.getText());
                        },

                        commit: function (element) {
                            element.setText(this.getValue());
                        }
                    },
                    {
                        type: 'text',
                        id: 'index',
                        label: 'Slide muốn chuyển đến (nhập số index của slide tương ứng)',
                        validate: CKEDITOR.dialog.validate.notEmpty("Slide index không được để trống!"),

                        setup: function (element) {
                            this.setValue(element.getAttribute("index"));
                        },

                        commit: function (element) {
                            element.setAttribute("index", this.getValue());
                            element.setAttribute("onclick", 'window.switchToSlide('+this.getValue()+')');
                            element.setAttribute("class", 'pan-switch-tab-btn');
                        }
                    }
                ]
            },

            {
                id: 'tab-adv',
                label: 'Thông tin nâng cao',
                elements: [
                    {
                        type: 'text',
                        id: 'id',
                        label: 'Id',

                        setup: function (element) {
                            this.setValue(element.getAttribute("id"));
                        },

                        commit: function (element) {
                            var id = this.getValue();
                            if (id)
                                element.setAttribute('id', id);
                            else if (!this.insertMode)
                                element.removeAttribute('id');
                        }
                    }
                ]
            }
        ],

        onShow: function () {
            var selection = editor.getSelection();
            var element = selection.getStartElement();

            if (element)
                element = element.getAscendant('abbr', true);

            if (!element || element.getName() != 'abbr') {
                element = editor.document.createElement('abbr');
                this.insertMode = true;
            }
            else
                this.insertMode = false;

            this.element = element;
            if (!this.insertMode)
                this.setupContent(this.element);
        },

        onOk: function () {
            var dialog = this;
            var abbr = this.element;
            this.commitContent(abbr);

            if (this.insertMode)
                editor.insertElement(abbr);
        }
    };
});