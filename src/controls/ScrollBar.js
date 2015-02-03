// namespace
this.createjs_ui = this.createjs_ui || {};

(function() {
    "use strict";

    var ScrollBar = function(scrollArea, theme) {
        this.scrollArea = scrollArea;
        this.skinName = this.skinName || ScrollBar.SKIN_NAME;
        this.mode = ScrollBar.DESKTOP_MODE;

        if (this.orientation === undefined) {
            this.orientation = ScrollBar.HORIZONTAL;
            if (scrollArea && scrollArea.content &&
                    scrollArea.content.layout.alignment ==
                    createjs_ui.LayoutAlignment.VERTICAL_ALIGNMENT) {
                this.orientation = ScrollBar.VERTICAL;
            }
        }

        createjs_ui.Control.call(this, theme);

        this.thumb = new createjs_ui.ScrollThumb(this.orientation, theme);
        this.addChild(this.thumb);

        this.thumb.addEventListener('pressmove', createjs.proxy(this.handleMove, this));
        this.thumb.addEventListener('mousedown', createjs.proxy(this.handleMouseDown, this));

        this.invalidTrack = true;
        this.start = [0, 0];
    };
    
    ScrollBar.SKIN_NAME = "scroll_bar";
    
    ScrollBar.DESKTOP_MODE = "desktop";
    ScrollBar.MOBILE_MODE = "mobile";
    
    ScrollBar.HORIZONTAL = "horizontal";
    ScrollBar.VERTICAL = "vertical";

    var p = createjs.extend(ScrollBar, createjs_ui.Control);

    p.handleMove = function(e) {
        var x = this.thumb.x + e.localX - this.start[0];
        var y = this.thumb.y + e.localY - this.start[1];
        if (!this.moveThumb(x, y)) {
            // do not override localX/localY in start
            // if we do not move the thumb
            return;
        }

        if(this.orientation == ScrollBar.HORIZONTAL) {
            this.scrollArea._scrollContent(-(this.scrollArea.content.width - this.scrollArea.width) * (this.thumb.x / (this.scrollArea.width - this.thumb.width)), 0);
            this.start[0] = e.localX;
        } else {
            this.scrollArea._scrollContent(0, -(this.scrollArea.content.height - this.scrollArea.height) * (this.thumb.y / (this.scrollArea.height - this.thumb.height)));
            this.start[1] = e.localY;
        }
    };

    /**
     * move the thumb on the scroll bar within its bounds
     * @param x new calculated x position of the thumb
     * @param y new calculated y position of the thumb
     * @returns {boolean} returns true if the position of the thumb has been
     * moved
     */
    p.moveThumb = function(x, y) {
        if(this.orientation == ScrollBar.HORIZONTAL) {
            x = Math.min(x, this.width - this.thumb.width);
            x = Math.max(x, 0);
            if (x != this.thumb.x) {
                this.thumb.x = x;
                return true;
            }
        } else {
            y = Math.min(y, this.height - this.thumb.height);
            y = Math.max(y, 0);
            if (y != this.thumb.y) {
                this.thumb.y = y;
                return true;
            }
        }
        return false;
    };

    p.handleMouseDown = function(e) {
        this.start[0] = e.localX;
        this.start[1] = e.localY;
    };

    p.showTrack = function(skin) {
        this.addChildAt(skin, 0);

        if(this.orientation == ScrollBar.HORIZONTAL) {
            skin.width = this.width;
        } else {
            skin.height = this.height;
        }
        this.invalidTrack = false;
    };

    p.redraw = function() {
        if (this.invalidTrack) {
            this.fromSkin(this.orientation+"_track", this.showTrack);

            if(this.orientation == ScrollBar.HORIZONTAL) {
                this.thumb.width = Math.max(100, this.scrollArea.width / (this.scrollArea.content.width / this.scrollArea.width));
            } else {
                this.thumb.width = 20;
                this.thumb.height= Math.max(50, this.scrollArea.height / (this.scrollArea.content.height / this.scrollArea.height));
            }
            this.invalidTrack = false;
        }
    };

    createjs_ui.ScrollBar = createjs.promote(ScrollBar, "Control");
})();