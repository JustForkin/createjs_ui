var LayoutExample;

(function() {
    LayoutScrollAreaExample = function(stage) {
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


        // outer group that hosts some other groups
        var outer = new createjs_ui.LayoutGroup();
        outer.x = 20;
        outer.y = 20;
        
        //outer.width = stage.canvas.width - (grp.x*2);
        outer.layout = new createjs_ui.VerticalLayout();
        outer.layout.gap = 10;

        var outer_scroll = new createjs_ui.ScrollArea(outer);
        outer_scroll.height = 300;
        this.addChild(outer_scroll);

        for (var j = 0; j < 20; j++) {
            var inner = new createjs_ui.LayoutGroup();
            inner.layout = new createjs_ui.HorizontalLayout();
            inner.layout.gap = 10;
            // add some buttons
            for (var i = 0; i < 10; i++) {
                btn = new createjs_ui.Button();
                btn.height = 25;
                btn.label = (i+1)+". button";
                inner.addChild(btn);
            }
            var inner_scroll = new createjs_ui.ScrollArea(inner);
            inner_scroll.width = 500;
            outer.addChild(inner_scroll);
        }
        
    };

    var p = createjs.extend(LayoutScrollAreaExample, createjs.Container);

    p.tick = function(event) {
        this.stage.update(event);
    };
})();
