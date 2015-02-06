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

    p._set_width = function(width) {
        this._width = width;
        this.invalidTrack = true;
    };

    p._get_width = function() {
        return this._width;
    };

    p._set_height = function(height) {
        this._height = height;
        this.invalidTrack = true;
    };

    p._get_height = function() {
        return this._height;
    };

    p.handleMouseDown = function(e) {
        this.start[0] = e.stageX;
        this.start[1] = e.stageY;
    };

    p.showTrack = function() {
        var skin = this.theme.getSkin(this, this.skinName, this.orientation+"_track");
        if (!skin) {
            return false;
        }
        this.addChildAt(skin, 0);

        if(this.orientation == ScrollBar.HORIZONTAL) {
            skin.width = this.width;
        } else {
            skin.height = this.height;
        }

        return true;
    };

    p.redraw = function() {
        if (this.invalidTrack) {
            if (this.showTrack()) {
                this.invalidTrack = false;
                if (this._redraw_proxy_track !== undefined) {
                    this.theme.removeEventListener(
                        "ui_complete", this._redraw_proxy_track);
                    this._redraw_proxy_track = undefined;
                }
            } else {
                if (this._redraw_proxy_track === undefined) {
                    // store callback function so it can easily be removed
                    // and will not be added twice for this control
                    this._redraw_proxy_track = createjs.proxy(this.showTrack, this);
                }
                this.theme.addEventListener(
                    "ui_complete", this._redraw_proxy_track);
            }

            if(this.orientation == ScrollBar.HORIZONTAL) {
                this.thumb.width = Math.max(100, this.scrollArea.width / (this.scrollArea.content.width / this.scrollArea.width));
            } else {
                this.thumb.width = 20;
                this.thumb.height= Math.max(50, this.scrollArea.height / (this.scrollArea.content.height / this.scrollArea.height));
            }
            this.invalidTrack = false;
        }
    };

    Object.defineProperties(p, {
        width: {
            set: p._set_width,
            get: p._get_width
        },
        height: {
            set: p._set_height,
            get: p._get_height
        }
    });

    createjs_ui.ScrollBar = createjs.promote(ScrollBar, "Control");
})();