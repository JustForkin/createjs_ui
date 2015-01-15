(function() {
    "use strict";

    /**
     * HorizontalLayout - just set alignment to
     * LayoutAlignment.HORIZONTAL_ALIGNMENT
     */
    var TiledLayout = function() {
        createjs_ui.Layout.call(this);
        this._useSquareTiles = false;
        this._horizontalGap = 0;
        this._verticalGap = 0;
        this._tileHorizontalAlign = TiledLayout.TILE_HORIZONTAL_ALIGN_CENTER;
        this._tileVerticalAlign = TiledLayout.TILE_VERTICAL_ALIGN_MIDDLE;
        this._paging = TiledLayout.PAGING_NONE;
        this._orientation = TiledLayout.ORIENTATION_ROWS;
        this._needUpdate = true;
    };

    var p = createjs.extend(TiledLayout, createjs_ui.Layout);

    TiledLayout.ORIENTATION_ROWS = "rows";
    TiledLayout.ORIENTATION_COLUMNS = "columns";

    /**
     * If an item height is smaller than the height of a tile, the item will
     * be aligned to the top edge of the tile.
     *
     * @see #tileVerticalAlign
     */
    TiledLayout.TILE_VERTICAL_ALIGN_TOP = "top";

    /**
     * If an item height is smaller than the height of a tile, the item will
     * be aligned to the middle of the tile.
     *
     * @see #tileVerticalAlign
     */
    TiledLayout.TILE_VERTICAL_ALIGN_MIDDLE = "middle";

    /**
     * If an item height is smaller than the height of a tile, the item will
     * be aligned to the bottom edge of the tile.
     *
     * @see #tileVerticalAlign
     */
    TiledLayout.TILE_VERTICAL_ALIGN_BOTTOM = "bottom";

    /**
     * The item will be resized to fit the height of the tile.
     *
     * @see #tileVerticalAlign
     */
    TiledLayout.TILE_VERTICAL_ALIGN_JUSTIFY = "justify";

    /**
     * If an item width is smaller than the width of a tile, the item will
     * be aligned to the left edge of the tile.
     *
     * @see #tileHorizontalAlign
     */
    TiledLayout.TILE_HORIZONTAL_ALIGN_LEFT = "left";

    /**
     * If an item width is smaller than the width of a tile, the item will
     * be aligned to the center of the tile.
     *
     * @see #tileHorizontalAlign
     */
    TiledLayout.TILE_HORIZONTAL_ALIGN_CENTER = "center";

    /**
     * If an item width is smaller than the width of a tile, the item will
     * be aligned to the right edge of the tile.
     *
     * @see #tileHorizontalAlign
     */
    TiledLayout.TILE_HORIZONTAL_ALIGN_RIGHT = "right";

    /**
     * The item will be resized to fit the width of the tile.
     *
     * @see #tileHorizontalAlign
     */
    TiledLayout.TILE_HORIZONTAL_ALIGN_JUSTIFY = "justify";

    /**
     * The items will be positioned in pages horizontally from left to right.
     *
     * @see #paging
     */
    TiledLayout.PAGING_HORIZONTAL = "horizontal";

    /**
     * The items will be positioned in pages vertically from top to bottom.
     *
     * @see #paging
     */
    TiledLayout.PAGING_VERTICAL = "vertical";

    
    /**
     * Positions (and possibly resizes) the supplied items.
     * @param items items that will be layouted
     * @param viewPortBounds
     */
    p.layout = function (items, viewPortBounds) {
        var _rows = this._orientation == TiledLayout.ORIENTATION_ROWS;
        if(items.length == 0) {
            return;
        }

        var maxWidth = viewPortBounds ? viewPortBounds.maxWidth : Number.POSITIVE_INFINITY;
        var maxHeight = viewPortBounds ? viewPortBounds.maxHeight : Number.POSITIVE_INFINITY;
        var explicitWidth = viewPortBounds ? viewPortBounds.explicitWidth : NaN;
        var explicitHeight = viewPortBounds ? viewPortBounds.explicitHeight : NaN;

        var i, item;
        var tileWidth = 0;
        var tileHeight = 0;
        
        // get size for tiles by saving the highest/widest tile.
        for(i = 0; i < items.length; i++) {
            item = items[i];
            if(!item) {
                continue;
            }
            var itemWidth = item.width;
            var itemHeight = item.height;
            if(itemWidth > tileWidth) {
                tileWidth = itemWidth;
            }
            if(itemHeight > tileHeight) {
                tileHeight = itemHeight;
            }
        }
        
        // assure width & height for tiles is at least 0
        if(tileWidth < 0) {
            tileWidth = 0;
        }
        
        if(tileHeight < 0) {
            tileHeight = 0;
        }
        
        // make tiles square
        if (this._useSquareTiles) {
            if(tileWidth > tileHeight) {
                tileHeight = tileWidth;
            }
            else if(tileHeight > tileWidth) {
                tileWidth = tileHeight;
            }
        }
        
        // calculate tiles needed (and their width/height)
        var availableWidth = NaN;
        var availableHeight = NaN;

        var horizontalTileCount = _rows ? item.length : 1;

        if(!isNaN(explicitWidth)) {
            availableWidth = explicitWidth;
            horizontalTileCount = (explicitWidth - 
                this._paddingLeft - this._paddingRight + 
                this._horizontalGap) / (tileWidth + this._horizontalGap);
        }
        else if(!isNaN(maxWidth)) {
            availableWidth = maxWidth;
            horizontalTileCount = (maxWidth - 
                this._paddingLeft - this._paddingRight + 
                this._horizontalGap) / (tileWidth + this._horizontalGap);
        }
        if(horizontalTileCount < 1) {
            horizontalTileCount = 1;
        }
        var verticalTileCount = _rows ? 1 : item.length;
        if(!isNaN(explicitHeight)) {
            availableHeight = explicitHeight;
            verticalTileCount = (explicitHeight - 
                this._paddingTop - this._paddingBottom + 
                this._verticalGap) / (tileHeight + this._verticalGap);
        } else if(!isNaN(maxHeight)) {
            availableHeight = maxHeight;
            verticalTileCount = (maxHeight - 
                this._paddingTop - this._paddingBottom + 
                this._verticalGap) / (tileHeight + this._verticalGap);
        }
        if(verticalTileCount < 1) {
            verticalTileCount = 1;
        }
        horizontalTileCount = Math.floor(horizontalTileCount);
        verticalTileCount = Math.floor(verticalTileCount);

        var startX = this._paddingLeft;
        var startY = this._paddingTop;

        var perPage = horizontalTileCount * verticalTileCount;
        var pageIndex = 0;
        var nextPageStartIndex = perPage;
        var pageStart = _rows ? startX : startY;
        var positionX = startX;
        var positionY = startY;
        var itemIndex = 0;
        for(i = 0; i < items.length; i++)
        {
            item = items[i];
            if (_rows) {
                if(itemIndex != 0 && itemIndex % horizontalTileCount == 0)
                {
                    positionX = pageStart;
                    positionY += tileHeight + this._verticalGap;
                }
            } else { // columns
                if(itemIndex != 0 && i % verticalTileCount == 0)
                {
                    positionX += tileWidth + this._horizontalGap;
                    positionY = pageStart;
                }
            }
            if(itemIndex == nextPageStartIndex) {
                pageIndex++;
                nextPageStartIndex += perPage;

                //we can use availableWidth and availableHeight here without
                //checking if they're NaN because we will never reach a
                //new page without them already being calculated.
                if (_rows) {
                    if(this._paging == TiledLayout.PAGING_HORIZONTAL)
                    {
                        positionX = pageStart = startX + availableWidth * pageIndex;
                        positionY = startY;
                    } else if(this._paging == TiledLayout.PAGING_VERTICAL) {
                        positionY = startY + availableHeight * pageIndex;
                    }
                } else { // columns
                    if(this._paging == TiledLayout.PAGING_HORIZONTAL) {
                        positionX = startX + availableWidth * pageIndex;
                    } else if(this._paging == TiledLayout.PAGING_VERTICAL) {
                        positionX = startX;
                        positionY = pageStart = startY + availableHeight * pageIndex;
                    }
                }
            }
            if(item) {
                switch(this._tileHorizontalAlign) {
                    case TiledLayout.TILE_HORIZONTAL_ALIGN_JUSTIFY:
                    {
                        item.x = positionX;
                        item.width = tileWidth;
                        break;
                    }
                    case TiledLayout.TILE_HORIZONTAL_ALIGN_LEFT:
                    {
                        item.x = positionX;
                        break;
                    }
                    case TiledLayout.TILE_HORIZONTAL_ALIGN_RIGHT:
                    {
                        item.x = positionX + tileWidth - item.width;
                        break;
                    }
                    default: //center or unknown
                    {
                        item.x = positionX + (tileWidth - item.width) / 2;
                    }
                }
                switch(this._tileVerticalAlign) {
                    case TiledLayout.TILE_VERTICAL_ALIGN_JUSTIFY:
                    {
                        item.y = positionY;
                        item.height = tileHeight;
                        break;
                    }
                    case TiledLayout.TILE_VERTICAL_ALIGN_TOP:
                    {
                        item.y = positionY;
                        break;
                    }
                    case TiledLayout.TILE_VERTICAL_ALIGN_BOTTOM:
                    {
                        item.y = positionY + tileHeight - item.height;
                        break;
                    }
                    default: //middle or unknown
                    {
                        item.y = positionY + (tileHeight - item.height) / 2;
                    }
                }
            }
            if (_rows) {
                positionX += tileWidth + this._horizontalGap;
            } else { // columns
                positionY += tileHeight + this._verticalGap;
            }
            itemIndex++;
        }
        
        this._needUpdate = false;
    };

    p._setUseSquareTiles = function(useSquareTiles) {
        this._useSquareTiles = useSquareTiles;
        this._needUpdate = true;
    };

    p._getUseSquareTiles = function() {
        return this._useSquareTiles;
    };
    
    Object.defineProperties(p, {
        useSquareTiles: {
            set: p._setUseSquareTiles,
            get: p._getUseSquareTiles
        }
    });
    
    createjs_ui.TiledLayout = createjs.promote(TiledLayout, "Layout");
}());