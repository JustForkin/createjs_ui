describe("resize controls", function() {
    beforeEach(function(){
        // cleanup - make sure global theme is not set
        createjs_ui.Theme.removeTheme();
        new createjs_ui.ShapeTheme();
    });

    it("test toggle states", function() {
        var tb = createjs_ui.ToggleButton;
        var b = createjs_ui.Button;
        var btn = new createjs_ui.ToggleButton();
        btn.selected = true;
        expect(btn.invalidState).toBe(true);
        expect(btn.currentState).toBe(tb.SELECTED_UP);
        btn.redraw();
        expect(btn.invalidState).toBe(false);
        expect(btn.currentState).toBe(tb.SELECTED_UP);
        
        btn.selected = false;
        expect(btn.invalidState).toBe(true);
        expect(btn.currentState).toBe(b.UP);
        btn.selected = true;
        expect(btn.invalidState).toBe(true);
        expect(btn.currentState).toBe(tb.SELECTED_UP);
    });
});