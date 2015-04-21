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
        var id = stage.canvas.id;
        if (enable || enable === undefined) {
            if (id in createjs_ui._mouseWheelHandler) {
                return;
            }
            createjs_ui._mouseWheelHandler[id] = function(event) {
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
                    createjs_ui._mouseWheelHandler[id], false);
                canvas.addEventListener("DOMMouseScroll", 
                    createjs_ui._mouseWheelHandler[id], false);
            } else {
                canvas.attachEvent("onmousewheel",
                    createjs_ui._mouseWheelHandler[id]);
            }
        } else {
            if (!(id in createjs_ui._mouseWheelHandler)) {
                return;
            }
            if (canvas.removeEventListener) {
                canvas.removeEventListener("mousewheel",
                    createjs_ui._mouseWheelHandler[id]);
                canvas.removeEventListener("DOMMouseScroll", 
                    createjs_ui._mouseWheelHandler[id]);
            } else {
                canvas.detachEvent("onmousewheel",
                    createjs_ui._mouseWheelHandler[id]);
            }
            delete(createjs_ui._mouseWheelHandler[id]);
        }
    }

    createjs_ui._mouseWheelHandler = {};
    createjs_ui.mouseWheelSupport = mouseWheelSupport;
})();