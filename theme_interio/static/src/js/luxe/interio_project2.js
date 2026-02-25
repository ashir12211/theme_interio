/**
 * Interio Project 2 — Editorial Layout
 * Reveal Animations
 */
$(document).ready(function () {
    // Intersection Observer Options
    var options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    // Observer Callback
    var observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                $(entry.target).addClass('ip2-visible');
                // Optional: Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // Target Elements (each item individually for staggered reveal)
    $('.ip2-item, .ip2-title, .ip2-uptitle').each(function () {
        observer.observe(this);
    });
});
