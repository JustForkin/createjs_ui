/**
 * Tiled columns Layout
 * (roughly based on starling TiledColumnsLayout)
 */

// namespace:
this.createjs_ui = this.createjs_ui || {};

(function() {
    "use strict";
    /**
     * basic layout stub
     */
    var TiledRowsLayout = function() {
        createjs_ui.TiledLayout.call(this);
        this._paging = createjs_ui.TiledLayout.PAGING_HORIZONTAL;
        this._orientation = createjs_ui.TiledLayout.ORIENTATION_ROWS;
    };

    var p = createjs.extend(TiledRowsLayout, createjs_ui.TiledLayout);

    /**
     * Quickly sets both <code>horizontalGap</code> and <code>verticalGap</code>
     * to the same value. The <code>gap</code> getter always returns the
     * value of <code>horizontalGap</code>, but the value of
     * <code>verticalGap</code> may be different.
     *
     * @default 0
     *
     * @see #_horizontalGap
     * @see #_verticalGap
     */
    p._set_gap = function(value) {
        this._verticalGap = value;
        this._horizontalGap = value;
        this._needUpdate = true;
    };

    p._get_gap = function() {
        return this._horizontalGap;
    };

    Object.defineProperties(p, {
        gap: {
            set: p._set_gap,
            get: p._get_gap
        }
    });

    createjs_ui.TiledRowsLayout = createjs.promote(TiledRowsLayout, "TiledLayout");
}());