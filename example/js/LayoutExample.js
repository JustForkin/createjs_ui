var LayoutExample;

(function() {
    LayoutExample = function(stage) {
        var grp, btn;
        createjs_ui.Application.call(this, stage);

        // initialize theme
        new createjs_ui.AeonTheme();

        grp = new createjs_ui.LayoutGroup();
        grp.x = 20;
        grp.y = 30;
        grp.width = stage.canvas.width - (grp.x*2);
        grp.layout = new createjs_ui.HorizontalLayout();
        grp.layout.gap = 10;
        this.addChild(grp);

        // create layout container and add some buttons
        for (var i = 0; i < 10; i++) {
            btn = new createjs_ui.Button();
            btn.percentWidth = 100;
            btn.height = 25;
            btn.label = (i+1)+". button";
            grp.addChild(btn);
        }
        btn.percentWidth = null;
        btn.width = 110;
    };

    var p = createjs.extend(LayoutExample, createjs_ui.Application);

    p.tick = function(event) {
        this.stage.update(event);
    };
})();