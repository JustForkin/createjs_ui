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
        if (!skin) {
            return false;
        }
        this.addChild(skin);

        skin.x = (this.width - skin.getBounds().width )/ 2;
        skin.y = (this.height - skin.getBounds().height )/ 2;

        return true;
    };

    p.redraw = function() {
        createjs_ui.Button.prototype.redraw.call(this);
        if (this.invalidTrack) {
            var skin = this.theme.getSkin(this, this.skinName, this.orientation+"_thumb");
            if (this.showTrack(skin)) {
                this.invalidTrack = false;
                if (this._redraw_proxy_track !== undefined) {
                    this.theme.removeEventListener(
                        "ui_complete", this._redraw_proxy_track);
                    this._redraw_proxy_track = undefined;
                }
            } else {
                if (this._redraw_proxy_track === undefined) {
                    // store callback function so it can easily be removed
                    // and will not be added twice for this control
                    this._redraw_proxy_track = createjs.proxy(this.showTrack, this);
                }
                this.theme.addEventListener(
                    "ui_complete", this._redraw_proxy_track);
            }
            this.invalidTrack = false;
        }
    };

    createjs_ui.ScrollThumb = createjs.promote(ScrollThumb, "Button");
})();