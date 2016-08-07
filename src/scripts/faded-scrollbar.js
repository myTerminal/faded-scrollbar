var FadedScrollbar = function (scrollerSelector, options) {
    var mouseDownOnContentY = null,
        mouseDownOnHandleY = null,
        scroller = $(scrollerSelector).first(),
        scrollParent,
        scrollContainer,
        scrollControls,
        scrollHandleContainer,
        scrollHandle,
        scrollHandleBar,
        scrollHandleTrack,
        
        setUpScrollMarkup = function () {
            scroller.css("-moz-user-select", "none");
            scroller.css("-webkit-user-select", "none");
            scroller.attr("onselectstart", "return false;");

            var scrollContent = scroller.html();
            scroller.html('<div class="faded-scrollbar-parent">' +
                            '<div class="faded-scrollbar-container">' +
                              scrollContent +
                            '</div>' +
                            '<div class="faded-scrollbar-controls">' +
                              '<div class="faded-scrollbar-handle-container">' +
                                '<div class="faded-scrollbar-handle">' +
                                  '<div class="faded-scrollbar-handle-bar"></div>' +
                                '</div>' +
                                '<div class="faded-scrollbar-handle-track"></div>' +
                              '</div>' +
                            '</div>' +
                          '</div>');

            scrollParent = scroller.find(".faded-scrollbar-parent");
            scrollContainer = scroller.find(".faded-scrollbar-container");
            scrollControls = scroller.find(".faded-scrollbar-controls");
            scrollHandleContainer = scroller.find(".faded-scrollbar-handle");
            scrollHandle = scroller.find(".faded-scrollbar-handle");
            scrollHandleBar = scroller.find(".faded-scrollbar-handle-bar");
            scrollHandleTrack = scroller.find(".faded-scrollbar-handle-track");
        },
        
        init = function () {
            setUpScrollMarkup();
            applyBindings();
            refresh();
        },
        
        refresh = function () {
            var scrollerHeight = scroller.height(),
                scrollContainerHeight = scrollContainer.height();

            if(scrollerHeight > scrollContainerHeight) {
                scrollControls.hide();
            } else {
                scrollControls.show();
            }

            var contentToContainerRatio = scrollerHeight / scrollContainerHeight,
                handleTrackHeight = scrollHandleTrack.height(),
                updatedHandleHeight = contentToContainerRatio * handleTrackHeight;
            scrollHandle.css("height", updatedHandleHeight);
        },
        
        applyBindings = function () {
            scrollContainer.bind("mousedown", function (evt) {
                mouseDownOnContentY = evt.clientY;
            });

            scrollContainer.bind("mousemove", function (evt) {
                if (mouseDownOnContentY) {
                    pan(mouseDownOnContentY - evt.clientY);
                    mouseDownOnContentY = evt.clientY;
                }
            });

            scrollContainer.bind("mouseout mouseup", function () {
                mouseDownOnContentY = null;
            });

            scrollHandle.bind("mousedown", function (evt) {
                mouseDownOnHandleY = evt.clientY;
            });

            scrollParent.bind("mousemove", function (evt) {
                var scrollableOffset = -(mouseDownOnHandleY - evt.clientY),
                    draggableOffset = scrollableOffset * getContentToContainerRatio();
                if (mouseDownOnHandleY) {
                    pan(draggableOffset);
                    mouseDownOnHandleY = evt.clientY;
                }
            });

            scrollParent.bind("mouseout mouseup", function () {
                mouseDownOnHandleY = null;
            });
        },
        
        getNumberOrDefault = function (input, parser, _default) {
            var parserToUse = (parser || parseInt),
                parsedValue = parserToUse(input);
            return isNaN(parsedValue) ? _default : parsedValue;
        },
        
        getNumberOrZero = function (input, parser) {
            return getNumberOrDefault(input, parser, 0);
        },
        
        pan = function (offset) {
            var scrollContainerTop = scrollContainer.css("top"),
                scrollContainerHeight = scrollContainer.height(),
                scrollParentHeight = scrollParent.height(),
                currentOffset = scrollContainerTop === "auto" ?
                    0 :
                    parseInt(scrollContainerTop),
                scrollableOffset = currentOffset - offset,
                currentHandleBarOffset = scrollHandleBar.css("top");
            
            if (scrollableOffset > 0) {
                scrollableOffset = 0;
            } else if (-1 * scrollableOffset > scrollContainerHeight - scrollParentHeight) {
                scrollableOffset = -(scrollContainerHeight - scrollParentHeight);
            }

            if (scrollableOffset !== currentOffset) {
                setScrollOffset(scrollableOffset);
                setHandleOffset(-scrollableOffset / getContentToContainerRatio());
            }
        },
        
        getContentToContainerRatio = function () {
            var scrollContainerHeight = scrollContainer.height(),
                scrollParentHeight = scrollParent.height();
            return scrollContainerHeight / scrollParentHeight;
        },
        
        setScrollOffset = function (newOffset) {
            scrollContainer.css("top", newOffset);
        },
        
        setHandleOffset = function (newOffset) {
            scrollHandle.css("top", newOffset);
        },
        
        reset = function () {
            setScrollOffset(0);
        },
        
        destroy = function () {
            
        };

    options = options || {};
    init();

    return {
        init: init,
        refresh: refresh,
        pan: pan,
        reset: reset,
        destroy: destroy
    };
};
