this.createjs_ui = this.createjs_ui || {};

(function() {
    "use strict";

    /**
     * basic layout stub - see LayoutAlignment
     */
    var Layout = function() {
        this.gap = 0;
        this.padding = 0
    };

    /**
     * If the total item height is smaller than the height of the bounds,
     * the items will be aligned to the top.
     */
    Layout.VERTICAL_ALIGN_TOP = "top";

    /**
     * If the total item height is smaller than the height of the bounds,
     * the items will be aligned to the middle.
     */
    Layout.VERTICAL_ALIGN_MIDDLE = "middle";

    Layout.ALIGN_JUSTIFY = "justify";

    /**
     * If the total item height is smaller than the height of the bounds,
     * the items will be aligned to the bottom.
     */
    Layout.VERTICAL_ALIGN_BOTTOM = "bottom";

    /**
     * If the total item width is smaller than the width of the bounds, the
     * items will be aligned to the left.
     */
    Layout.HORIZONTAL_ALIGN_LEFT = "left";

    /**
     * If the total item width is smaller than the width of the bounds, the
     * items will be aligned to the center.
     */
    Layout.HORIZONTAL_ALIGN_CENTER = "center";

    /**
     * If the total item width is smaller than the width of the bounds, the
     * items will be aligned to the right.
     */
    Layout.HORIZONTAL_ALIGN_RIGHT = "right";

    var p = Layout.prototype;

    /**
     * The space, in pixels, between items.
     */
    p._getGap = function() {
        return this._gap;
    };


    p._setGap = function(value) {
        if(this._gap == value) {
            return;
        }
        this._gap = value;
        this._needUpdate = true;
    };

    /**
     * The space, in pixels, between items.
     */
    p._getNeedUpdate = function() {
        return this._needUpdate;
    };

    /**
     * shotrtcut to set all paddings
     */
    p._setPadding = function(value) {
        this._paddingLeft = value;
        this._paddingRight = value;
        this._paddingBottom = value;
        this._paddingTop = value;
        this._needUpdate = true;
    };

    /**
     * The minimum space, in pixels, above the items.
     *
     * @default 0
     */
    p._getPaddingTop = function() {
        return this._paddingTop;
    };


    p._setPaddingTop = function(value) {
        if(this._paddingTop == value) {
            return;
        }
        this._paddingTop = value;
        this._needUpdate = true;
    };

    /**
     * The minimum space, in pixels, below the items.
     *
     * @default 0
     */
    p._getPaddingBottom = function() {
        return this._paddingBottom;
    };


    p._setPaddingBottom = function(value) {
        if(this._paddingBottom == value) {
            return;
        }
        this._paddingBottom = value;
        this._needUpdate = true;
    };

    /**
     * The space, in pixels, that appears to the left, before the first
     * item.
     *
     * @default 0
     */
    p._getPaddingLeft = function() {
        return this._paddingLeft;
    };


    p._setPaddingLeft = function(value) {
        if(this._paddingLeft == value) {
            return;
        }
        this._paddingLeft = value;
        this._needUpdate = true;
    };

    /**
     * The space, in pixels, that appears to the right, after the last item.
     *
     * @default 0
     */
    p._getPaddingRight = function() {
        return this._paddingRight;
    };

    p._setPaddingRight = function(value) {
        if(this._paddingRight == value)
        {
            return;
        }
        this._paddingRight = value;
        this._needUpdate = true;
    };

    /**
     * Positions (and possibly resizes) the supplied items.
     * @param items items that will be layouted
     * @param viewPortBounds
     */
    p.layout = function (items, viewPortBounds) {

    };

    Object.defineProperties(p, {
        padding: {
            set: p._setPadding,
            // just return paddingTop, because we do not save the
            // overall padding value (just like feathers)
            get: p._getPaddingTop
        },
        paddingLeft: {
            set: p._setPaddingLeft,
            get: p._getPaddingLeft
        },
        paddingRight: {
            set: p._setPaddingRight,
            get: p._getPaddingRight
        },
        paddingTop: {
            set: p._setPaddingTop,
            get: p._getPaddingTop
        },
        paddingBottom: {
            set: p._setPaddingBottom,
            get: p._getPaddingBottom
        },
        gap: {
            set: p._setGap,
            get: p._getGap
        },
        needUpdate: {
            get: p._getNeedUpdate
        }
    });
    createjs_ui.Layout = Layout;
}());