/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.CraftedPure = publicWidget.Widget.extend({
    selector: '.s_crafted_pure',

    start: function () {
        // Initialization if needed
        return this._super.apply(this, arguments);
    },
});
