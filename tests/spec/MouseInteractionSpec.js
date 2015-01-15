/**
 * test mouse interactions
 * (just Buttons for now)
 */

describe("mouse interactions", function() {
    beforeEach(function(){
        // cleanup - make sure global theme is not set
        createjs_ui.Theme.removeTheme();
        new createjs_ui.ShapeTheme();
    });
    
    // create fake mouse event and handle it
    function fakeMouseEvent(btn, type) {
        var event = {type: type};
        btn.handleEvent(event);
    }
    
    it("handle invalid states with an exception throw", function() {
        var Button = createjs_ui.Button;
        var btn = new Button();
        expect(function () {
            btn._set_currentState("invalid");
        }).toThrow();
    });

    it("a clicked button states are correct (first 'down' then 'up')",
        function() {
            var Button = createjs_ui.Button;
            var btn = new Button();
            expect(btn._pressed).not.toBe(true);
            expect(btn.currentState).toBe(Button.UP);

            // change button state based on fake events
            fakeMouseEvent(btn, "mousedown");
            expect(btn._pressed).toBe(true);
            expect(btn.currentState).toBe(Button.DOWN);
            // fake mouseup
            fakeMouseEvent(btn, "mouseup");
            expect(btn._pressed).toBe(false);
            expect(btn.currentState).toBe(Button.UP);
        }
    );

    it("we can not click a disabled button", function() {
        var Button = createjs_ui.Button;
        var btn = new Button();
        expect(btn.enabled).toBe(true);
        expect(btn._pressed).toBe(false);

        // disable button
        btn.enabled = false;

        // handle fake event that will be ignored
        fakeMouseEvent(btn, "mousedown");
        expect(btn._pressed).toBe(false);
        expect(btn.currentState).toBe(Button.UP);
    });

    it("hover over button", function() {
        var Button = createjs_ui.Button;
        var btn = new Button();
        expect(btn.enabled).toBe(true);

        // handle fake event that will be ignored
        fakeMouseEvent(btn, "rollover");
        expect(btn.currentState).toBe(Button.HOVER);

        // pressing a hovering over a pressed button should still be the
        // pressed button
        fakeMouseEvent(btn, "mousedown");
        expect(btn.currentState).toBe(Button.DOWN);
        fakeMouseEvent(btn, "rollover");
        expect(btn.currentState).toBe(Button.DOWN);

        // hover over normal button should stay hovered
        fakeMouseEvent(btn, "mouseup");
        expect(btn.currentState).toBe(Button.HOVER);

        // some other mouse event - if the button has been hovered before we
        // change back to UP
        fakeMouseEvent(btn, "rollover");
        fakeMouseEvent(btn, "");
        expect(btn.currentState).toBe(Button.UP);

        // we go back to up when the user moves the mouse away from the button
        // but keeps the mouse-button pressed (this is not a click, so we
        // do not show that we are pressed - signal the user that
        // the button will NOT be executed when he relases the mouse)
        fakeMouseEvent(btn, "mousedown");
        fakeMouseEvent(btn, "rollout");
        expect(btn.currentState).toBe(Button.UP);
    });
    it("toggle button states", function() {
        var btn = new createjs_ui.ToggleButton();
        var tb = createjs_ui.ToggleButton;
        var b = createjs_ui.Button;
        expect(btn._currentState).toBe(b.UP);
        expect(btn.selected).toBe(false);
        btn.toggle();
        expect(btn._currentState).toBe(tb.SELECTED_UP);
        expect(btn.selected).toBe(true);
        
        // mousedown should also toggle the state
        fakeMouseEvent(btn, "mousedown");
        expect(btn.selected).toBe(false);
        fakeMouseEvent(btn, "mousedown");
        expect(btn.selected).toBe(true);
        
        fakeMouseEvent(btn, "rollover");
        expect(btn._currentState).toBe(tb.SELECTED_DOWN);
        fakeMouseEvent(btn, "pressup");
        expect(btn.selected).toBe(true);
        
        expect(btn._currentState).toBe(tb.SELECTED_HOVER);
    })
});