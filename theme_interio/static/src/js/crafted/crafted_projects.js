/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.CraftedProjects = publicWidget.Widget.extend({
    selector: '.crafted-projects-section',

    start: function () {
        this._super.apply(this, arguments);
        if (!this.editableMode) {
            this._initScrollAnimations();
        } else {
            // Ensure cards are visible in edit mode
            const cards = this.el.querySelectorAll('.c-project-col');
            cards.forEach(card => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
        }
    },

    _initScrollAnimations: function () {
        const cards = this.el.querySelectorAll('.c-project-col');

        if (!('IntersectionObserver' in window)) {
            // Fallback for older browsers
            cards.forEach(card => card.style.opacity = '1');
            return;
        }

        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionCards = entry.target.querySelectorAll('.c-project-col');
                    sectionCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('c-project-visible');
                        }, index * 150);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        observer.observe(this.el); // Observe the whole section instead of individual cards to avoid inline style issues

        cards.forEach(card => {
            card.classList.add('c-animated-card');
        });
    }
});
