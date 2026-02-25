/**
 * Interio Process — Reveal Animations
 */
$(document).ready(function () {
    // Check if the snippet exists on the page
    if ($('.interio_process').length === 0) {
        return;
    }

    // Intersection Observer Options
    var options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    // Observer Callback
    var observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                // Add the animation class
                $(entry.target).addClass('aos-animate');

                // Set styles for visibility
                $(entry.target).css({
                    'opacity': '1',
                    'transform': 'translateY(0)'
                });

                // Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // Initial Setup for animated elements
    $('.interio_process [data-aos]').each(function () {
        var $el = $(this);

        // Initial state
        $el.css({
            'opacity': '0',
            'transform': 'translateY(20px)',
            'transition': 'opacity 0.6s ease-out, transform 0.6s ease-out'
        });

        // Add custom delays
        var delay = $el.attr('data-aos-delay');
        if (delay) {
            $el.css('transition-delay', delay + 'ms');
        }

        // Start observing
        observer.observe(this);
    });
});
