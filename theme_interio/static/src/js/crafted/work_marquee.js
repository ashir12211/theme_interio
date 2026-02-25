/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.WorkMarquee = publicWidget.Widget.extend({
    selector: '.work-marquee-section',

    start: function () {
        this._super.apply(this, arguments);

        // Only clone the marquee items if we are on the live view
        // We don't want cloned items hanging around in the Odoo editor when user saves.
        if (!this.editableMode) {
            this._initMarqueeClone();
        }
    },

    _initMarqueeClone: function () {
        const track = this.el.querySelector('.wm-marquee-track');
        if (!track) return;

        const inner = track.querySelector('.wm-marquee-inner');
        if (!inner) return;

        // Check if already cloned (in case widget restarts)
        if (track.querySelector('.wm-cloned')) return;

        // Clone the content for seamless infinite scrolling
        const clone = inner.cloneNode(true);
        clone.classList.add('wm-cloned');
        clone.classList.remove('wm-marquee-inner');
        clone.setAttribute('aria-hidden', 'true');

        // Prevent ID collisions in the DOM
        clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));

        track.appendChild(clone);
    }
});
