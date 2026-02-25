/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.CraftedReviews = publicWidget.Widget.extend({
    selector: '.s_crafted_reviews',

    start: function () {
        // Initialization if needed
        return this._super.apply(this, arguments);
    },
});
