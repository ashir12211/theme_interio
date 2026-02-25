/**
 * Vista Rooms 3 — Interaction
 * - Scroll Reveal for list items
 */
$(document).ready(function () {
    var $sections = $('.vh-rooms3');

    if (!$sections.length) return;

    // Check for IntersectionObserver support
    if ('IntersectionObserver' in window) {
        var observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        var observerCallback = function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var $section = $(entry.target);
                    // Find items within this section
                    var $items = $section.find('.vh-room-item');

                    // Reveal header slightly faster
                    $section.find('.vh-rooms3-title, .vh-rooms3-subtitle').css('opacity', '1');

                    $items.each(function (index) {
                        var $el = $(this);
                        setTimeout(function () {
                            $el.addClass('in-view');
                        }, index * 200);
                    });

                    observer.unobserve(entry.target);
                }
            });
        };

        var observer = new IntersectionObserver(observerCallback, observerOptions);

        $sections.each(function () {
            observer.observe(this);
        });
    } else {
        // Fallback for older browsers
        $('.vh-room-item').addClass('in-view');
    }
});
