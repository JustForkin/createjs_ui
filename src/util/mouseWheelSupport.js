(function() {
    "use strict";

    /**
     * enable or disable mouse wheel support for canvas (e.g. for scroller)
     * using HTML 5 scrolling. will do nothing if it is already activated/
     * deactivated
     * based on http://www.sitepoint.com/html5-javascript-mouse-wheel/
     * @param stage the EaselJS-stage
     * @param enable true to enable mouse support, false to disable,
     */
    function mouseWheelSupport(stage, enable) {
        var canvas = stage.canvas;
        if (enable || enable === undefined) {
            if (createjs_ui._mouseWheelHandler !== undefined) {
                return;
            }
            createjs_ui._mouseWheelHandler = function(event) {
                event = window.event || event;
                var delta = Math.max(-1, Math.min(1,
                    (event.wheelDelta || -event.detail)));
                
                var target = stage.getObjectsUnderPoint(stage.mouseX, stage.mouseY, 1);
                if (!target) {
                    return;
                }
                for(var i = 0; i < target.length; i++) {
                    var t = target[i];
                    var evt = new createjs.MouseEvent(
                        "mousewheel", true, false,
                        t.x, t.y, event, -1, true, t.rawX, t.rawY);
                    evt.delta = delta;
                    t.dispatchEvent(evt);
                }
            };
            if (canvas.addEventListener) {
                canvas.addEventListener("mousewheel", 
                    createjs_ui._mouseWheelHandler, false);
                canvas.addEventListener("DOMMouseScroll", 
                    createjs_ui._mouseWheelHandler, false);
            } else {
                canvas.attachEvent("onmousewheel",
                    createjs_ui._mouseWheelHandler);
            }
        } else {
            if (createjs_ui._mouseWheelHandler === undefined) {
                return;
            }
            if (canvas.removeEventListener) {
                canvas.removeEventListener("mousewheel",
                    createjs_ui._mouseWheelHandler);
                canvas.removeEventListener("DOMMouseScroll", 
                    createjs_ui._mouseWheelHandler);
            } else {
                canvas.detachEvent("onmousewheel",
                    createjs_ui._mouseWheelHandler);
            }
            createjs_ui._mouseWheelHandler = undefined;
        }
    }

    createjs_ui.mouseWheelSupport = mouseWheelSupport;
})();