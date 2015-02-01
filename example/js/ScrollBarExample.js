var ScrollBarExample;

(function() {
    ScrollBarExample = function(stage) {
        var btn;
        createjs_ui.Application.call(this, stage);

        // initialize theme
        new createjs_ui.AeonTheme();

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
        var inner_scroll = new createjs_ui.ScrollArea();
        inner_scroll.content = inner;
        inner_scroll.width = 500;
        this.addChild(inner_scroll);
        
        var sb = new createjs_ui.ScrollBar(inner_scroll);
        this.addChild(sb);
        sb.y = inner_scroll.height;
    };

    var p = createjs.extend(ScrollBarExample, createjs_ui.Application);

    p.tick = function(event) {
        this.stage.update(event);
    };
})();
