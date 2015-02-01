// namespace
this.createjs_ui = this.createjs_ui || {};

(function() {
    "use strict";

    var ScrollBar = function(theme, scrollArea) {
        this.mode = ScrollBar.DESKTOP_MODE;
        if (this.orientation === undefined) {
            this.orientation = ScrollBar.HORIZONTAL;
            if (scrollArea && scrollArea.content &&
                    scrollArea.content.layout.alignment ==
                    createjs_ui.LayoutAlignment.VERTICAL_ALIGNMENT) {
                this.orientation = ScrollBar.VERTICAL;
            }
        }

        this.skinName = this.skinName || ScrollBar.SKIN_NAME;
        
        this.thumb = new createjs_ui.ScrollThumb(theme);
        this.addChild(this.thumb);
        
        // TODO get track from skin
        
    };
    
    ScrollBar.SKIN_NAME = "scroll_bar";
    
    ScrollBar.DESKTOP_MODE = "desktop";
    ScrollBar.MOBILE_MODE = "mobile";
    
    ScrollBar.HORIZONTAL = "horizontal";
    ScrollBar.VERTICAL = "vertical";

    var p = createjs.extend(ScrollBar, createjs_ui.Control);
    /**
     * redraw control for current state from theme
     */
    p.redraw = function() {
        createjs_ui.Control.prototype.redraw.call();
        if (this.invalidState) {
            
        }
        
    };

    createjs_ui.ScrollBar = createjs.promote(ScrollBar, "Control");
})();