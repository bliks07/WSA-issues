(function () {
    "use strict";

    var nav = WinJS.Navigation;
    var session = WinJS.Application.sessionState;
    var util = WinJS.Utilities;

    // Get the groups used by the data-bound sections of the Hub.
    var section1Group = Data.resolveGroupReference("group1");
    var section1Items = Data.getItemsFromGroup(section1Group);

    WinJS.UI.Pages.define("/pages/hub/hub.html", {
        processed: function (element) {
            return WinJS.Resources.processAll(element);
        },

        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var hub = element.querySelector(".hub").winControl;
            hub.onheaderinvoked = function (args) {
                args.detail.section.onheaderinvoked(args);
            };
            hub.onloadingstatechanged = function (args) {
                if (args.srcElement === hub.element && args.detail.loadingState === "complete") {
                    hub.onloadingstatechanged = null;
                    hub.element.focus();
                }
            }

            // TODO: Initialize the page here.
        },

        section1DataSource: section1Items.dataSource,

        section1HeaderNavigate: util.markSupportedForProcessing(function (args) {
            nav.navigate("/pages/section/section.html", { title: args.detail.section.header, groupKey: section1Group.key });
        }),

        section1ItemNavigate: util.markSupportedForProcessing(function (args) {
            var item = Data.getItemReference(section1Items.getAt(args.detail.itemIndex));
            nav.navigate("/pages/item/item.html", { item: item });
        }),

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        },
    });
})();