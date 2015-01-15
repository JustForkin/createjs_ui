(function() {
    "use strict";

    /**
     * just a resizable rectangle
     */
    var Rect = function (color, width, height) {
        createjs_ui.Shape.call(this, color, width, height);
        // set defaults
        this.redraw();
    };

    var p = createjs.extend(Rect, createjs_ui.Shape);

    p._setRadius = function(radius) {
        this._radiusTL = this._radiusBR = this._radiusTR = this.radiusBL = radius;
        this.invalid = true;
    };

    p._setRadiusTL = function(radius) {
        this._radiusTL = radius;
        this.invalid = true;
    };

    p._getRadiusTL = function() {
        return this._radiusTL;
    };

    p._setRadiusTR = function(radius) {
        this._radiusTR = radius;
        this.invalid = true;
    };

    p._getRadiusTR = function() {
        return this._radiusTR;
    };

    p._setRadiusBR = function(radius) {
        this._radiusBR = radius;
        this.invalid = true;
    };

    p._getRadiusBR = function() {
        return this._radiusBR;
    };

    p._setRadiusBL = function(radius) {
        this._radiusBL = radius;
        this.invalid = true;
    };

    p._getRadiusBL = function() {
        return this._radiusBL;
    };
    
    p.drawShape = function() {
        if (this.radiusTL || this.radiusTR ||
            this.radiusBR || this.radiusBL ) {
            this.graphics.drawRoundRectComplex(0, 0,
                this._width, this._height,
                this.radiusTL, this.radiusTR,
                this.radiusBR, this.radiusBL);
        } else {
            this.graphics.drawRect(0, 0, this._width, this._height);
        }
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
        },
        radius: {
            set: p._setRadius,
            get: p._getRadiusTL
        },
        radiusTL: {
            set: p._setRadiusTL,
            get: p._getRadiusTL
        },
        radiusTR: {
            set: p._setRadiusTR,
            get: p._getRadiusTR
        },
        radiusBL: {
            set: p._setRadiusBL,
            get: p._getRadiusBL
        },
        radiusBR: {
            set: p._setRadiusBR,
            get: p._getRadiusBR
        }
    });

    createjs_ui.Rect = createjs.promote(Rect, "Shape");
})();