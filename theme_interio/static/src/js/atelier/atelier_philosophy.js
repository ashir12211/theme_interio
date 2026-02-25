/**
 * Atelier Philosophy Snippet Controller
 * Scroll reveals and intricate hover interactions
 */
$(document).ready(function () {
    $('.atelier-philosophy-section').each(function () {
        var $el = $(this);
        var $anims = $el.find('.ap-anim');

        // Apply dynamic transition delays
        $anims.each(function () {
            var delay = $(this).attr('data-delay') || '0s';
            $(this).css('transition-delay', delay);
        });

        // Link hover state to section for cross interaction
        $el.find('.ap-card').hover(
            function () {
                $el.addClass('is-hovering');
            },
            function () {
                $el.removeClass('is-hovering');
            }
        );

        // Scroll reveal logic
        function reveal() {
            var scrollTop = $(window).scrollTop();
            var windowHeight = $(window).height();

            $anims.each(function () {
                var $elem = $(this);
                if ($elem.hasClass('is-visible')) return;
                var elTop = $elem.offset().top;
                if (elTop < scrollTop + windowHeight * 0.85) {
                    $elem.addClass('is-visible');
                }
            });
        }

        // Use IntersectionObserver if available for better performance
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
            $(window).on('scroll.ap-anim', reveal);
            reveal();
        }
    });
});
