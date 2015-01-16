(function() {
    "use strict";

    /**
     * basic button with different stages to show mouse/touch feedback
     */
    var Button = function (theme) {
        this.skinName = this.skinName || Button.SKIN_NAME;
        this._validStates = this._validStates || Button.stateNames;
        this._setCurrentState(Button.UP); // default state is UP
        this._pressed = false; // button is not pressed by default
        this._over = false; // mouse is not over button by default
        createjs_ui.Control.call(this, theme);
        this.height = this.height || 20;
        this.mouseChildren = false;
        this.handleEvent({});
        this.updateLabel = this.updateLabel !== false; // label text changed
    };

    var p = createjs.extend(Button, createjs_ui.Control);

    // name of skin that will be applied
    Button.SKIN_NAME = "button";

    // Identifier for the different button states
    Button.UP = "up";
    Button.DOWN = "down";
    Button.HOVER = "hover";

    Button.stateNames = [
        Button.UP, Button.DOWN, Button.HOVER
    ];

    /**
     * The current touch state of the button.
     */
    p._getCurrentState = function() {
        return this._currentState;
    };

    /**
     * @private
     */
    p._setCurrentState = function(value) {
        if ( this._currentState == value ) {
            return;
        }
        if(this._validStates.indexOf(value) < 0) {
            throw new Error("Invalid state: " + value + ".");
        }
        this._currentState = value;
        // invalidate state so the next draw call will redraw the control
        this.invalidState = true;
    };


    p._getEnabled = function() {
        return createjs_ui.Control.prototype._getEnabled.call(this);
    };

    /**
     * Enables or disables the button functionality on the Butten.
     * @see http://www.createjs.com/Docs/EaselJS/files/easeljs_ui_ButtonHelper.js.html#l39
     * @method setEnabled
     * @param {Boolean} value
     **/
    p._setEnabled = function(value) {
        // update event listeners
        if (value) {
            this.on("rollover", this.handleEvent, this);
            this.on("rollout", this.handleEvent, this);
            this.on("mousedown", this.handleEvent, this);
            this.on("pressup", this.handleEvent, this);
        } else {
            this.off("rollover", this.handleEvent, this);
            this.off("rollout", this.handleEvent, this);
            this.off("mousedown", this.handleEvent, this);
            this.off("pressup", this.handleEvent, this);
        }
        createjs_ui.Control.prototype._setEnabled.call(this, value);
    };

    p._getLabel = function() {
        return this._label;
    };

    p._setLabel = function(value) {
        if(this._label == value)
        {
            return;
        }
        this._label = value;
        this.updateLabel = true;
    };

    /**
     * create or update label
     */
    p.createLabel = function() {
        // TODO: do we want something like a TextRenderer who decides to use
        // DOM elements instead of createjs.Text?
        if(this.labelText) {
            this.labelText.text = this._label;
            this.labelText.font = this.theme.labelFont;
            this.labelText.color = this.theme.labelColor;
        } else {
            this.labelText = new createjs.Text(this._label, this.theme.labelFont, this.theme.labelColor);
            this.addChild(this.labelText);
        }
        this.updateLabelDimensions();
        this.updateLabel = false;
    };

    p.updateLabelDimensions = function () {
        if (this.labelText) {
            this.labelText.x = (this.width - this.labelText.getMeasuredWidth()) / 2;
            this.labelText.y = (this.height - this.labelText.getMeasuredHeight()) / 2;
        }
    };

    p.setTheme = function(theme) {
        // this theme has other font or color settings - update the label
        if (this.labelText) {
            this.updateLabel = (this.updateLabel ||
                this.labelText.font != this.theme.labelFont ||
                this.labelText.color != this.theme.labelColor );
        }
        createjs_ui.Control.prototype.setTheme.call(this, theme);
    };

    /**
     * redraw button
     * @see createjs_ui.Control.prototype.redraw
     */
    p.redraw = function() {
        if (this.invalidDimensions()) {
            this.updateLabelDimensions();
        }
        if (this.updateLabel) {
            this.createLabel();
        }
        createjs_ui.Control.prototype.redraw.call(this);
    };

    /**
    * handle Mouse Event
    * TODO: handle multi-touch
    * @see http://www.createjs.com/Docs/EaselJS/files/easeljs_ui_ButtonHelper.js.html#l197
    * @method handleEvent
    * @param {Object} evt The mouse event to handle.
    * @protected
    **/
    p.handleEvent = function(evt) {
        var type = evt.type;
        if (!this._enabled) {
            return;
        }
        if (type == "mousedown") {
            this._setCurrentState(Button.DOWN);
            this._pressed = true;
        } else if (type == "pressup" || type == "mouseup") {
            this._pressed = false;
            if (this._over) {
                this._setCurrentState(Button.HOVER);
            } else {
                this._setCurrentState(Button.UP);
            }
        } else if (type == "rollover") {
            this._over = true;
            if (this._pressed) {
                this._setCurrentState(Button.DOWN);
            } else {
                this._setCurrentState(Button.HOVER);
            }
        } else  { // type == rollout and default
            if (this._over) {
                this._over = false;
            }
            this._setCurrentState(Button.UP);
        }
    };

    Object.defineProperties(p, {
        enabled: {
            set: p._setEnabled,
            get: p._getEnabled
        },
        label: {
            set: p._setLabel,
            get: p._getLabel
        },
        currentState: {
            get: p._getCurrentState
        }
    });

    createjs_ui.Button = createjs.promote(Button, "Control");
})();