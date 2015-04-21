// namespace
this.createjs_ui = this.createjs_ui || {};

(function() {
    "use strict";

    var ScrollThumb = function(orientation, theme) {
        this.orientation = orientation || createjs_ui.ScrollBar.HORIZONTAL;
        this.skinName = this.skinName || ScrollThumb.SKIN_NAME;
        this._validStates = ['horizontal_up', 'vertical_up', 'horizontal_down', 'vertical_down', 'horizontal_hover', 'vertical_hover'];
        createjs_ui.Button.call(this, theme);
        this.invalidTrack = true;
    };

    var p = createjs.extend(ScrollThumb, createjs_ui.Button);

    ScrollThumb.SKIN_NAME = "scroll_thumb";

    p._setCurrentState = function(value) {
        value = this.orientation + '_' + value;

        createjs_ui.Button.prototype._setCurrentState.call(this, value);
    };

    p.showTrack = function(skin) {
        if (this.skin != skin) {
            if(this.skin) {
                this.removeChild(this.skin);
            }

            this.addChild(skin);
            this.skin = skin;
        }
        var bounds = skin.getBounds();
        var width = 0;
        var height = 0;
        if (bounds) {
            width = bounds.width;
            height = bounds.height;
        }
        skin.x = (this.width - width ) / 2;
        skin.y = (this.height - height ) / 2;
        this.invalidTrack = false;
    };

    p.redraw = function() {
        createjs_ui.Button.prototype.redraw.call(this);
        if (this.invalidTrack) {
            this.fromSkin(this.orientation+"_thumb", this.showTrack);
        }
    };

    createjs_ui.ScrollThumb = createjs.promote(ScrollThumb, "Button");
})();