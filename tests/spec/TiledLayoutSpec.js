describe("Tiled Layout tests", function() {
    function basicGroup(num_buttons) {
        var grp = new createjs_ui.LayoutGroup();
        grp.layout = new createjs_ui.TiledColumnsLayout();
        grp.width = 100;
        grp.height = 100;
        var btn;
        for (var i=0; i < num_buttons; i++) {
            btn = new createjs_ui.Button();
            btn.width = 10;
            btn.height = 10;
            grp.addChild(btn);
        }
        return grp;
    }
    it("correct break after 10x10 components with a 100 px container",
        function() {
            var grp = basicGroup(21);
            grp.redraw();
            var last = grp.children[grp.children.length-1];
            var last_first_column_bottom = grp.children[grp.children.length-2];
            expect(last.y).toBe(0);
            expect(last_first_column_bottom.y).toBe(90);

            // change layout
            grp.layout = new createjs_ui.TiledRowsLayout();
            grp.redraw();
            var last_first_row_right = grp.children[grp.children.length-2];
            expect(last.x).toBe(0);
            expect(last_first_row_right.x).toBe(90);

            // change layout orientation
            // TODO: create getter/setter for paging and orientation
            grp.layout._orientation = createjs_ui.TiledLayout.ORIENTATION_COLUMNS;
            grp.layout._needUpdate = true;
            grp.redraw();
            expect(last.y).toBe(0);
            expect(last_first_column_bottom.y).toBe(90);
        }
    );
    it("use square tiles",
        function() {
            var grp = new createjs_ui.LayoutGroup();
            grp.layout = new createjs_ui.TiledRowsLayout();
            grp.width = 1000;
            grp.height = 1000;
            grp.layout.useSquareTiles = true;
            
            var btn;
            btn = new createjs_ui.Button();
            btn.height = 200;
            grp.addChild(btn);

            btn = new createjs_ui.Button();
            btn.width = 10;
            grp.addChild(btn);

            btn = new createjs_ui.Button();
            btn.width = 200;
            btn._needUpdate = true;
            grp.addChild(btn);
            
            // all buttons are 200 px width and height, so start at 400 px
            grp.redraw();
            expect(btn.x).toBe(400);

            // center button in tile
            btn.percentWidth = undefined;
            btn.width = 50;
            grp.layout._needUpdate = true;
            grp.redraw();
            expect(btn.x).toBe(475);
        }
    );
    // TODO: test setting maxWidth
    // TODO: test test gap
});