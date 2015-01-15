var TiledLayoutExample;

(function() {
    TiledLayoutExample = function(stage) {
        var grp, btn;
        createjs.Container.call(this);

        // initialize theme
        new createjs_ui.AeonTheme();

        // set and configure stage
        this.stage = stage;
        createjs.Touch.enable(stage);
        stage.addChild(this);
        createjs.Ticker.setFPS(30);
        createjs.Ticker.addEventListener(
            "tick", createjs.proxy(this.tick, this));

        // enabled mouse over / out events
        stage.enableMouseOver(10);
        // keep tracking the mouse even when it leaves the canvas
        stage.mouseMoveOutside = true;

        grp = new createjs_ui.LayoutGroup();
        grp.x = 20;
        grp.y = 60;
        grp.width = stage.canvas.width - (grp.x*2);
        grp.height = stage.canvas.height - (grp.y*2);
        
        grp.layout = new createjs_ui.TiledColumnsLayout();
        grp.layout.gap = 10;
        this.addChild(grp);

        // create layout container and add some buttons
        for (var i = 0; i < 50; i++) {
            btn = new createjs_ui.Button();
            btn.width = 100;
            btn.height = 25;
            btn.label = (i+1)+". button";
            grp.addChild(btn);
        }
        
        var toggleButton = new createjs_ui.ToggleButton();
        toggleButton.label = "switch row/column layout";
        toggleButton.width = 300;
        toggleButton.x = toggleButton.y = 20;
        toggleButton.on("click", function (evt) {
            if (grp.layout._orientation == createjs_ui.TiledLayout.ORIENTATION_ROWS) {
                grp.layout._orientation = createjs_ui.TiledLayout.ORIENTATION_COLUMNS;
            } else {
                grp.layout._orientation = createjs_ui.TiledLayout.ORIENTATION_ROWS;
            }
            grp.layout._needUpdate = true;
        });
        this.addChild(toggleButton);
    };

    var p = createjs.extend(TiledLayoutExample, createjs.Container);

    p.tick = function(event) {
        this.stage.update(event);
    };
})();