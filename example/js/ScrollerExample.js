var ScrollerExample;

(function() {
    ScrollerExample = function(stage) {
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
        
        // enable mouse wheel support for the stage
        // (will be ignored outside the canvas)
        createjs_ui.mouseWheelSupport(stage, true);
        
        var rect = new createjs_ui.Rect();
        rect.width = 1000;
        rect.height = 120;
        rect.linearGradientFill(["#F00","#0FF"], [0, 1]);

        var sa_shape = new createjs_ui.ScrollArea(rect);
        sa_shape.x = 240;
        sa_shape.y = 240;
        sa_shape.width = sa_shape.height = 180;
        
        this.addChild(sa_shape);

        grp = new createjs_ui.LayoutGroup();
        grp.layout = new createjs_ui.VerticalLayout();

        // create layout container and add some buttons
        for (var i = 0; i < 20; i++) {
            btn = new createjs_ui.Button();
            btn.height = 25;
            btn.label = (i+1)+". button";
            grp.addChild(btn);
        }

        var sa_grp = new createjs_ui.ScrollArea(grp);
        sa_grp.x = 100;
        sa_grp.y = 100;
        sa_grp._useMask = false;
        sa_grp.height = 150;
        sa_grp.width = 80;

        this.addChild(sa_grp);
    };

    var p = createjs.extend(ScrollerExample, createjs.Container);

    p.tick = function(event) {
        this.stage.update(event);
    };
})();