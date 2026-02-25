/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.CraftedAbout = publicWidget.Widget.extend({
    selector: '.s_crafted_about',

    start: function () {
        // Initialization if needed
        return this._super.apply(this, arguments);
    },
});
