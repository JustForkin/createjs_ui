(function() {
    "use strict";
    
    function removeResizeSupport(id) {
        if (window.removeEventListener) {
            window.removeEventListener("resize",
                createjs_ui._resizeHandler[id]);
        } else {
            window.detachEvent("onresize",
                createjs_ui._resizeHandler[id]);
        }
        delete(createjs_ui._resizeHandler[id]);
    }
    
    //TODO: test this in IE
    /**
     * throw an event on the stage that the canvas has been resized.
     * @param stage the EaselJS-stage
     * @param enable true to enable resize support, false to disable,
     * @param fullwindow automatically resize the canvas to full window inner size
     */
    function resizeSupport(stage, enable, fullwindow) {
        var id = stage.canvas.id;
        if (enable || enable === undefined) {
            if (!(id in createjs_ui._resizeHandler)) {
                removeResizeSupport(id);
            }
            createjs_ui._resizeHandler[id] = function(event) {
                var evt = new createjs.Event("resize");
                stage.dispatchEvent("resize");
                if (fullwindow) {
                    stage.canvas.width = window.innerWidth;
                    stage.canvas.height = window.innerHeight;
                }
            };
            if (window.addEventListener) {
                window.addEventListener("resize",
                    createjs_ui._resizeHandler[id], false);
            } else {
                window.attachEvent("onresize",
                    createjs_ui._resizeHandler[id]);
            }
        } else {
            removeResizeSupport(id);
        }
    }

    createjs_ui._resizeHandler = {};
    createjs_ui.resizeSupport = resizeSupport;
})();