(function() {
    "use strict";

    /**
     * just a resizable rectangle
     */
    var Ellipse = function (color, width, height) {
        createjs_ui.Shape.call(this, color, width, height);
        this.redraw();
    };

    var p = createjs.extend(Ellipse, createjs_ui.Shape);

    p.drawShape = function() {
        this.graphics.drawEllipse(0, 0, this._width, this._height);
    };
    
    Object.defineProperties(p, {
        width: {
            set: p._setWidth,
            get: p._getWidth
        },
        height: {
            set: p._setHeight,
            get: p._getHeight
        },
        color: {
            set: p._setColor,
            get: p._getColor
        }
    });

    createjs_ui.Rect = createjs.promote(Ellipse, "Shape");
})();
