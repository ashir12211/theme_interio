/**
 * Interio Hero 3 — Dark Bento Grid Controller
 * Scroll-reveal animations & marquee duplicate
 */
$(document).ready(function () {
    $('.interio_hero3').each(function () {
        var $hero = $(this);
        var $anims = $hero.find('.ih3-anim');

        // ——— Scroll Reveal ———
        function revealElements() {
            var scrollTop = $(window).scrollTop();
            var windowHeight = $(window).height();

            $anims.each(function () {
                var $el = $(this);
                if ($el.hasClass('ih3-visible')) return;
                var elTop = $el.offset().top;
                if (elTop < scrollTop + windowHeight * 0.9) {
                    $el.addClass('ih3-visible');
                }
            });
        }

        // ——— Marquee Duplication ———
        // Clone marquee content to ensure seamless loop
        var $marqueeContent = $hero.find('.ih3-marquee-content');
        if ($marqueeContent.length) {
            var $clone = $marqueeContent.clone();
            $marqueeContent.parent().append($clone);
        }

        // ——— Init with IntersectionObserver ———
        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        revealElements();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            observer.observe($hero[0]);
        } else {
            $anims.addClass('ih3-visible');
        }

        // Scroll listener
        $(window).on('scroll.ih3', function () {
            revealElements();
        });

        // Initial check
        revealElements();
    });
});
