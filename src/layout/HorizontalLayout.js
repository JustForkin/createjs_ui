(function() {
    "use strict";

    /**
     * HorizontalLayout - just set alignment to
     * LayoutAlignment.HORIZONTAL_ALIGNMENT
     */
    var HorizontalLayout = function() {
        createjs_ui.LayoutAlignment.call(this);
        this.alignment = createjs_ui.LayoutAlignment.HORIZONTAL_ALIGNMENT;
    };

    var p = createjs.extend(HorizontalLayout, createjs_ui.LayoutAlignment);

    createjs_ui.HorizontalLayout = createjs.promote(HorizontalLayout, "LayoutAlignment");
}());