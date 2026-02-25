/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.StudioMarquee = publicWidget.Widget.extend({
    selector: '.studio-marquee-section',

    start: function () {
        var self = this;
        this._super.apply(this, arguments);

        // Intersection Observer for scroll-triggered entrance
        this._setupScrollReveal();

        // Optional: mouse-tilt parallax on cards for extra artistry
        this._setupCardTilt();

        console.log('Studio Marquee snippet initialized.');
    },

    /**
     * Scroll-reveal: fade in the header and marquee rows as they enter the viewport
     */
    _setupScrollReveal: function () {
        var targets = this.el.querySelectorAll('.sm-header, .sm-marquee-wrapper, .sm-center-badge');

        if (!targets.length) return;

        // Initially hide
        targets.forEach(function (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px)';
            el.style.transition = 'opacity 0.8s cubic-bezier(0.23,1,0.32,1), transform 0.8s cubic-bezier(0.23,1,0.32,1)';
        });

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry, index) {
                if (entry.isIntersecting) {
                    var el = entry.target;
                    // Stagger the reveal
                    var delay = Array.prototype.indexOf.call(targets, el) * 200;
                    setTimeout(function () {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, delay);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.15 });

        targets.forEach(function (el) {
            observer.observe(el);
        });
    },

    /**
     * Subtle 3D tilt on card hover for artistic depth
     */
    _setupCardTilt: function () {
        var cards = this.el.querySelectorAll('.sm-card');

        cards.forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                var rect = card.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
                var centerX = rect.width / 2;
                var centerY = rect.height / 2;

                var rotateX = ((y - centerY) / centerY) * -6;
                var rotateY = ((x - centerX) / centerX) * 6;

                card.style.transform = 'translateY(-6px) scale(1.02) perspective(600px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
            });

            card.addEventListener('mouseleave', function () {
                card.style.transform = '';
            });
        });
    },
});
