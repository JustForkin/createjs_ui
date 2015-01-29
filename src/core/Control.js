// namespace
this.createjs_ui = this.createjs_ui || {};

(function() {
    "use strict";

    /**
     * base for all UI controls (see controls/)
     * based on createjs-Container that supports adding children, so all
     * controls are containers
     */
    var Control = function(theme) {
        // set defaults
        this.width = this.width || 100;
        this.height = this.height || 100;
        this.percentWidth = this.percentWidth || null;
        this.percentHeight = this.percentHeight || null;
        // controls are enabled by default
        createjs.Container.call(this);
        this.setTheme(theme);
        this.enabled = this.enabled !== false;
        this._last_width = undefined;
        this._last_height = undefined;
        this.invalidState = true; // draw for the first time
    };

    var p = createjs.extend(Control, createjs.Container);

    /**
     * set (another) theme
     * if this is not set the default theme createjs_ui.theme will be used
     * will also be called by constructor to set initial theme
     */
    p.setTheme = function(theme) {
        // remove redraw-proxy on previous theme (if needed)
        if (this._redraw_proxy !== undefined) {
            this.theme.removeEventListener(
                "ui_complete", this._redraw_proxy);
            this._redraw_proxy = undefined;
        }

        this.theme = theme || createjs_ui.theme;
        if (this.theme === undefined) {
            throw new Error("you need to define a theme first");
        }
        // invalidate state so the control will be redrawn next time
        this.invalidState = true;
        this.redraw();
    };

    /**
     * remove old skin and add new one
     */
    p.changeSkin = function(skin) {
        if (!skin) {
            // skin is null or undefined
            return false;
        }
        if (this._currentSkin != skin) {
            if (this._currentSkin) {
                this.removeChild(this._currentSkin);
            }
            this._currentSkin = skin;
            skin.width = this.width;
            skin.height = this.height;
            this.addChildAt(skin, 0);
        }
        return true;
    };

    p._getEnabled = function() {
        return this._enabled;
    };

    p._setEnabled = function(value) {
        this._enabled = value;
    };

    /**
     * returns true if dimensions have changed
     */
    p.invalidDimensions = function() {
        return (this._last_height != this.height ||
            this._last_width != this.width);
    };

    /**
     * redraw control for current state from theme
     */
    p.redraw = function() {
        if (this.invalidState) {
            var skin = this.theme.getSkin(this, this.skinName, this._currentState);
            // if we can not change the skin we assume that it is just
            // not loaded jet, so we just set invalidState if changeSkin
            // was successful and wait for the skin to complete (listen to the
            // ui_complete-event) otherwise
            if (this.changeSkin(skin)) {
                this.invalidState = false;
                if (this._redraw_proxy !== undefined) {
                    this.theme.removeEventListener(
                        "ui_complete", this._redraw_proxy);
                    this._redraw_proxy = undefined;
                }
            } else {
                if (this._redraw_proxy === undefined) {
                    // store callback function so it can easily be removed
                    // and will not be added twice for this control
                    this._redraw_proxy = createjs.proxy(this.redraw, this);
                }
                this.theme.addEventListener(
                    "ui_complete", this._redraw_proxy)
            }
        }
        if (this._currentSkin &&
            this.invalidDimensions()) {
            this._last_height = this.height;
            this._last_width = this.width;
            this._currentSkin.width = this.width;
            this._currentSkin.height = this.height;
        }
    };

    /**
     * @inheritDoc
     */
    /* istanbul ignore next */
    p.draw = function(ctx, ignoreCase) {
        this.redraw();
        return createjs.Container.prototype.draw.call(this, ctx, ignoreCase);
    };


    /**
     * The current touch state of the button.
     */
    p._getSkinName = function() {
        return this._skinName;
    };

    /**
     * @private
     */
    p._setSkinName = function(value) {
        if ( this._skinName == value ) {
            return;
        }
        this._skinName = value;
        this.invalidState = true;
    };

    Object.defineProperties(p, {
        enabled: {
            set: p._setEnabled,
            get: p._getEnabled
        },
        skinName: {
            set: p._setSkinName,
            get: p._getSkinName
        }
    });

    createjs_ui.Control = createjs.promote(Control, "Container");
})();