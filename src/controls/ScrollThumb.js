// namespace
this.createjs_ui = this.createjs_ui || {};

(function() {
    "use strict";

    var ScrollThumb = function(theme) {
        this.skinName = this.skinName || ScrollThumb.SKIN_NAME;
        createjs_ui.Button.call(this, theme)
    };

    var p = createjs.extend(ScrollThumb, createjs_ui.Button);

    ScrollThumb.SKIN_NAME = "scroll_thumb";

    createjs_ui.ScrollThumb = createjs.promote(ScrollThumb, "Button");
})();