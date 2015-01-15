(function() {
    "use strict";

    /**
     * just a resizable rectangle
     */
    var Shape = function (color, width, height) {
        this.width = width || 100;
        this.height = height || 100;
        this.color = color || "black";
        this._linear_gradient_fill_colors = null;
        this._linear_gradient_fill_ratios = null;
        createjs.Shape.call(this);
    };

    var p = createjs.extend(Shape, createjs.Shape);

    /**
     * the default shape only supports linearGradientFill, for radial gradients
     * override the applyColors function
     * @param colors
     * @param ratios
     */
    p.linearGradientFill = function(colors, ratios) {
        this._linear_gradient_fill_colors = colors;
        this._linear_gradient_fill_ratios = ratios;
    };
    
    p._setWidth = function(width) {
        this._width = width;
        this.invalid = true;
    };

    p._getWidth = function() {
        return this._width;
    };

    p._setHeight = function(height) {
        this._height = height;
        this.invalid = true;
    };

    p._getHeight = function() {
        return this._height;
    };

    p._setColor = function(color) {
        this._color = color;
        this.invalid = true;
    };

    p._getColor = function() {
        return this._color;
    };

    p._setBorder = function(border) {
        this._border = border;
        this.invalid = true;
    };

    p._getBorder = function() {
        return this._border;
    };

    p._setBorderColor = function(color) {
        this._borderColor = color;
        this.invalid = true;
    };

    p._getBorderColor = function() {
        return this._borderColor;
    };

    p.applyColor = function() {
        if (!this._linear_gradient_fill_colors || !this._linear_gradient_fill_ratios) {
            this.graphics.beginFill(this.color);
        } else {
            this.graphics.beginLinearGradientFill(
                this._linear_gradient_fill_colors, this._linear_gradient_fill_ratios,
                0, 0, this._width, this._height
            );
        }
    };

    /**
     * draw the inner of the shape (call one of the draw... functions from
     * easeljs/display/Graphics.js)
     */
    p.drawShape = function() {

    };

    p.drawBorder = function() {
        if (this.border) {
            this.graphics.beginStroke(this.borderColor);
            this.graphics.setStrokeStyle(this.border);
        }
    };

    p.redraw = function() {
        if (this.invalid) {
            this.graphics.clear();
            this.applyColor();
            this.drawBorder();
            this.drawShape();
            this.graphics.endFill();
            this.invalid = false;
        }
    };
    
    /**
     * @inheritDoc
     */
    /* istanbul ignore next */
    p.draw = function(ctx, ignoreCase) {
        this.redraw();
        return createjs.Shape.prototype.draw.call(this, ctx, ignoreCase);
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
        border: { // border in pixel
            set: p._setBorder,
            get: p._getBorder
        },
        borderColor: { // border in pixel
            set: p._setBorderColor,
            get: p._getBorderColor
        },
        color: {
            set: p._setColor,
            get: p._getColor
        }
    });

    createjs_ui.Shape = createjs.promote(Shape, "Shape");
})();