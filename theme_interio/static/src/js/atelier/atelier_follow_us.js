/**
 * Atelier Follow Us Controller
 * Intersection Observer for floating collage
 */
$(document).ready(function () {
    $('.atelier-follow-section').each(function () {
        var $anims = $(this).find('.afw-anim');

        // Apply dynamic float delays based on HTML attributes
        $anims.each(function () {
            var delay = $(this).attr('data-delay') || '0s';
            $(this).css('transition-delay', delay);
        });

        // Advanced Scroll Intersection
        function revealFollow() {
            var scrollTop = $(window).scrollTop();
            var windowHeight = $(window).height();

            $anims.each(function () {
                var $elem = $(this);
                if ($elem.hasClass('is-visible')) return;
                var elTop = $elem.offset().top;
                if (elTop < scrollTop + windowHeight * 0.95) {
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
            $(window).on('scroll.afw-anim', revealFollow);
            revealFollow();
        }

        // Parallax mouse effect
        $(this).on('mousemove', function (e) {
            var windowWidth = $(window).width();
            var windowHeight = $(window).height();
            var mouseX = e.clientX / windowWidth - 0.5;
            var mouseY = e.clientY / windowHeight - 0.5;

            // Only apply on desktop
            if (windowWidth > 991) {
                $(this).find('.afw-img-wrap').each(function (index) {
                    var factor = (index + 1) * 15; // varying depth
                    $(this).css({
                        'transform': 'translate(' + (mouseX * factor) + 'px, ' + (mouseY * factor) + 'px)',
                        'transition': 'none' // Remove transition for instant mouse tracking
                    });
                });
            }
        });

        $(this).on('mouseleave', function () {
            $(this).find('.afw-img-wrap').css({
                'transform': 'translate(0, 0)',
                'transition': 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)' // Restore transition
            });
        });
    });
});
