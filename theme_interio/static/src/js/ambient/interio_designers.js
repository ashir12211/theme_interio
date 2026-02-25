/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.InterioDesigners = publicWidget.Widget.extend({
    selector: '.interio_designers',
    start: function () {
        // Optional: Add scroll reveal animations or complex interactions here if needed in future
        console.log('Interio Designers snippet initialized.');
        return this._super.apply(this, arguments);
    },
});
