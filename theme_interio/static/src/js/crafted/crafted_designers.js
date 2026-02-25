/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.CraftedDesigners = publicWidget.Widget.extend({
    selector: '.crafted-designers-snippet',

    start: function () {
        // Initialization if needed
        return this._super.apply(this, arguments);
    },
});
