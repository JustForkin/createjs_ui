// namespace:
this.createjs_ui = this.createjs_ui || {};

(function() {
    "use strict";


    /**
     * aeon theme
     * roughly based on the AeonDesktopTheme for feathers
     */
    var AeonTheme = function(imagePath) {
        createjs_ui.Theme.call(this);
        imagePath = imagePath || "../themes/assets/aeon/aeon/";
        var manifest = [
            // button
            {src: "button-up-skin.png", id: "button-up-skin"},
            {src: "button-hover-skin.png", id: "button-hover-skin"},
            {src: "button-down-skin.png", id: "button-down-skin"},
            {src: "button-disabled-skin.png", id: "button-disabled-skin"},
            // toggle_button
            {src: "button-selected-up-skin.png", id: "button-selected-up-skin"},
            {src: "button-selected-hover-skin.png", id: "button-selected-hover-skin"},
            {src: "button-selected-down-skin.png", id: "button-selected-down-skin"},
            {src: "button-selected-disabled-skin.png", id: "button-selected-disabled-skin"},
            // horizontal scrollbar
            {src: "horizontal-scroll-bar-track-skin.png", id: "horizontal-scroll-bar-track-skin"},
            {src: "horizontal-scroll-bar-thumb-up-skin.png", id: "horizontal-scroll-bar-thumb-up-skin"},
            {src: "horizontal-scroll-bar-thumb-hover-skin.png", id: "horizontal-scroll-bar-thumb-hover-skin"},
            {src: "horizontal-scroll-bar-thumb-down-skin.png", id: "horizontal-scroll-bar-thumb-down-skin"},
            {src: "horizontal-scroll-bar-thumb-icon.png", id: "horizontal-scroll-bar-thumb-icon"},
            // vertical scrollbar
            {src: "vertical-scroll-bar-track-skin.png", id: "vertical-scroll-bar-track-skin"},
            {src: "vertical-scroll-bar-thumb-up-skin.png", id: "vertical-scroll-bar-thumb-up-skin"},
            {src: "vertical-scroll-bar-thumb-hover-skin.png", id: "vertical-scroll-bar-thumb-hover-skin"},
            {src: "vertical-scroll-bar-thumb-down-skin.png", id: "vertical-scroll-bar-thumb-down-skin"},
            {src: "vertical-scroll-bar-thumb-icon.png", id: "vertical-scroll-bar-thumb-icon"}

        ];
        this.queue = this.createImageQueue(imagePath, manifest);
    };

    var p = createjs.extend(AeonTheme, createjs_ui.Theme);

    p.getScaleImage = function(name, grid) {
        grid = grid || AeonTheme.BUTTON_SCALE_9_GRID;
        var queue = this.queue;
        //return new createjs.Bitmap(this.queue.getResult(name));
        return function() {
            return new createjs_ui.ScaleBitmap(queue.getResult(name), grid);
        }
    };

    /**
     * all images loaded
     * @param event
     */
    p.loadComplete = function(event) {
        var b = createjs_ui.Button;
        var tb = createjs_ui.ToggleButton;
        this.setSkin(b.SKIN_NAME, b.UP,
            this.getScaleImage("button-up-skin"));
        this.setSkin(b.SKIN_NAME, b.DOWN,
            this.getScaleImage("button-down-skin"));
        this.setSkin(b.SKIN_NAME, b.HOVER,
            this.getScaleImage("button-hover-skin"));

        this.setSkin(tb.SKIN_NAME, b.UP,
            this.getScaleImage("button-up-skin"));
        this.setSkin(tb.SKIN_NAME, b.DOWN,
            this.getScaleImage("button-down-skin"));
        this.setSkin(tb.SKIN_NAME, b.HOVER,
            this.getScaleImage("button-hover-skin"));

        this.setSkin(tb.SKIN_NAME, tb.SELECTED_UP,
            this.getScaleImage("button-selected-up-skin",
                AeonTheme.SELECTED_BUTTON_SCALE_9_GRID));
        this.setSkin(tb.SKIN_NAME, tb.SELECTED_DOWN,
            this.getScaleImage("button-selected-down-skin",
                AeonTheme.SELECTED_BUTTON_SCALE_9_GRID));
        this.setSkin(tb.SKIN_NAME, tb.SELECTED_HOVER,
            this.getScaleImage("button-selected-hover-skin",
                AeonTheme.SELECTED_BUTTON_SCALE_9_GRID));
        
        var sb = createjs_ui.ScrollBar;
        this.setSkin(sb.SKIN_NAME, "horizontal_track",
            this.getScaleImage("horizontal-scroll-bar-track-skin",
                AeonTheme.HORIZONTAL_SCROLL_BAR_TRACK_SCALE_9_GRID));
        
        this.dispatchEvent("ui_complete");
    };

    AeonTheme.BUTTON_SCALE_9_GRID = new createjs.Rectangle(6, 6, 70, 10);
    AeonTheme.SELECTED_BUTTON_SCALE_9_GRID = new createjs.Rectangle(6, 6, 52, 10);
    AeonTheme.HORIZONTAL_SCROLL_BAR_THUMB_SCALE_9_GRID = new createjs.Rectangle(5, 2, 42, 6);
    AeonTheme.HORIZONTAL_SCROLL_BAR_TRACK_SCALE_9_GRID = new createjs.Rectangle(1, 2, 2, 11);
    AeonTheme.HORIZONTAL_SCROLL_BAR_STEP_BUTTON_SCALE_9_GRID = new createjs.Rectangle(2, 2, 10, 11);
    AeonTheme.VERTICAL_SCROLL_BAR_THUMB_SCALE_9_GRID = new createjs.Rectangle(2, 5, 6, 42);
    AeonTheme.VERTICAL_SCROLL_BAR_TRACK_SCALE_9_GRID = new createjs.Rectangle(2, 1, 11, 2);
    AeonTheme.VERTICAL_SCROLL_BAR_STEP_BUTTON_SCALE_9_GRID = new createjs.Rectangle(2, 2, 11, 10);

    createjs_ui.AeonTheme = AeonTheme;
})();