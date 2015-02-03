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
    p.changeState = function(skin) {
        if (this._currentSkin != skin) {
            if (this._currentSkin) {
                this.removeChild(this._currentSkin);
            }
            this._currentSkin = skin;
            skin.width = this.width;
            skin.height = this.height;
            this.addChildAt(skin, 0);
        }
        this.invalidState = false;
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
     * get image from skin (will execute a callback with the loaded skin
     * when it is loaded or call it directly when it already is loaded)
     */
    p.fromSkin = function(name, callback) {
        var scope = this;
        var skin = scope.theme.getSkin(scope, scope.skinName, name);
        if (skin) {
            callback.call(scope, skin);
        } else {
            var retry_proxy;
            var theme = this.theme;
            var retry = function(evt) {
                theme.removeEventListener(
                    "ui_complete", retry_proxy);
                var skin = scope.theme.getSkin(scope, scope.skinName, name);
                callback.call(scope, skin);
            };
            retry_proxy = createjs.proxy(retry, this);
            theme.addEventListener(
                "ui_complete", retry_proxy)
        }
    };


    /**
     * redraw control for current state from theme
     */
    p.redraw = function() {
        if (this.invalidState) {
            this.fromSkin(this._currentState, this.changeState);
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