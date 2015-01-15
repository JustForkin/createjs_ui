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
            {src: "button-up-skin.png", id: "button-up-skin"},
            {src: "button-hover-skin.png", id: "button-hover-skin"},
            {src: "button-down-skin.png", id: "button-down-skin"},
            {src: "button-disabled-skin.png", id: "button-disabled-skin"},
            {src: "button-selected-up-skin.png", id: "button-selected-up-skin"},
            {src: "button-selected-hover-skin.png", id: "button-selected-hover-skin"},
            {src: "button-selected-down-skin.png", id: "button-selected-down-skin"},
            {src: "button-selected-disabled-skin.png", id: "button-selected-disabled-skin"}
        ];
        this.queue = this.createImageQueue(imagePath, manifest);
    };

    var p = createjs.extend(AeonTheme, createjs_ui.Theme);

    p.getButtonImage = function(name, grid) {
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
            this.getButtonImage("button-up-skin"));
        this.setSkin(b.SKIN_NAME, b.DOWN,
            this.getButtonImage("button-down-skin"));
        this.setSkin(b.SKIN_NAME, b.HOVER,
            this.getButtonImage("button-hover-skin"));

        this.setSkin(tb.SKIN_NAME, b.UP,
            this.getButtonImage("button-up-skin"));
        this.setSkin(tb.SKIN_NAME, b.DOWN,
            this.getButtonImage("button-down-skin"));
        this.setSkin(tb.SKIN_NAME, b.HOVER,
            this.getButtonImage("button-hover-skin"));

        this.setSkin(tb.SKIN_NAME, tb.SELECTED_UP,
            this.getButtonImage("button-selected-up-skin",
                AeonTheme.SELECTED_BUTTON_SCALE_9_GRID));
        this.setSkin(tb.SKIN_NAME, tb.SELECTED_DOWN,
            this.getButtonImage("button-selected-down-skin",
                AeonTheme.SELECTED_BUTTON_SCALE_9_GRID));
        this.setSkin(tb.SKIN_NAME, tb.SELECTED_HOVER,
            this.getButtonImage("button-selected-hover-skin",
                AeonTheme.SELECTED_BUTTON_SCALE_9_GRID));
        
        this.dispatchEvent("ui_complete");
    };

    AeonTheme.BUTTON_SCALE_9_GRID = new createjs.Rectangle(6, 6, 70, 10);
    AeonTheme.SELECTED_BUTTON_SCALE_9_GRID = new createjs.Rectangle(6, 6, 52, 10);

    createjs_ui.AeonTheme = AeonTheme;
})();