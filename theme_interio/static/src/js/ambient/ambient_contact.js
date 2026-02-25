/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.AmbientContact = publicWidget.Widget.extend({
    selector: '.ambient_contact_section',
    start: function () {
        // Future animations or form handling logic can go here
        return this._super.apply(this, arguments);
    },
});
