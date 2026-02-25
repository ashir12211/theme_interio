/**
 * Atelier Pricing Controller
 * Intersection Observer for sliding elements
 */
$(document).ready(function () {
    $('.atelier-pricing-section').each(function () {
        var $anims = $(this).find('.aprice-anim');

        // Apply delay tracking
        $anims.each(function () {
            var delay = $(this).attr('data-delay') || '0s';
            $(this).css('transition-delay', delay);
        });

        // Scroll reveal logic
        function revealPricing() {
            var scrollTop = $(window).scrollTop();
            var windowHeight = $(window).height();

            $anims.each(function () {
                var $elem = $(this);
                if ($elem.hasClass('is-visible')) return;
                var elTop = $elem.offset().top;
                if (elTop < scrollTop + windowHeight * 0.9) {
                    $elem.addClass('is-visible');
                }
            });
        }

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        $(entry.target).addClass('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            $anims.each(function () { observer.observe(this); });
        } else {
            $(window).on('scroll.aprice-anim', revealPricing);
            revealPricing();
        }
    });

    // Handle seamless track cloning logic explicitly inside the marquee track
    $('.aprice-marquee-container').each(function () {
        var $track = $(this).find('.aprice-marquee-track');
        var $items = $track.children('.aprice-marquee-item');
        // By relying purely on CSS keyframes 0% to -50% for duplicated inner items we handle infinite looping seamlessly.
        // The HTML itself natively includes duplicate items for perfect continuity. No heavy JS looping needed here!
    });
});
