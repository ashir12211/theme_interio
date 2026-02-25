/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.AmbientFAQ = publicWidget.Widget.extend({
    selector: '.am-faq-section',
    events: {
        'click .am-faq-item': '_onFaqClick',
    },

    start: function () {
        return this._super.apply(this, arguments);
    },

    _onFaqClick: function (ev) {
        var $targetItem = $(ev.currentTarget);
        var $allContent = this.$el.find('.am-faq-answer');
        var $allItems = this.$el.find('.am-faq-item');
        var $allIcons = this.$el.find('.am-faq-icon');

        var $targetContent = $targetItem.find('.am-faq-answer');
        var $targetIcon = $targetItem.find('.am-faq-icon');

        if ($targetContent.hasClass('open')) {
            // It's already open, so close it
            $targetContent.removeClass('open');
            $targetContent.css('max-height', '0px');
            $targetItem.removeClass('active');
            $targetIcon.removeClass('fa-arrow-up').addClass('fa-arrow-down');
        } else {
            // Close all others
            $allContent.removeClass('open');
            $allContent.css('max-height', '0px');
            $allItems.removeClass('active');
            $allIcons.removeClass('fa-arrow-up').addClass('fa-arrow-down');

            // Open the target
            $targetContent.addClass('open');
            // Allow auto height by adding scrollHeight
            $targetContent.css('max-height', $targetContent[0].scrollHeight + 'px');
            $targetItem.addClass('active');
            $targetIcon.removeClass('fa-arrow-down').addClass('fa-arrow-up');
        }
    },
});
