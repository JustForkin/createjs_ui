/**
 * test basic functionality
 */

describe("object instances", function() {
    beforeEach(function(){
        // cleanup - make sure global theme is not set
        createjs_ui.Theme.removeTheme();
        new createjs_ui.TestTheme();
    });
    function checkInvalid(ctrl) {
        expect(ctrl).not.toBe(null);
        expect(ctrl.invalidState).toBe(true);
    }

    it("make sure all graphic elements are invalid after creation", function() {
        var elems = [
            new createjs_ui.Control(),
            new createjs_ui.Button()
        ]
        for (var i = 0; i < elems.length; i++) {
            checkInvalid(elems[i]);
        }
    });
});