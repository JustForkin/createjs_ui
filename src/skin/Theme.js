// namespace
this.createjs_ui = this.createjs_ui || {};

/*
When the Theme constructor is called, it creates a mapping of UI-components
and functions that render their states.
As default your theme is registered globally (as createjs_ui.theme) but
you can create a special theme just for single controls
 */

(function() {
    "use strict";

    /**
     * base functions for all themes
     */
    var Theme = function(global) {
        this._skins = {};
        // default color for label (e.g. buttons)
        this.labelColor = "#000";
        // default font for label (e.g. buttons)
        this.labelFont = "12px Arial";
        if (global === true || global === undefined) {
            createjs_ui.theme = this;
        }
    };

    var p = createjs.extend(Theme, createjs.EventDispatcher);

    p.loadComplete = function(event) {
        this.dispatchEvent("ui_complete");
    };

    p.createImageQueue = function(imagePath, manifest) {
        var queue = new createjs.LoadQueue(
            window.location.protocol != 'file:',
            imagePath);

        // TODO: setting the max. connections in the theme feels strange -
        // maybe create the queue somewhere else?

        // default for IE 10/11 is 8 connections
        queue.setMaxConnections(8);
        queue.addEventListener(
            "complete", createjs.proxy(this.loadComplete, this));
        queue.loadManifest(manifest);
        return queue;
    };

    /**
     * set skin for ui component
     * @param comp ui-component that we want to skin, e.g. "button"
     * @param id id for the skin
     * (e.g. state when the skinning function will be applied
     * @param skin skin-function that will executed once the component gets
     * updated
     */
    p.setSkin = function(comp, id, skin) {
        this._skins[comp] = this._skins[comp] || {};
        this._skins[comp][id] = skin;
        // TODO: dispatch event - the skin of "comp"
        // for state "state" has changed
    };

    p.getSkin = function(comp, state) {
        if (this._skins[comp] && this._skins[comp][state]) {
            return this._skins[comp][state]();
        }
        return null;
    };

    /**
     * remove theme from global context
     */
    Theme.removeTheme = function() {
        createjs_ui.theme = undefined;
    };

    createjs_ui.Theme = createjs.promote(Theme, "EventDispatcher");
})();