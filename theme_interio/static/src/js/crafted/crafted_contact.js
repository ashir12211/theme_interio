/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.CraftedContact = publicWidget.Widget.extend({
    selector: '.s_crafted_contact',

    start: function () {
        this._super.apply(this, arguments);
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.$target[0].classList.add('animate-in');
                } else {
                    // Optional: remove class when out of view to replay animation
                    this.$target[0].classList.remove('animate-in');
                }
            });
        }, {
            threshold: 0.2
        });

        this.observer.observe(this.$target[0]);
    },

    destroy: function () {
        if (this.observer) {
            this.observer.disconnect();
        }
        this._super.apply(this, arguments);
    }
});
