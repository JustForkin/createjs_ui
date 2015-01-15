var ButtonExample;

(function() {
    ButtonExample = function(stage) {
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

    var p = createjs.extend(ButtonExample, createjs.Container);

    p.tick = function(event) {
        this.stage.update(event);
    };
})();