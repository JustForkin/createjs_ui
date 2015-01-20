// namespace
this.createjs_ui = this.createjs_ui || {};

(function() {
    "use strict";

    /**
     * base for all UI controls (see controls/)
     * based on createjs-Container that supports adding children, so all
     * controls are containers
     */
    var LayoutGroup = function() {
        this.percentWidth = this.percentWidth || null;
        this.percentHeight = this.percentHeight || null;
        createjs.Container.call(this);
        this._viewPortBounds = new createjs_ui.ViewPortBounds();
        this._needUpdate = true;
    };

    var p = createjs.extend(LayoutGroup, createjs.Container);

    p.redraw = function() {
        var dimensionChanged = false;
        if (this._width && this._viewPortBounds.explicitWidth != this._width) {
            // width set - change viewport boundaries
            this._viewPortBounds.explicitWidth = this._width;
            dimensionChanged = true;
        }
        if (this._height && this._viewPortBounds.explicitHeight != this._height) {
            // height set - change viewport boundaries
            this._viewPortBounds.explicitHeight = this._height;
            dimensionChanged = true;
        }
        if (this.layout != null &&
            (this._needUpdate || dimensionChanged || this.layout.needUpdate)) {
            this.layout.layout(this.children, this._viewPortBounds);
            this._needUpdate = false;
            this.layout._needUpdate = false;
        }
    };

    p.addChild = function(child) {
        this._needUpdate = true;
        return createjs.Container.prototype.addChild.call(this, child);
    };

    p.addChildAt = function(child, pos) {
        this._needUpdate = true;
        return createjs.Container.prototype.addChildAt.call(this, child, pos);
    };
    
    p.drawArea = function(ctx, ignoreCache, x, y, width, height) {
        this.redraw();
        if (this.DisplayObject_draw(ctx, ignoreCache)) { return true; }

        // this ensures we don't have issues with display list changes that occur during a draw:
        var list = this.children.slice();
        for (var i=0,l=list.length; i<l; i++) {
            var child = list[i];
            if (!child.isVisible() ||
                child.x > width + x ||
                child.y > height + y ||
                child.x < x - child.width ||
                child.y < y - child.height) {
                continue; 
            }

            // draw the child:
            ctx.save();
            child.updateContext(ctx);
            child.draw(ctx);
            ctx.restore();
        }
        return true;
    };
    
    p._setWidth = function(width) {
        this._width = width;
    };

    p._getWidth = function() {
        if (this._width) {
            return this._width;
        }
        var width = 0;
        if (this.children) {
            for (var i = 0; i < this.numChildren; i++) {
                var child = this.getChildAt(i);
                width = Math.max(width, child.x+child.width);
            }
        }
        return width;
    };
    
    p._setHeight = function(height) {
        this._height = height;
    };

    p._getHeight = function() {
        if (this._height) {
            return this._height;
        }
        var height = 0;
        if (this.children) {
            for (var i = 0; i < this.numChildren; i++) {
                var child = this.getChildAt(i);
                height = Math.max(height, child.y+child.height);
            }
        }
        return height;
    };

    /**
     * @inheritDoc
     */
    /* istanbul ignore next */
    p.draw = function(ctx, ignoreCase) {
        this.redraw();
        return createjs.Container.prototype.draw.call(this, ctx, ignoreCase);
    };

    Object.defineProperties(p, {
        height: {
            set: p._setHeight,
            get: p._getHeight
        },
        width: {
            set: p._setWidth,
            get: p._getWidth
        }
    });
    
    createjs_ui.LayoutGroup = createjs.promote(LayoutGroup, "Container");
})();