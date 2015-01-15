(function() {
    "use strict";

    /**
     * VerticalLayout - just set alignment to
     * LayoutAlignment.Vertical_ALIGNMENT
     */
    var VerticalLayout = function() {
        createjs_ui.LayoutAlignment.call(this);
        this.alignment = createjs_ui.LayoutAlignment.VERTICAL_ALIGNMENT;
    };

    var p = createjs.extend(VerticalLayout, createjs_ui.LayoutAlignment);

    createjs_ui.VerticalLayout = createjs.promote(VerticalLayout, "LayoutAlignment");
}());