(function() {
    "use strict";

    /**
     * shape theme
     * a theme without images, just shapes
     */
    var ShapeTheme = function(global) {
        createjs_ui.Theme.call(this, global);
        this.labelColor = "#fff";
        this.labelFont = "20px Arial";
        this.setSkins();
    };

    var p = createjs.extend(ShapeTheme, createjs_ui.Theme);

    /**
     * create shapes ()
     * @param color
     */
    p.getDummyButton = function(color, borderColor) {
        return function() {
            var rect = new createjs_ui.Rect(color);
            rect.radius = 5;
            rect.border = 1;
            rect.borderColor = borderColor;
            return rect;
        }
    }

    p.setSkins = function() {
        var b = createjs_ui.Button;
        this.setSkin(b.SKIN_NAME, b.UP,
            this.getDummyButton("#6073c8", "blue"));
        this.setSkin(b.SKIN_NAME, b.DOWN,
            this.getDummyButton("#ea8686", "red"));
        this.setSkin(b.SKIN_NAME, b.HOVER,
            this.getDummyButton("#60c865", "green"));
    }

    createjs_ui.ShapeTheme = createjs.promote(ShapeTheme, "Theme");
})();