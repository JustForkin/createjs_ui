var ButtonExample;

(function() {
    ButtonExample = function(stage) {
        createjs_ui.Application.call(this, stage);

        // initialize theme
        new createjs_ui.AeonTheme();

        var btn = new createjs_ui.Button();
        btn.width = 150;
        btn.height = 100;
        btn.x = 20;
        btn.y = 30;
        btn.label = "first";
        this.addChild(btn);

        btn.on("click", function (evt) {
            alert("you clicked the first button!");
        });

        var theme = new createjs_ui.ShapeTheme();
        btn = new createjs_ui.Button(theme);
        btn.width = 150;
        btn.height = 100;
        btn.x = 170;
        btn.y = 30;
        btn.label = "second";
        this.addChild(btn);

        btn.on("click", function (evt) {
            alert("you clicked the second button!");
        });

    };

    var p = createjs.extend(ButtonExample, createjs_ui.Application);

    p.tick = function(event) {
        this.stage.update(event);
    };
})();