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
    };

    p.setSkins = function() {
        var b = createjs_ui.Button;
        this.setSkin(b.SKIN_NAME, b.UP,
            this.getDummyButton("#6073c8", "blue"));
        this.setSkin(b.SKIN_NAME, b.DOWN,
            this.getDummyButton("#ea8686", "red"));
        this.setSkin(b.SKIN_NAME, b.HOVER,
            this.getDummyButton("#60c865", "green"));

        var tb = createjs_ui.ToggleButton;
        this.setSkin(tb.SKIN_NAME, b.UP,
            this.getDummyButton("#6073c8", "blue"));
        this.setSkin(tb.SKIN_NAME, b.DOWN,
            this.getDummyButton("#ea8686", "red"));
        this.setSkin(tb.SKIN_NAME, b.HOVER,
            this.getDummyButton("#60c865", "green"));

        this.setSkin(tb.SKIN_NAME, tb.SELECTED_UP,
            this.getDummyButton("#005698", "blue"));
        this.setSkin(tb.SKIN_NAME, tb.SELECTED_DOWN,
            this.getDummyButton("#ffd100", "red"));
        this.setSkin(tb.SKIN_NAME, tb.SELECTED_HOVER,
            this.getDummyButton("#e1ff00", "green"));
    };

    createjs_ui.ShapeTheme = createjs.promote(ShapeTheme, "Theme");
})();