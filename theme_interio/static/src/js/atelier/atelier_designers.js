/**
 * Atelier Designers Controller
 */
$(document).ready(function () {
    $('.atelier-designers-section').each(function () {
        var $anims = $(this).find('.ades-anim');

        $anims.each(function () {
            var delay = $(this).attr('data-delay') || '0s';
            $(this).css('transition-delay', delay);
        });

        function revealCards() {
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
            $(window).on('scroll.ades-anim', revealCards);
            revealCards();
        }
    });
});
