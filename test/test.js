/*global $, describe, before, after, it, assert, FadedScrollbar */

var contentSelector = ".myContent",
    globals = {
        scrollbar: null,
        scrollbarParent: null,
        scrollbarContainer: null,
        scrollbarControls: null,
        scrollbarHandleContainer: null,
        scrollbarHandle: null,
        scrollbarHandleBar: null,
        scrollbarHandleTrack: null
    },
    refreshGlobals = function () {
        globals.scrollbarParent = $(".faded-scrollbar-parent");
        globals.scrollbarContainer = $(".faded-scrollbar-container");
        globals.scrollbarControls = $(".faded-scrollbar-controls");
        globals.scrollbarHandleContainer = $(".faded-scrollbar-handle-container");
        globals.scrollbarHandle = $(".faded-scrollbar-handle");
        globals.scrollbarHandleBar = $(".faded-scrollbar-handle-bar");
        globals.scrollbarHandleTrack = $(".faded-scrollbar-handle-track");
    };

describe("Tests for faded-scrollbar", function() {
    describe("Markup", function() {
        globals.scrollbar = new FadedScrollbar(contentSelector);
        refreshGlobals();

        it("Should add the required markup", function () {
            assert.ok(globals.scrollbarParent.length,
                      "Creates the markup required for the scrollbar");
        });

        it("Should remove the added markup on destroy", function () {
            globals.scrollbar.destroy();
            refreshGlobals();
            assert.ok(!globals.scrollbarParent.length,
                      "Destroys the added DOM for the scrollbar");
        });
    });

    describe("Scrollbar visibility", function () {
        before(function () {
            globals.scrollbar = new FadedScrollbar(contentSelector);
            refreshGlobals();
        });

        after(function () {
            globals.scrollbar.destroy();
        });

        it("Should hide/show the scrollbar when needed", function () {
            var originalContent = globals.scrollbarContainer.html();

            globals.scrollbarContainer.html("");
            globals.scrollbar.refresh();
            assert.ok(!globals.scrollbarControls.is(":visible"),
                      "Scrollbar is hidden when it is not needed");

            globals.scrollbarContainer.html(originalContent);
            globals.scrollbar.refresh();
            assert.ok(globals.scrollbarControls.is(":visible"),
                      "Scrollbar is shown when it is not needed");
        });
    });

    describe("Dragger sizing", function () {
        before(function () {
            globals.scrollbar = new FadedScrollbar(contentSelector);
            refreshGlobals();
        });

        after(function () {
            globals.scrollbar.destroy();
        });

        it("Should size the dragger appropriately", function () {
            var contentToContainerRatio = globals.scrollbarContainer.height() /
                    globals.scrollbarParent.height(),
                expectedScrollbarHeight = globals.scrollbarControls.height() /
                    contentToContainerRatio;

            assert.equal(Math.floor(globals.scrollbarHandle.height()),
                         Math.floor(expectedScrollbarHeight),
                         "Scrollbar dragger is sized appropriately");
        });
    });

    describe("Scrolling with pan gesture", function () {
        before(function () {
            globals.scrollbar = new FadedScrollbar(contentSelector);
            refreshGlobals();
        });

        after(function () {
            globals.scrollbar.destroy();
        });

        it("Should scroll when the content is panned", function () {
            // Write tests
        });

        it("Should not scroll when panned beyond the limit", function () {
            // Write tests
        });
    });

    describe("Scrolling with dragger", function () {
        before(function () {
            globals.scrollbar = new FadedScrollbar(contentSelector);
            refreshGlobals();
        });

        after(function () {
            globals.scrollbar.destroy();
        });

        it("Should scroll when the dragger is moved", function () {
            // Write tests
        });

        it("Should not scroll when the dragger is moved beyond the limit",
           function () {
               // Write tests
           });
    });

    describe("Resetting the scroll position", function () {
        before(function () {
            globals.scrollbar = new FadedScrollbar(contentSelector);
            refreshGlobals();
        });

        after(function () {
            globals.scrollbar.destroy();
        });

        it("Should reset the scroll position when told to", function () {
            globals.scrollbarHandle.css("top", 30);
            assert.equal(parseInt(globals.scrollbarHandle.css("top"), 10),
                         30,
                         "Scrollbar handle is not at zero");

            globals.scrollbarContainer.css("top", -50);
            assert.equal(parseInt(globals.scrollbarContainer.css("top"), 10),
                         -50,
                         "Scrollbar container is not at top");

            globals.scrollbar.reset();
            assert.equal(parseInt(globals.scrollbarHandle.css("top"), 10),
                         0,
                         "Scrollbar handle is reset to zero");
            assert.equal(parseInt(globals.scrollbarContainer.css("top"), 10),
                         0,
                         "Scrollbar container is reset to top");
        });
    });
});
