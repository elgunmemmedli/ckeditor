CKEDITOR.plugins.add('gallery', {
    icons: 'gallery',
    init: function (editor) {
        editor.addCommand('gallery', new CKEDITOR.dialogCommand('galleryDialog'));

        editor.ui.addButton('Gallery', {
            label: 'Insert Abbreviation',
            command: 'gallery',
            toolbar: 'insert,100'
        });
        if (editor.contextMenu) {
            editor.addMenuGroup('galleryGroup');
            editor.addMenuItem('galleryItem', {
                label: 'Edit Abbreviation',
                icon: this.path + 'icons/gallery.png',
                command: 'gallery',
                group: 'galleryGroup'
            });
        }


        if (editor.contextMenu) {
            editor.contextMenu.addListener(function (element) {
                let ascendant = element.getAscendant('figure', true);
                let class_attr = ascendant.getAttribute("class");
                if (class_attr) {
                    return {galleryItem: CKEDITOR.TRISTATE_OFF};
                }
            });
        }
        CKEDITOR.dialog.add('galleryDialog', this.path + 'dialogs/gallery.js');
    }
});



