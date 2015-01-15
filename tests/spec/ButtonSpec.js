describe("resize controls", function() {
    beforeEach(function(){
        // cleanup - make sure global theme is not set
        createjs_ui.Theme.removeTheme();
        new createjs_ui.ShapeTheme();
    });

    it("update when button label changes", function() {
        var btn = new createjs_ui.Button();
        btn.label = "Hello World";
        expect(btn.updateLabel).toBe(true);
        btn.redraw();
        expect(btn.updateLabel).toBe(false);

        // nothing changed - do nothing
        btn.label = "Hello World";
        expect(btn.updateLabel).toBe(false);

        btn.label = "Hello";
        expect(btn.updateLabel).toBe(true);
        btn.redraw();
        expect(btn.updateLabel).toBe(false);
    });
});