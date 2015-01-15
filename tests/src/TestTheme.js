(function() {
    "use strict";

    /**
     * test theme - to test/simulate asset loading for jasmine
     */
    var TestTheme = function(global, imagePath) {
        createjs_ui.Theme.call(this, global);
        imagePath = imagePath || "../themes/assets/aeon/";
        var manifest = [];
        this.queue = this.createImageQueue(imagePath, manifest);
    };

    var p = createjs.extend(TestTheme, createjs_ui.Theme);

    createjs_ui.TestTheme = createjs.promote(TestTheme, "Theme");
})();