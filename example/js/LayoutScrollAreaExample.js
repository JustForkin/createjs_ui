var LayoutScrollAreaExample;

(function() {
    LayoutScrollAreaExample = function(stage) {
        var btn;
        // initialize theme
        new createjs_ui.AeonTheme();
        
        createjs_ui.Application.call(this, stage);
        
        // outer group that hosts some other groups
        var outer = new createjs_ui.LayoutGroup();
        
        //outer.width = stage.canvas.width - (grp.x*2);
        outer.layout = new createjs_ui.VerticalLayout();
        outer.layout.gap = 10;

        var outer_scroll = new createjs_ui.ScrollArea(outer);
        outer_scroll.height = 300;
        outer_scroll.width = 500;
        outer_scroll.x = 20;
        outer_scroll.y = 20;
        this.addChild(outer_scroll);

        for (var j = 0; j < 20; j++) {
            var inner = new createjs_ui.LayoutGroup();
            inner.layout = new createjs_ui.HorizontalLayout();
            inner.layout.gap = 10;
            // add some buttons
            for (var i = 0; i < 10; i++) {
                btn = new createjs_ui.Button();
                btn.height = 25;
                btn.label = (j+1) + ". - " + (i+1)+". button";
                inner.addChild(btn);
            }
            var inner_scroll = new createjs_ui.ScrollArea();
            inner_scroll.content = inner;
            inner_scroll.width = 500;
            outer.addChild(inner_scroll);
        }
    };

    var p = createjs.extend(LayoutScrollAreaExample, createjs_ui.Application);

    p.tick = function(event) {
        this.stage.update(event);
    };
})();
