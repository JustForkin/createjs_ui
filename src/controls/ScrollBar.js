// namespace
this.createjs_ui = this.createjs_ui || {};

(function() {
    "use strict";

    var ScrollBar = function(theme, scrollArea) {
        this.mode = ScrollBar.DESKTOP_MODE;
        this.scrollArea = scrollArea;
        this.skinName = this.skinName || ScrollBar.SKIN_NAME;
        
        this.thumb = new createjs_ui.ScrollThumb(theme);
        this.addChild(this.thumb);
        // TODO: get track from skin
    };
    
    ScrollBar.SKIN_NAME = "scroll_bar";
    
    ScrollBar.DESKTOP_MODE = "desktop";
    ScrollBar.MOBILE_MODE = "mobile";

    var p = createjs.extend(ScrollBar, createjs_ui.Control);
    ScrollBar.SKIN_NAME = "scroll_bar";

    createjs_ui.ScrollBar = createjs.promote(ScrollBar, "Control");
})();