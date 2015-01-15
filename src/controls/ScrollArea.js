// namespace
this.createjs_ui = this.createjs_ui || {};

(function() {
    "use strict";
    
    var ScrollArea = function(content) {
        createjs.Container.call(this);
        this.content = content || null;
        this.mask = new createjs.Shape();
        this.enabled = true;
        this._useMask = true;
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
        if (value) {
            this.on("pressmove", this.handleMove, this);
            this.on("pressup", this.handleUp, this);
            this.on("mousewheel", this.handleWheel, this);
        } else {
            this.off("pressmove", this.handleMove, this);
            this.off("pressup", this.handleUp, this);
            this.off("mousewheel", this.handleWheel, this);
        }
        this._enabled = value;
    };
    
    p._scrollContent = function(x, y) {
        // todo: press shift to switch direction
        var scroll = ScrollArea.SCROLL_VERTICAL;
        if (this.scrolldirection == ScrollArea.SCROLL_HORIZONTAL || (
                this.scrolldirection == ScrollArea.SCROLL_AUTO &&
                this.content.layout &&
                this.content.layout.alignment == createjs_ui.LayoutAlignment.HORIZONTAL_ALIGNMENT
            ) || (
                this.scrolldirection == ScrollArea.SCROLL_AUTO &&
                this.content.height <= this.height &&
                this.content.width > this.width
            )
        ) {
            scroll = ScrollArea.SCROLL_HORIZONTAL;
        }
        if (scroll == ScrollArea.SCROLL_HORIZONTAL) {
            x = Math.min(x, 0);
            if (this.width) {
                x = Math.max(x, -(this.content.width - this.width));
            }
            this.content.x = x;
        } 
        if (scroll == ScrollArea.SCROLL_VERTICAL) {
            y = Math.min(y, 0);
            if (this.content.height) {
                y = Math.max(y, -(this.content.height - this.height));
            }
            this.content.y = y;
        }
    };
    
    p.handleWheel = function(event) {
        this._scrollContent(
            this.content.x - event.delta * this.scrolldelta,
            this.content.y - event.delta * this.scrolldelta
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
        this.Container_addChild(content);
        this._content = content;
    };

    p._getContent = function() {
        return this._content;
    };

    /**
     * do not remove children - we just have a content
     * @param child
     */
    p.removeChild = function(child) {
        throw new Error("use .content = null instead of removeChild(child)")
    };

    p.addChild = function(child) {
        throw new Error("use .content = child instead of addChild(child)")
    };


    p.updateMask = function() {
        if (this._height && this._width && this._useMask) {
            if (this.mask === undefined) {
                this.mask = new createjs.Shape();
            }
            this.mask.graphics.clear()
                .beginFill("#fff")
                .drawRect(this.x, this.y, this._width, this._height)
                .endFill();
        } else {
            if (this.mask) {
                this.mask.graphics.clear();
            }
        }
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