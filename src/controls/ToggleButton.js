(function() {
    "use strict";

    /**
     * basic button with different stages to show mouse/touch feedback
     */
    var ToggleButton = function (theme, skin_name) {
        this.skinName = this.skinName || ToggleButton.SKIN_NAME;
        createjs_ui.Button.call(this, theme, skin_name);
        this._selected = false;
        this._validStates = this._validStates.slice(0);
        this._validStates.push(ToggleButton.SELECTED_UP);
        this._validStates.push(ToggleButton.SELECTED_DOWN);
        this._validStates.push(ToggleButton.SELECTED_HOVER);
    };

    var p = createjs.extend(ToggleButton, createjs_ui.Button);

    ToggleButton.SKIN_NAME = "toggle_button";
    
    ToggleButton.SELECTED_UP = "selected_up";
    ToggleButton.SELECTED_DOWN = "selected_down";
    ToggleButton.SELECTED_HOVER = "selected_hover";

    p._setSelected = function(selected){
        var state = this._currentState;
        this.invalidState = this._selected != selected || this.invalidState;
        if (state.indexOf("selected_") == 0) {
            state = state.substr(9, state.length);
        }
        this._selected = selected;
        this._setCurrentState(state);
    };

    p._getSelected = function(){
        return this._selected;
    };

    p._setCurrentState = function(value) {
        if (this._selected) {
            value = "selected_" + value;
        }
        createjs_ui.Button.prototype._setCurrentState.call(this, value);
    };

    /**
     * toggle state
     */
    p.toggle = function() {
        this._setSelected(!this._selected);
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
            this.toggle();
            this._setCurrentState(createjs_ui.Button.DOWN);
            this._pressed = true;
        } else if (type == "pressup" || type == "mouseup") {
            this._pressed = false;
            if (this._over) {
                this._setCurrentState(createjs_ui.Button.HOVER);
            } else {
                this._setCurrentState(createjs_ui.Button.UP);
            }
        } else if (type == "rollover") {
            this._over = true;
            if (this._pressed) {
                this._setCurrentState(createjs_ui.Button.DOWN);
            } else {
                this._setCurrentState(createjs_ui.Button.HOVER);
            }
        } else  { // type == rollout and default
            if (this._over) {
                this._over = false;
            }
            this._setCurrentState(createjs_ui.Button.UP);
        }
    };

    Object.defineProperties(p, {
        selected: {
            set: p._setSelected,
            get: p._getSelected
        }
    });
    
    createjs_ui.ToggleButton = createjs.promote(ToggleButton, "Button");
})();