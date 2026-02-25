/**
 * Atelier Get In Touch Controller
 * Handles form animations and scroll reveals
 */
$(document).ready(function () {
    $('.atelier-get-in-touch-section').each(function () {
        var $anims = $(this).find('.aget-anim');

        // Apply progressive delays
        $anims.each(function () {
            var delay = $(this).attr('data-delay') || '0s';
            $(this).css('transition-delay', delay);
        });

        // Intersection Observer for scroll triggers
        function revealForm() {
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

        // Wait to load initial states
        $anims.removeClass('is-visible');

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
            $(window).on('scroll.aget-anim', revealForm);
            revealForm();
        }

        // Add fun focus animations for input fields
        $(this).find('.aget-input').on('focus', function () {
            $(this).closest('.aget-form-group').find('.aget-label').css({
                'color': 'var(--aget-accent)',
                'transition': 'color 0.4s ease'
            });
        }).on('blur', function () {
            $(this).closest('.aget-form-group').find('.aget-label').css('color', '');
        });

    });
});
