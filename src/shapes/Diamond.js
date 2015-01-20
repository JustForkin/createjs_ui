(function() {
    "use strict";

    /**
     * just a resizable rectangle
     */
    var Diamond = function (color, width, height) {
        createjs_ui.Shape.call(this, color, width, height);
        this.redraw();
    };

    var p = createjs.extend(Diamond, createjs_ui.Shape);

    p.drawShape = function() {
        this.graphics.moveTo(this._width/2, 0)
            .lineTo(this._width, this._height/2)
            .lineTo(this._width/2, this._height)
            .lineTo(0, this._height/2)
            .lineTo(this._width/2, 0);
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

    createjs_ui.Diamond = createjs.promote(Diamond, "Shape");
})();
