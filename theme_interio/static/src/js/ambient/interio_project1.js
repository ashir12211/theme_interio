/**
 * Interio Project 1 — Featured Project Showcase
 * Intersection Observer for Reveal Animations
 */
$(document).ready(function () {
    // Intersection Observer Options
    var options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    // Observer Callback
    var observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                $(entry.target).addClass('ip1-visible');
                // Optional: Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // Target Elements
    $('.interio_project1').each(function () {
        observer.observe(this);
    });
});
