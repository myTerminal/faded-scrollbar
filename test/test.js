/*global $, describe, before, after, it, assert, FadedScrollbar */

var contentSelector = ".myContent",
    globals = {

    },
    refreshGlobals = function () {

    };

describe("Tests for faded-scrollbar", function() {
    describe("Markup", function() {

    });

    describe("Basic functionality", function () {
        before(function () {
            globals.scrollbar = new FadedScrollbar(contentSelector);
            refreshGlobals();
        });

        after(function () {
            globals.scrollbar.destroy();
        });

        it("Should work", function () {
            assert.ok(true, "Write tests"); 
        });
    });
});
