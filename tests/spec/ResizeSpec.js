describe("resize controls", function() {
    beforeEach(function(){
        // cleanup - make sure global theme is not set
        createjs_ui.Theme.removeTheme();
        new createjs_ui.ShapeTheme();
    });

    function testInvalidElem(elem, value, width, height) {
        expect(elem.width).toBe(width);
        expect(elem.invalid).not.toBe(value);
        // redraw without being invalid - should change nothing
        elem.redraw();
        expect(elem.width).toBe(width);
        expect(elem.height).toBe(height);
        expect(elem.invalid).not.toBe(value);
    }

    it("resize rect", function() {
        var rect = new createjs_ui.Rect();
        testInvalidElem(rect, true, 100, 100);
        // change width, now we should be invalid and need a redraw
        rect.width = 1000;
        expect(rect.invalid).toBe(true);
        rect.redraw();
        expect(rect.invalid).toBe(false);
    });
});