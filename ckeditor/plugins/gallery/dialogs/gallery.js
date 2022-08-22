CKEDITOR.dialog.add('galleryDialog', function (editor) {
    return {
        title: 'Gallery Properties',
        minWidth: 600,
        minHeight: 300,

        contents: [
            {
                id: 'upload',
                // hidden: true,
                //filebrowser: 'uploadButton',
                label: editor.lang.image.upload,

                elements: [
                    {
                        type: 'text',
                        id: 'upload_input',
                        label: editor.lang.image.btnUpload,
                        style: 'height:40px',
                        size: 38,
                        setup: function( element ) {
                            this.setValue( element.getAttribute( "value" ));
                        },
                        commit: function( element ) {
                            element.setAttribute( "value", this.getValue() );
                        }
                    },
                    {
                        type: 'button',
                        id: 'add_inp',
                        label: 'Add Input',
                        // hidden: true,
                        onClick: function() {


                            var paragraph = new CKEDITOR.dom.element( 'p' );
                            paragraph.setStyle( 'margin-top', '5px' );
                            var inputField = new CKEDITOR.dom.element( 'input' );
                            inputField.addClass( 'cke_dialog_ui_input_text' );
                            inputField.setAttribute('id', Math.floor( ( Math.random() * 1000) + 1 ) );
                            inputField.setAttribute('maxLength', 20);
                            paragraph.append( inputField );

                            CKEDITOR.document.getById( 'dynamicContent' ).append( paragraph );
                        }
                    },
                ],

            },

        ],
        onShow: function () {
            var selection = editor.getSelection();
            var element = selection.getStartElement();
            if (element)
                element = element.getAscendant('figure', true);
            if (!element || element.getName() != 'figure') {
                element = editor.document.createElement('figure');
                this.insertMode = true;
            } else
                this.insertMode = false;

            this.element = element;
            if (!this.insertMode)
                this.setupContent(this.element);
        },
        onOk: function () {
            let dialog = this;
            let figure = editor.document.createElement('figure');
            figure.setAttribute('class', 'gallery gallery2')
            let div = editor.document.createElement('div');
            div.setAttribute('class', 'content')
            let figcaption = editor.document.createElement('figcaption');
            figure.append(div);
            figure.append(figcaption);
            let img = editor.document.createElement('img');
            img.setAttribute('src', dialog.getValueOf('upload', 'upload_input'));
            figure.setAttribute('value', dialog.getValueOf('upload', 'upload_input'))
            div.innerHTML = img;
            div.append(img);
            editor.insertElement(figure);


        }
    }
        ;
});
