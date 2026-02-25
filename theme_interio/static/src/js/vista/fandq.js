/**
 * Vista FAQ - Accordion Interaction
 */
$(document).ready(function () {
    var $faq = $('.vh-faq');

    if (!$faq.length) return;

    // Handle Accordion Click
    $faq.find('.vh-accordion-header').on('click', function () {
        var $header = $(this);
        var $item = $header.parent();
        var $content = $item.find('.vh-accordion-content');
        var $wrapper = $item.parent();

        // 1. Close all other active items
        $wrapper.find('.vh-accordion-item.active').not($item).each(function () {
            var $otherItem = $(this);
            $otherItem.removeClass('active');
            $otherItem.find('.vh-accordion-content').css({
                'max-height': '0',
                'padding-bottom': '0'
            });
            $otherItem.find('.vh-acc-icon').css('transform', 'rotate(0deg)');
        });

        // 2. Toggle current item
        if ($item.hasClass('active')) {
            // Close
            $item.removeClass('active');
            $content.css('max-height', '0');
            $item.find('.vh-acc-icon').css('transform', 'rotate(0deg)');
        } else {
            // Open
            $item.addClass('active');
            var scrollHeight = $content[0].scrollHeight; // Get actual height
            $content.css('max-height', scrollHeight + 'px');
            $item.find('.vh-acc-icon').css('transform', 'rotate(90deg)');
        }
    });
});
