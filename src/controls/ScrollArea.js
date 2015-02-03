// namespace
this.createjs_ui = this.createjs_ui || {};

(function() {
    "use strict";
    
    var ScrollArea = function(content, addListener) {
        createjs.Container.call(this);
        this.content = content || null;
        this.mask = undefined;
        this.enabled = true;
        this._useMask = true;
        this.addListener = addListener || true;
        this.scrolldirection = ScrollArea.SCROLL_AUTO;
        // # of pixel you scroll at a time (if the event delta is 1 / -1)
        this.scrolldelta = 10;
    };

    // scrolls horizontal as default, but will change if a
    // horizontal layout is set in the content
    ScrollArea.SCROLL_AUTO = "auto";
    ScrollArea.SCROLL_VERTICAL = "vertical";
    ScrollArea.SCROLL_HORIZONTAL = "horizontal";

    var p = createjs.extend(ScrollArea, createjs.Container);
    
    /**
     * Enables or disables the button functionality on the Butten.
     * @see http://www.createjs.com/Docs/EaselJS/files/easeljs_ui_ButtonHelper.js.html#l39
     * @method setEnabled
     * @param {Boolean} value
     **/
    p._setEnabled = function(value) {
        // update event listeners
        if (value && this.addListener) {
            this.on("pressmove", this.handleMove, this);
            this.on("pressup", this.handleUp, this);
            this.on("mousewheel", this.handleWheel, this);
        } else if (this.hasEventListener("pressmove")) {
            this.off("pressmove", this.handleMove, this);
            this.off("pressup", this.handleUp, this);
            this.off("mousewheel", this.handleWheel, this);
        }
        this._enabled = value;
    };
    
    /**
     * check, if the layout of the content is horizontally alligned
     */
    p.layoutHorizontalAlign = function() {
        return this.content.layout &&
            this.content.layout.alignment == createjs_ui.LayoutAlignment.HORIZONTAL_ALIGNMENT
    };

    /**
     * test if content width bigger than this width but content height is 
     * smaller than this height (so we allow scrolling in only one direction)
     */
    p.upright = function() {
        return this.content.height <= this.height &&
            this.content.width > this.width
    };
    
    p._scrollContent = function(x, y) {
        // todo: press shift to switch direction
        var scroll_auto = this.scrolldirection == ScrollArea.SCROLL_AUTO;
        var scroll = ScrollArea.SCROLL_VERTICAL;
        // if the scroll direction is set to SCROLL_AUTO we check, if the 
        // layout of the content is set to horizontal or the content
        // width is bigger than the current
        if (this.scrolldirection == ScrollArea.SCROLL_HORIZONTAL || 
            (scroll_auto && (this.layoutHorizontalAlign() || this.upright()) )) {
            scroll = ScrollArea.SCROLL_HORIZONTAL;
        }
        if (scroll == ScrollArea.SCROLL_HORIZONTAL) {
            if (this.content.width > this.width) {
                // assure we are within bounds
                x = Math.min(x, 0);
                if (this.content.width) {
                    x = Math.max(x, -(this.content.width - this.width));
                }
                this.content.x = x;
            }
        } 
        if (scroll == ScrollArea.SCROLL_VERTICAL) {
            if (this.content.height > this.height) {
                // assure we are within bounds
                y = Math.min(y, 0);
                if (this.content.height && this.content.y < 0) {
                    y = Math.max(y, -(this.content.height - this.height));
                }
                this.content.y = y;
            }
        }
    };
    
    p.handleWheel = function(event) {
        this._scrollContent(
            this.content.x + event.delta * this.scrolldelta,
            this.content.y + event.delta * this.scrolldelta
        )
    };

    p._getEnabled = function() {
        return this._enabled;
    };
    
    p.handleMove = function(event) {
        if (!this._start) {
            this._start = [
                event.stageX - this.content.x,
                event.stageY - this.content.y
            ];
        }
        this._scrollContent(
            event.stageX - this._start[0],
            event.stageY - this._start[1]
        );
    };

    p.handleUp = function(event) {
        this._start = null;
    };

    p.draw = function(ctx, ignoreCache) {
        if (this.DisplayObject_draw(ctx, ignoreCache)) { return true; }

        ctx.save();
        this.content.updateContext(ctx);
        if (this.content && this.content.drawArea) {
            this.content.drawArea(ctx, ignoreCache, -this.content.x, -this.content.y, this.width, this.height);
        } else if (this.content && this.content.draw) {
            this.content.draw(ctx, ignoreCache);
            
        }
        ctx.restore();
        return true;
    };

    p._setContent = function(content) {
        if (this._content) {
            this.Container_removeChild(content);
        }
        if (content) {
            this.Container_addChild(content);
        }
        this._content = content;
    };

    p._getContent = function() {
        return this._content;
    };

    /**
     * do not remove children - we just have a content
     * override addChild to prevent the developer from adding more than one context
     * @param child
     */
    p.removeChild = function(child) {
        throw new Error("use .content = null instead of removeChild(child)")
    };

    p.addChild = function(child) {
        throw new Error("use .content = child instead of addChild(child)")
    };


    p.updateMask = function() {
        if (this.height && this.width && this._useMask) {
            if (this.mask === undefined) {
                this.mask = new createjs.Shape();
            }
            this.drawMask();
        } else {
            if (this.mask) {
                this.mask.graphics.clear();
            }
            this.mask = undefined;
        }
    };

    /**
     * draw mask (can be overwritten, e.g. to show something above the 
     * scroll area when using a vertical layout)
     * @private
     */
    p.drawMask = function() {
        this.mask.graphics.clear()
            .beginFill("#fff")
            .drawRect(this.x, this.y, this.width, this.height)
            .endFill();
    };
    
    p._setHeight = function(height) {
        this._height = height;
        this.updateMask();
    };
    
    p._getHeight = function() {
        if (!this._height) {
            return this._content.height;
        }
        return this._height;
    };
    
    p._setWidth = function(width) {
        this._width = width;
        this.updateMask();
    };
    
    p._getWidth = function() {
        if (!this._width) {
            return this._content.width;
        }
        return this._width;
    };
    
    Object.defineProperties(p, {
        height: {
            set: p._setHeight,
            get: p._getHeight
        },
        width: {
            set: p._setWidth,
            get: p._getWidth
        },
        enabled: {
            set: p._setEnabled,
            get: p._getEnabled
        },
        content: {
            set: p._setContent,
            get: p._getContent
        }
    });
    
    createjs_ui.ScrollArea = createjs.promote(ScrollArea, "Container");
})();
