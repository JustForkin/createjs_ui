var TiledLayoutExample;

(function() {
    TiledLayoutExample = function(stage) {
        var grp, btn;
        createjs_ui.Application.call(this, stage);

        // initialize theme
        new createjs_ui.AeonTheme();

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

    var p = createjs.extend(TiledLayoutExample, createjs_ui.Application);

    p.tick = function(event) {
        this.stage.update(event);
    };
})();