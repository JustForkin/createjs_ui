(function() {
    "use strict";
    
    function removeResizeSupport() {
        if (window.removeEventListener) {
            window.removeEventListener("resize",
                createjs_ui._resizeHandler);
        } else {
            window.detachEvent("onresize",
                createjs_ui._resizeHandler);
        }
        createjs_ui._resizeHandler = undefined;
    }
    
    //TODO: test this in IE
    /**
     * throw an event on the stage that the canvas has been resized.
     * @param stage the EaselJS-stage
     * @param enable true to enable resize support, false to disable,
     * @param fullwindow automatically resize the canvas to full window inner size
     */
    function resizeSupport(stage, enable, fullwindow) {
        if (enable || enable === undefined) {
            if (createjs_ui._resizeHandler !== undefined) {
                removeResizeSupport();
            }
            createjs_ui._resizeHandler = function(event) {
                var evt = new createjs.Event("resize");
                stage.dispatchEvent("resize");
                if (fullwindow) {
                    stage.canvas.width = window.innerWidth;
                    stage.canvas.height = window.innerHeight;
                }
            };
            if (window.addEventListener) {
                window.addEventListener("resize",
                    createjs_ui._resizeHandler, false);
            } else {
                window.attachEvent("onresize",
                    createjs_ui._resizeHandler);
            }
        } else {
            removeResizeSupport();
        }
    }

    createjs_ui.resizeSupport = resizeSupport;
})();