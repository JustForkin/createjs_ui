/**
 * LayoutBoundsResult
 */

// namespace:
this.createjs_ui = this.createjs_ui || {};

(function() {
    "use strict";

    var ViewPortBounds = function() {
    };

    var p = ViewPortBounds.prototype;

    /**
     * The explicit width of the view port, in pixels. If <code>NaN</code>,
     * there is no explicit width value.
     */
    p.explicitWidth = NaN;

    /**
     * The explicit height of the view port, in pixels. If <code>NaN</code>,
     * there is no explicit height value.
     */
    p.explicitHeight = NaN;

    p.x = 0;
    
    p.y = 0;


    createjs_ui.ViewPortBounds = ViewPortBounds;
})();