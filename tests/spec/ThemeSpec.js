describe("theming and skinning", function() {
    beforeEach(function() {
        // cleanup - make sure global theme is not set
        createjs_ui.Theme.removeTheme();
    });

    it("make sure the theme is globally available by default", function() {
        expect(createjs_ui.theme).toBe(undefined);
        var theme = new createjs_ui.Theme();
        expect(theme).not.toBe(null);
        expect(createjs_ui.theme).toBe(theme);

        // create temporary, local theme
        var tempTheme = new createjs_ui.Theme(false);
        expect(createjs_ui.theme).toBe(theme);
    });

    it("set theme of control", function() {
        var btn;
        expect(function () {
           btn = new createjs_ui.Button();
        }).toThrow();
        var theme = new createjs_ui.ShapeTheme();
        var btn = new createjs_ui.Button();
        var alttheme = new createjs_ui.ShapeTheme(false);
        btn.setTheme(alttheme);
        expect(btn.invalidState).toBe(false);
    });

    it("(simulate) loading images", function() {
        expect(createjs_ui.theme).toBe(undefined);
        var theme = new createjs_ui.TestTheme();
        expect(createjs_ui.theme).toBe(theme);
        expect(theme.queue).not.toBe(undefined);
        // simulate files are loaded
        // we trust createjs to do the job correctly, so we just dispatch
        // "complete"
        /*
        var async =  new AsyncSpec(this);
        async.it('wait for loader (ui_complete)', function(done) {
            // TODO: find way to make asynchronous tests work with createjs
            // events! the following code is never called!
            theme.addEventListener("ui_complete", function (event) {
                done();
            });
            theme.queue.dispatchEvent("complete");
        });
        */
    });
});
