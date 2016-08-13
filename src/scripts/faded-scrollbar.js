var FadedScrollbar = function (scrollerSelector, options) {
    var scroller = $(scrollerSelector).first(),
        mouseDownOnContentY = null,
        mouseDownOnHandleY = null,
        scrollParentTemplate = "" +
            "<div class='faded-scrollbar-parent'>" +
            "  <div class='faded-scrollbar-container'>" +
            "  </div>" +
            "  <div class='faded-scrollbar-controls'>" +
            "    <div class='faded-scrollbar-handle-container'>" +
            "      <div class='faded-scrollbar-handle'>" +
            "        <div class='faded-scrollbar-handle-bar'></div>" +
            "      </div>" +
            "      <div class='faded-scrollbar-handle-track'></div>" +
            "    </div>" +
            "  </div>" +
            "</div>",
        scrollParent,
        scrollContainer,
        scrollControls,
        scrollHandle,
        scrollHandleBar,
        scrollHandleTrack,

        init = function () {
            setUpScrollMarkup();
            applyBindings();
            refresh();
        },

        setUpScrollMarkup = function () {
            disableSelection();
            encapsulateScroller();
            assignVariables();
        },

        encapsulateScroller = function () {
            var scrollContent = scroller.html();

            scrollParent = $(scrollParentTemplate);
            scroller.html("");
            scroller.append(scrollParent);
            scrollParent.find(".faded-scrollbar-container").append(scrollContent);
        },

        assignVariables = function () {
            scrollContainer = scrollParent.find(".faded-scrollbar-container");
            scrollControls = scrollParent.find(".faded-scrollbar-controls");
            scrollHandle = scrollParent.find(".faded-scrollbar-handle");
            scrollHandleBar = scrollParent.find(".faded-scrollbar-handle-bar");
            scrollHandleTrack = scrollParent.find(".faded-scrollbar-handle-track");
        },

        applyBindings = function () {
            scrollContainer.bind("mousedown", function (evt) {
                evt.stopPropagation();
                mouseDownOnContentY = evt.clientY;
            });

            scrollContainer.bind("mousemove", function (evt) {
                evt.stopPropagation();

                if (mouseDownOnContentY) {
                    pan(mouseDownOnContentY - evt.clientY);
                    mouseDownOnContentY = evt.clientY;
                }
            });

            scrollContainer.bind("mouseout mouseup", function (evt) {
                evt.stopPropagation();
                mouseDownOnContentY = null;
            });

            scrollHandle.bind("mousedown", function (evt) {
                evt.stopPropagation();
                mouseDownOnHandleY = evt.clientY;
            });

            scrollParent.bind("mousemove", function (evt) {
                evt.stopPropagation();

                var scrollableOffset = -(mouseDownOnHandleY - evt.clientY),
                    draggableOffset = scrollableOffset * getContentToContainerRatio();

                if (mouseDownOnHandleY) {
                    pan(draggableOffset);
                    mouseDownOnHandleY = evt.clientY;
                }
            });

            scrollParent.bind("mouseout mouseup", function (evt) {
                evt.stopPropagation();
                mouseDownOnHandleY = null;
            });
        },

        refresh = function () {
            var scrollerHeight = scroller.height(),
                scrollContainerHeight = scrollContainer.height();

            showOrHideControls(scrollerHeight, scrollContainerHeight);
            updateHandleHeight(scrollerHeight, scrollContainerHeight);
        },

        showOrHideControls = function (scrollerHeight, scrollContainerHeight) {
            if(scrollerHeight > scrollContainerHeight) {
                scrollControls.hide();
            } else {
                scrollControls.show();
            }
        },

        updateHandleHeight = function (scrollerHeight, scrollContainerHeight) {
            var contentToContainerRatio = scrollerHeight / scrollContainerHeight,
                handleTrackHeight = scrollHandleTrack.height(),
                updatedHandleHeight = contentToContainerRatio * handleTrackHeight;

            scrollHandle.css("height", updatedHandleHeight);
        },

        disableSelection = function () {
            scroller.css("-moz-user-select", "none");
            scroller.css("-webkit-user-select", "none");
            scroller.attr("onselectstart", "return false;");
        },

        enableSelection = function () {
            scroller.css("-moz-user-select", "");
            scroller.css("-webkit-user-select", "");
            scroller.removeAttr("onselectstart");
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
            setHandleOffset(0);
        },

        unbindEvents = function () {
            scrollContainer.unbind("mousedown mousemove mouseout mouseup");
            scrollHandle.unbind("mousedown");
            scrollParent.unbind("mousemove mouseout mouseup");
        },
        
        destroy = function () {
            unbindEvents();
            enableSelection();
            scroller.html(scroller.find(".faded-scrollbar-container").html());
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
