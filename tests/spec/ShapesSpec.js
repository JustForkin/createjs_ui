describe("basic drawing of shapes", function() {
    beforeEach(function(){
        // cleanup - make sure global theme is not set
        createjs_ui.Theme.removeTheme();
        new createjs_ui.TestTheme();
    });

    function checkRadius(rect, name) {
        rect.invalid = false;
        rect["radius" + name] = 5;
        expect(rect.invalid).toBe(true);
    }
    it("make sure rect is invalid after setting radius values", function() {
        var rect = new createjs_ui.Rect();
        expect(rect).not.toBe(null);
        rect.radius = 10;
        expect(rect.radius).toBe(10);
        expect(rect.radiusTL).toBe(10);
        expect(rect.radiusTR).toBe(10);
        expect(rect.radiusBL).toBe(10);
        expect(rect.radiusBR).toBe(10);
        checkRadius(rect, "TL");
        checkRadius(rect, "TR");
        checkRadius(rect, "BL");
        checkRadius(rect, "BR");
        rect.redraw();
        expect(rect.invalid).toBe(false);
    });
});