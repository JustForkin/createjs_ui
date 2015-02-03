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
        if(this.orientation == ScrollBar.HORIZONTAL) {
            if(this.thumb.x + (e.stageX - this.start[0]) < 0) {
                this.thumb.x = 0;
            } else if(this.thumb.x + this.thumb.width + (e.stageX - this.start[0]) > this.scrollArea.width) {
                this.thumb.x = this.scrollArea.width - this.thumb.width;
            } else {
                this.thumb.x += e.stageX - this.start[0];
            }

            this.scrollArea._scrollContent(-(this.scrollArea.content.width - this.scrollArea.width) * (this.thumb.x / (this.scrollArea.width - this.thumb.width)), 0);
            this.start[0] = e.stageX;
        } else {
            if(this.thumb.y + (e.stageY - this.start[1]) < 0) {
                this.thumb.y = 0;
            } else if(this.thumb.y + this.thumb.height + (e.stageY - this.start[1]) > this.scrollArea.height) {
                this.thumb.y = this.scrollArea.height - this.thumb.height;
            } else {
                this.thumb.y += e.stageY - this.start[1];
            }

            this.scrollArea._scrollContent(0, -(this.scrollArea.content.height - this.scrollArea.height) * (this.thumb.y / (this.scrollArea.height - this.thumb.height)));
            this.start[1] = e.stageY;
        }

    };

    p.handleMouseDown = function(e) {
        this.start[0] = e.stageX;
        this.start[1] = e.stageY;
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