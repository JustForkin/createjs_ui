this.createjs_ui = this.createjs_ui || {};

(function() {
    "use strict";

    /**
     * TODO: write documentation & tutorial
     * basic layout
     */
    var LayoutAlignment = function() {
        createjs_ui.Layout.call(this);
    };

    var p = createjs.extend(LayoutAlignment, createjs_ui.Layout);
    LayoutAlignment.VERTICAL_ALIGNMENT = "vertical";
    LayoutAlignment.HORIZONTAL_ALIGNMENT = "horizontal";

    /**
     * apply percentage width/height to items.
     * percentages have higher priorities than fixed with.
     * So if you set a width higher than 0 but also percentWidth,
     * the width will be recalculated according to percentWidth.
     * @param items
     * @param explicit space we have for the components
     * (this function will handle padding and gap, so the explicitWidth is
     *  for the whole available width)
     */
    p.applyPercent = function(items, explicit) {
        var _hor = (this.alignment == LayoutAlignment.HORIZONTAL_ALIGNMENT);

        var itemCount = items.length;
        var remaining = explicit;
        var totalExplicit = 0;
        var totalPercent = 0;

        var i, itemPercent, item;
        // sum up width/height required for all items
        for (i = 0; i < itemCount; i++) {
            item = items[i];
            var itemSpace;
            itemPercent = _hor ? item.percentWidth : item.percentHeight;
            itemSpace = _hor ? item.width : item.height;

            if (!isNaN(itemPercent) && itemPercent != null) {
                totalPercent += itemPercent;
            } else if (!isNaN(itemSpace)) {
                // no percentWidth/percentHeight set for this item
                totalExplicit += itemSpace;
            }
        }

        // add space for all gaps
        totalExplicit += this._firstGap > 0 ? this._firstGap : this._gap;
        totalExplicit += (this._gap * (itemCount - 3));
        totalExplicit += this._lastGap > 0 ? this._lastGap : this._gap;

        var padding = _hor ?
            this._paddingLeft + this._paddingRight :
            this._paddingTop + this._paddingBottom;
        totalExplicit += padding;

        // use whole available space - if we do not sum up to 100 we will
        // stretch the items
        if(totalPercent < 100) {
            totalPercent = 100;
        }

        remaining -= totalExplicit;
        var percentToPixels = remaining / totalPercent;
        // claculate width/height for each item based on remaining width/height
        for(i = 0; i < itemCount; i++) {
            item = items[i];
            itemPercent = _hor ? item.percentWidth : item.percentHeight;
            if (itemPercent > 0) {
                if (_hor) {
                    item.width = percentToPixels * itemPercent;
                } else {
                    item.height = percentToPixels * itemPercent;
                }
            }
        }
    };

    /**
     * get current gap (includes first and last gap)
     * @param i current item position
     * @param items list of items (to determine if we are at the last gap)
     */
    p._currentGap = function(i, items) {
        if(!isNaN(this._firstGap) && i == 0)
        {
            return this._firstGap;
        }
        else if(!isNaN(this._lastGap) && i > 0 && i == items.length - 2)
        {
            return this._lastGap;
        }
        return this._gap;
    };

    p.layout = function(items, viewPortBounds) {
        var _hor = (this.alignment == LayoutAlignment.HORIZONTAL_ALIGNMENT);

        // get max. dimensions from viewport bounds
        var explicitWidth = viewPortBounds ? viewPortBounds.explicitWidth : NaN;
        var explicitHeight = viewPortBounds ? viewPortBounds.explicitHeight : NaN;

        var explicitSpace = _hor ? explicitWidth : explicitHeight;
        var paddingStart = _hor ? this._paddingLeft : this._paddingTop;

        // recalculate width/height
        this.applyPercent(items, explicitSpace);

        var position = paddingStart;

        // calculate item position (x/y coordinates)
        for(var i = 0; i < items.length; i++)
        {
            var item = items[i];

            // move item to position calculated in previous loop
            if (_hor) {
                item.x = position;
            } else {
                item.y = position;
            }
            var itemSpace = _hor ? item.width : item.height;
            // calculate position for next item
            position += itemSpace + this._currentGap(i, items);
        }
    };

    p._setFirstGap = function(value) {
        if (value == this._firstGap) {
            return;
        }
        this._firstGap = value;
        this._needUpdate = true;
    };

    p._getFirstGap = function() {
        return this._firstGap;
    };

    p._setLastGap = function(value) {
        if (value == this._lastGap) {
            return;
        }
        this._lastGap = value;
        this._needUpdate = true;
    };

    p._getLastGap = function() {
        return this._lastGap;
    };

    Object.defineProperties(p, {
        firstGap: {
            set: p._setFirstGap,
            get: p._getFirstGap
        },
        lastGap: {
            set: p._setLastGap,
            get: p._getLastGap
        }
    });
    
    createjs_ui.LayoutAlignment = createjs.promote(LayoutAlignment, "Layout");
})();
