var ToggleButtonExample;

(function() {
    ToggleButtonExample = function(stage) {
        createjs_ui.Application.call(this, stage);

        // initialize theme
        new createjs_ui.AeonTheme();

        var btn = new createjs_ui.ToggleButton();
        btn.width = 150;
        btn.height = 100;
        btn.x = 20;
        btn.y = 30;
        btn.label = "first";
        this.addChild(btn);

        var theme = new createjs_ui.ShapeTheme();
        btn = new createjs_ui.ToggleButton(theme);
        btn.width = 150;
        btn.height = 100;
        btn.x = 170;
        btn.y = 30;
        btn.label = "second";
        this.addChild(btn);
    };

    var p = createjs.extend(ToggleButtonExample, createjs_ui.Application);

    p.tick = function(event) {
        this.stage.update(event);
    };
})();