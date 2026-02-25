/**
 * Luxe Team — 3D Flip Cards
 * Scroll-reveal animation for cards
 */

$(document).ready(function () {

    $('.lt-section').each(function () {
        var $section = $(this);

        // Scroll reveal for cards
        var $cards = $section.find('.lt-card-container');

        $cards.each(function (i) {
            var $card = $(this);
            $card.css({
                'opacity': '0',
                'transform': 'translateY(40px)',
                'transition': 'opacity 0.7s cubic-bezier(0.23,1,0.32,1) ' + (i * 150) + 'ms, transform 0.7s cubic-bezier(0.23,1,0.32,1) ' + (i * 150) + 'ms'
            });
        });

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    $cards.each(function () {
                        $(this).css({
                            'opacity': '1',
                            'transform': 'translateY(0)'
                        });
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        if ($section.find('.lt-team-grid').length) {
            observer.observe($section.find('.lt-team-grid')[0]);
        }

        console.log('Luxe Team snippet initialized.');
    });
});
